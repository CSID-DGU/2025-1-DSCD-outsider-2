"use client";

import { useRouter } from "next/navigation";

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
      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12 text-black text-base">
          <button onClick={() => alert("사이트 소개 이동")}>사이트 소개</button>
          <button onClick={() => alert("이용 방법 이동")}>이용 방법</button>
          <button onClick={() => router.push("/mypage")}>마이페이지</button>
          <button onClick={() => alert("장소 추천 이동")}>장소 추천</button>
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
