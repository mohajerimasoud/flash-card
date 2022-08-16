export enum EContentType {
  "ALL" = "ALL",
  "ACCOMPLISHED" = "ACCOMPLISHED",
  "TO_REVIEW" = "TO_REVIEW",
}

export enum EAnswerStatus {
  "IKnow" = "IKnow",
  "IDonntKnow" = "IDonntKnow",
}

export interface IWordType {
  createdDate: number;
  lastIssuedAt: number;
  failer: number;
  history: any[];
  id: string;
  success: number;
  translate: string;
  user: string;
  word: string;
}
