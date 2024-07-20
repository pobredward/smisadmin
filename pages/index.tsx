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
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #007bff;
`;

const Section = styled.div`
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
  text-align: left; /* 왼쪽 정렬 추가 */
  &:not(:last-of-type) {
    margin-bottom: 20px; /* 섹션 간 간격을 20px로 설정 */
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #007bff;
  text-align: left; /* 왼쪽 정렬 추가 */
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
`;

const SectionContent = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  text-align: left; /* 왼쪽 정렬 추가 */

  br {
    content: "";
    display: block;
    margin: 5px 0;
  }
`;

const BoldText = styled.span`
  font-weight: bold;
  font-size: 14px;
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
        <Divider />
        <SectionContent>
          SMIS 캠프별, 기수별 학생 정보를 조회하는 올인원 페이지가 있으면 편할
          같아 만들어 보았습니다. 데스크탑, 모바일 환경 어디든 사용 가능합니다.
          현재는 조회 및 검색하는 기능만 가능하고, 필요 시 다른 기능들을 추가할
          예정입니다.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>사용 가이드</SectionTitle>
        <Divider />
        <SectionContent>
          1. 관리시트 수정 후 바로 적용하고 싶을 땐 <BoldText>동기화</BoldText>
          를 누르기
          <br />
          2. 테이블 너비가 작아 내용이 가린다면{" "}
          <BoldText>셀을 더블클릭</BoldText>
          <br />
          3. 페이지 클릭 시 10분간 캐시를 등록하여 재접속 시 로딩 속도가 빨라짐
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
