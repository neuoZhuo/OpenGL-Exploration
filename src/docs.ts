import { SOURCE_PREFIX } from "./common";
import { joinPath } from "./utils";

export interface IDocument {
  name: string;
  url: string;
  sequences: Array<{
    name: string;
    url: string;
  }>;
}

declare const DOCS: IDocument[];
export const docs: IDocument[] = DOCS;

export interface DocumentSelector {
  docNo: number;
  seqNo: number;
}
