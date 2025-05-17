"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Mypage() {
  const router = useRouter();

  // 회원가입 또는 로그인 시 저장했던 닉네임 불러오기
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname") || "회원";
    setNickname(savedNickname);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white relative">

      {/* ----- 상단바 ----- */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12">
          <button onClick={() => router.push("/site_intro")}>사이트 소개</button>
          <button onClick={() => router.push("/how_to_use")}>이용 방법</button>
          <button onClick={() => router.push("/mypage")}>마이페이지</button>
          <button onClick={() => router.push("/place_recommend")}>장소 추천</button>
        </div>
      </div>

      {/* ----- 타이틀 ----- */}
      <div className="w-[858px] text-center mx-auto gap-4 mt-16">
        <div className="text-4xl font-bold">마이페이지</div>
        <div className="text-3xl text-center font-medium">
          {nickname}님 반가워요!<br />
          지금 바로 시작해보세요
        </div>
      </div>

      {/* ----- 버튼 영역 ----- */}
      <div className="w-full flex justify-center mt-20">
        <div className="grid grid-cols-2 gap-16">

          {/* 오늘의 매칭 결과 */}
          <button onClick={() => router.push("/matching_result")}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-black/5 rounded-full flex justify-center items-center">
                <img src="/매칭결과보기.png" alt="매칭 결과" />
              </div>
              <div className="text-xl">오늘의 매칭 결과</div>
              <div className="text-base text-black/50 text-center">매칭된 상대의 프로필을 확인해보세요!</div>
            </div>
          </button>

          {/* 소개팅 신청하기 */}
          <button onClick={() => alert("소개팅 신청 이동")}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-black/5 rounded-full flex justify-center items-center">
                <img src="/소개팅신청하기.png" alt="소개팅 신청" />
              </div>
              <div className="text-xl">소개팅 신청하기</div>
              <div className="text-base text-black/50 text-center">
                소개팅을 신청해서 <br /> 새로운 인연을 만나보세요!
              </div>
            </div>
          </button>

          {/* 자기소개서 작성 */}

          <button onClick={() => router.push("/self_intro/self_intro1")}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-black/5 rounded-full flex justify-center items-center">
                <img src="/자기소개서작성.png" alt="자기소개서" />
              </div>
              <div className="text-xl">자기소개서 작성</div>
              <div className="text-base text-black/50 text-center">
                작성/수정하고 <br /> 새로운 인연을 만나보세요!
              </div>
            </div>
          </button>

          {/* 수락한 상대 확인 */}
          <button onClick={() => router.push("/partner_info")}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-black/5 rounded-full flex justify-center items-center">
                <img src="/내정보수정.png" alt="수락한 상대 확인" />
              </div>
              <div className="text-xl">수락한 상대 확인</div>
              <div className="text-base text-black/50 text-center">서로 수락한 경우,<br/>다음 날 오전 8시에 카카오톡 ID가 공개돼요</div>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
