import React, { useState, useCallback, useEffect } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import FilterSearch from "./Components/FilterSearch/FilterSearch.js";
import { collection, onSnapshot, query, where, or } from "firebase/firestore";
import UserCard from "./Components/UserCard/UserCard.js";
import { database } from "../../config/firebase.js";
import VideoCard from "./Components/VideoResumeCard/VideoCard.js";

export default function Search() {
  let { search_tag } = useParams();
  if (search_tag) {
    search_tag = search_tag.replace(/_/g, " ");
  } else {
    search_tag = "";
  }
  const [searching, setSearching] = useState("user");
  const [searchResults, setSearchResults] = useState([]);

  const handleFilterSearchChange = (filter) => {
    setSearching(filter);
  };

  useEffect(() => {
    const searchRef = collection(database, searching);
    let querySearch;
    if (search_tag === "" || searching !== "user") {
      querySearch = query(searchRef);
    } else {
      querySearch = query(
        searchRef,
        or(
          where("firstName", "==", search_tag),
          where("lastName", "==", search_tag)
        )
      );
    }
    const unsubscribe = onSnapshot(querySearch, (snapshot) => {
      let searchResults = [];
      snapshot.forEach((doc) => {
        searchResults.push({ ...doc.data(), id: doc.id });
      });
      setSearchResults(searchResults);
    });

    return () => unsubscribe();
  }, [search_tag, searching]);

  return (
    <div className="SearchPage">
      <FilterSearch
        selected={searching}
        onFilterSearchChange={handleFilterSearchChange}
      />
      {search_tag} - Searching: {searching}
      <div className="searchResults">
        {searching === "user" &&
          searchResults.map((oneResult) => (
            <UserCard
              name={`${oneResult.firstName} ${oneResult.lastName}`}
              pfpLink={oneResult.pfpLink}
              userID={oneResult.id}
              key={oneResult.id}
            />
          ))}
        {searching === "video-resume" &&
          searchResults.map((oneResult) => (
            <VideoCard
              type={searching}
              name={oneResult.uploader}
              link={oneResult.link}
              userID={oneResult.id}
              key={oneResult.id}
            />
          ))}
        {searching === "additional-video" &&
          searchResults.map((oneResult) => (
            <VideoCard
              type={searching}
              name={oneResult.uploader}
              title={oneResult.title}
              link={oneResult.link}
              userID={oneResult.id}
              key={oneResult.id}
            />
          ))}
      </div>
    </div>
  );
}
