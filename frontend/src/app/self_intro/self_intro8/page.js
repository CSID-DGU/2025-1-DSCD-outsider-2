"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelfIntro8() {
  const router = useRouter();

  const [advantage, setAdvantage] = useState("");
  const [idealpersonality, setIdealpersonality] = useState("");

  // 저장된 값 불러오기
      useEffect(() => {
        const savedAdvantage = localStorage.getItem("advantage") || "";
        const savedIdealpersonality = localStorage.getItem("idealpersonality") || "";
        setAdvantage(savedAdvantage);
        setIdealpersonality(savedIdealpersonality);
      }, []);

  const isComplete = advantage.trim() && personality_other.trim();

  const handleNext = () => {
    localStorage.setItem("advantage", advantage);
    localStorage.setItem("idealpersonality", idealpersonality);
    router.push("/self_intro/self_intro9");
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

      {/* 본인 장점 입력 */}
      <div className="w-[1440px] h-96 px-44 py-14 flex justify-center items-center gap-14 overflow-hidden mx-auto">
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="text-red-400 text-4xl font-bold font-['Roboto'] leading-[48px]">
            연애할 때 본인의 장점을<br />작성해주세요
          </div>
          <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            ex) 말을 예쁘게 하려고 노력하고, 상대방의 입장에서 먼저 생각하는<br />
            편이에요. 주변에서도 편하게 다가올 수 있는 사람이라고 자주 들어요.
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start gap-4">
          <div className="text-black text-sm font-medium font-['Roboto'] leading-tight">답변</div>
          <textarea
            value={advantage}
            onChange={(e) => setAdvantage(e.target.value)}
            className="w-[520px] h-72 px-4 py-3 bg-pink-50 text-black border border-black/10 rounded-md resize-none"
            placeholder="연애할 때 본인의 장점에 대해 자유롭게 작성해주세요"
          />
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[1440px] h-px mx-auto bg-black/10" />

      {/* 이상형 성격 입력 */}
      <div className="w-[1440px] h-[453px] px-44 py-14 flex justify-center items-center gap-14 overflow-hidden mx-auto">
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="text-red-400 text-4xl font-bold font-['Roboto'] leading-[48px]">
            원하는 이상형 성격을<br />작성해주세요
          </div>
          <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            ex) 센스 있고 유쾌한 사람에게 끌려요.<br />
            말투가 따뜻하고 배려심 있는 사람이 좋아요.
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start gap-4">
          <div className="text-black text-sm font-medium font-['Roboto'] leading-tight">답변</div>
          <textarea
            value={idealpersonality}
            onChange={(e) => setIdealpersonality(e.target.value)}
            className="w-[520px] h-72 px-4 py-3 bg-pink-50 text-black border border-black/10 rounded-md resize-none"
            placeholder="이상형의 성격에 대해 자유롭게 작성해주세요"
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
