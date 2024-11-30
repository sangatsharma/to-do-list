import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";

interface EditorProps {
  onChange: (data: OutputData) => void;
  defaultData: OutputData;
  id?: string;
  className?: string;
  readOnly?: boolean;
  shouldReset?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  defaultData,
  id,
  className,
  readOnly = false,
  shouldReset,
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
        const content = await editor.saver.save();
        console.log("Editor content on change:", content);
        onChange(content);
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
      // Ensure cleanup happens fully
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, [readOnly]);

  useEffect(() => {
    if (shouldReset) {
      ejInstance.current?.destroy();
      ejInstance.current = null;
      initEditor();
    }
  }, [shouldReset]);

  return (
    <div
      id={id}
      className={`editorContent border w-full ${readOnly?"h-64":"h-72"} p-2 rounded-md overflow-y-scroll ${className}`}
    ></div>
  );
};

export default Editor;
