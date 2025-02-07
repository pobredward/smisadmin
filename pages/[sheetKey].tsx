// pages/[sheetKey].tsx
import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { fetchStudents } from "../services/studentService";
import { StudentTableWithHeader } from "../components/StudentTableWithHeader";
import { StudentTableWithoutHeader } from "../components/StudentTableWithoutHeader";
import { checkAuth } from "../utils/auth";
import Cookies from "js-cookie";
import Loader from "../components/Loader";

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
  font-size: 14px;
  margin-right: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 120px;
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

const TableContainer = styled.div`
  overflow: auto;
  max-height: 80vh;
`;

const RowCount = styled.div`
  text-align: left;
  margin-bottom: 2px;
  font-size: 12px;
  color: #007bff;
`;

const SheetPage = () => {
  const router = useRouter();
  const { sheetKey } = router.query;
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchTermRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      // 이 이벤트에서 로딩 상태를 false로 설정하지 않습니다.
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  useEffect(() => {
    checkAuth(router);

    if (!sheetKey) return;

    const fetchData = async () => {
      try {
        setLoading(true); // 데이터 페칭 시작 시 로딩 상태 설정
        const data = await fetchStudents(sheetKey as string);
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // 데이터 페칭 완료 시 로딩 상태 설정
      }
    };

    fetchData();
  }, [sheetKey, router]);

  const fetchAllStudents = async () => {
    try {
      const data = await fetchStudents(sheetKey as string);
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // 데이터 페칭 완료 시 로딩 상태 설정
    }
  };

  const handleSearch = () => {
    const searchTerm = searchTermRef.current?.value || "";
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = students.filter(
        (student, index) =>
          index === 0 ||
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
      <Title>학생 정보 - {sheetKey}</Title>
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
      <RowCount>
        총 {filteredStudents.length - 1}개의 행이 조회되었습니다.
      </RowCount>
      <TableContainer>
        {sheetKey?.toString().startsWith("All") ? (
          <StudentTableWithoutHeader students={filteredStudents} />
        ) : (
          <StudentTableWithHeader students={filteredStudents} />
        )}
      </TableContainer>
    </Container>
  );
};

export default SheetPage;
