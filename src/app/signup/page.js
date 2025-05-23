"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();

  // 입력 상태 초기값
  const [kakaoId, setKakaoId] = useState("");
  const [password, setPassword] = useState("");
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);

  // 버튼 활성화 조건
  const canSubmit = kakaoId && password.length >= 8 && sido && sigungu && terms1 && terms2;

  // 지역 데이터
  const regions = {
    서울특별시: [
      "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구",
      "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구",
      "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
    ],
    경기도: [
      "수원시", "성남시", "고양시", "용인시", "부천시", "안산시", "안양시", "남양주시", "화성시", "평택시",
      "의정부시", "시흥시", "파주시", "김포시", "광주시", "광명시", "군포시", "오산시", "이천시", "안성시",
      "의왕시", "하남시", "여주시", "양평군", "동두천시", "과천시", "구리시", "양주시", "포천시", "연천군", "가평군"
    ]
  };

  // 회원가입 처리 (백엔드에 POST 요청)
  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kakao_id: kakaoId,
          password: password, // 백엔드에서 반드시 해싱 필요
          location: `${sido} ${sigungu}`,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("회원가입이 완료되었습니다!");
        router.push("/login");
      } else {
        alert(`회원가입 실패: ${result.message}`);
      }
    } catch (err) {
      console.error("서버 오류:", err);
      alert("서버 오류로 인해 회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <button onClick={() => router.push("/")} className="text-black text-3xl font-bold">슈끌림</button>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")} className="text-black text-base">사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")} className="text-black text-base">이용 방법</button>
          <button
            onClick={() => {
              const nickname = localStorage.getItem("kakaoId");
              if (nickname) router.push("/mypage");
              else {
                alert("로그인이 필요합니다!");
                router.push("/login");
              }
            }}
            className="text-black text-base"
          >
            마이페이지
          </button>
          <button onClick={() => router.push("/place_recommend")} className="text-black text-base">장소 추천</button>
        </div>
      </div>

      {/* 제목 */}
      <div className="text-4xl font-bold text-center mt-10">회원 가입</div>

      {/* 입력 폼 */}
      <div className="flex flex-wrap gap-10 justify-center mt-10">
        <div className="flex flex-col gap-1">
          <label>카카오톡 ID</label>
          <input
            type="text"
            value={kakaoId}
            onChange={(e) => setKakaoId(e.target.value)}
            placeholder="카카오톡 ID를 입력하세요"
            className="w-64 p-2 border border-gray-400 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (8자 이상)"
            className="w-64 p-2 border border-gray-400 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>시/도 선택</label>
          <select
            value={sido}
            onChange={(e) => {
              setSido(e.target.value);
              setSigungu("");
            }}
            className="w-64 p-2 border border-gray-400 rounded"
          >
            <option value="">시/도를 선택하세요</option>
            {Object.keys(regions).map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {sido && (
          <div className="flex flex-col gap-1">
            <label>구/군/시 선택</label>
            <select
              value={sigungu}
              onChange={(e) => setSigungu(e.target.value)}
              className="w-64 p-2 border border-gray-400 rounded"
            >
              <option value="">선택하세요</option>
              {regions[sido].map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 약관 (프론트에서만 체크, 백엔드 저장 X) */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="mb-4 text-lg font-bold">이용 약관</div>

        <div className="h-48 border border-gray-400 p-4 overflow-y-auto text-sm mb-2">
          [필수] 슈끌림 이용약관 동의<br />
          ① 회원은 본 서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.<br />
          ② 타인 정보 도용 및 허위 정보 입력 금지.<br />
          ③ 제공 콘텐츠는 슈끌림의 자산이며 무단 복제 금지.<br />
          ④ 서비스 정책은 사전 공지 후 변경될 수 있습니다.
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" checked={terms1} onChange={() => setTerms1(!terms1)} />
          <span>이용약관에 동의합니다</span>
        </div>

        <div className="h-48 border border-gray-400 p-4 overflow-y-auto text-sm mb-2">
          [필수] 개인정보 수집 및 이용 동의<br />
          ① 수집 항목: 카카오톡 ID, 비밀번호, 거주지<br />
          ② 수집 목적: 매칭 서비스 제공<br />
          ③ 보유 기간: 회원 탈퇴 시까지 또는 법령에 따른 보존 기간까지<br />
          ④ 동의 거부 시 서비스 이용 제한 가능
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={terms2} onChange={() => setTerms2(!terms2)} />
          <span>개인정보 수집 및 이용에 동의합니다</span>
        </div>
      </div>

      {/* 가입 버튼 */}
      <div className="flex justify-center mt-10 mb-16">
        <button
          disabled={!canSubmit}
          onClick={handleSubmit}
          className={`w-60 h-12 rounded-lg text-xl font-bold ${
            canSubmit ? "bg-red-200 text-white" : "bg-gray-300 text-gray-500"
          }`}
        >
          회원가입 완료하기
        </button>
      </div>
    </div>
  );
}
