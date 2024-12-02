import { useInfiniteScroll } from "@/utils/apiFunction";
import { useEffect } from "react";

const InfiniteScroll = () => {
  const { data, fetchNextPage, hasNextPage, isFetching} =
    useInfiniteScroll();
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
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
      {isFetching && <p className="my-5 text-center">Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
