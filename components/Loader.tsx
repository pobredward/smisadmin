// components/Loader.tsx
import styled from "@emotion/styled";
import PuffLoader from "react-spinners/PuffLoader";
import { useEffect, useState } from "react";

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
  color: #007bff;
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  max-width: 80%;
`;

const EnglishQuote = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

const KoreanTranslation = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: #555;
`;

const motivationalQuotes = [
  {
    english: "Believe in yourself and all that you are.",
    korean: "너 자신과 너의 모든 것을 믿으렴.",
  },
  {
    english: "You are stronger than you think.",
    korean: "넌 생각보다 강한 사람이야.",
  },
  {
    english: "Your potential is endless.",
    korean: "너는 잠재력이 무한한 사람이야.",
  },
  {
    english: "You are capable of amazing things.",
    korean: "너는 놀라운 일을 해낼 수 있어.",
  },
  {
    english: "Stay positive, work hard, make it happen.",
    korean: "긍정적으로 생각하고 열심히 일하며 해내자.",
  },
  {
    english: "Don’t stop until you’re proud.",
    korean: "자랑스러운 사람이 될 때까지 멈추지 마.",
  },
  {
    english: "Dream big and dare to fail.",
    korean: "큰 꿈을 꾸고 실패를 두려워하지 마.",
  },
  {
    english: "You have the power to create change.",
    korean: "넌 변화를 만들 힘이 있어.",
  },
  {
    english: "Keep pushing forward no matter what.",
    korean: "어떤 일이 있어도 계속 나아가자!",
  },
  {
    english: "Your efforts make a difference.",
    korean: "네 노력은 변화를 만들 수 았어!",
  },
  {
    english:
      "Success usually comes to those who are too busy to be looking for it.",
    korean: "성공은 보통 그것을 찾느라 바쁜 사람들에게 와.",
  },
  {
    english: "Your passion is waiting for your courage to catch up.",
    korean: "너의 열정은 너의 용기를 기다리고 있어.",
  },
  {
    english: "It always seems impossible until it's done.",
    korean: "이루어질 때까지는 항상 불가능해 보인다.",
  },
  {
    english: "Your hard work will pay off. Keep going!",
    korean: "너의 노력이 결실을 맺을 거야. 계속 나아가자!",
  },
  {
    english: "Every small step counts towards your big goals.",
    korean: "작은 발걸음 하나하나가 큰 목표를 향해 나아가고 있어.",
  },
  {
    english:
      "The future belongs to those who believe in the beauty of their dreams.",
    korean: "미래는 꿈의 아름다움을 믿는 사람들의 것이야.",
  },
  {
    english:
      "Challenges are what make life interesting; overcoming them is what makes life meaningful.",
    korean: "도전은 삶을 흥미롭게 만들고, 극복하는 것이 삶을 의미 있게 만들어.",
  },
  {
    english:
      "Success is the sum of small efforts, repeated day in and day out.",
    korean: "성공은 매일 반복되는 작은 노력들의 합이야.",
  },
  {
    english:
      "Stay committed to your decisions, but stay flexible in your approach.",
    korean: "결심에 충실하되 접근 방법은 유연하게 유지하기",
  },
  {
    english: "Opportunities don't happen. You create them.",
    korean: "기회는 생기는 것이 아니야. 너가 만드는 거야.",
  },
  {
    english: "Together, we can achieve more.",
    korean: "함께라면 더 많은 것을 이룰 수 있어.",
  },
  {
    english: "Innovation distinguishes between a leader and a follower.",
    korean: "혁신은 리더와 팔로워를 구분 짓는 것이다.",
  },
  {
    english: "A positive mindset brings positive things.",
    korean: "긍정적인 마음가짐을 가져야 긍정적인 결과를 가져온다.",
  },
];

const Loader = () => {
  const [quote, setQuote] = useState({ english: "", korean: "" });

  useEffect(() => {
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <LoaderContainer>
      <PuffLoader color="#007bff" size={60} />
      <Message>
        <EnglishQuote>{quote.english}</EnglishQuote>
        <KoreanTranslation>{quote.korean}</KoreanTranslation>
      </Message>
    </LoaderContainer>
  );
};

export default Loader;