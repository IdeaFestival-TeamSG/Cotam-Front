import { useRouter } from "next/navigation";
import { ProblemComponentProps } from "@/types";
import { ProblemStatusType } from "@/types/problemStatusType";

const ProblemComponent = ({
  pendingProblemId,
  title,
  description,
  status,
  place,
}: ProblemComponentProps) => {
  const router = useRouter();

  const getStatusText = (status: ProblemStatusType) => {
    switch (status) {
      case "PENDING":
        return "대기중";
      case "SOLVED":
        return "해결";
      case "YET":
        return "미해결";
      default:
        return status;
    }
  };

  const getStatusColor = (status: ProblemStatusType) => {
    switch (status) {
      case "PENDING":
        return "#DEA343";
      case "SOLVED":
        return "#32AB7B";
      case "YET":
        return "#FF3B55";
      default:
        return status;
    }
  };

  return (
    <div
      className="px-4 py-3 w-[32.25rem] h-[4.25rem] flex flex-col border border-solid border-[#B0B5B0] cursor-pointer"
      onClick={() => router.push(`/problem/${pendingProblemId}`)}
    >
      <div className="text-base not-italic font-semibold leading-[140%]">
        {title}
      </div>
      <div className="flex justify-between  w-full">
        <p className="text-[#717872]">{description}</p>
        {place === "profil" ? (
          <p style={{ color: getStatusColor(status!) }}>
            {getStatusText(status!)}
          </p>
        ) : (
          <p className="text-[#717872]">{getStatusText(status!)}</p>
        )}
      </div>
    </div>
  );
};

export default ProblemComponent;
