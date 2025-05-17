"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MatchAcceptPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden">
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

      {/* 가운데 정렬된 안내 영역 */}
      <div className="flex flex-col items-center justify-center w-full mt-40 gap-12 text-center px-4">
        <div className="text-red-400 text-4xl font-bold">
          매칭 수락을 하셨어요!
        </div>

        <div className="text-black text-4xl font-bold leading-[48px] max-w-3xl">
          상대방의 수락 여부는 내일 오전 8시에<br />
          수락한 상대 확인 페이지에서 확인 가능합니다
        </div>
        <button
            onClick={() => router.push("/mypage")}
            className="w-60 p-3 bg-red-200 rounded-lg text-white text-xl font-extrabold"
        >
            마이페이지로 가기
        </button>
      </div>

      {/* 하단 라인 */}
      <div className="w-full h-px mt-24 bg-black/10" />
    </div>
  );
}
