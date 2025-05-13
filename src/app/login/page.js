"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [kakaoId, setKakaoId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const nickname = localStorage.getItem("nickname");

    if (!nickname) {
      alert("회원가입한 닉네임 정보가 없습니다. 먼저 회원가입 해주세요.");
    } else {
      router.push("/mypage");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* ----- 상단바 ----- */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12">
          <Link href="/introduce" className="text-black">사이트 소개</Link>
          <Link href="/howto" className="text-black">이용 방법</Link>
          <Link href="/mypage" className="text-black">마이페이지</Link>
          <Link href="/recommend" className="text-black">장소 추천</Link>
        </div>
      </div>

      {/* ----- 안내 문구 ----- */}
      <div className="w-[858px] text-center mx-auto gap-4 mt-16">
        <span className="text-red-400 text-4xl font-bold font-['Roboto']">슈끌림</span>
        <span className="text-black text-3xl font-normal font-['Roboto']">
          에서 운명 같은 인연을 찾아보세요.<br />
          단 1분 투자로, 평생 함께할 소중한 사람을 만날 수 있습니다.<br />
        </span>
      </div>

      {/* ----- 로그인 박스 ----- */}
      <div className="w-80 h-96 relative mx-auto mt-10">
        {/* ----- 프로필 이미지 ----- */}
        <img
          className="w-28 h-28 left-[111px] top-[38.50px] absolute"
          src="/image1.png"
          alt="프로필 이미지"
        />

        {/* ----- 카카오톡 ID 입력 ----- */}
        <input
          type="text"
          placeholder="카카오톡 ID"
          value={kakaoId}
          onChange={(e) => setKakaoId(e.target.value)}
          className="w-72 h-11 left-[16px] top-[168px] absolute 
                     bg-white rounded-tl-md rounded-tr-md 
                     border border-zinc-300 p-2 font-['Noto_Sans_KR']"
        />

        {/* ----- 비밀번호 입력 ----- */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 h-11 left-[16px] top-[213px] absolute 
                     bg-white rounded-bl-md rounded-br-md 
                     border border-zinc-300 border-t-0 p-2 font-['Noto_Sans_KR']"
        />

        {/* ----- 로그인 버튼 ----- */}
        <button
          onClick={handleLogin}
          className="w-72 h-11 left-[15px] top-[268px] absolute 
                     bg-red-200 rounded-md text-white text-xl font-bold font-['Noto_Sans_KR']"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
