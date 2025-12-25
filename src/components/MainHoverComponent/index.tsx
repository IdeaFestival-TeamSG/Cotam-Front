import { cn } from "@/lib";

const MainHoverComponent = ({ text }: { text: string }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-white hover:bg-black px-4 py-2 border cursor-pointer group",
      )}
      style={{ borderColor: "#000000" }}
    >
      <span
        className={cn(
          "text-black group-hover:text-white text-sm font-light whitespace-nowrap",
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default MainHoverComponent;
