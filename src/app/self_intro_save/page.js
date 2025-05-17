"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SelfIntroSavePage() {
  const router = useRouter();

  const handleGoToMypage = () => {
    router.push("/mypage");
  };

  const handleGoToApplyComplete = () => {
  router.push("/apply_complete");
  };


  return (
    <div className="w-full min-h-screen bg-white">
      {/* ----- 상단바 ----- */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12">
          <Link href="/site_intro" className="text-black">사이트 소개</Link>
          <Link href="/how_to_use" className="text-black">이용 방법</Link>
          <Link href="/mypage" className="text-black">마이페이지</Link>
          <Link href="/place_recommend" className="text-black">장소 추천</Link>
        </div>
      </div>

      {/* 본문 콘텐츠 (가운데 정렬) */}
      <main className="flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto py-20 px-4 gap-14">
        {/* 저장 완료 문구 */}
        <h1 className="text-black text-4xl font-bold leading-[48px] font-['Roboto','Noto Sans KR','sans-serif']">
            자기소개서 입력이 완료되었습니다!
        </h1>

        {/* 이미지 */}
        <img
          src="/자기소개서저장.png"
          alt="자기소개서 저장 이미지"
          className="w-[455px] h-[456px]"
        />

        {/* 버튼 그룹 */}
        <div className="flex gap-10 mt-8">
          <button
            onClick={handleGoToMypage}
            className="px-12 py-2 bg-white rounded-md border border-gray-400 flex justify-center items-center"
          >
            <span className="text-black text-2xl font-bold font-['Roboto'] leading-[48px]">
              마이페이지로 이동
            </span>
          </button>

          <button
            onClick={handleGoToApplyComplete}
            className="px-12 py-2 bg-red-200 rounded-md flex justify-center items-center"
          >
            <span className="text-white text-2xl font-bold font-['Roboto'] leading-[48px]">
              소개팅 신청하기
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
