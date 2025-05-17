"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Signup() {
  const router = useRouter();

  // 상태 관리
  const [kakaoId, setKakaoId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);

  const canSubmit = terms1 && terms2;

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

  const handleMyPageClick = () => {
    const isLoggedIn = !!localStorage.getItem("nickname");
    if (isLoggedIn) {
      router.push("/mypage");
    } else {
      alert("로그인을 해야 이용할 수 있습니다!");
      router.push("/login");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")} className="text-black text-base cursor-pointer">사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")} className="text-black text-base cursor-pointer">이용 방법</button>
          <button onClick={handleMyPageClick} className="text-black text-base cursor-pointer">마이페이지</button>
          <button onClick={() => router.push("/place_recommend")} className="text-black text-base cursor-pointer">장소 추천</button>
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
            placeholder="비밀번호를 입력하세요 (최소 8자 이상)"
            className="w-64 p-2 border border-gray-400 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="사용할 닉네임을 입력하세요"
            className="w-64 p-2 border border-gray-400 rounded"
          />
        </div>

        {/* 시/도 선택 */}
        <div className="flex flex-col gap-1">
          <label>시/도 선택</label>
          <select
            value={sido}
            onChange={(e) => {
              setSido(e.target.value);
              setSigungu(""); // 시/도 바뀌면 구 초기화
            }}
            className="w-64 p-2 border border-gray-400 rounded"
          >
            <option value="">시/도를 선택하세요</option>
            {Object.keys(regions).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* 구/군/시 선택 */}
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
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 약관 */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="mb-4 text-lg font-bold">이용 약관</div>

        <div className="h-48 border border-gray-400 p-4 overflow-y-auto text-sm mb-4">
          [필수] 슈끌림 이용약관 동의 <br />
          ① 회원은 본 서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다. <br />
          ② 회원가입 시 입력한 정보는 본 서비스 이용에 필요한 최소한의 정보입니다. <br />
          ③ 타인 정보 도용 및 허위 정보 입력 금지. <br />
          ④ 제공 콘텐츠는 슈끌림의 자산이며 무단 복제 금지. <br />
          ⑤ 서비스 정책은 사전 공지 후 변경될 수 있습니다.
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" checked={terms1} onChange={() => setTerms1(!terms1)} />
          <span>이용약관에 동의합니다</span>
        </div>

        <div className="h-48 border border-gray-400 p-4 overflow-y-auto text-sm mb-4">
          [필수] 개인정보 수집 및 이용 동의 <br />
          ① 수집 항목: 카카오톡 ID, 비밀번호, 성별, 거주지 <br />
          ② 수집 목적: 회원가입, 본인 인증, 매칭 서비스 제공 <br />
          ③ 보유 및 이용 기간: 회원 탈퇴 시까지 또는 법령에 따른 보존 기간까지 <br />
          ④ 동의 거부 시 서비스 이용 제한 가능.
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" checked={terms2} onChange={() => setTerms2(!terms2)} />
          <span>개인정보 수집 및 이용에 동의합니다</span>
        </div>
      </div>

      {/* 가입 버튼 */}
      <div className="flex justify-center mt-8 mb-16">
        {canSubmit ? (
          <button
            onClick={() => {
              localStorage.setItem("nickname", nickname);
              localStorage.setItem("location", `${sido} ${sigungu}`);
              window.location.href = "/login";
            }}
            className="w-60 h-12 bg-red-200 rounded-lg text-white text-xl font-bold"
          >
            회원가입 완료하기
          </button>
        ) : (
          <button
            disabled
            className="w-60 h-12 bg-gray-300 rounded-lg text-white text-xl font-bold"
          >
            회원가입 완료하기
          </button>
        )}
      </div>
    </div>
  );
}