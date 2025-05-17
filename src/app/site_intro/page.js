"use client";

import { useRouter } from "next/navigation";

export default function SiteIntroPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-40">
      {/* ----- 상단바 ----- */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12">
          <button
            onClick={() => router.push("/site_intro")}
            className="text-black text-base cursor-pointer"
          >
            사이트 소개
          </button>
          <button
            onClick={() => router.push("/how_to_use")}
            className="text-black text-base cursor-pointer"
          >
            이용 방법
          </button>
          <button
            onClick={() => router.push("/mypage")}
            className="text-black text-base cursor-pointer"
          >
            마이페이지
          </button>
          <button
            onClick={() => router.push("/place_recommend")}
            className="text-black text-base cursor-pointer"
          >
            장소 추천
          </button>
        </div>
      </div>

      {/* 진짜 소개팅 영역 */}
      <div className="w-full px-44 py-14 flex justify-center items-center gap-14 -mt-40">
        <div className="flex-1 flex flex-col justify-start items-start gap-6">
          <div className="text-red-400 text-4xl font-bold leading-[48px]">
            내 이야기로 시작되는 <br />진짜 소개팅
          </div>
          <div className="text-black text-base leading-normal">
            ‘슈끌림’은 사용자의 자기소개서 기반으로 진정성 있는 소개팅 매칭을 제공하는<br/>플랫폼입니다.
          </div>
        </div>
        <div className="w-[520px] h-90 bg-pink-50 flex items-center justify-center">
          <img
            className="w-[520px] h-90"
            src="/사이트소개1.png" 
            alt="소개 이미지"
          />
        </div>
      </div>

      <hr className="w-full border-t border-black/10 -mt-40" />

      {/* 스마트한 소개팅 영역 */}
      <div className="w-full px-44 py-14 flex justify-center items-center gap-14 -mt-40">
        <div className="flex-1 flex flex-col justify-start items-start gap-6">
          <div className="text-red-400 text-4xl font-bold leading-[48px]">
            스마트한 소개팅 경험
          </div>
          <div className="text-black text-base leading-normal">
            매칭 후 데이트 장소까지 추천해주는 스마트한 소개팅 경험을 만나보세요.
          </div>
        </div>
        <div className="flex gap-10">
          {/* 카드 1 */}
          <div className="w-60 rounded-md border border-black/10 flex flex-col items-center overflow-hidden">
            <div className="w-full h-60 bg-pink-50 flex items-center justify-center">
              <img
                className="w-60 h-60"
                src="/사이트소개2.png" 
                alt="매칭 알고리즘"
              />
            </div>
            <div className="w-full p-3 flex flex-col items-start gap-1">
              <div className="text-black text-base">매칭 알고리즘</div>
              <div className="text-black text-xl font-medium leading-7">
                자기소개서 기반으로 <br />
                잘 맞는 연인 찾기
              </div>
            </div>
          </div>

          {/* 카드 2 */}
          <div className="w-60 rounded-md border border-black/10 flex flex-col items-center overflow-hidden">
            <div className="w-full h-60 bg-pink-50 flex items-center justify-center">
              <img
                className="w-60 h-60"
                src="/사이트소개3.png"
                alt="스마트 추천"
              />
            </div>
            <div className="w-full p-3 flex flex-col items-start gap-1">
              <div className="text-black text-base">스마트 추천</div>
              <div className="text-black text-xl font-medium leading-7">
                매칭된 커플에게 <br />
                어울리는 장소 소개
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full border-t border-black/10" />
    </div>
  );
}
