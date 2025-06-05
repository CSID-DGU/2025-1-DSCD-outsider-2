"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MatchingResult() {
  const router = useRouter();
  const [matchData, setMatchData] = useState(null);
  const [opponentId, setOpponentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        let userId = Number(localStorage.getItem("user_id"));
        const userGender = localStorage.getItem("gender");

        // user_id가 없다면 임시로 kakao_id로 조회해서 받아오기
        if (!userId || userId === 0) {
          const kakaoId = localStorage.getItem("signup_kakao_id");
          const gender = localStorage.getItem("gender");

          const url = `https://web-production-550e5.up.railway.app/${gender}userdata/by-kakao/${kakaoId}`;
          const response = await fetch(url);
          const userData = await response.json();
          userId = userData.id;

          localStorage.setItem("user_id", String(userId)); // 저장
        }

        const res = await fetch("https://web-production-550e5.up.railway.app/matching/results");

        const allMatches = await res.json();
        console.log("백엔드 응답:", allMatches); //  프론트: API 응답 로깅 추가

        const myMatch = allMatches.find(
          (match) => match.man_identifier === userId || match.woman_identifier === userId
        );
        if (!myMatch) return;

        const opponent =
          myMatch.man_identifier === userId
            ? myMatch.woman_identifier
            : myMatch.man_identifier;
        setOpponentId(opponent);

        const opponentRes = await fetch(
          `https://web-production-550e5.up.railway.app/matching/userdata/${opponent}`
        );
        const opponentData = await opponentRes.json();
        setMatchData(opponentData);
        setLoading(false);
      } catch (error) {
        console.error("매칭 정보 불러오기 실패:", error);
      }
    };

    fetchMatchInfo();
  }, []);

  const handleResponse = async (accepted) => {
    const userIdStr = localStorage.getItem("user_id");
    if (!userIdStr) {
      alert("로그인이 필요합니다.");
      return;
    }
    const userId = Number(userIdStr);
    const gender = localStorage.getItem("gender");

    const body = {
      man_id: gender === "man" ? userId : opponentId,
      woman_id: gender === "woman" ? userId : opponentId,
      man_accept: gender === "man" ? accepted : false,
      woman_accept: gender === "woman" ? accepted : false,
    };

    await fetch("https://web-production-550e5.up.railway.app/matching/acceptance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (accepted) router.push("/match_accept");
    else router.push("/match_reject");
  };

  if (loading || !matchData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium">로딩 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden">
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

      {/* 메인 콘텐츠 */}
      <div className="w-full flex flex-col items-center justify-center px-4 py-12 gap-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* 왼쪽 박스 */}
          <div className="bg-rose-50 rounded-[50px] w-[600px] h-[850px] p-10 flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full">
              {[
                { label: "성별", value: matchData.gender },
                { label: "키", value: matchData.height },
                { label: "나이", value: matchData.age_group },
                { label: "음주 빈도", value: matchData.alcohol },
                { label: "흡연 여부", value: matchData.smoking },
                { label: "종교", value: matchData.religion },
                { label: "학력", value: matchData.education },
                { label: "MBTI", value: `${matchData.mbti_energy}${matchData.mbti_sensing}${matchData.mbti_thinking}${matchData.mbti_judging}` },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-sm font-medium mb-1">{item.label}</div>
                  <div className="w-full h-9 px-3 bg-white rounded-md outline outline-1 outline-black/10 flex items-center text-black/60 text-sm">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 박스 */}
          <div className="bg-rose-50 rounded-[50px] w-[600px] h-[850px] p-10 flex flex-col gap-6 overflow-y-auto scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent">
            {[
              { title: "성격", content: matchData.my_character, img: "성격.png" },
              { title: "취미", content: matchData.hobby, img: "취미.png" },
              { title: "휴일 루틴", content: matchData.holiday, img: "휴일루틴.png" },
              { title: "데이트 스타일", content: matchData.dating_style, img: "데이트스타일.png" },
              { title: "장점", content: matchData.strength_in_relationship, img: "장점.png" },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4 rounded-md outline outline-1 outline-black/10 bg-white">
                <div className="w-24 h-24 min-w-[96px] bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-xl font-medium mb-1">{item.title}</div>
                  <div className="text-base text-black leading-normal break-words">{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-6 mt-8">
          <button onClick={() => handleResponse(false)} className="w-60 p-3 rounded-lg border border-black/50">거절하기</button>
          <button onClick={() => handleResponse(true)} className="w-60 p-3 bg-red-200 rounded-lg text-white font-bold">수락하기</button>
        </div>
      </div>
    </div>
  );
}
