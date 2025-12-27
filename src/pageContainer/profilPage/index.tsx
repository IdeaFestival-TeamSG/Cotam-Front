"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib";
import { get } from "@/lib/api/http";
import { getCookie } from "@/utils";

const ProfilPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    setIsLoggedIn(!!(accessToken && refreshToken));
  }, []);

  const handleGitHubLogin = async () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}oauth2/authorization/github`;
    } catch (error) {
      console.error("GitHub 로그인 요청 실패:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        className={cn(
          "w-screen h-screen flex justify-center items-center pl-50 gap-40",
        )}
      >
        <div className="flex flex-col gap-6 items-center">
          <p className="text-2xl font-semibold">로그인</p>
          <button
            onClick={handleGitHubLogin}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            GitHub로 로그인
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
    ></div>
  );
};

export default ProfilPage;
