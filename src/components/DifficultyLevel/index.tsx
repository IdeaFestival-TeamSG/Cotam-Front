import type { ProblemDifficultType } from "@/types";

export type DifficultLevelProps = {
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
    <div className="px-3 py-1 border border-solid border-black rounded-3xl flex items-center justify-center h-[1.875rem]">
      {getDifficultText(difficult)}
    </div>
  );
};

export default DifficultLevel;
