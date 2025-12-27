import { SetStateAction } from "react";
import { cn } from "@/lib";

const ProblemFilterIcon = ({
  text,
  isChecked,
  setChecked,
}: {
  text: string;
  isChecked: boolean;
  setChecked: React.Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-white hover:bg-black px-4 py-2 border cursor-pointer group",
        isChecked
          ? "bg-black"
          : "bg-white hover:bg-black",
      )}
      style={{ borderColor: "#000000" }}
      onClick={() => setChecked((prev) => 
        isChecked 
          ? prev.filter((item) => item !== text)
          : [...prev, text]
      )}
    >
      <span
        className={cn(
          "text-black group-hover:text-white text-sm font-light whitespace-nowrap",
          isChecked
          ? "text-white"
          : "hover:bg-black",
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default ProblemFilterIcon;
