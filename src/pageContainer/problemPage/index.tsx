"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Plus from "@/assets/Plus";
import { ProblemComponent, ProblemFilterIcon } from "@/components";
import { cn, get } from "@/lib";
import { ProblemComponentType, ProblemDifficultType, type ProblemResponseType } from "@/types"



const ProblemPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [problems, setProblems] = useState<ProblemResponseType[]>([]);

  const nickName = "오리너구리";

  const router = useRouter();

  const filterArray = ["최신", "인기", "즐겨찾기"];
  const filterArrayDifficult: {title: string; difficult: ProblemDifficultType}[] = [
  { title: "기초", difficult: "BASIC" },
  { title: "쉬움", difficult: "EASY" },
  { title: "보통", difficult: "NORMAL" },
  { title: "어려움", difficult: "HARD" },
  { title: "탐정(극한)", difficult: "DETECTIVE" },
];

  const getProblems = async () => {
    const response = await get<{
      data: {
        content: ProblemResponseType[];
      };
    }>("/problem");
    console.log(response.data.content);
    setProblems(response.data.content);
  };

  useEffect(() => {
    getProblems();
  }, []);

  return (
    <div
      className={cn(
        "w-screen h-screen flex justify-center items-center pl-40 gap-40",
      )}
    >
      <div className="w-[67.387rem] h-[38.125rem] flex flex-col pt-[2.63rem] gap-8">
        <h1 className={cn("text-[36px] font-extrabold leading-[140%] flex")}>
          <button
            className={cn(
              "text-[#32AB7B] cursor-pointer bg-transparent border-none p-0",
            )}
            onClick={() => router.push("/profile")}
            type="button"
          >
            {nickName}
          </button>
          님, 수사를 시작해봐요!
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>
              <div className="flex gap-1">
                {filterArray.map((x) => (
                  <ProblemFilterIcon
                    key={x}
                    text={x}
                    isChecked={selectedFilter.includes(x)}
                    setChecked={setSelectedFilter}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                {filterArrayDifficult.map((x) => (
                  <ProblemFilterIcon
                    key={x.title}
                    text={x.title}
                    isChecked={selectedFilter.includes(x.title)}
                    setChecked={setSelectedFilter}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              className="flex items-end cursor-pointer"
              onClick={() => router.push("/postProblem")}
            >
              <Plus />
            </button>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {problems.slice(0, 6).map((problem, index) => {
                return (
                  <ProblemComponent
                    key={problem.problemId}
                    problemId={problem.problemId}
                    title={problem.title}
                    description={`${problem.submitCount > 0 ? ((problem.solveCount / problem.submitCount) * 100).toFixed(2) : "0.00"}%`}
                    difficulty={problem.difficulty}
                    place={"problem"}
                  />
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              {problems.slice(6, 10).map((problem, index) => {
                return (
                  <ProblemComponent
                    key={problem.problemId}
                    problemId={problem.problemId}
                    title={problem.title}
                    description={`${problem.submitCount > 0 ? ((problem.solveCount / problem.submitCount) * 100).toFixed(2) : "0.00"}%`}
                    difficulty={problem.difficulty}
                    place={"problem"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
