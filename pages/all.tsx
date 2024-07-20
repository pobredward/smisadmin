// pages/all.tsx
import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { StudentTableAll } from "../components/StudentTableAll";
import Loader from "../components/Loader";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  color: #007bff;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SearchLeft = styled.div`
  display: flex;
`;

const SearchRight = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 5px 10px;
  font-size: 12px;
  margin-right: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 100px;
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResetButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #5a6268;
  }
`;

const SyncButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #28a745;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  display: block;
  margin: 20px auto;

  &:hover {
    background-color: #c82333;
  }
`;

const AllPage = () => {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchTermRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get("/api/allStudents");
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const handleSearch = () => {
    const searchTerm = searchTermRef.current?.value || "";
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = students.filter((student) =>
        student.some(
          (value: string) =>
            value && value.toLowerCase().includes(lowercasedTerm),
        ),
      );
      setFilteredStudents(filtered);
    }
  };

  const handleReset = () => {
    if (searchTermRef.current) {
      searchTermRef.current.value = "";
    }
    setFilteredStudents(students);
  };

  const handleSync = async () => {
    setLoading(true);
    await axios.get("/api/clearCache");
    await fetchAllStudents();
  };

  const handleLogout = () => {
    Cookies.remove("authenticated");
    router.push("/login");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchButtonRef.current?.click();
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Title>모든 학생 정보</Title>
      <SearchContainer>
        <SearchLeft>
          <SyncButton onClick={handleSync}>동기화</SyncButton>
        </SearchLeft>
        <SearchRight>
          <SearchInput
            type="text"
            placeholder="검색어 입력"
            ref={searchTermRef}
            onKeyPress={handleKeyPress}
          />
          <SearchButton onClick={handleSearch} ref={searchButtonRef}>
            조회
          </SearchButton>
          <ResetButton onClick={handleReset}>전체</ResetButton>
        </SearchRight>
      </SearchContainer>
      <StudentTableAll students={filteredStudents} />
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default AllPage;
