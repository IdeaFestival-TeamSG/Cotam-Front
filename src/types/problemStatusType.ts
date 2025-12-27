import z from "zod";

export type ProblemStatusType = "PENDING" | "SOLVED" | "YET";

export type ProblemResponseType = {
  pendingProblemId?: string | number;
  title: string;
  status?: ProblemStatusType;
  description?: string;
};

export type ProblemComponentType = {
  pendingProblemId?: string | number;
  title: string;
  status?: ProblemStatusType;
  description?: string;
  place: "problem" | "profil";
};

export type ProblemComponentProps = ProblemComponentType;
