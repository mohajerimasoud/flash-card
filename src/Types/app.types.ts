export enum EContentType {
  "ALL" = "ALL",
  "ACCOMPLISHED" = "ACCOMPLISHED",
  "TO_REVIEW" = "TO_REVIEW",
}

export interface IWordType {
  createdDate: number;
  failer: number;
  history: any[];
  id: string;
  success: number;
  translate: string;
  user: string;
  word: string;
}
