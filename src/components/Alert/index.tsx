import { cn } from "@/lib";

type AlertProps = {
  visible: boolean;
  header: string;
  message: string;
  close: () => void;
};

const Alert = ({ visible, header, message, close }: AlertProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 flex flex-col gap-4 w-[320px] shadow-lg">
        <h3 className="text-xl font-bold text-black">{header}</h3>
        <p className="text-gray-600 whitespace-pre-wrap">{message}</p>
        <div className="flex justify-end mt-2">
          <button
            onClick={close}
            className={cn(
              "px-6 py-2 rounded-lg font-semibold text-white transition-colors",
              header === "성공" ? "bg-[#32AB7B] hover:bg-[#2a9369]" : "bg-red-500 hover:bg-red-600"
            )}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
