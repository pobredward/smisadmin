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
    english: "Let's get started.",
    korean: "시작해 봅시다.",
  },
  {
    english: "Can we go over the agenda?",
    korean: "의제에 대해 논의할 수 있을까요?",
  },
  {
    english: "Let's table this topic for now.",
    korean: "이 주제는 일단 보류합시다.",
  },
  {
    english: "Could you clarify your point?",
    korean: "당신의 요점을 명확히 해줄 수 있나요?",
  },
  {
    english: "Let's circle back to that later.",
    korean: "그것에 대해서는 나중에 다시 이야기합시다.",
  },
  {
    english: "We need to stay on track.",
    korean: "우리는 주제에 집중해야 합니다.",
  },
  {
    english: "Could you elaborate on that?",
    korean: "그것에 대해 좀 더 설명해 줄 수 있나요?",
  },
  {
    english: "What's the timeline for this project?",
    korean: "이 프로젝트의 일정은 어떻게 되나요?",
  },
  {
    english: "Let's take a short break.",
    korean: "잠시 휴식을 취합시다.",
  },
  {
    english: "Can we discuss this offline?",
    korean: "이것에 대해 비공식적으로 논의할 수 있을까요?",
  },
  {
    english: "That's a great point.",
    korean: "좋은 지적입니다.",
  },
  {
    english: "Let's move on to the next item.",
    korean: "다음 항목으로 넘어갑시다.",
  },
  {
    english: "Can we get an update on that?",
    korean: "그것에 대한 업데이트를 받을 수 있을까요?",
  },
  {
    english: "Let's keep this meeting brief.",
    korean: "이 회의를 간단히 합시다.",
  },
  {
    english: "Could you summarize that for us?",
    korean: "그것을 요약해 줄 수 있나요?",
  },
  {
    english: "Who will be responsible for this task?",
    korean: "이 과제는 누가 담당할 것인가요?",
  },
  {
    english: "Let's review the key points.",
    korean: "주요 사항을 검토합시다.",
  },
  {
    english: "Any other questions or comments?",
    korean: "다른 질문이나 의견이 있나요?",
  },
  {
    english: "Let's set a deadline for this.",
    korean: "이것의 기한을 정합시다.",
  },
  {
    english: "Thank you for your input.",
    korean: "의견을 주셔서 감사합니다.",
  },
  {
    english: "Can we schedule a follow-up meeting?",
    korean: "후속 회의를 일정 잡을 수 있을까요?",
  },
  {
    english: "Let's wrap this up.",
    korean: "이제 마무리합시다.",
  },
  {
    english: "We need to reach a consensus.",
    korean: "우리는 합의에 도달해야 합니다.",
  },
  {
    english: "That's outside the scope of this meeting.",
    korean: "그것은 이 회의의 범위를 벗어납니다.",
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
