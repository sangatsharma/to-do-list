import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";

interface EditorProps {
  onChange: (data: any) => void;
  defaultData: OutputData;
  id?: string;
  className?: string;
  readOnly?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  defaultData,
  id,
  className,
  readOnly = false,
}) => {
  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: id,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: defaultData,
      onChange: async () => {
        let content = await editor.saver.save();
        onChange(content);
        console.log(content);
      },
      tools: {
        header: Header,
        list: List,
        image: ImageTool,
      },
      readOnly: readOnly,
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [readOnly]);

  return (
    <div
      id={id}
      className={`border w-full h-64 p-2 rounded-md overflow-y-scroll ${className}`}
    ></div>
  );
};

export default Editor;
