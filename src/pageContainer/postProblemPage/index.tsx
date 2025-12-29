"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Arrow from "@/assets/Arrow";
import { cn } from "@/lib";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { post } from "@/lib/api/http";
import type { ProblemDifficultType } from "@/types";

type TestCase = {
  input: string;
  expectedOutput: string;
};

type PostProblemForm = {
  title: string;
  description: string;
  difficulty: ProblemDifficultType;
  testCases: TestCase[];
};

const filterArrayDifficult: { title: string; difficult: ProblemDifficultType }[] = [
  { title: "기초", difficult: "BASIC" },
  { title: "쉬움", difficult: "EASY" },
  { title: "보통", difficult: "NORMAL" },
  { title: "어려움", difficult: "HARD" },
  { title: "탐정(극한)", difficult: "DETECTIVE" },
];

const PostProblemPage = () => {
  const router = useRouter();
  const maxTitleLength = 18;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostProblemForm>({
    defaultValues: {
      title: "",
      description: "",
      difficulty: "BASIC",
      testCases: [{ input: "", expectedOutput: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testCases",
  });

  const onSubmit: SubmitHandler<PostProblemForm> = async (data) => {
    try {
      await post("/pending-problem", data);
      alert("사건 의뢰가 성공적으로 접수되었습니다.");
      router.push("/problem");
    } catch (error) {
      console.error("사건 의뢰 실패:", error);
      alert("사건 의뢰 중 오류가 발생했습니다.");
    }
  };

  const selectedDifficulty = watch("difficulty");
  const titleValue = watch("title");

  return (
    <div
      className={cn(
        "w-screen h-screen flex justify-center items-center pl-40 gap-40",
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[67.387rem] flex flex-col gap-6 h-[30rem]"
      >
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
        <div className="flex gap-6 h-full overflow-y-auto pr-2 pb-4">
          {/* Left Section: 제목, 본문, 난이도 */}
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
                  maxLength={maxTitleLength}
                  placeholder="사건 제목을 입력해주세요."
                  className="flex-1 px-4 py-2 border border-solid border-[#B0B5B0] rounded-lg outline-none focus:border-[#32AB7B]"
                  {...register("title", { required: true })}
                />
                <span className="text-sm text-gray-500">
                  {titleValue?.length || 0}/{maxTitleLength}
                </span>
              </div>
            </div>

            {/* 난이도 */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">난이도</label>
              <div className="flex gap-2">
                {filterArrayDifficult.map((item) => (
                  <button
                    key={item.difficult}
                    type="button"
                    onClick={() => setValue("difficulty", item.difficult)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                      selectedDifficulty === item.difficult
                        ? "bg-[#32AB7B] text-white border-[#32AB7B]"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* 본문 */}
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="description" className="text-base font-semibold">
                본문
              </label>
              <textarea
                id="description"
                placeholder="의뢰하고 싶은 문제 또는 의도적으로 잘못된 코드에 대한 설명을 넣어주세요."
                className="w-full h-full min-h-[200px] px-4 py-2 border border-solid border-[#B0B5B0] rounded-lg outline-none focus:border-[#32AB7B] resize-none"
                {...register("description", { required: true })}
              />
            </div>
          </div>

          {/* Right Section: 테스트케이스, 유의사항 */}
          <div className="flex-1 flex flex-col gap-6">
            {/* 테스트케이스 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-base font-semibold">테스트케이스</label>
                <button
                  type="button"
                  onClick={() => append({ input: "", expectedOutput: "" })}
                  className="text-sm text-[#32AB7B] font-semibold hover:underline"
                >
                  + 케이스 추가
                </button>
              </div>
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start p-3 border rounded-lg bg-gray-50 relative">
                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        placeholder="입력값 (예: 1 2)"
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-[#32AB7B]"
                        {...register(`testCases.${index}.input` as const, { required: true })}
                      />
                      <input
                        placeholder="기대값 (예: 3)"
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-[#32AB7B]"
                        {...register(`testCases.${index}.expectedOutput` as const, { required: true })}
                      />
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 유의사항 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold">유의사항</h2>
              <ul className="flex flex-col gap-2 text-sm text-gray-600 list-disc list-inside bg-gray-50 p-4 rounded-lg">
                <li>
                  의뢰한 사건은 이후 수정할 수 없습니다. 작성 중 페이지를 닫으면
                  저장되지 않습니다.
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
            
             {/* Submit Button */}
            <div className="flex justify-end mt-auto">
              <button
                type="submit"
                className="px-6 py-3 bg-[#48514C] text-white rounded-lg font-semibold hover:bg-[#3a413c] transition-colors w-full"
              >
                사건 의뢰하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostProblemPage;
