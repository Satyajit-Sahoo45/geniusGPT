"use client";

import React from "react";
import Searchbar from "../../../../components/Searchbar";
import PodcastCard from "../../../../components/PodcastCard";

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  return (
    <div className="flex flex-col gap-9 container">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? "Discover Trending Podcasts" : "Search results for "}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {[1, 2, 4, 5, 6, 7, 8, 9, 10].map(() => (
            <PodcastCard
              key={"2"}
              imgUrl={""}
              title={"Title"}
              description={"Description"}
              podcastId={"2"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
