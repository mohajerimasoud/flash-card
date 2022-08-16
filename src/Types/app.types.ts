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
  failer: number;
  history: IWordHistory[];
  id: string;
  success: number;
  translate: string;
  user: string;
  word: string;
}
