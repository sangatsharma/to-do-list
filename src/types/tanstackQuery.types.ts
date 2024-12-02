export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type TPostResponse = TPost[];

export type TPageData = {
  items: TPost[];
  previousCursor?: number;
  nextCursor?: number;
};
