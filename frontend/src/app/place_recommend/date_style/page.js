"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DateStylePlaceRecommendPage() {
  const router = useRouter();
  const [placeList, setPlaceList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = {
  items: [
    {
      title: "죠니스 버거 (양식)",
      address: "서울 관악구 신림로65길 10",
      reason: "아메리칸 다이너 분위기의 수제버거 맛집으로, 캐주얼한 분위기를 즐기는 커플에게 추천합니다."
    },
    {
      title: "희옥 (일식)",
      address: "서울 마포구 월드컵로19길 74",
      reason: "정갈한 분위기에서 즐기는 일본 가정식으로, 차분하고 섬세한 데이트를 원하는 커플에게 적합합니다."
    },
    {
      title: "한가네숯불닭갈비 (한식)",
      address: "서울 강남구 테헤란로55길 15",
      reason: "활기찬 분위기에서 함께 구워 먹는 닭갈비로, 유쾌한 시간을 보내고 싶은 커플에게 어울립니다."
    },
    {
      title: "비단콤마브런치",
      address: "서울특별시 동작구 상도동 535 상가 A동 107호",
      reason: "분위기 좋은 인테리어와 브런치 메뉴로 여유로운 주말 데이트에 적합한 감성 공간입니다."
    },
    {
      title: "도즈렛커피",
      address: "서울시 영등포구 도림동 80-26",
      reason: "감성적인 인테리어와 향긋한 커피가 어우러진 공간으로, 분위기를 중시하는 커플에게 추천합니다."
    },
    {
      title: "카페블루웨일",
      address: "서울 송파구 송파동 27-12 윤창빌딩 1층",
      reason: "예쁜 디저트와 포토존이 가득한 공간으로, 인스타 감성을 함께 즐기고 싶은 커플에게 제격입니다."
    },
    {
      title: "리얼월드 성수 (이색체험)",
      address: "서울특별시 성동구 연무장13길 8",
      reason: "방 탈출과 게임형 체험이 가능한 공간으로, 색다른 추억을 만들고 싶은 커플에게 추천합니다."
    },
    {
      title: "봉화산(서울) (휴식하기)",
      address: "서울특별시 중랑구 신내로21길 (신내동)",
      reason: "가볍게 오를 수 있는 도심 속 산책 코스로, 조용히 자연을 즐기며 걷고 싶은 커플에게 적합합니다."
    },
    {
      title: "아트선재센터 (전시)",
      address: "서울특별시 종로구 율곡로3길 87 (소격동)",
      reason: "현대미술을 가까이에서 감상할 수 있는 전시공간으로, 예술 감성을 공유하고 싶은 커플에게 추천합니다."
    }
  ]
};


    setPlaceList(dummyData);
    setLoading(false);
  }, []);

  const imageMap = {
    0: "맛집.png",
    3: "카페.png",
    6: "놀거리.png",
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-40">
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

      {/* 타이틀 */}
      <div className="flex justify-center -mt-20">
        <h1 className="text-red-400 text-4xl font-bold leading-[48px]">
          성향 기반 데이트 장소 추천
        </h1>
      </div>

      <div className="flex justify-center -mt-40">
        <h2 className="text-black text-center text-base font-normal leading-[48px]">
          자기소개서를 분석해 매칭된 커플에게 어울리는 장소를 추천합니다
        </h2>
      </div>

      {/* 카드 영역 */}
      <div className="px-64 absolute left-0 top-[300px] w-full flex justify-center">
        <div className="w-[931px] bg-rose-50 rounded-[30px] p-10 relative">
          {loading ? (
            <div className="text-center text-gray-500 mt-12">
              추천 정보를 불러오는 중입니다...
            </div>
          ) : (
            <div className="flex flex-col pt-6">
              {placeList?.items.map((place, idx) => (
                <div
                  key={idx}
                  className={`flex gap-6 items-center ${idx === 3 || idx === 6 ? "mt-16" : "mt-4"}`}
                >
                  <div className="min-w-[6rem]">
                    {imageMap[idx] && (
                      <img
                        src={`/${imageMap[idx]}`}
                        alt={`img-${idx}`}
                        className="w-24 h-24 rounded-md object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-xl font-bold mb-1">{place.title}</div>
                    <div className="text-base font-normal mb-1">주소: {place.address}</div>
                    <div className="text-base font-normal text-black/80">추천 이유: {place.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
