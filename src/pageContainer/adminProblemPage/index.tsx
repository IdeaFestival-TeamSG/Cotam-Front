"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { get, post } from "@/lib/api/http";
import { Alert } from "@/components";
import { cn } from "@/lib";
import { ProblemDifficultType } from "@/types";
import { DifficultyLevel } from "@/components";

type TestCase = {
  input: string;
  expectedOutput: string;
};

type PendingProblemDetail = {
  id: number;
  title: string;
  description: string;
  difficulty: ProblemDifficultType;
  status: string;
  rejectReason: string | null;
  pendingTestCases: TestCase[];
};

const AdminProblemPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [problem, setProblem] = useState<PendingProblemDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [alert, setAlert] = useState<{
    visible: boolean;
    header: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProblemDetail = async () => {
      setLoading(true);
      try {
        const response = await get<{ data: PendingProblemDetail }>(
          `/pending-problem/${id}`
        );
        setProblem(response.data);
      } catch (error) {
        console.error("상세 정보 조회 실패:", error);
        setAlert({
          visible: true,
          header: "오류",
          message: "문제를 불러오는 중 오류가 발생했습니다.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetail();
  }, [id]);

  const handleApprove = async () => {
    if (!problem) return;
    if (!confirm("이 문제를 승인하시겠습니까?")) return;

    try {
      await post(`/admin/pending-problem/${problem.id}/approve`, {});
      setAlert({
        visible: true,
        header: "성공",
        message: "문제가 승인되었습니다.",
      });
      router.push("/admin");
    } catch (error) {
      console.error("승인 실패:", error);
      setAlert({
        visible: true,
        header: "오류",
        message: "승인 처리 중 오류가 발생했습니다.",
      });
    }
  };

  const handleReject = async () => {
    if (!problem || !rejectReason.trim()) return;

    try {
      await post(`/admin/pending-problem/${problem.id}/reject`, {
        reason: rejectReason,
      });
      setShowRejectModal(false);
      setAlert({
        visible: true,
        header: "성공",
        message: "문제가 반려되었습니다.",
      });
      router.push("/admin");
    } catch (error) {
      console.error("반려 실패:", error);
      setAlert({
        visible: true,
        header: "오류",
        message: "반려 처리 중 오류가 발생했습니다.",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center">
        <p>문제를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center py-20 bg-white">
      <div className="w-[67.387rem] flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="text-gray-500 hover:text-black transition-colors"
              >
                ← 뒤로
              </button>
              <h1 className="text-3xl font-extrabold text-black">
                {problem.title}
              </h1>
            </div>
            <div className="flex gap-2 pl-12">
              <DifficultyLevel difficult={problem.difficulty} />
              <span
                className={cn(
                  "px-3 py-1 text-xs rounded-full font-bold flex justify-center items-center",
                  problem.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : problem.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                )}
              >
                {problem.status}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            {problem.status === "PENDING" && (
              <>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                >
                  반려
                </button>
                <button
                  onClick={handleApprove}
                  className="px-6 py-2 bg-[#CF4646] text-white rounded-lg font-semibold hover:bg-[#A13636] transition-colors"
                >
                  승인
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Left: Description */}
          <div className="flex-1 flex flex-col gap-6">
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold border-l-4 border-[#CF4646] pl-3">
                문제 설명
              </h2>
              <div className="p-6 bg-gray-50 rounded-xl min-h-[200px] whitespace-pre-wrap">
                {problem.description}
              </div>
            </section>

            {problem.rejectReason && (
              <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold border-l-4 border-red-500 pl-3">
                  반려 사유
                </h2>
                <div className="p-6 bg-red-50 text-red-700 rounded-xl">
                  {problem.rejectReason}
                </div>
              </section>
            )}
          </div>

          {/* Right: Test Cases */}
          <div className="w-[20rem] flex flex-col gap-6">
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold border-l-4 border-[#CF4646] pl-3">
                테스트케이스
              </h2>
              <div className="flex flex-col gap-4">
                {problem.pendingTestCases.map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col gap-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase">
                        Input
                      </span>
                      <p className="font-mono text-sm bg-white p-2 rounded border">
                        {tc.input}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase">
                        Output
                      </span>
                      <p className="font-mono text-sm bg-white p-2 rounded border">
                        {tc.expectedOutput}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-8 flex flex-col gap-4 w-[500px]">
            <h3 className="text-xl font-bold text-black">반려 사유 입력</h3>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg outline-none focus:border-red-500 resize-none"
              placeholder="반려 사유를 구체적으로 입력해주세요."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                취소
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                반려 확정
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Component */}
      {alert && (
        <Alert
          visible={alert.visible}
          header={alert.header}
          message={alert.message}
          close={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default AdminProblemPage;
