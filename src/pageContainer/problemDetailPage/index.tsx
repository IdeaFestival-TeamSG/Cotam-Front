"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GreenStar from "@/assets/GreenStar";
import { DifficultyLevel } from "@/components";
import { cn } from "@/lib";
import { get } from "@/lib/api/http";
import { ProblemResponseType, ProblemStatusType } from "@/types";

const ProblemDetailPage = () => {
  const params = useParams();
  const problemId = params?.id as string;
  const router = useRouter();
  const [problem, setProblem] = useState<ProblemResponseType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        // TODO: 실제 API 엔드포인트로 변경 필요
        // const data = await get<ProblemResponseType>(`/problem/${problemId}`);
        // setProblem(data);

        // 임시 데이터
        setProblem({
          pendingProblemId: problemId,
          title: "두 수의 합 구하기",
          description: "a와 b를 더한 c를 반환하시오",
          status: "PENDING",
        });
        setLoading(false);
      } catch (error) {
        console.error("문제를 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    if (problemId) {
      fetchProblem();
    }
  }, [problemId]);

  const getStatusText = (status?: ProblemStatusType) => {
    switch (status) {
      case "PENDING":
        return "대기중";
      case "SOLVED":
        return "해결";
      case "YET":
        return "미해결";
      default:
        return "알 수 없음";
    }
  };

  const getStatusColor = (status?: ProblemStatusType) => {
    switch (status) {
      case "PENDING":
        return "#DEA343";
      case "SOLVED":
        return "#32AB7B";
      case "YET":
        return "#FF3B55";
      default:
        return "#717872";
    }
  };

  if (loading) {
    return (
      <div className={cn("w-screen h-screen flex justify-center items-center")}>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className={cn("w-screen h-screen flex justify-center items-center")}>
        <div className="flex flex-col gap-4 items-center">
          <p>문제를 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push("/problem")}
            className="px-4 py-2 bg-[#32AB7B] text-white rounded"
          >
            문제 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-screen h-screen flex justify-center items-center pl-50 gap-40",
      )}
    >
      <div className="w-[67.387rem] h-[38.125rem] flex flex-col pt-[2.63rem] gap-8">
        <div className="w-[29.625rem] flex items-center ">
          <div>{"<"}</div>
          <div className="flex gap-[0.7rem]">
            <div className="text-[2.25rem] not-italic font-extrabold leading-[140%] w-[20.625rem]">
              비동기 오류처리
            </div>
            <DifficultyLevel difficult="BASIC" />
          </div>
          <GreenStar />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
