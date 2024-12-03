import { TPostResponse } from "@/types/tanstackQuery.types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const fetchPage = async (pageParam: number): Promise<TPostResponse> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useInfiniteScroll = () => {
  return useInfiniteQuery({
    queryKey: ["items"],
    queryFn: ({ pageParam = 1 }) => fetchPage(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.length + 1,
  });
};
