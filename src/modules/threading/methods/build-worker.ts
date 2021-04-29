import { ParseThread } from "./parse-thread";
import { useAsFile } from "./use-as-file";

//WHEN YOU TRYING TO PUSH SPECIFIC FUNCTIONS IN YOUR THREAD YOU SHOULD USE THE FOLLOWING SYNTAX
//'@threadInject FUNCTION_INTHREAD_NAME #use FUNCTION'

export const BuildWorker = function (_worker: (() => void) | string) {
  return window.URL.createObjectURL(
    new Blob(
      [
        typeof _worker === "string"
          ? injectComments(useImportations(useAsFile(_worker)[0]))
          : ParseThread(_worker)[0],
      ],
      { type: "text/javascript" }
    )
  );
};

const useImportations = function (_workercode: string): string {
  _workercode.split("\n").forEach((line) => {
    if (line.indexOf("@threadInject") > -1) {
      _workercode = _workercode.replace(
        line.split("#use")[0] + "#use",
        "const " + line.split("@threadInject")[1].split("#use")[0] + " ="
      );
    }
  });

  return _workercode;
};

const injectComments = function (_workercode: string): string {
  return (
    `
//THREAD BUILT

const window  = Object.assign(self);
//DUPLICATING self OBJECT AS WINDOW IN CASE THE USER TRYNA USE THE WINDOW OBJECT TO DO SELF OBJECT THINGS

    ` + _workercode
  );
};
