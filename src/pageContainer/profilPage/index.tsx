"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib";
import { get } from "@/lib/api/http";
import { getCookie, deleteCookie } from "@/utils";
import { motion } from "framer-motion";

type UserProfile = {
  githubId: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  createdAt: string;
  tier: string;
  tierDisplayName: string;
  exp: number;
  level: number;
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

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    window.location.reload();
  };

  if (!isLoggedIn) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center bg-gray-50/50">
        <div className="flex flex-col gap-8 items-center bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
            <p className="text-gray-500">서비스를 이용하려면 로그인이 필요합니다.</p>
          </div>
          <button
            type="button"
            onClick={handleGitHubLogin}
            className="flex items-center gap-3 px-8 py-4 bg-[#24292F] text-white rounded-xl hover:bg-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-lg shadow-lg shadow-gray-200"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub로 로그인
          </button>
        </div>
      </div>
    );
  }

  const maxExp = user ? user.level * 100 : 0;
  const expPercentage = user ? Math.min((user.exp / maxExp) * 100, 100) : 0;

  return (
    <div className="w-full min-h-screen py-20 px-4 bg-gray-50 flex justify-center items-start">
      {user ? (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {/* Cover / Profile Header Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-blue-50 to-indigo-50 opacity-50 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-32 h-32 rounded-full p-1 bg-white shadow-lg ring-1 ring-gray-100">
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start z-10 gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{user.displayName}</h1>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                  {user.githubId}
                </span>
              </div>
              <p className="text-gray-500 font-medium">{user.email}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm">
                  <span>Lv. {user.level}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl font-bold text-sm">
                  <span>{user.tierDisplayName}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="relative z-10 px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm font-semibold whitespace-nowrap"
            >
              로그아웃
            </button>
          </div>

          {/* Stats & Progress Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-gray-900">경험치</h2>
                <p className="text-sm text-gray-500">다음 레벨까지 열심히 달려보세요!</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-600">{user.exp}</span>
                <span className="text-gray-400 font-medium"> / {maxExp} XP</span>
              </div>
            </div>

            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${expPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"
              />
            </div>
            
            <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>현재 레벨 {user.level}</span>
              <span>다음 레벨 {user.level + 1}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-center bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
          <p className="text-2xl font-bold text-gray-900">유저를 찾을 수 없습니다.</p>
          <button
            type="button"
            onClick={handleGitHubLogin}
            className="px-8 py-3.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium shadow-lg"
          >
            GitHub로 다시 로그인
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilPage;
