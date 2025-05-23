"use client";

import { useRouter } from "next/navigation";

export default function HowToUsePage() {
  const router = useRouter();

  const steps = [
    {
      title: (
        <>
          슈끌림 회원가입을 하세요
        </>
      ),
      process: "PROCESS.1",
      image: "process1.png",
    },
    {
      title: (
        <>
          자신을 어필할 수 있는 자기소개서를<br />
          최대한 자세히 작성해요
        </>
      ),
      process: "PROCESS.2",
      image: "process2.png",
    },
    {
      title: (
        <>
          프로필 카드를 보고 나이, 키, 취미, 이상형 등<br />
          원하는 이성을 찾기 위한 분류가 시작됩니다
        </>
      ),
      process: "PROCESS.3",
      image: "process3.png",
    },
    {
      title: (
        <>
          자기소개서를 바탕으로<br />
          매일 한 번 매칭이 진행돼요
        </>
      ),
      process: "PROCESS.4",
      image: "process4.png",
    },
    {
      title: (
        <>
          오후 8시에 매칭 결과 알림과 함께<br />
          이성의 프로필을 전달합니다<br />
          양측 모두 마음에 들 경우 매칭이 성사됩니다
        </>
      ),
      process: "PROCESS.5",
      image: "process5.png",
    },
    {
      title: (
        <>
          본인, 상대방과 어울리는<br />
          데이트 코스를 추천해줘요
        </>
      ),
      process: "PROCESS.6",
      image: "process6.png",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <button onClick={() => router.push("/")} className="text-black text-3xl font-bold cursor-pointer">슈끌림</button>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")} className="text-black text-base">사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")} className="text-black text-base">이용 방법</button>
          <button onClick={() => {
            const kakaoId = localStorage.getItem("kakaoId");
            if (kakaoId) router.push("/mypage");
            else {
              alert("로그인이 필요합니다!");
              router.push("/login");
            }
          }} className="text-black text-base">마이페이지</button>
          <button onClick={() => router.push("/place_recommend")} className="text-black text-base">장소 추천</button>
        </div>
      </div>

      {/* 타이틀 */}
      <div className="flex flex-col items-center mt-20 mb-10">
        <div className="text-red-400 text-xl font-bold mb-2">슈끌림 이용 방법</div>
        <div className="text-zinc-800 text-3xl font-bold">쉽고 간편하게 이용할 수 있어요</div>
      </div>

      {/* 이용 프로세스 카드 */}
      <div className="px-20 grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border border-neutral-200 rounded-[20px] shadow-sm flex flex-col items-center p-6"
          >
            <img
              src={step.image}
              alt={`step-${index + 1}`}
              className="w-56 h-56 mb-6"
            />
            <div className="bg-red-300 text-white text-sm rounded-full px-4 py-1 mb-4">
              {step.process}
            </div>
            <div className="text-center text-zinc-800 text-xl leading-snug">
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
