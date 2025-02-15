import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import { cn } from '@/lib/utils';

interface IEditorProps {
  onChange: (data: OutputData) => void;
  defaultData: OutputData;
  id?: string;
  className?: string;
  readOnly?: boolean;
}
interface IEditorRef {
  clear: () => void;
}

const initializeEditor = (
  editorRef: React.MutableRefObject<EditorJS | null>,
  didMountRef: React.MutableRefObject<boolean>,
  id: string | undefined,
  defaultData: OutputData,
  onChange: (data: OutputData) => void,
  readOnly: boolean,
) => {
  if (didMountRef.current) return;
  didMountRef.current = true;
  const editor = new EditorJS({
    holder: id,
    onReady: () => {
      editorRef.current = editor;
    },
    autofocus: true,
    placeholder: 'Enter description here.',
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
};

const Editor = forwardRef<IEditorRef, IEditorProps>(
  ({ onChange, defaultData, id, className, readOnly = false }, ref) => {
    const ejInstance = useRef<EditorJS | null>(null);
    const didMount = useRef(false);

    const initEditor = useCallback(() => {
      initializeEditor(
        ejInstance,
        didMount,
        id,
        defaultData,
        onChange,
        readOnly,
      );
    }, [defaultData, readOnly]);

    useEffect(() => {
      if (ejInstance.current === null) {
        initEditor();
      }
      return () => {
        if (ejInstance.current) {
          ejInstance.current.destroy();
          ejInstance.current = null;
          didMount.current = false;
        }
      };
    }, [readOnly]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        if (ejInstance.current) {
          ejInstance.current.clear();
        }
      },
    }));

    return (
      <div
        id={id}
        className={cn(
          'editorContent border w-full max-h-64 p-2 rounded-md overflow-y-scroll',
          className,
        )}
      ></div>
    );
  },
);

export default Editor;
