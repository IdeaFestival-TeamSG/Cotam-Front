import { useEffect, useState } from "react";
import { cn, get } from "@/lib";

type RankingInfo = {
  rank: number;
  userId: number;
  displayName: string;
  profileImageUrl: string;
  level: number;
  exp: number;
  tierName: string;
};

type UserProfile = {
  userId: number;
  displayName: string;
  // ... other fields if needed, but we only need userId here for matching
};

const RankingPage = () => {
  const [rankings, setRankings] = useState<RankingInfo[]>([]);
  const [me, setMe] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rankingRes, userRes] = await Promise.all([
          get<{ data: RankingInfo[] }>("/ranking"),
          get<{ data: UserProfile }>("/user/me"),
        ]);
        setRankings(rankingRes.data);
        setMe(userRes.data);
      } catch (error) {
        console.error("Failed to fetch ranking or user info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#32AB7B]"></div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center pl-40">
      <div className="w-[67.387rem] h-[38.125rem] flex flex-col pt-[2.63rem] gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-extrabold text-[#111111]">
            수사 랭킹
          </h1>
          <p className="text-[#717872] text-sm">
            코탐에서 활약 중인 최고의 탐정들을 확인해보세요.
          </p>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#EDF0F0]">
          {/* Header */}
          <div className="grid grid-cols-[80px_1fr_100px_120px_150px] px-8 py-4 bg-[#F8FAFA] border-b border-[#EDF0F0] text-sm font-bold text-[#48514C]">
            <div className="flex justify-center">순위</div>
            <div>탐정</div>
            <div className="flex justify-center">레벨</div>
            <div className="flex justify-center">EXP</div>
            <div className="flex justify-center">티어</div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {rankings.length > 0 ? (
              rankings.map((user) => {
                const isMe = me?.userId === user.userId;
                return (
                  <div
                    key={user.userId}
                    className={cn(
                      "grid grid-cols-[80px_1fr_100px_120px_150px] px-8 py-4 items-center border-b border-[#F0F2F2] transition-colors hover:bg-[#F9FBFA]",
                      isMe && "bg-linear-to-r from-[#F0FAF5] to-white border-l-4 border-l-[#32AB7B]"
                    )}
                  >
                    <div className="flex justify-center font-bold text-[#111111]">
                      {user.rank}
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profileImageUrl}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full border border-[#EDF0F0] object-cover bg-gray-50"
                      />
                      <div className="flex flex-col">
                        <span className={cn(
                          "font-bold text-[#111111]",
                          isMe && "text-[#32AB7B]"
                        )}>
                          {user.displayName}
                          {isMe && <span className="ml-2 text-[10px] bg-[#32AB7B] text-white px-1.5 py-0.5 rounded-full align-middle font-medium">YOU</span>}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center font-medium text-[#48514C]">
                      Lv.{user.level}
                    </div>
                    <div className="flex justify-center font-medium text-[#48514C]">
                      {user.exp.toLocaleString()}
                    </div>
                    <div className="flex justify-center">
                      <span className="px-3 py-1 rounded-lg bg-[#E8F5F1] text-[#2C8563] text-xs font-bold border border-[#D1EBE2]">
                        {user.tierName}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-[#9CA09C] gap-2">
                <p>표시할 순위 정보가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
