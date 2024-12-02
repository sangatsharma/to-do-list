import React, { useCallback, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import { cn } from "@/lib/utils";

interface EditorProps {
  onChange: (data: OutputData) => void;
  defaultData: OutputData;
  id?: string;
  className?: string;
  readOnly?: boolean;
  editorKey?: string;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  defaultData,
  id,
  className,
  readOnly = false,
  editorKey,
}) => {
  const ejInstance = useRef<EditorJS | null>(null);
  const initEditor = useCallback(() => {
    if (ejInstance.current) {
      return;
    }
    const editor = new EditorJS({
      holder: id,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      // placeholder: "Enter description here.",
      data: defaultData,
      onChange: async () => {
        const content = await editor.saver.save();
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

  // Destroy and reinitialize editor when editorKey changes
  useEffect(() => {
    if (ejInstance.current) {
      ejInstance.current.destroy();
      ejInstance.current = null;
    }
    initEditor();
  }, [editorKey]);

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

  return (
    <div
      id={id}
      className={cn(
        "editorContent border w-full max-h-64 p-2 rounded-md overflow-y-scroll",
        className
      )}
    ></div>
  );
};

export default Editor;
