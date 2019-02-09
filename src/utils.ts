import { DEFAULT_TITLE } from "./common";
import { docs, DocumentSelector } from "./docs";

export function joinPath(...paths: string[]): string {
  return paths.join("/").replace(/(?<!https?:)\/+/g, "/");
}

export function toPath(selector: DocumentSelector) {
  return "/" + selector.docNo + "/" + selector.seqNo;
}

export function setTitle(selector: DocumentSelector) {
  if (selector.docNo >= 0) {
    const doc = docs[selector.docNo];
    document.title = doc.name + " " + doc.sequences[selector.seqNo].name;
    console.log(document.title);
  } else {
    document.title = DEFAULT_TITLE;
  }
}

const PATH_REGEX = /^\/(\d+)(?:\/(\d+))?/;
export function parsePathAndSetTitle(path: string): DocumentSelector {
  let selector: DocumentSelector;
  const result = path.match(PATH_REGEX);
  if (result) {
    const docNo =
      result.length > 1 && result[1] !== undefined
        ? parseInt(result[1], 10)
        : -1;
    const seqNo =
      result.length > 2 && result[2] !== undefined
        ? parseInt(result[2], 10)
        : 0;
    if (docNo < 0 || docNo >= docs.length) {
      selector = {
        docNo: -1,
        seqNo: 0,
      };
    } else if (seqNo < 0 && seqNo >= docs[docNo].sequences.length) {
      selector = {
        docNo,
        seqNo,
      };
    } else {
      selector = {
        docNo,
        seqNo: 0,
      };
    }
  } else {
    selector = {
      docNo: -1,
      seqNo: 0,
    };
  }
  setTitle(selector);
  return selector;
}
