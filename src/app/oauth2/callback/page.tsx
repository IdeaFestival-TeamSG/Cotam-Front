import { Suspense } from "react";
import { CallbackPage } from "@/pageContainer";

const LoginCallbackPage = () => {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <CallbackPage />
    </Suspense>
  );
};
export default LoginCallbackPage;
