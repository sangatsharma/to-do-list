export type Meta = {
  counterType?: string;
  start?: number | undefined;
};

export type Items = {
  content: string;
  meta?: { checked?: boolean };
  items?: any;
};

export type EditorJsData = {
  time: number;
  blocks: BlockData[];
  version: string;
};

export type BlockData = {
  id: string;
  type: BlockType;
  data: BlockContent;
};

export type BlockType = string;

export type BlockContent = {
  text?: string;
  level?: number;
  style?:string;
  items?: Items[];
  meta?: Meta;
};
