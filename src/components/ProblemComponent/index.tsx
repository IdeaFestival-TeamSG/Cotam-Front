import { useRouter } from "next/navigation";
import { ProblemComponentProps } from "@/types";
import { DifficultyLevel } from "@/components";

const ProblemComponent = ({
  problemId,
  title,
  description,
  difficulty,
  place,
  solved
}: ProblemComponentProps) => {
  const router = useRouter();

  return (
    <div
      className="px-4 py-3 w-[32.25rem] h-[4.25rem] flex flex-col border border-solid border-[#B0B5B0] cursor-pointer"
      onClick={() => router.push(`/problem/${problemId}`)}
    >
      <div className="text-base not-italic font-semibold leading-[140%]">
        {title}
      </div>
      <div className="flex justify-between w-full items-center">
        <p className="text-[#717872]">{description}</p>
        <div>
          <p className={`text-[#717872] ${solved ? "text-[#32AB7B]" : "text-[#FF5555]"}`}>{solved ? "해결" : "미해결"}</p>
          <DifficultyLevel difficult={difficulty} /></div>
      </div>
    </div>
  );
};

export default ProblemComponent;
