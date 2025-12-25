"use client";

import Image from "next/image";
import { MainHoverComponent } from "@/components";
import { cn } from "@/lib";

const HomePage = () => {
  const upText = ["COTAM", "Version-Alpha 1.0", "Algorithm Test"];
  const downText = ["Find Error", "Coding Test", "For Developer"];

  return (
    <div
      className={cn(
        "w-screen h-screen flex justify-center items-center pl-50 gap-40",
      )}
    >
      <div className="h-[38.125rem] w-[25.75rem] flex flex-col gap-[14.25rem] pt-[2.63rem]">
        <div className="flex flex-col gap-[1.44rem]">
          <div className="flex flex-col gap-[2.06rem]">
            <img src="/CotamMainLogo.png" alt="로고" />
            <div className="w-full h-0.5 bg-black" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {upText.map((x) => (
                <MainHoverComponent text={x} key={x} />
              ))}
            </div>
            <div className="flex gap-1 justify-end">
              {downText.map((x) => (
                <MainHoverComponent text={x} key={x} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="text-sm">
              코탐(COTAM)은 코딩탐정단의 약자입니다. 저희는 코드 속에 숨은
              오류를
              <br /> 빠르게 식별하고 정확하게 해결하는 실전 중심 코딩테스트를
              제공합니다.
              <br />
              불필요한 설명을 최소화하고, 실제 문제 해결 능력을 직접적으로
              검증합니다.
            </p>
          </div>
          <div>
            <p className="text-sm">
              <p className="text-sm text-[#42C290] p-0">
                실행 속도, 정확성, 효율성
              </p>
              저희 코탐은 이 세 가지 기준으로 개발자를 평가합니다. 코탐과 함께
              여러가지 사건을 해결해보세요.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Image src="/mainPageImg.png" alt="이미지" width={633} height={610} />
      </div>
    </div>
  );
};

export default HomePage;
