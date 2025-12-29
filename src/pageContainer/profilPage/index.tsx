"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib";
import { get } from "@/lib/api/http";
import { getCookie } from "@/utils";


type UserProfile = {
  githubId: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  createdAt: string;
};

const ProfilPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

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
          "w-screen h-screen flex justify-center items-center pl-40 gap-40",
        )}
      >
        <div className="flex flex-col gap-6 items-center">
          <p className="text-2xl font-semibold">로그인</p>
          <button
            type="button"
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
        "w-screen h-screen flex justify-center items-center pl-40 gap-40",
      )}
    >
      {user && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          />
          <h1 className="text-2xl font-bold text-black">{user.displayName}</h1>
          <p className="text-gray-500 text-lg">{user.email}</p>
          <p className="text-gray-400 text-sm">{user.githubId}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilPage;
