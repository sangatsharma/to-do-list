import React, { useEffect } from "react";
import { editorConfig } from "../../config/editorConfig";

interface EditorProps {
  id: string;
}

const Editor: React.FC<EditorProps> = ({ id }) => {
  useEffect(() => {
    editorConfig(id);
  }, []);

  return <div className="border p-4 mb-4 overflow-scroll h-32" id={id}></div>;
};

export default Editor;
