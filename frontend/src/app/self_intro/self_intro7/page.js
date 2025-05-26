"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelfIntro7() {
  const router = useRouter();

  const [weekend, setWeekend] = useState("");
  const [datestyle, setDatestyle] = useState("");

  // 저장된 값 불러오기
    useEffect(() => {
      const savedWeekend = localStorage.getItem("weekend") || "";
      const savedDatestyle = localStorage.getItem("datestyle") || "";
      setWeekend(savedWeekend);
      setDatestyle(savedDatestyle);
    }, []);

  const isComplete = weekend.trim() && datestyle.trim();

  const handleNext = () => {
    localStorage.setItem("weekend", weekend);
    localStorage.setItem("datestyle", datestyle);
    router.push("/self_intro/self_intro8");
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
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

      {/* 휴일 루틴 입력 */}
      <div className="w-[1440px] h-96 px-44 py-14 flex justify-center items-center gap-14 overflow-hidden mx-auto">
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="text-red-400 text-4xl font-bold font-['Roboto'] leading-[48px]">
            본인의 휴일 루틴을<br />작성해주세요
          </div>
          <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            ex) 아침엔 조금 늦잠 자고, 브런치 카페에서 책 읽는 걸 좋아해요.<br />
            오후엔 산책하거나 가까운 곳으로 드라이브도 종종 가요.
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start gap-4">
          <div className="text-black text-sm font-medium font-['Roboto'] leading-tight">답변</div>
          <textarea
            value={weekend}
            onChange={(e) => setWeekend(e.target.value)}
            className="w-[520px] h-72 px-4 py-3 bg-pink-50 text-black border border-black/10 rounded-md resize-none"
            placeholder="휴일 루틴에 대해 자유롭게 작성해주세요"
          />
        </div>
      </div>

      <div className="w-[1440px] h-px mx-auto bg-black/10" />

      {/* 데이트 스타일 입력 */}
      <div className="w-[1440px] h-[453px] px-44 py-14 flex justify-center items-center gap-14 overflow-hidden mx-auto">
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="text-red-400 text-4xl font-bold font-['Roboto'] leading-[48px]">
            본인의 데이트 스타일을<br />작성해주세요
          </div>
          <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            ex) 소소한 일상 공유하면서 대화 많이 나누는 걸 좋아해요.<br />꼭 특별하지 않아도 서로 즐거우면 그게 좋은 데이트라고 생각해요.
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start gap-4">
          <div className="text-black text-sm font-medium font-['Roboto'] leading-tight">답변</div>
          <textarea
            value={datestyle}
            onChange={(e) => setDatestyle(e.target.value)}
            className="w-[520px] h-72 px-4 py-3 bg-pink-50 text-black border border-black/10 rounded-md resize-none"
            placeholder="데이트 스타일에 대해 자유롭게 작성해주세요"
          />
          <button
            onClick={handleNext}
            disabled={!isComplete}
            className={`w-60 p-3 rounded-lg self-start ${
              isComplete ? "bg-red-200 text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
