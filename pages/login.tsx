// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f0f8ff;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 30px;
  width: 100%;
  font-size: 14px;
  color: #007bff;
  text-align: center;
`;

const LoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "9797") {
      // 예제용 비밀번호 검증
      Cookies.set("authenticated", "true", { expires: 10 }); // 10일간 인증 유지
      router.push("/");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container>
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={handleLogin}>Login</Button>
      <Footer>Made by Edward</Footer>
    </Container>
  );
};

export default LoginPage;