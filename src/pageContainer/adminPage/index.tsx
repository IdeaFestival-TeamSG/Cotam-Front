"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get } from "@/lib/api/http";
import { cn } from "@/lib";

type PendingProblemSummary = {
  pendingProblemId: number;
  title: string;
  status: string;
};

type PendingProblemResponse = {
  content: PendingProblemSummary[];
  totalElements: number;
  totalPages: number;
};

const AdminPage = () => {
  const router = useRouter();
  const [problems, setProblems] = useState<PendingProblemSummary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingProblems = async () => {
      setLoading(true);
      try {
        const response = await get<{ data: PendingProblemResponse }>(
          `/admin/pending-problem?page=${currentPage}`
        );
        setProblems(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("출제 요청 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingProblems();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center py-20 bg-white">
      <div className="w-[67.387rem] flex flex-col gap-8">
        <h1 className="text-[2.25rem] font-extrabold text-black">
          관리자 페이지 - 출제 요청 목록
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {problems.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  대기 중인 출제 요청이 없습니다.
                </p>
              ) : (
                problems.map((problem) => (
                  <div
                    key={problem.pendingProblemId}
                    onClick={() =>
                      router.push(
                        `/admin/problem?id=${problem.pendingProblemId}`
                      )
                    }
                    className="flex items-center justify-between p-6 border border-gray-200 rounded-xl cursor-pointer hover:border-[#CF4646] hover:shadow-md transition-all bg-white"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-400 font-medium">
                        ID: {problem.pendingProblemId}
                      </span>
                      <h3 className="text-xl font-bold text-black">
                        {problem.title}
                      </h3>
                    </div>
                    <div
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-bold",
                        problem.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : problem.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      )}
                    >
                      {problem.status}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  이전
                </button>
                <span className="text-sm font-medium">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
