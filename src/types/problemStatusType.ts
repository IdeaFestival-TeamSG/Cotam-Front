import z from "zod";
import { ProblemDifficultType } from ".";

export type ProblemStatusType = "PENDING" | "SOLVED" | "YET";

export type ProblemResponseType = {
    problemId: number;
  title: string;
  status?: ProblemStatusType;
  description?: string;
  solveCount: number;
  submitCount:  number
  difficulty: ProblemDifficultType;
};

export type ProblemComponentType = {
  problemId: number;
  title: string;
  difficulty: ProblemDifficultType;
  description?: string;
  place: "problem" | "profil";
};

export type ProblemComponentProps = ProblemComponentType;
