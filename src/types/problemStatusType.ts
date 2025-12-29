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
  solved: boolean;
};

export type ProblemComponentType = {
  problemId: number;
  title: string;
  difficulty: ProblemDifficultType;
  description?: string;
  place: "problem" | "profil";
  solved: boolean;
};

export type ProblemComponentProps = ProblemComponentType;
