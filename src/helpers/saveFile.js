import { saveAs } from "file-saver";

export const saveFile = (url, name) => {
    saveAs(
        url,
        name
    );
  };