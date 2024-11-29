import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

export const editorConfig = async (id: string) => {
  try {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      autofocus: true,
      tools: {
        header: Header,
        list: List,
      },
      data: {
        blocks: [],
      },
      holder: "editor-content",
      onChange: (data) => {
        console.log("Editor.js data: ", data);
      },
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
    });

    /** Do anything you need after editor initialization */
  } catch (reason) {
    console.log(`Editor.js initialization failed because of ${reason}`);
  }
};
