"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SelfIntro3() {
  const router = useRouter();

  // 성별을 localStorage에서 가져오기
  const gender = typeof window !== "undefined" ? localStorage.getItem("gender") : null;

  // 다중 선택 state
  const [idealHeights, setIdealHeights] = useState([]);
  const [idealAges, setIdealAges] = useState([]);
  const [idealDrinks, setIdealDrinks] = useState([]);
  const [idealSmokes, setIdealSmokes] = useState([]);

  // 옵션들
  const maleHeights = [
    "165cm 미만", "165cm-169cm", "170cm-174cm",
    "175cm-179cm", "180cm-184cm", "185cm-189cm", "190cm 이상"
  ];
  const femaleHeights = [
    "150cm 미만", "150cm-154cm", "155cm-159cm",
    "160cm-164cm", "165cm-169cm", "170cm-174cm", "175cm 이상"
  ];
  const ageOptions = [
    "20세-22세", "23세-26세", "27세-29세",
    "30세-32세", "33세-36세", "37세-39세", "40세 이상"
  ];
  const drinkOptions = [
    "거의 마시지 않음", "월 2-3회", "주 1-2회", "주 3-4회", "거의 매일"
  ];
  const smokeOptions = ["비흡연자", "연초담배", "전자담배"];

  // 페이지 진입 시 기존 선택값 불러오기
  useEffect(() => {
    if (!gender) {
      alert("먼저 본인 정보를 입력해주세요.");
      router.push("/self_intro/self_intro1");
      return;
    }
    const savedHeights = JSON.parse(localStorage.getItem("idealHeights") || "[]");
    const savedAges = JSON.parse(localStorage.getItem("idealAges") || "[]");
    const savedDrinks = JSON.parse(localStorage.getItem("idealDrinks") || "[]");
    const savedSmokes = JSON.parse(localStorage.getItem("idealSmokes") || "[]");

    setIdealHeights(savedHeights);
    setIdealAges(savedAges);
    setIdealDrinks(savedDrinks);
    setIdealSmokes(savedSmokes);
  }, [gender, router]);

  // 선택 토글 함수 + localStorage 저장
  const toggleSelection = (value, currentValues, setValues, keyName) => {
    let updatedValues = [];
    if (currentValues.includes(value)) {
      updatedValues = currentValues.filter((v) => v !== value);
    } else {
      updatedValues = [...currentValues, value];
    }
    setValues(updatedValues);
    localStorage.setItem(keyName, JSON.stringify(updatedValues));
  };

  const isFormComplete =
    idealHeights.length > 0 &&
    idealAges.length > 0 &&
    idealDrinks.length > 0 &&
    idealSmokes.length > 0;

  // Next Page 클릭 시 이동 (값은 이미 localStorage에 저장됨)
  const handleNext = () => {
    router.push("/self_intro/self_intro4");
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* ----- 상단바 ----- */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <button onClick={() => router.push("/")} className="text-black text-3xl font-bold cursor-pointer">슈끌림</button>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")} className="text-black text-base">사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")} className="text-black text-base">이용 방법</button>
          <button onClick={() => router.push("/mypage")} className="text-black text-base">마이페이지</button>
          <button onClick={() => router.push("/place_recommend")} className="text-black text-base">장소 추천</button>
        </div>
      </div>

      {/* 왼쪽 안내 문구 */}
      <div className="w-[700px] py-11 left-[60px] top-[268px] absolute flex flex-col gap-12">
        <div className="text-red-400 text-5xl font-bold">원하는 이상형의 모습을<br />선택해주세요</div>
        <div className="text-black text-xl">중복 선택 가능하니 솔직하게 체크해보세요</div>
      </div>

      {/* 오른쪽 폼 */}
      <div className="w-[770px] py-3 left-[750px] top-[160px] absolute flex flex-col gap-6">

        {/* 이상형 키 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">이상형의 키를 선택하세요</div>
          <div className="flex gap-2 text-base">
            {(gender === "남성" ? femaleHeights : maleHeights).map((h) => (
              <button
                key={h}
                onClick={() => toggleSelection(h, idealHeights, setIdealHeights, "idealHeights")}
                className={`w-36 h-9 rounded-md ${idealHeights.includes(h) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* 이상형 나이 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">이상형의 나이를 선택하세요</div>
          <div className="flex gap-2 text-base">
            {ageOptions.map((a) => (
              <button
                key={a}
                onClick={() => toggleSelection(a, idealAges, setIdealAges, "idealAges")}
                className={`w-28 h-9 rounded-md ${idealAges.includes(a) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* 이상형 음주 빈도 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">이상형의 음주 빈도를 선택하세요</div>
          <div className="flex gap-2 flex-wrap text-base">
            {drinkOptions.map((d) => (
              <button
                key={d}
                onClick={() => toggleSelection(d, idealDrinks, setIdealDrinks, "idealDrinks")}
                className={`w-36 h-9 rounded-md ${idealDrinks.includes(d) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 이상형 흡연 여부 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">이상형의 흡연 여부를 선택하세요</div>
          <div className="flex gap-2 flex-wrap text-base">
            {smokeOptions.map((s) => (
              <button
                key={s}
                onClick={() => toggleSelection(s, idealSmokes, setIdealSmokes, "idealSmokes")}
                className={`w-28 h-9 rounded-md ${idealSmokes.includes(s) ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {s}
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
            onClick={handleNext}
            className={`w-60 p-3 left-[252px] absolute rounded-lg ${isFormComplete ? "bg-red-200 text-white" : "bg-gray-300 text-gray-500"}`}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
