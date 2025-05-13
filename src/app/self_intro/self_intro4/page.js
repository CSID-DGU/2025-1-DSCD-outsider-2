"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelfIntro4() {
  const router = useRouter();

  const [religions, setReligions] = useState([]);
  const [educations, setEducations] = useState([]);
  const [mbti, setMbti] = useState({
    EorI: [],
    SorN: [],
    TorF: [],
    JorP: [],
  });

  const allReligions = ["무교", "기독교", "천주교", "불교", "원불교", "기타"];
  const allEducations = [
    "고등학교 졸업",
    "전문대 재학 및 졸업",
    "4년제 대학교 재학 및 졸업",
    "석사",
    "박사",
  ];

  // 페이지 진입 시 localStorage 에서 기존 선택값 불러오기
  useEffect(() => {
    const savedReligions = JSON.parse(localStorage.getItem("idealReligions") || "[]");
    const savedEducations = JSON.parse(localStorage.getItem("idealEducations") || "[]");
    const savedMbti = JSON.parse(localStorage.getItem("idealMbti") || "{}");

    setReligions(savedReligions);
    setEducations(savedEducations);
    setMbti({
      EorI: savedMbti.EorI || [],
      SorN: savedMbti.SorN || [],
      TorF: savedMbti.TorF || [],
      JorP: savedMbti.JorP || [],
    });
  }, []);

  // 선택 토글 + localStorage 저장
  const toggleSelection = (value, currentValues, setValues, storageKey) => {
    let updatedValues = [];
    if (currentValues.includes(value)) {
      updatedValues = currentValues.filter((v) => v !== value);
    } else {
      updatedValues = [...currentValues, value];
    }
    setValues(updatedValues);
    localStorage.setItem(storageKey, JSON.stringify(updatedValues));
  };

  // MBTI 토글 + localStorage 저장
  const toggleMbti = (dimension, value) => {
    const current = mbti[dimension];
    let updated = [];

    if (current.includes(value)) {
      updated = current.filter((v) => v !== value);
    } else {
      updated = [...current, value];
    }

    const newMbti = { ...mbti, [dimension]: updated };
    setMbti(newMbti);
    localStorage.setItem("idealMbti", JSON.stringify(newMbti));
  };

  const isFormComplete =
    religions.length > 0 &&
    educations.length > 0 &&
    mbti.EorI.length > 0 &&
    mbti.SorN.length > 0 &&
    mbti.TorF.length > 0 &&
    mbti.JorP.length > 0;

  return (
    <div className="w-full min-h-screen bg-white relative">

      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12">
          <button onClick={() => alert("사이트 소개 이동")}>사이트 소개</button>
          <button onClick={() => alert("이용 방법 이동")}>이용 방법</button>
          <button onClick={() => router.push("/mypage")}>마이페이지</button>
          <button onClick={() => alert("장소 추천 이동")}>장소 추천</button>
        </div>
      </div>

      {/* 왼쪽 안내 문구 */}
      <div className="w-[700px] py-11 left-[60px] top-[268px] absolute flex flex-col gap-12">
        <div className="text-red-400 text-5xl font-bold">
          원하는 이상형의 모습을<br />선택해주세요
        </div>
        <div className="text-black text-xl">
          중복 선택 가능하니 솔직하게 체크해보세요
        </div>
      </div>

      {/* 오른쪽 질문 폼 */}
      <div className="w-[770px] py-3 left-[750px] top-[160px] absolute flex flex-col gap-6">

        {/* 종교 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">이상형의 종교를 선택하세요</div>
          <div className="flex gap-2 flex-wrap text-base">
            {allReligions.map((r) => (
              <button
                key={r}
                onClick={() => toggleSelection(r, religions, setReligions, "idealReligions")}
                className={`w-30 h-9 rounded-md ${religions.includes(r) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* 학력 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">이상형의 학력을 선택하세요</div>
          <div className="flex gap-2 text-base">
            {allEducations.map((e) => (
              <button
                key={e}
                onClick={() => toggleSelection(e, educations, setEducations, "idealEducations")}
                className={`min-w-[200px] h-9 rounded-md ${educations.includes(e) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* MBTI 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">이상형의 MBTI를 선택하세요</div>

          {/* 에너지 방향 */}
          <div className="flex gap-2 items-center flex-wrap">
            <span className="w-32">에너지 방향</span>
            {["E", "I"].map((option) => (
              <button
                key={option}
                onClick={() => toggleMbti("EorI", option)}
                className={`w-12 h-9 rounded-md ${mbti.EorI.includes(option) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 인식 방식 */}
          <div className="flex gap-2 items-center flex-wrap">
            <span className="w-32">인식 방식</span>
            {["S", "N"].map((option) => (
              <button
                key={option}
                onClick={() => toggleMbti("SorN", option)}
                className={`w-12 h-9 rounded-md ${mbti.SorN.includes(option) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 판단 방식 */}
          <div className="flex gap-2 items-center flex-wrap">
            <span className="w-32">판단 방식</span>
            {["T", "F"].map((option) => (
              <button
                key={option}
                onClick={() => toggleMbti("TorF", option)}
                className={`w-12 h-9 rounded-md ${mbti.TorF.includes(option) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 생활 양식 */}
          <div className="flex gap-2 items-center flex-wrap">
            <span className="w-32">생활 양식</span>
            {["J", "P"].map((option) => (
              <button
                key={option}
                onClick={() => toggleMbti("JorP", option)}
                className={`w-12 h-9 rounded-md ${mbti.JorP.includes(option) ? "bg-red-200 text-white" : "bg-black/5"}`}
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
            onClick={() => router.push("/self_intro/self_intro5")}
            className={`w-60 p-3 left-[252px] absolute rounded-lg ${isFormComplete ? "bg-red-200 text-white" : "bg-gray-300 text-gray-500"}`}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
