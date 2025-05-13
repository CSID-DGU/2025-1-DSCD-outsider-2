"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelfIntro1() {
  const [gender, setGender] = useState(localStorage.getItem("gender") || "");
  const [height, setHeight] = useState(localStorage.getItem("height") || "");
  const [age, setAge] = useState(localStorage.getItem("age") || "");
  const [drink, setDrink] = useState(localStorage.getItem("drink") || "");
  const [smoke, setSmoke] = useState(localStorage.getItem("smoke") || "");

  const router = useRouter();

  const isFormComplete = gender && height && age && drink && smoke;

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

  // 선택할 때 localStorage에 저장
  const handleSelect = (type, value) => {
    if (type === "gender") {
      setGender(value);
      setHeight(""); // 성별 바꾸면 키 초기화
      localStorage.setItem("gender", value);
      localStorage.removeItem("height"); // 기존 키 삭제
    } else if (type === "height") {
      setHeight(value);
      localStorage.setItem("height", value);
    } else if (type === "age") {
      setAge(value);
      localStorage.setItem("age", value);
    } else if (type === "drink") {
      setDrink(value);
      localStorage.setItem("drink", value);
    } else if (type === "smoke") {
      setSmoke(value);
      localStorage.setItem("smoke", value);
    }
  };

  const handleNext = () => {
    if (!isFormComplete) {
      alert("모든 항목을 선택하세요!");
      return;
    }
    router.push("/self_intro/self_intro2");
  };

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
        <div className="text-red-400 text-5xl font-bold">본인 정보를 입력해주세요</div>
        <div className="text-black text-xl">본인에 해당하는 정보 하나만 선택해주세요</div>
      </div>

      {/* 오른쪽 질문 폼 */}
      <div className="w-[770px] py-3 left-[750px] top-[160px] absolute flex flex-col gap-6">

        {/* 성별 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">본인의 성별을 선택하세요</div>
          <div className="flex gap-4 text-base">
            {["남성", "여성"].map((g) => (
              <button
                key={g}
                onClick={() => handleSelect("gender", g)}
                className={`w-60 h-9 rounded-md ${gender === g ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* 키 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">본인의 키를 선택하세요</div>
          <div className="flex gap-2 text-base">
            {(gender === "남성" ? maleHeights : gender === "여성" ? femaleHeights : []).map((h) => (
              <button
                key={h}
                onClick={() => handleSelect("height", h)}
                className={`w-36 h-9 rounded-md ${height === h ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* 나이 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">본인의 나이를 선택하세요</div>
          <div className="flex gap-2 text-base">
            {ageOptions.map((a) => (
              <button
                key={a}
                onClick={() => handleSelect("age", a)}
                className={`w-28 h-9 rounded-md ${age === a ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* 음주 빈도 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">음주 빈도를 선택하세요</div>
          <div className="flex gap-2 flex-wrap text-base">
            {drinkOptions.map((d) => (
              <button
                key={d}
                onClick={() => handleSelect("drink", d)}
                className={`w-36 h-9 rounded-md ${drink === d ? "bg-red-200 text-white" : "bg-black/5"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 흡연 여부 선택 */}
        <div className="flex flex-col gap-2">
          <div className="text-black text-xl font-medium">흡연 여부를 선택하세요</div>
          <div className="flex gap-2 flex-wrap text-base">
            {smokeOptions.map((s) => (
              <button
                key={s}
                onClick={() => handleSelect("smoke", s)}
                className={`w-28 h-9 rounded-md ${smoke === s ? "bg-red-200 text-white" : "bg-black/5"}`}
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
