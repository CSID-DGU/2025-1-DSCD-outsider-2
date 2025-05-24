"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    setIsLoggedIn(!!token);
  }, []);

  const handleMyPageClick = () => {
    if (isLoggedIn) {
      router.push("/mypage");
    } else {
      alert("로그인을 해야 이용할 수 있습니다!");
      router.push("/login");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-40">
      {/* ----- 상단바 ----- */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <button
          onClick={() => router.push("/")}
          className="text-black text-3xl font-bold cursor-pointer"
        >
          슈끌림
        </button>
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
          <button onClick={() => router.push("/mypage")} className="text-black text-base">마이페이지</button>
          <button
            onClick={() => router.push("/place_recommend")}
            className="text-black text-base cursor-pointer"
          >
            장소 추천
          </button>
        </div>
      </div>

      {/* ----- 본문 ----- */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-4xl font-bold text-center leading-[48px]">
          내면이 닮은 사람과의 매칭, <br /> 지금 시작해보세요
        </div>
        <div className="text-base">당신의 특별한 인연을 찾아보세요</div>

        <div className="flex gap-3 mt-4">
          <Link href="/login">
            <div className="w-80 p-3 rounded-lg border border-black/50 text-center cursor-pointer text-black text-xl">
              이미 계정이 있다면? 로그인하기
            </div>
          </Link>
          <Link href="/signup">
            <div className="w-80 p-3 rounded-lg bg-red-200 text-center cursor-pointer text-white text-xl font-semibold">
              1분만에 슈끌림 가입하기
            </div>
          </Link>
        </div>
      </div>

      {/* ----- 하단 구분선 ----- */}
      <div className="w-full border-t border-black/10"></div>
    </div>
  );
}
