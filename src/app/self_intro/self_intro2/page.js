"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SelfIntro2() {
  const router = useRouter();

  // 기존 localStorage 값 불러오기
  const [religion, setReligion] = useState("");
  const [education, setEducation] = useState("");
  const [mbti, setMbti] = useState({
    EorI: "",
    SorN: "",
    TorF: "",
    JorP: "",
  });

  // localStorage에서 기존 데이터 불러오기 (처음 페이지 로드될 때 1번)
  useEffect(() => {
    const savedReligion = localStorage.getItem("religion");
    const savedEducation = localStorage.getItem("education");
    const savedMbti = {
      EorI: localStorage.getItem("mbti_EorI") || "",
      SorN: localStorage.getItem("mbti_SorN") || "",
      TorF: localStorage.getItem("mbti_TorF") || "",
      JorP: localStorage.getItem("mbti_JorP") || "",
    };

    if (savedReligion) setReligion(savedReligion);
    if (savedEducation) setEducation(savedEducation);
    setMbti(savedMbti);
  }, []);

  // 선택할 때 localStorage에 저장
  const handleReligion = (value) => {
    setReligion(value);
    localStorage.setItem("religion", value);
  };

  const handleEducation = (value) => {
    setEducation(value);
    localStorage.setItem("education", value);
  };

  const handleMbti = (key, value) => {
    const updatedMbti = { ...mbti, [key]: value };
    setMbti(updatedMbti);
    localStorage.setItem(`mbti_${key}`, value);
  };

  const isFormComplete =
    religion && education && mbti.EorI && mbti.SorN && mbti.TorF && mbti.JorP;

  const religions = ["무교", "기독교", "천주교", "불교", "원불교", "기타"];
  const educations = [
    "고등학교 졸업",
    "전문대 재학 및 졸업",
    "4년제 대학교 재학 및 졸업",
    "석사",
    "박사",
  ];

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* ----- 상단바 ----- */}
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

      {/* 왼쪽 안내 문구 */}
      <div className="w-[700px] py-11 left-[60px] top-[268px] absolute flex flex-col gap-12">
        <div className="text-red-400 text-5xl font-bold">본인 정보를 입력해주세요</div>
        <div className="text-black text-xl">본인에 해당하는 정보 하나만 선택해주세요</div>
      </div>

      {/* 오른쪽 질문 폼 */}
      <div className="w-[770px] py-3 left-[750px] top-[160px] absolute flex flex-col gap-6">

        {/* 종교 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">본인의 종교를 선택하세요</div>
          <div className="flex gap-2 flex-wrap text-base">
            {religions.map((r) => (
              <button
                key={r}
                onClick={() => handleReligion(r)}
                className={`w-30 h-9 rounded-md ${religion === r ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* 학력 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">본인의 학력을 선택하세요</div>
          <div className="flex gap-2 text-base">
            {educations.map((e) => (
              <button
                key={e}
                onClick={() => handleEducation(e)}
                className={`min-w-[200px] h-9 rounded-md ${education === e ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* MBTI 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">본인의 MBTI를 선택하세요</div>

          {/* 에너지 방향 */}
          <div className="flex gap-2 items-center">
            <span className="w-32">에너지 방향</span>
            {["E", "I"].map((option) => (
              <button
                key={option}
                onClick={() => handleMbti("EorI", option)}
                className={`w-12 h-9 rounded-md ${mbti.EorI === option ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 인식 방식 */}
          <div className="flex gap-2 items-center">
            <span className="w-32">인식 방식</span>
            {["S", "N"].map((option) => (
              <button
                key={option}
                onClick={() => handleMbti("SorN", option)}
                className={`w-12 h-9 rounded-md ${mbti.SorN === option ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 판단 방식 */}
          <div className="flex gap-2 items-center">
            <span className="w-32">판단 방식</span>
            {["T", "F"].map((option) => (
              <button
                key={option}
                onClick={() => handleMbti("TorF", option)}
                className={`w-12 h-9 rounded-md ${mbti.TorF === option ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 생활 양식 */}
          <div className="flex gap-2 items-center">
            <span className="w-32">생활 양식</span>
            {["J", "P"].map((option) => (
              <button
                key={option}
                onClick={() => handleMbti("JorP", option)}
                className={`w-12 h-9 rounded-md ${mbti.JorP === option ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="w-[492px] h-12 relative mt-4">
          <button
            className="w-60 p-3 rounded-lg outline outline-1 outline-black/50"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            disabled={!isFormComplete}
            onClick={() => router.push("/self_intro/self_intro3")}
            className={`w-60 p-3 left-[252px] absolute rounded-lg ${
              isFormComplete ? "bg-red-200 text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
