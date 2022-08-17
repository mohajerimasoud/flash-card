export enum EContentType {
  "ALL" = "ALL",
  "ACCOMPLISHED" = "ACCOMPLISHED",
  "TO_REVIEW" = "TO_REVIEW",
}

export enum EAnswerStatus {
  "IKnow" = "IKnow",
  "IDonntKnow" = "IDonntKnow",
}

export interface IWordHistory {
  issuedAt: number;
  status: EAnswerStatus;
}
export interface IWordType {
  createdDate: number;
  lastIssuedAt: number;
  reviewState: boolean;
  failer: number;
  history: IWordHistory[];
  id: string;
  success: number;
  translate: string;
  user: string;
  word: string;
}

export const miliSecondsOfOneDay = 86400000; // 24 * 60 * 60 * 1000
