"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FirstMeetPlaceRecommendPage() {
  const router = useRouter();
  const [placeList, setPlaceList] = useState(null);
  const [loading, setLoading] = useState(true);

  // 이미지 매핑 정보 (장소명 → 이미지 파일명)
  const imageMap = {
    "강남면옥 성수점 (한식)": "맛집.png",
    "ElPatio": "카페.png",
    "도화공간 (도자기 클래스)": "놀거리.png",
  };

  useEffect(() => {
    const dummyData = {
  area: "성수",   
  items: [
    {
      title: "강남면옥 성수점 (한식)",
      address: "서울 성동구 성수일로 77",
      reason: "전통적인 맛을 살린 면 요리 전문점으로, 깔끔한 한식 데이트를 원하는 커플에게 적합합니다."
    },
    {
      title: "가조쿠 (일식)",
      address: "서울 성동구 연무장길 31-2",
      reason: "정갈한 분위기의 일본 가정식 식당으로, 조용하고 안정적인 분위기를 선호하는 커플에게 추천합니다."
    },
    {
      title: "갓잇 성수점 (양식)",
      address: "서울 성동구 연무장7가길 10",
      reason: "캐주얼한 분위기에서 즐기는 다양한 양식 메뉴로, 부담 없이 즐기기 좋은 데이트 장소입니다."
    },
    {
      title: "ElPatio",
      address: "서울 성동구 성수동1가 16-30",
      reason: "조용하고 따뜻한 분위기의 브런치 카페로, 대화에 집중하고 싶은 커플에게 추천합니다."
    },
    {
      title: "카페 어니언 성수",
      address: "서울 성동구 아차산로9길 8",
      reason: "성수 감성을 대표하는 공간으로, 넓은 테라스와 감각적인 베이커리가 인상적인 커플 데이트 장소입니다."
    },
    {
      title: "SADDLERHAUS 성수2호점",
      address: "서울 성동구 성수동2가 333-97",
      reason: "빈티지한 인테리어와 고요한 분위기가 어우러진 감성 카페로, 레트로 감성을 좋아하는 커플에게 제격입니다."
    },
    {
      title: "도화공간 (도자기 클래스)",
      address: "서울 성동구 왕십리로 115",
      reason: "직접 도자기를 빚어보는 체험형 클래스 공간으로, 특별한 추억을 만들고 싶은 커플에게 추천합니다."
    },
    {
      title: "서울숲",
      address: "서울 성동구 뚝섬로 273",
      reason: "도심 속 자연을 만끽할 수 있는 공원으로, 산책이나 피크닉을 즐기기에 안성맞춤입니다."
    },
    {
      title: "플라츠서울",
      address: "서울 성동구 연무장길 76",
      reason: "복합 문화 공간으로 다양한 전시와 체험이 가능해, 예술과 문화를 함께 즐기고 싶은 커플에게 적합합니다."
    }
  ]
};

    setPlaceList(dummyData);
    setLoading(false);
  }, []);

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
          거주지 기반 소개팅 장소 추천
        </h1>
      </div>

      <div className="flex justify-center -mt-40">
        <h2 className="text-black text-center text-base font-normal leading-[48px]">
          매칭된 커플의 거주지를 기반으로 만나기 좋은 핫플을 기준으로 소개팅 장소를 추천합니다
        </h2>
      </div>

      {/* 카드 영역 */}
      <div className="px-64 absolute left-0 top-[300px] w-full flex justify-center">
        <div className="w-[931px] min-h-[1200px] bg-rose-50 rounded-[30px] p-10 relative">
          <div className="w-48 h-9 bg-black/5 rounded-md mx-auto mb-8 flex items-center justify-center absolute -top-6 left-1/2 -translate-x-1/2 -mt-5">
            <div className="text-black text-3xl font-normal">{placeList?.area}</div>
          </div>
          {loading ? (
            <div className="text-center text-gray-500 mt-12">추천 정보를 불러오는 중입니다...</div>
          ) : (
            <div className="flex flex-col pt-6">
              {placeList?.items.map((place, idx) => (
                <div
                  key={idx}
                  className={`flex gap-6 items-center ${
                    idx === 3 || idx === 6 ? "mt-16" : "mt-4"
                  }`}
                >
                  <div className="min-w-[6rem]">
                    {imageMap[place.title] && (
                      <img
                        src={`/${imageMap[place.title]}`}
                        alt={place.title}
                        className="w-24 h-24 rounded-md object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-xl font-bold mb-1">{place.title}</div>
                    <div className="text-base font-normal mb-1">주소: {place.address}</div>
                    <div className="text-base font-normal text-black/80">
                      추천 이유: {place.reason}
                    </div>
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