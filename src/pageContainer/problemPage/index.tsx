"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Plus from "@/assets/Plus";
import { ProblemComponent, ProblemFilterIcon } from "@/components";
import { cn, get } from "@/lib";
import { ProblemComponentType, ProblemDifficultType, type ProblemResponseType } from "@/types"
import { getCookie } from "@/utils";




type UserProfile = {
  githubId: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  createdAt: string;
};

const ProblemPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [problems, setProblems] = useState<ProblemResponseType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    setIsLoggedIn(!!(accessToken && refreshToken));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUser = async () => {
        try {
          const response = await get<{ data: UserProfile }>("/user/me");
          setUser(response.data);
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
        }
      };
      fetchUser();
    }
  }, [isLoggedIn]);

  const nickName = user ? user.displayName : "탐정";

  const router = useRouter();

  const filterArray = ["최신", "인기", "즐겨찾기"];
  const filterArrayDifficult: {
    title: string;
    difficult: ProblemDifficultType;
  }[] = [
    { title: "기초", difficult: "BASIC" },
    { title: "쉬움", difficult: "EASY" },
    { title: "보통", difficult: "MEDIUM" },
    { title: "어려움", difficult: "HARD" },
    { title: "탐정(극한)", difficult: "EXPERT" },
  ];

  const getProblems = async (page: number) => {
    try {
      const response = await get<{
        data: {
          content: ProblemResponseType[];
          totalPages: number;
        };
      }>(`/problem?page=${page}&size=10`);
      console.log(response.data.content);
      setProblems(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("문제 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    getProblems(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className={cn(
        "w-screen h-screen flex justify-center items-center pl-40 gap-40"
      )}
    >
      <div className="w-[67.387rem] h-[38.125rem] flex flex-col pt-[2.63rem] gap-8">
        <h1 className={cn("text-[36px] font-extrabold leading-[140%] flex")}>
          <button
            className={cn(
              "text-[#32AB7B] cursor-pointer bg-transparent border-none p-0"
            )}
            onClick={() => router.push("/profile")}
            type="button"
          >
            {nickName}
          </button>
          님, 수사를 시작해봐요!
        </h1>
        <div className="flex flex-col gap-4 h-full">
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
          
          <div className="flex gap-3 flex-1">
            <div className="flex flex-col gap-3 flex-1">
              {problems.slice(0, 5).map((problem) => (
                <ProblemComponent
                  key={problem.problemId}
                  problemId={problem.problemId}
                  title={problem.title}
                  description={`${
                    problem.submitCount > 0
                      ? ((problem.solveCount / problem.submitCount) * 100).toFixed(2)
                      : "0.00"
                  }%`}
                  difficulty={problem.difficulty}
                  solved={problem.solved}
                  place={"problem"}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {problems.slice(5, 10).map((problem) => (
                <ProblemComponent
                  key={problem.problemId}
                  problemId={problem.problemId}
                  title={problem.title}
                  description={`${
                    problem.submitCount > 0
                      ? ((problem.solveCount / problem.submitCount) * 100).toFixed(2)
                      : "0.00"
                  }%`}
                  difficulty={problem.difficulty}
                  solved={problem.solved}
                  place={"problem"}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 pb-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 text-gray-500 disabled:text-gray-300 hover:text-black transition-colors"
                type="button"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    "w-8 h-8 rounded-full flex justify-center items-center text-sm font-medium transition-colors",
                    currentPage === page
                      ? "bg-[#32AB7B] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                  type="button"
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 text-gray-500 disabled:text-gray-300 hover:text-black transition-colors"
                type="button"
              >
                &gt;
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
