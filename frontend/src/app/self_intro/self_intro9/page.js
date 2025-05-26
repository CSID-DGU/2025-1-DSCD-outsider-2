"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelfIntro9() {
  const router = useRouter();

  const [hobby_other, setHobby_other] = useState("");
  const [want, setWant] = useState("");

  const isComplete = hobby_other.trim() && want.trim();

  const handleNext = () => {
    localStorage.setItem("hobby_other", hobby_other);
    localStorage.setItem("want", want);
    router.push("/self_intro_save");
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

      {/* 이상형 취미 입력 */}
      <div className="w-[1440px] h-96 px-44 py-14 flex justify-center items-center gap-14 overflow-hidden mx-auto">
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="text-red-400 text-4xl font-bold font-['Roboto'] leading-[48px]">
            원하는 이상형의 취미를<br />작성해주세요
          </div>
          <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            ex) 운동이나 산책처럼 활동적인 취미를 가진 사람이면 좋겠어요.<br />
            같이 움직이면서 대화 나누는 걸 좋아하거든요.
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start gap-4">
          <div className="text-black text-sm font-medium font-['Roboto'] leading-tight">답변</div>
          <textarea
            value={hobby_other}
            onChange={(e) => setHobby_other(e.target.value)}
            className="w-[520px] h-72 px-4 py-3 bg-pink-50 text-black border border-black/10 rounded-md resize-none"
            placeholder="원하는 이상형의 취미를 자유롭게 작성해주세요"
          />
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[1440px] h-px mx-auto bg-black/10" />

      {/* 연인에게 바라는 점 입력 */}
      <div className="w-[1440px] h-[453px] px-44 py-14 flex justify-center items-center gap-14 overflow-hidden mx-auto">
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="text-red-400 text-4xl font-bold font-['Roboto'] leading-[48px]">
            연인에게 바라는 점을<br />작성해주세요
          </div>
          <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            ex) 서로를 믿고 응원해주는 관계였으면 해요. 감정 표현 솔직하게<br /> 해주고, 작은 일도 함께 즐겨주는 사람이면 좋겠어요.
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start gap-4">
          <div className="text-black text-sm font-medium font-['Roboto'] leading-tight">답변</div>
          <textarea
            value={want}
            onChange={(e) => setWant(e.target.value)}
            className="w-[520px] h-72 px-4 py-3 bg-pink-50 text-black border border-black/10 rounded-md resize-none"
            placeholder="미래의 연인에게 바라는 점에 대해 자유롭게 작성해주세요"
          />
          <button
            onClick={handleNext}
            disabled={!isComplete}
            className={`w-60 p-3 rounded-lg self-start ${
              isComplete ? "bg-red-200 text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
