"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SelfIntro5() {
  const router = useRouter();

  const [rankings, setRankings] = useState({
    priority_height: "",
    priority_age: "",
    priority_drink: "",
    priority_smoke: "",
    priority_religion: "",
    priority_education: "",
    priority_mbtiEI: "",
    priority_mbtiSN: "",
    priority_mbtiTF: "",
    priority_mbtiJP: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("priorityValues") || "{}");

    const defaultState = {
      priority_height: "",
      priority_age: "",
      priority_drink: "",
      priority_smoke: "",
      priority_religion: "",
      priority_education: "",
      priority_mbtiEI: "",
      priority_mbtiSN: "",
      priority_mbtiTF: "",
      priority_mbtiJP: "",
    };

    const merged = { ...defaultState, ...saved };
    setRankings(merged);
  }, []);

  const handleChange = (key, value) => {
    if (!/^(?:[1-9]|10)?$/.test(value)) return;
    setRankings((prev) => ({ ...prev, [key]: value }));
    setErrorMsg("");
  };


  const handleSave = () => {
  const values = Object.values(rankings);

  if (values.some((v) => v === "")) {
    setErrorMsg("모든 항목에 1~10 사이의 숫자를 입력해 주세요.");
    return;
  }

  const uniqueValues = new Set(values);
  if (uniqueValues.size !== 10) {
    setErrorMsg("숫자는 1~10 사이로, 중복 없이 입력해야 합니다.");
    return;
  }

  localStorage.setItem("priorityValues", JSON.stringify(rankings));

  Object.entries(rankings).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  alert("저장되었습니다!");
  router.push("/self_intro/self_intro6");
};


  const isComplete =
    Object.values(rankings).every((v) => v) &&
    new Set(Object.values(rankings)).size === 10;

  const inputFields = [
    { label: "키", key: "priority_height" },
    { label: "나이", key: "priority_age" },
    { label: "음주", key: "priority_drink" },
    { label: "흡연", key: "priority_smoke" },
    { label: "종교", key: "priority_religion" },
    { label: "학력", key: "priority_education" },
    { label: "에너지 방향(E/I)", key: "priority_mbtiEI" },
    { label: "인식 방식(S/N)", key: "priority_mbtiSN" },
    { label: "판단 방식(T/F)", key: "priority_mbtiTF" },
    { label: "생활 양식(J/P)", key: "priority_mbtiJP" },
  ];

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <button
          onClick={() => router.push("/")}
          className="text-black text-3xl font-bold cursor-pointer"
        >
          슈끌림
        </button>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")} className="text-black text-base">사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")} className="text-black text-base">이용 방법</button>
          <button onClick={() => router.push("/mypage")} className="text-black text-base">마이페이지</button>
          <button onClick={() => router.push("/place_recommend")} className="text-black text-base">장소 추천</button>
        </div>
      </div>

      {/* 안내문구 */}
      <div className="w-[700px] py-11 left-[60px] top-[268px] absolute flex flex-col gap-12">
        <div className="text-red-400 text-5xl font-bold">
          본인에게 중요한 조건은<br />무엇인가요?
        </div>
        <div className="text-black text-xl mt-10">
          10개의 항목에 중요한 순으로 등수를 매겨주세요
        </div>
        {errorMsg && (
          <div className="text-red-500 text-sm font-medium mt-4">{errorMsg}</div>
        )}
      </div>

      {/* 입력 폼 */}
      <div className="absolute left-[650px] top-[150px] w-[869px] h-[670px] flex flex-wrap gap-y-6 gap-x-10">
        {inputFields.map((item) => (
          <div key={item.key} className="w-96 h-20 relative">
            <div className="absolute top-[22px] left-[21px] w-28 h-9 bg-black/5 rounded-md flex items-center justify-center">
              <div className="text-black text-sm">{item.label}</div>
            </div>
            <input
              type="text"
              value={rankings[item.key] || ""}
              onChange={(e) => handleChange(item.key, e.target.value)}
              className="absolute left-[150px] top-[22px] w-64 h-9 rounded-md outline outline-1 outline-black/10 px-3 text-sm"
              placeholder="1~10 사이의 숫자를 입력하세요"
            />
          </div>
        ))}

        {/* 버튼 */}
        <div className="w-[492px] h-12 relative mt-4">
          <button
            className="w-60 p-3 rounded-lg outline outline-1 outline-black/50"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            disabled={!isComplete}
            onClick={handleSave}
            className={`w-60 p-3 absolute left-[252px] rounded-lg ${
              isComplete ? "bg-red-200 text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
