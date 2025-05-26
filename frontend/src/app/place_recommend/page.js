"use client";

import { useRouter } from "next/navigation";

export default function PlaceRecommendPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-40 font-['Roboto']">
      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12">
          <button className="text-black">사이트 소개</button>
          <button className="text-black">이용 방법</button>
          <button onClick={() => router.push("/mypage")}>마이페이지</button>
          <button onClick={() => router.push("/place_recommend")}>장소 추천</button>
        </div>
      </div>

      {/* 타이틀 */}
      <div className="flex justify-center -mt-20">
        <h1 className="text-red-400 text-4xl font-bold leading-[48px]">
          소개팅 및 데이트 장소 추천
        </h1>
      </div>

      <div className="flex justify-center -mt-30">
        <h2 className="text-black text-center text-4xl font-bold leading-[48px]">
          두 사람에게 딱 맞는 장소를 추천해드릴게요.<br />
          기준을 선택해주세요!
        </h2>
      </div>

      {/* 카드 영역 */}
      <div className="flex justify-center gap-12 -mt-20 px-4 flex-wrap">
        {/* 소개팅 장소 카드 */}
        <button
          onClick={() => router.push("/place_recommend/first_meet")}
          className="w-96 h-96 rounded-md outline outline-1 outline-black/10 flex flex-col items-center overflow-hidden hover:shadow-md transition"
        >
          <div className="h-72 w-full bg-pink-50 flex justify-center items-center relative">
            <img
              src="거주지.png"
              alt="소개팅 장소"
              className="w-64 h-64 object-cover"
            />
          </div>
          <div className="w-full h-32 p-3 flex flex-col gap-1">
            <div className="text-black text-base text-left">거주지 기준 중간 소개팅 장소 추천</div>
            <div className="text-black text-xl font-medium leading-7 text-left">
              편하게 만날 수 있는 <br />
              최적의 위치를 골라드릴게요.
            </div>
          </div>
        </button>

        {/* 데이트 장소 카드 */}
        <button
          onClick={() => router.push("/place_recommend/date_style")}
          className="w-96 h-96 rounded-md outline outline-1 outline-black/10 flex flex-col items-center overflow-hidden hover:shadow-md transition"
        >
          <div className="h-72 w-full bg-pink-50 flex justify-center items-center relative">
            <img
              src="성향.png"
              alt="데이트 장소"
              className="w-64 h-64 object-cover"
            />
          </div>
          <div className="w-full h-32 p-3 flex flex-col gap-1">
            <div className="text-black text-base text-left">성향 기반 데이트 장소 추천</div>
            <div className="text-black text-xl font-medium leading-7 text-left">
              여러분의 성격, 취향, 분위기를 분석해<br />
              꼭 맞는 장소를 찾아드릴게요.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
