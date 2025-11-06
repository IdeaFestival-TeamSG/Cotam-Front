import { Button } from "@/components/ui/button";
import { cn } from "@/lib";

const HomePage = () => {
  return (
    <div
      className={cn(
        "flex",
        "w-screen",
        "h-screen",
        "justify-center",
        "items-center"
      )}
    >
      <Button variant={"default"}>detault</Button>
      <Button variant={"destructive"}>detault</Button>
      <Button variant={"ghost"}>detault</Button>
      <Button variant={"link"}>detault</Button>
      <Button variant={"outline"}>detault</Button>
    </div>
  );
};

export default HomePage;
