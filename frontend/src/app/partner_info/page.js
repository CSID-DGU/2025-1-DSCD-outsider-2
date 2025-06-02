"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MatchPartnerInfoPage() {
  const router = useRouter();

  const [partnerInfo, setPartnerInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        // 현재 로그인한 사용자의 ID를 localStorage에서 가져옴
        const myId = localStorage.getItem("user_id");
        if (!myId) throw new Error("사용자 ID가 없습니다.");

        // 매칭 테이블에서 상대방 ID를 가져옴
        const matchRes = await fetch(
          `https://your-backend-url/matching/matched-partner/${myId}`     //현재 로그인한 사용자 본인의 ID
        );
        const matchData = await matchRes.json();
        const opponentId = matchData.opponent_id;

        // 상대방 정보 불러오기
        const userRes = await fetch(
          `https://your-backend-url/matching/userdata/${opponentId}`
        );
        const userData = await userRes.json();

        setPartnerInfo(userData);
        setLoading(false);
      } catch (error) {
        console.error("상대방 정보를 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchPartnerInfo();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden font-['Roboto']">
      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <button onClick={() => router.push("/")} className="text-black text-3xl font-bold cursor-pointer">슈끌림</button>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")} className="text-black text-base">사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")} className="text-black text-base">이용 방법</button>
          <button onClick={() => router.push("/mypage")} className="text-black text-base">마이페이지</button>
          <button onClick={() => router.push("/place_recommend")} className="text-black text-base">장소 추천</button>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="flex flex-col items-center justify-center w-full mt-40 gap-10 text-center px-4">
        <div className="text-red-400 text-4xl font-bold">
          매칭이 완료되었어요!
        </div>

        <div className="text-black text-4xl font-bold leading-[48px] max-w-3xl">
          이제 서로 대화를 시작해보세요 :)
        </div>

        {/* 상대방 정보 */}
        {loading ? (
          <div className="text-lg text-black/60 mt-4">상대 정보를 불러오는 중입니다...</div>
        ) : partnerInfo ? (
          <div className="w-72 text-center text-black text-xl font-bold leading-loose border border-gray-300 rounded-xl p-4">
            카카오톡 ID: {partnerInfo.kakao_id}
          </div>
        ) : (
          <div className="text-red-500 text-lg">상대방 정보를 불러올 수 없습니다.</div>
        )}

        {/* 하단 버튼들 */}
        <div className="inline-flex justify-start items-start gap-3 overflow-hidden mt-8">
          <button
            onClick={() => router.push("/mypage")}
            className="w-60 p-3 rounded-lg border border-black/50"
          >
            <div className="text-black text-base font-medium leading-normal font-['Roboto']">
              마이페이지로 가기
            </div>
          </button>

          <button
            onClick={() => router.push("/place_recommend")}
            className="w-60 p-3 bg-red-200 rounded-lg text-white font-bold"
          >
            <div className="text-white text-xl font-extrabold leading-normal font-['Roboto']">
              장소 추천 바로가기
            </div>
          </button>
        </div>
      </div>

      <div className="w-full h-px mt-24 bg-black/10" />
    </div>
  );
}
