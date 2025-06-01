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
        gender: "여자",
        height: "170cm-174cm",
        age: "30-32세",
        drink: "월 2-3회",
        smoke: "비흡연자",
        religion: "무교",
        education: "석사",
        mbti: "ISFP",
        personality: "긍정적이고 활발한 성격입니다. 밝고 다른 사람들을 즐겁게 해준다는 평가를 많이 받습니다. 모든 사람들과 두루두루 잘 친해지고 친화력이 좋습니당",
        hobby: "침대에 누워서 넷플릭스 보는 것을 좋아해요. 로맨스 드라마랑 예능 프로그램을 찾아서 보는 것을 좋아합니다",
        holiday: "카페에서 책 읽으며 시간을 보냅니다. 가끔은 운동하기도 해요",
        datingStyle: "활동적이고 실내 스포츠를 좋아해요.",
        strength: "배려심 많고 책임감 있는 편이에요."
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
