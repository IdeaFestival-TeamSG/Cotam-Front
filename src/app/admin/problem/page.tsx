import { Suspense } from "react";
import AdminProblemPage from "@/pageContainer/adminProblemPage";

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminProblemPage />
        </Suspense>
    );
};

export default Page;
