"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [kakaoId, setKakaoId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 로그인 처리 로직
  const handleLogin = () => {
    const savedId = localStorage.getItem("signup_kakao_id");
    const savedPw = localStorage.getItem("signup_password");

    if (!savedId || !savedPw) {
      alert("회원가입한 정보가 없습니다. 먼저 회원가입 해주세요.");
    } else if (kakaoId !== savedId || password !== savedPw) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    } else {
      // 로그인 성공 시 nickname 임시 저장 (추후 닉네임 필드 생기면 교체 가능)
      localStorage.setItem("nickname", savedId);
      alert("로그인 성공!");
      router.push("/mypage");
    }
  };

  // 상단바에서 마이페이지 클릭 시 동작
  const handleMyPageClick = () => {
    const nickname = localStorage.getItem("nickname");
    if (nickname) {
      router.push("/mypage");
    } else {
      alert("로그인을 해야 이용할 수 있습니다!");
      router.push("/login");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* ----- 상단바 ----- */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <button
          onClick={() => router.push("/")}
          className="text-black text-3xl font-bold cursor-pointer"
        >
          슈끌림
        </button>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")} className="text-black text-base cursor-pointer">사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")} className="text-black text-base cursor-pointer">이용 방법</button>
          <button onClick={handleMyPageClick} className="text-black text-base cursor-pointer">마이페이지</button>
          <button onClick={() => router.push("/place_recommend")} className="text-black text-base cursor-pointer">장소 추천</button>
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
        <img
          className="w-28 h-28 left-[111px] top-[38.5px] absolute"
          src="/image1.png"
          alt="프로필 이미지"
        />

        <input
          type="text"
          placeholder="카카오톡 ID"
          value={kakaoId}
          onChange={(e) => setKakaoId(e.target.value)}
          className="w-72 h-11 left-[16px] top-[168px] absolute bg-white rounded-t-md border border-zinc-300 p-2 font-['Noto_Sans_KR']"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 h-11 left-[16px] top-[213px] absolute bg-white rounded-b-md border border-zinc-300 border-t-0 p-2 font-['Noto_Sans_KR']"
        />

        <button
          onClick={handleLogin}
          className="w-72 h-11 left-[15px] top-[268px] absolute bg-red-200 rounded-md text-white text-xl font-bold font-['Noto_Sans_KR']"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
