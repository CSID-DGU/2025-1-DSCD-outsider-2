"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelfIntroSavePage() {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
  const simulateSave = async () => {
    const userData = {
      kakao_id: localStorage.getItem("signup_kakao_id"),
      password: localStorage.getItem("signup_password"),
      location: localStorage.getItem("signup_location"),
      gender: localStorage.getItem("gender"),
      height: localStorage.getItem("height"),
      age_group: localStorage.getItem("age"),
      alcohol: localStorage.getItem("drink"),
      smoking: localStorage.getItem("smoke"),
      religion: localStorage.getItem("religion"),
      education: localStorage.getItem("education"),
      mbti_energy: localStorage.getItem("mbti_EorI"),
      mbti_sensing: localStorage.getItem("mbti_SorN"),
      mbti_thinking: localStorage.getItem("mbti_TorF"),
      mbti_judging: localStorage.getItem("mbti_JorP"),
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
      preferred_height_score: localStorage.getItem("priority_height"),
      preferred_age_score: localStorage.getItem("priority_age"),
      preferred_alcohol_score: localStorage.getItem("priority_drink"),
      preferred_smoking_score: localStorage.getItem("priority_smoke"),
      preferred_religion_score: localStorage.getItem("priority_religion"),
      preferred_education_score: localStorage.getItem("priority_education"),
      mbti_energy_score: localStorage.getItem("priority_mbtiEI"),
      mbti_sensing_score: localStorage.getItem("priority_mbtiSN"),
      mbti_thinking_score: localStorage.getItem("priority_mbtiTF"),
      mbti_judging_score: localStorage.getItem("priority_mbtiJP"),
      my_character: localStorage.getItem("personality"),
      hobby: localStorage.getItem("hobby"),
      holiday: localStorage.getItem("weekend"),
      dating_style: localStorage.getItem("dateStyle"),
      strength_in_relationship: localStorage.getItem("advantage"),
      ideal_personality: localStorage.getItem("idealpersonality"),
      ideal_hobby: localStorage.getItem("idealhobby"),
      what_I_want_from_partner: localStorage.getItem("want"),
    };

    const url =
      userData.gender === "남자"
        ? "http://localhost:8000/manuserdata/"            //남자 라우터
        : "http://localhost:8000/womanuserdata/";         //여자 라우터

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log("[응답]", result.message);

      setTimeout(() => {
        setIsSaved(true);
      }, 500);
    } catch (error) {
      console.error("서버 전송 실패:", error);
    }
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
          <button onClick={() => router.push("/mypage")} className="text-black text-base">마이페이지</button>
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
