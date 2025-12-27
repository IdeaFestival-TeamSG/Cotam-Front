import { ProblemDifficultType } from "@/types";

type DifficultLevelProps = {
  difficult: ProblemDifficultType;
};

const DifficultLevel = ({ difficult }: DifficultLevelProps) => {
  const getDifficultText = (difficult: ProblemDifficultType) => {
    switch (difficult) {
      case "BASIC":
        return "기초";
      case "EASY":
        return "쉬움";
      case "NORMAL":
        return "보통";
      case "HARD":
        return "어려움";
      case "DETECTIVE":
        return "탐정(극한)";
      default:
        return difficult;
    }
  };
  return (
    <div className="px-3 py-2 border border-solid border-black rounded-4xl flex align-center justify-center">
      {getDifficultText(difficult)}
    </div>
  );
};

export default DifficultLevel;
