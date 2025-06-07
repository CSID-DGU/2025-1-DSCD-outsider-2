"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MatchingResult() {
  const router = useRouter();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const dummyData = {
        gender: "여성",
        height: "150cm-154cm",
        age: "23-26세",
        drink: "주 1-2회",
        smoke: "비흡연자",
        religion: "무교",
        education: "4년제 대학교 재학 및 졸업",
        mbti: "ISTP",
        personality: "소심해 보일 수 있지만 정이 많고 감정이 풍부한 편이에요 배려하려고 노력하는 스타일이에요",
        hobby: "시간 날 때마다 전시회 보러 다녀요 친구랑 수다 떠는 시간이 제일 즐거워요 취미를 통해 저 자신을 더 알아가는 중이에요",
        holiday: "카페에 가서 커피 마시며 책을 읽어요 부모님 댁 들렀다 오는 일도 많아요 유튜브 보면서 하루 종일 뒹굴기도 해요",
        datingStyle: "드라이브하면서 음악 듣는 게 좋더라고요 영화 보고 나서 분위기 좋은 데서 밥 먹는 걸 좋아해요 계획 짜는 건 제가 다 하는 편이에요",
        strength: "작은 것도 잘 기억하려고 해요 감정 표현을 자주 하는 편이에요 함께 있는 시간은 최대한 즐겁게 만들고 싶어요"
      };
      setMatchData(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading || !matchData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium">로딩 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden">
      {/* ----- 상단바 ----- */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <button onClick={() => router.push("/")} className="text-black text-3xl font-bold cursor-pointer">슈끌림</button>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")} className="text-black text-base">사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")} className="text-black text-base">이용 방법</button>
          <button onClick={() => router.push("/mypage")} className="text-black text-base">마이페이지</button>
          <button onClick={() => router.push("/place_recommend")} className="text-black text-base">장소 추천</button>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="w-full flex flex-col items-center justify-center px-4 py-12 gap-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* 왼쪽 박스 */}
          <div className="bg-rose-50 rounded-[50px] w-[600px] h-[850px] p-10 flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full">
              {[
                { label: "성별", value: matchData.gender },
                { label: "키", value: matchData.height },
                { label: "나이", value: matchData.age },
                { label: "음주 빈도", value: matchData.drink },
                { label: "흡연 여부", value: matchData.smoke },
                { label: "종교", value: matchData.religion },
                { label: "학력", value: matchData.education },
                { label: "MBTI", value: matchData.mbti }
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
              { title: "성격", content: matchData.personality, img: "성격.png" },
              { title: "취미", content: matchData.hobby, img: "취미.png" },
              { title: "휴일 루틴", content: matchData.holiday, img: "휴일루틴.png" },
              { title: "데이트 스타일", content: matchData.datingStyle, img: "데이트스타일.png" },
              { title: "장점", content: matchData.strength, img: "장점.png" }
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-md outline outline-1 outline-black/10 bg-white"
              >
                <div className="w-24 h-24 min-w-[96px] min-h-[96px] max-w-[96px] max-h-[96px] bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xl font-medium mb-1">{item.title}</div>
                  <div className="text-base text-black leading-normal break-words">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-6 mt-8">
          <button
          onClick={() => router.push("/match_reject")}
          className="w-60 p-3 rounded-lg border border-black/50"
          >
            거절하기
          </button>
          <button 
          onClick={() => router.push("/match_accept")}
          className="w-60 p-3 bg-red-200 rounded-lg text-white font-bold"
          >
            수락하기
          </button>
        </div>
      </div>
    </div>
  );
}
