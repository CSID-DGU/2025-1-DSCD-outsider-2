"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelfIntroSavePage() {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // localStorage는 브라우저에서만 접근 가능하므로 useEffect 안에서 사용
    const simulateSave = () => {
      const userData = {
        kakao_id: localStorage.getItem("signup_kakao_id"),
        password: localStorage.getItem("signup_password"),
        location: localStorage.getItem("signup_location"),
        gender: localStorage.getItem("gender"),
        height: localStorage.getItem("height"),
        age: localStorage.getItem("age"),
        drink: localStorage.getItem("drink"),
        smoke: localStorage.getItem("smoke"),
        religion: localStorage.getItem("religion"),
        education: localStorage.getItem("education"),
        EorI: localStorage.getItem("mbti_EorI"),
        SorN: localStorage.getItem("mbti_SorN"),
        TorF: localStorage.getItem("mbti_TorF"),
        JorP: localStorage.getItem("mbti_JorP"),
        preferred_height: JSON.parse(localStorage.getItem("idealHeights") || "[]").join(", "),
        preferred_age: JSON.parse(localStorage.getItem("idealAges") || "[]").join(", "),
        preferred_alcohol: JSON.parse(localStorage.getItem("idealDrinks") || "[]").join(", "),
        preferred_smoking: JSON.parse(localStorage.getItem("idealSmokes") || "[]").join(", "),
        preferred_religion: JSON.parse(localStorage.getItem("idealReligions") || "[]").join(", "),
        preferred_education: JSON.parse(localStorage.getItem("idealEducations") || "[]").join(", "),
        preferred_energy: JSON.parse(localStorage.getItem("idealMbti") || "{}").EorI?.join(", ") || "",
        preferred_sensing: JSON.parse(localStorage.getItem("idealMbti") || "{}").SorN?.join(", ") || "",
        preferred_thinking: JSON.parse(localStorage.getItem("idealMbti") || "{}").TorF?.join(", ") || "",
        preferred_judging: JSON.parse(localStorage.getItem("idealMbti") || "{}").JorP?.join(", ") || "",
        personality: localStorage.getItem("personality"),
        hobby: localStorage.getItem("hobby"),
        weekend: localStorage.getItem("weekend"),
        dateStyle: localStorage.getItem("dateStyle"),
        conflictStyle: localStorage.getItem("conflictStyle"),
        idealType: localStorage.getItem("idealType"),
        hobby_other: localStorage.getItem("hobby_other"),
        want: localStorage.getItem("want"),
      };

      console.log("[데모] 저장된 자기소개서 데이터:", userData);

      setTimeout(() => {
        setIsSaved(true);
      }, 500); // 저장 중입니다... 메시지 잠깐 보여주기
    };

    simulateSave();
  }, []);

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

      {/* 본문 */}
      <main className="flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto py-20 px-4 gap-14">
        <h1 className="text-black text-4xl font-bold leading-[48px] font-['Roboto','Noto Sans KR','sans-serif']">
          {isSaved ? "자기소개서 입력이 완료되었습니다!" : "저장 중입니다..."}
        </h1>

        <img
          src="/자기소개서저장.png"
          alt="자기소개서 저장 이미지"
          className="w-[455px] h-[456px]"
        />

        {isSaved && (
          <div className="flex gap-10 mt-8">
            <button
              onClick={handleGoToMypage}
              className="px-12 py-2 bg-white rounded-md border border-gray-400 flex justify-center items-center"
            >
              <span className="text-black text-2xl font-bold leading-[48px]">마이페이지로 이동</span>
            </button>

            <button
              onClick={handleGoToApplyComplete}
              className="px-12 py-2 bg-red-200 rounded-md flex justify-center items-center"
            >
              <span className="text-white text-2xl font-bold leading-[48px]">소개팅 신청하기</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
