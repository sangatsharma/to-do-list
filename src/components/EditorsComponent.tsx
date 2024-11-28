import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const EditorComponent: React.FC = () => {

  const editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    autofocus: true,
    tools: {
      header: Header,
      list: List,
    },
    holder: "editorjs",
  });

  const editorConfig = async () => {
    try {
      await editor.isReady;
      console.log("Editor.js is ready to work!");
      /** Do anything you need after editor initialization */
    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`);
    }
  };

  useEffect(() => {
    editorConfig();
  }, []);

  return (
    <div className="h-46 w-46">
      <div id="editorjs" className="border p-4 mb-4"></div>
    </div>
  );
};
export default EditorComponent;
