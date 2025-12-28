"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { post } from "@/lib";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

const CallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");

      if (!code) {
        setStatus("error");
        setErrorMessage("인증 코드가 없습니다.");
        return;
      }

      try {
        // TODO: 실제 API 엔드포인트로 변경 필요
        // 일반적으로 /auth/callback 또는 /auth/github/callback 같은 엔드포인트
        const response = await post<AuthResponse>("/auth/callback", {
          code,
        });

        // 토큰을 쿠키에 저장
        document.cookie = `accessToken=${response.accessToken}; path=/;`;
        document.cookie = `refreshToken=${response.refreshToken}; path=/;`;

        setStatus("success");

        // 성공 시 프로필 페이지로 리다이렉트
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } catch (error: any) {
        console.error("인증 실패:", error);
        setStatus("error");
        setErrorMessage(
          error?.response?.data?.message || "로그인에 실패했습니다.",
        );
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div
      className={cn(
        "w-screen h-screen flex justify-center items-center pl-50 gap-40",
      )}
    >
      <div className="flex flex-col gap-4 items-center">
        {status === "loading" && (
          <>
            <p className="text-xl">로그인 처리 중...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </>
        )}
        {status === "success" && (
          <>
            <p className="text-xl text-green-600">로그인 성공!</p>
            <p className="text-sm text-gray-600">
              프로필 페이지로 이동합니다...
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-xl text-red-600">로그인 실패</p>
            <p className="text-sm text-gray-600">{errorMessage}</p>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="px-4 py-2 bg-[#32AB7B] text-white rounded mt-4"
            >
              프로필 페이지로 돌아가기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CallbackPage;
