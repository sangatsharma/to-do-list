import { useInfiniteScroll } from "@/utils/apiFunction";
import { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteScroll();
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  console.log(data);
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore();
      }
    };
    if (!hasNextPage) {
      window.removeEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  // Check for insufficient content and load more
  useEffect(() => {
    const checkContentHeight = () => {
      if (
        document.body.offsetHeight < window.innerHeight &&
        hasNextPage &&
        !isFetching
      ) {
        fetchNextPage();
      }
    };
    checkContentHeight();
  }, [data, hasNextPage, isFetching]);

  return (
    <div className="flex flex-col gap-2 p-4 m-2 justify-center items-center">
      {data?.pages.flat().map((item, index) => (
        <div
          key={index}
          className="flex flex-col border md:mx-16 p-2 rounded-md w-full text-left"
        >
          <p className="md:text-2xl text-xl underline">
            {index + 1}-{item.title}
          </p>
          <p>{item.body}</p>
        </div>
      ))}

      {isFetchingNextPage && (
        <p className="my-5 text-center">Loading more...</p>
      )}
      {isFetching && <p className="my-5 text-center">Loading more...</p>}
    </div>
  );
};

export default InfiniteScroll;
