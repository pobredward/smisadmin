// pages/index.tsx
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";

const Container = styled.div`
  display: flex;
  justify-content: top;
  padding: 20px 0 0 0;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f0f8ff;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
`;

const Section = styled.div`
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #007bff;
  text-align: center;
`;

const SectionContent = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
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

const Home = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("authenticated");
    router.push("/login");
  };

  return (
    <Container>
      <Title>SMIS 관리시트 조회 페이지</Title>

      <Section>
        <SectionTitle>제작 배경</SectionTitle>
        <SectionContent>
          SMIS 캠프별, 기수별 학생 정보를 조회하는 올인원 페이지가 있으면
          어디서든 찾아보기 좋을 것 같아 만들어 보았습니다. 현재는 조회하는
          기능만 가능하고, 필요 시 다른 기능들을 추가할 예정입니다.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>사용 가이드</SectionTitle>
        <SectionContent>
          1. 상단의 네비게이션 바를 사용하여 원하는 캠프와 기수의 학생 정보를
          조회할 수 있습니다.
          <br />
          <br />
          2. 검색 창에 키워드를 입력하고 조회 버튼을 클릭하면, 키워드를 포함하는
          학생 정보들을 모두 검색할 수 있습니다.
          <br />
          <br />
          3. 구글 스프레드시트 관리시트 원본을 수정하면 현재 사이트와 자동으로
          동기화가 됩니다.
        </SectionContent>
      </Section>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

      <Footer>Made by Edward</Footer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authenticated = context.req.cookies.authenticated;
  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Home;
