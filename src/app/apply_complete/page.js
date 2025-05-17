"use client";

import Link from "next/link";

export default function ApplyCompletePage() {
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


      {/* 본문 영역 */}
      <div className="w-full h-[886px] pt-10 flex flex-col items-center justify-center gap-20">
        {/* 텍스트 + 아이콘 */}
        <div className="flex items-center gap-6">
          <img
            className="w-24 h-24"
            src="소개팅신청완료.png"
            alt="아이콘"
          />
          <div className="text-black text-4xl font-bold font-['Roboto'] leading-[48px]">
            소개팅 신청이 완료되었습니다!
          </div>
        </div>

        {/* 매칭 안내 박스 */}
        <div className="bg-rose-50 w-[878px] h-40 rounded-[30px] flex items-center justify-center px-10 text-center">
          <p className="text-black text-3xl font-medium font-['Roboto'] leading-[48px]">
            오늘 <span className="font-bold">오후 8시</span>에 매칭 결과가 도착할 예정입니다.<br />
            신청 후 <span className="font-bold">매일 1회</span> 매칭이 진행됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
