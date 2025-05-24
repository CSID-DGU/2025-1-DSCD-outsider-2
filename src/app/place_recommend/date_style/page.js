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
          title: "미미면가 신사점 (일식)",
          address: "서울 강남구 압구정로4길 17",
          reason:
            "차분하고 섬세한 분위기를 중시하는 커플에게 추천되는 조용한 우동 전문점입니다.",
        },
        {
          title: "우래옥 (한식)",
          address: "서울 중구 창경궁로 62-29",
          reason:
            "1946년 개업한 유서 깊은 평양냉면 전문점으로, 전통 한식을 즐기고 싶은 커플에게 추천합니다.",
        },
        {
          title: "청진옥 (한식)",
          address: "서울 종로구 종로 192",
          reason:
            "70년 전통의 해장국 전문점으로, 깊은 국물 맛을 선호하는 커플에게 적합합니다.",
        },
        {
          title: "할아버지공장",
          address: "서울 성동구 연무장길 17",
          reason:
            "감성 가득한 인더스트리얼 분위기. 빈티지 인테리어와 조용한 분위기를 선호하는 감성 커플에게 추천.",
        },
        {
          title: "테일러커피 연남점",
          address: "서울 마포구 성미산로 161-10",
          reason:
            "고소한 라떼가 유명한 로스터리 카페. 커피 맛에 진심인 커플에게 적합.",
        },
        {
          title: "레드브릭",
          address: "서울 용산구 이태원로 264",
          reason:
            "커피와 와인 모두 가능한 공간. 낮과 밤 모두 데이트 장소로 적합한 유연한 성향 커플에게 좋음.",
        },
        {
          title: "도화공간 (도자기 클래스)",
          address: "서울 성동구 왕십리로 115",
          reason:
            "나만의 컵을 만들 수 있는 도예 체험. 손으로 만드는 걸 좋아하는 따뜻한 커플에게 추천.",
        },
        {
          title: "빛의 시어터 (디지털 미디어 전시)",
          address: "서울 광진구 능동로 216 (어린이대공원역 인근)",
          reason:
            "몰입형 미디어 아트 전시. 몽환적이고 감성적인 분위기를 좋아하는 커플에게 추천.",
        },
        {
          title: "마드센트 이태원 (방향제 클래스)",
          address: "서울 용산구 회나무로13가길 23",
          reason:
            "커플의 취향을 담은 향기를 함께 만들며 추억을 쌓기 좋은 활동. 감각적인 커플에게 적합.",
        },
      ],
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
