"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelfIntro6() {
  const router = useRouter();
  const [personality, setPersonality] = useState("");
  const [hobby, setHobby] = useState("");

  const isComplete = personality.trim() && hobby.trim();

  const handleNext = () => {
    localStorage.setItem("personality", personality);
    localStorage.setItem("hobby", hobby);
    router.push("/self_intro/self_intro7");
  };

  return (
    <div className="w-full min-h-screen bg-white">
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

      {/* 성격 입력 영역 */}
      <div className="w-[1440px] h-96 px-44 py-14 flex justify-center items-center gap-14 overflow-hidden mx-auto">
        {/* 왼쪽 설명 */}
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="text-red-400 text-4xl font-bold font-['Roboto'] leading-[48px]">
            본인의 성격을 작성해주세요
          </div>
          <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            ex) 처음엔 낯을 조금 가리지만 금방 편해지고, 사람들과 잘 어울리는 스타일이에요. 성실하고 책임감 있게 행동하려고 늘 노력합니다.
          </div>
        </div>

        {/* 오른쪽 입력창 */}
        <div className="flex-1 flex flex-col justify-center items-start gap-4">
          <div className="text-black text-sm font-medium font-['Roboto'] leading-tight">답변</div>
          <textarea
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className="w-[520px] h-72 px-4 py-3 bg-pink-50 text-black border border-black/10 rounded-md resize-none"
            placeholder="성격에 대해 자유롭게 작성해주세요"
          />
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[1440px] h-px mx-auto bg-black/10" />

      {/* 취미 입력 영역 */}
      <div className="w-[1440px] h-[453px] px-44 py-14 flex justify-center items-center gap-14 overflow-hidden mx-auto">
        {/* 왼쪽 설명 */}
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="text-red-400 text-4xl font-bold font-['Roboto'] leading-[48px]">
            본인의 취미를 작성해주세요
          </div>
          <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            ex) 최근엔 요가랑 필라테스를 배우고 있어요. 땀 흘리면서 스트레스<br />푸는 시간이 제일 좋아요. 가끔 전시회 가는 것도 좋아합니다.
          </div>
        </div>

        {/* 오른쪽 입력창 + 버튼 */}
        <div className="flex-1 flex flex-col justify-center items-start gap-4 relative">
          <div className="text-black text-sm font-medium font-['Roboto'] leading-tight">답변</div>
          <textarea
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            className="w-[520px] h-72 px-4 py-3 bg-pink-50 text-black border border-black/10 rounded-md resize-none"
            placeholder="취미에 대해 자유롭게 작성해주세요"
          />
          <button
            onClick={handleNext}
            disabled={!isComplete}
            className={`w-60 p-3 rounded-lg self-start ${isComplete ? "bg-red-200 text-white" : "bg-gray-300 text-gray-500"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
      