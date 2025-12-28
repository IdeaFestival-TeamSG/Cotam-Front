"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Arrow from "@/assets/Arrow";
import { cn } from "@/lib";

const PostProblemPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [code, setCode] = useState("");
  const [testCase, setTestCase] = useState("");

  const maxTitleLength = 18;

  return (
    <div
      className={cn(
        "w-screen h-screen flex justify-center items-center pl-40 gap-40",
      )}
    >
      <div className="w-[67.387rem] flex flex-col gap-6 h-[30rem]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <button
              type="button"
              onClick={() => router.push("/problem")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push("/problem");
                }
              }}
              className="cursor-pointer"
            >
              <Arrow />
            </button>
            <h1 className="text-[2.25rem] not-italic font-extrabold leading-[140%]">
              사건 의뢰하기
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="flex gap-6">
          {/* Left Section: 제목, 본문 */}
          <div className="flex-1 flex flex-col gap-6">
            {/* 제목 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-base font-semibold">
                제목
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="사건 제목을 입력해주세요."
                  maxLength={maxTitleLength}
                  className="flex-1 px-4 py-2 border border-solid border-[#B0B5B0] rounded-lg outline-none focus:border-[#32AB7B]"
                />
                <span className="text-sm text-gray-500">
                  {title.length}/{maxTitleLength}
                </span>
              </div>
            </div>

            {/* 본문 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="body" className="text-base font-semibold">
                본문
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="의뢰하고 싶은 문제 또는 의도적으로 잘못된 코드에 대한 설명을 넣어주세요."
                className="w-full min-h-[400px] px-4 py-2 border border-solid border-[#B0B5B0] rounded-lg outline-none focus:border-[#32AB7B] resize-y"
              />
            </div>
          </div>

          {/* Right Section: 관련 코드, 테스트케이스, 유의사항 */}
          <div className="flex-1 flex flex-col gap-6">
            {/* 관련 코드 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-base font-semibold">
                관련 코드(문제에 사용될 잘못된 코드)
              </label>
              <textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="의뢰하고 싶은 문제 또는 의도적으로 잘못된 코드에 대한 설명을 넣어주세요."
                className="w-full min-h-[200px] px-4 py-2 border border-solid border-[#B0B5B0] rounded-lg outline-none focus:border-[#32AB7B] resize-y"
              />
            </div>

            {/* 테스트케이스 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="testCase" className="text-base font-semibold">
                테스트케이스
              </label>
              <textarea
                id="testCase"
                value={testCase}
                onChange={(e) => setTestCase(e.target.value)}
                placeholder="테스트케이스를 입력해주세요."
                className="w-full min-h-[200px] px-4 py-2 border border-solid border-[#B0B5B0] rounded-lg outline-none focus:border-[#32AB7B] resize-y"
              />
            </div>

            {/* 유의사항 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold">유의사항</h2>
              <ul className="flex flex-col gap-2 text-sm text-gray-600 list-disc list-inside">
                <li>
                  의뢰한 사건은 이후 수정할 수 없습니다. 작성 중 페이지를 닫으면
                  저장되지 않습니다. 따라서 개인 메모장, 노션 등에 완벽히 작성
                  후, 복사 붙여넣기 하는 것을 권장드립니다.
                </li>
                <li>
                  의뢰한 사건은 관리진 측에서 검토 후, 이상이 없으면 문제해결
                  페이지에 등록됩니다.
                </li>
                <li>
                  사건의 첫 난이도는 관리자의 평가로 결정되며 이후에는 정답률에
                  따라 유동적으로 변합니다.
                </li>
                <li>
                  의뢰한 사건 및 등록 여부는 '프로필&gt;사건 의뢰 목록'에서
                  확인할 수 있습니다.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="px-6 py-3 bg-[#48514C] text-white rounded-lg font-semibold hover:bg-[#3a413c] transition-colors"
          >
            사건 의뢰하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostProblemPage;
