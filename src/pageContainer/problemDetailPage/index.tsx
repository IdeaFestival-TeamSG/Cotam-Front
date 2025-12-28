"use client";

import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-c";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";

import Editor, { DiffEditor } from "@monaco-editor/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Arrow from "@/assets/Arrow";
import GreenStar from "@/assets/GreenStar";
import { DifficultyLevel } from "@/components";
import { cn } from "@/lib";
import type { ProblemResponseType, ProblemStatusType } from "@/types";
import { get } from "@/lib";

type ProblemDetail = {
          problemId: number;
          title: string;
          description: string;
          difficulty: string;
          testCases: {
            input: string;
            expectedOutput: string;
          }[];
        };

const ProblemDetailPage = () => {
  const params = useParams();
  const problemId = params?.id;
  const router = useRouter();
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDiffModal, setShowDiffModal] = useState(false);

  const userName = "이상혁";

  const tags = ["정답률 62.7%", "보통난이도", "즐겨찾기"];

  const description =
    "정수 배열과 목표값이 주어집니다.\n배열에서 서로 다른 두 수를 선택해 합이 목표값이 되는지 찾습니다.\n각 원소는 한 번만 사용할 수 있습니다.\n조건을 만족하는 두 수의 인덱스 또는 존재 여부를 반환합니다.\n효율적인 탐색을 위해 해시맵 등의 자료구조를 활용할 수 있습니다.\n효율적인 탐색을 위해 해시맵 등의 자료구조를 활용할 수 있습니다.\n효율적인 탐색을 위해 해시맵 등의 자료구조를 활용할 수 있습니다.\n효율적인 탐색을 위해 해시맵 등의 자료구조를 활용할 수 있습니다.\n효율적인 탐색을 위해 해시맵 등의 자료구조를 활용할 수 있습니다.\n효율적인 탐색을 위해 해시맵 등의 자료구조를 활용할 수 있습니다.\n효율적인 탐색을 위해 해시맵 등의 자료구조를 활용할 수 있습니다.\n효율적인 탐색을 위해 해시맵 등의 자료구조를 활용할 수 있습니다.";

  const code1 = `
    /**
     * 두 수의 합을 구하는 함수
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    function sum(a, b) {
      // 타입 체크
      if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("매개변수는 숫자여야 합니다.");
      }
    
      return a + b;
    }
    
    /**
     * 배열의 모든 요소를 더하는 함수
     * @param {number[]} numbers
     * @returns {number}
     */
    function sumArray(numbers) {
      if (!Array.isArray(numbers)) {
        throw new Error("배열을 전달해야 합니다.");
      }
    
      return numbers.reduce((acc, cur) => acc + cur, 0);
    }
    
    // 단일 값 계산
    const result = sum(3, 5);
    console.log("두 수의 합:", result);
    
    // 배열 합 계산
    const values = [1, 2, 3, 4, 5];
    const total = sumArray(values);
    console.log("배열의 합:", total);
    
    // 예외 처리 테스트
    try {
      sum("3", 5);
    } catch (error) {
      console.error("에러 발생:", error.message);
    }
    `;

  const code2 = `
function sum(a, b) {
  return a + b;
}

const result = sum(3, 5);
console.log(result);
`;

  const [writeCode, setWriteCode] = useState<string>(code2);

  const language: "c" | "javascript" | "python" = "javascript";

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        // TODO: 실제 API 엔드포인트로 변경 필요

        const response = await get<{ data:  ProblemDetail }>(`/problem/${problemId}`);
        setProblem(response.data);

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

  const highlightedCode = Prism.highlight(
    code2,
    Prism.languages[language],
    language,
  );

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
            type="button"
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
        "w-screen h-screen flex justify-center items-center pl-40 gap-40",
      )}
    >
      <div className="w-[67.387rem] h-[38.125rem] flex pt-[2.63rem] gap-8">
        <div className="flex flex-col gap-2 w-[29.625rem]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-[0.31rem] ">
              <div className=" flex items-center justify-between">
                <div
                  onClick={() => router.push("/problem")}
                  className="cursor-pointer"
                >
                  <Arrow />
                </div>
                <div className="flex gap-[0.7rem]">
                  <div className="text-[2.25rem] not-italic font-extrabold leading-[140%] w-[20rem]">
                    비동기 오류처리
                  </div>
                  <div className="flex items-center justify-center">
                    <DifficultyLevel difficult="BASIC" />
                  </div>
                </div>
                <GreenStar />
              </div>

              <div className="flex items-center gap-[0.38rem]">
                <img
                  alt="줄제자 로고"
                  className="w-6 h-6 border border-solid rounded-3xl border-black"
                />
                <p className="text-sm not-italic font-normal text-[#48514C]">
                  {userName}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {tags.map((x, index) => {
                return (
                  <p
                    key={`${x} + ${index}`}
                    className="text-sm not-italic font-normal leading-[140%] text-[#9CA09C]"
                  >
                    #{x}
                  </p>
                );
              })}
            </div>

            <div className="bg-[#9CA09C] h-0.5" />
          </div>

          <div>
            <p
              style={{ whiteSpace: "pre-line" }}
              className="mt-6 max-h-[8rem] overflow-y-auto overflow-x-auto p-4"
            >
              {description}
            </p>
            <pre className="mt-6 max-h-[17.44rem] overflow-y-auto overflow-x-auto rounded-lg text-sm bg-[#0f172a] p-4 whitespace-pre">
              <code
                className={`language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="border rounded-2xl overflow-hidden">
            <div className="px-4 py-2 bg-[#1e1e1e] border-b border-[#3e3e3e] ">
              <p className="text-sm text-gray-400">JavaScript</p>
            </div>
            <Editor
              width="37.762rem"
              height="30rem"
              language="javascript"
              value={writeCode}
              onChange={(value) => setWriteCode(value!)}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                tabSize: 2,
                insertSpaces: true,
                wordWrap: "on",
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: false,
              }}
              onMount={(editor, monaco) => {
                editor.onKeyDown((e) => {
                  if (
                    (e.ctrlKey || e.metaKey) &&
                    e.keyCode === monaco.KeyCode.KeyS
                  ) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                });
              }}
            />
          </div>

          <div className="flex gap-1 justify-end">
            <button
              type="button"
              onClick={() => setShowDiffModal(true)}
              className="p-[8px] bg-white text-black cursor-pointer rounded-2xl border border-solid border-black text-base not-italic font-semibold leading-[100%] h-[2.25rem]"
            >
              비교
            </button>
            <button
              type="button"
              className="p-[8px] bg-black text-white cursor-pointer rounded-2xl text-base not-italic font-semibold leading-[100%] h-[2.25rem]"
            >
              답변 제출
            </button>
          </div>
        </div>
      </div>

      {showDiffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-[60vw] h-[50vh] bg-[#1e1e1e] rounded-lg overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#3e3e3e]">
              <h2 className="text-lg font-semibold text-white">코드 비교</h2>
              <button
                type="button"
                onClick={() => setShowDiffModal(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1">
              <DiffEditor
                width="100%"
                height="100%"
                language="javascript"
                original={code2}
                modified={writeCode.trim()}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  readOnly: true,
                  renderSideBySide: true,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDetailPage;
