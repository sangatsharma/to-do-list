import React, { useCallback, useEffect, useRef } from "react";
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
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  defaultData,
  id,
  className,
  readOnly = false,
}) => {
  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: id,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      placeholder: "Enter description here.",
      data: defaultData,
      onChange: async () => {
        const content = await editor.saver.save();
        console.log(JSON.stringify(content));
        onChange(content);
      },
      tools: {
        header: Header,
        list: List,
        image: ImageTool,
      },
      readOnly: readOnly,
    });
  }, [defaultData, readOnly]);

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

  // useEffect(() => {
  //   if (shouldReset) {
  //     ejInstance.current?.clear();
  //     ejInstance.current = null;

  //   }
  // }, [shouldReset]);

  return (
    <div
      id={id}
      className={`editorContent border w-full ${
        readOnly ? "h-64" : "h-72"
      } p-2 rounded-md overflow-y-scroll ${className}`}
    ></div>
  );
};

export default Editor;
