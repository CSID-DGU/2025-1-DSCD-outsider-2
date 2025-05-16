"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FirstMeetPlaceRecommendPage() {
  const router = useRouter();
  const [placeList, setPlaceList] = useState(null);
  const [loading, setLoading] = useState(true);

  // 이미지 매핑 정보 (장소명 → 이미지 파일명)
  const imageMap = {
    "유어다이닝 (양식)": "맛집.png",
    "이퀄커피": "카페.png",
    "망원 한강 공원": "놀거리.png",
  };

  useEffect(() => {
    const dummyData = {
      area: "망원",
      items: [
        {
          title: "유어다이닝 (양식)",
          address: "서울 마포구 망원동 398-15",
          reason: "조용하고 감성적인 공간에서 분위기 있는 식사에 적합",
        },
        {
          title: "엔징바 (이자카야)",
          address: "서울 마포구 망원동 416-14",
          reason: "진지한 대화를 나누며 술과 함께 식사하기 좋은 감각적인 바",
        },
        {
          title: "화월 (한식/일식)",
          address: "서울 마포구 망원동 395-4",
          reason: "소소한 요리를 즐기며 편하게 대화 나누기 좋은 따뜻한 분위기의 맛집",
        },
        {
          title: "이퀄커피",
          address: "서울특별시 마포구 망원동 412-50",
          reason: "산책 후 여유 있게 머물기 좋은 정적이고 평온한 공간으로, 두 사람 모두에게 휴식과 대화를 위한 이상적인 분위기를 제공",
        },
        {
          title: "오프넌",
          address: "서울특별시 마포구 망원동 415-29",
          reason: "예술 감상 후 여운을 나누기에 적합한 감성적인 무드의 카페로, 공통 취향을 공유하기 좋음",
        },
        {
          title: "로우머",
          address: "서울특별시 마포구 망원동 57-179",
          reason: "집처럼 편안한 분위기에서 자연스럽게 대화를 나누며 머물기 좋음",
        },
        {
          title: "망원 한강 공원",
          address: "서울특별시 마포구 마포나루길 467",
          reason: "두 사람 모두 자연 속 걷기를 즐기는 점을 반영하여 산책 기반 데이트 장소로 적합",
        },
        {
          title: "서울함 공원",
          address: "서울특별시 마포구 마포나루길 407",
          reason: "전시된 함정을 관람하며 강변을 따라 천천히 걸을 수 있어 산책과 예술 감상이 자연스럽게 어우러짐",
        },
        {
          title: "간격 드로잉스페이스",
          address: "서울특별시 마포구 월드컵로23길 20 망원빌 4층",
          reason: "그림을 그리는 취미를 함께 나누기에 적합한 체험형 공간으로, 공통 관심사를 공유할 수 있음",
        },
      ],
    };

    setPlaceList(dummyData);
    setLoading(false);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-40">
      {/* 상단바 */}
      <div className="w-full px-14 py-5 flex justify-between items-center border-b border-gray-300">
        <div className="text-black text-3xl font-bold">슈끌림</div>
        <div className="flex gap-12">
          <button className="text-black">사이트 소개</button>
          <button className="text-black">이용 방법</button>
          <button onClick={() => router.push("/mypage")}>마이페이지</button>
          <button onClick={() => router.push("/place_recommend")}>장소 추천</button>
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