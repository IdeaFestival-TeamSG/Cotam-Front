"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProblemComponent, ProblemFilterIcon } from "@/components";
import { cn } from "@/lib";
import { ProblemComponentType, ProblemResponseType } from "@/types";

const ProblemPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const nickName = "오리너구리";

  const router = useRouter();

  const filterArray = ["최신", "인기", "즐겨찾기"];
  const filterArrayDifficult = ["기초", "쉬움", "보통", "어려움", "탐정(극한)"];

  const exampleProblem: ProblemResponseType[] = [
    {
      pendingProblemId: 42,
      title: "두 수의 합",
      description: "a와 b를 더한 c를 반환하시오",
      status: "PENDING",
    },
    {
      pendingProblemId: 42,
      title: "두 수의 합 구하기",
      description: "a와 b를 더한 c를 반환하시오",
      status: "PENDING",
    },
    {
      pendingProblemId: 42,
      title: "두 수의 합 구하기",
      description: "a와 b를 더한 c를 반환하시오",
      status: "SOLVED",
    },
    {
      pendingProblemId: 42,
      title: "두 수의 합 구하기",
      description: "a와 b를 더한 c를 반환하시오",
      status: "SOLVED",
    },
    {
      pendingProblemId: 42,
      title: "두 수의 합 구하기",
      description: "a와 b를 더한 c를 반환하시오",
      status: "YET",
    },
  ];

  return (
    <div
      className={cn(
        "w-screen h-screen flex justify-center items-center pl-50 gap-40",
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
          <div className="flex flex-col gap-1">
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
                  key={x}
                  text={x}
                  isChecked={selectedFilter.includes(x)}
                  setChecked={setSelectedFilter}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {exampleProblem.map((problem, index) => {
                return (
                  <ProblemComponent
                    title={problem.title}
                    description={problem.description!}
                    status={problem.status!}
                    place={"profil"}
                    pendingProblemId={problem.pendingProblemId}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              {exampleProblem.map((problem, index) => {
                return (
                  <ProblemComponent
                    title={problem.title}
                    description={problem.description!}
                    status={problem.status!}
                    place={"profil"}
                    pendingProblemId={problem.pendingProblemId}
                    key={index}
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
