import React, { useState, useCallback, useEffect } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import FilterSearch from "./Components/FilterSearch/FilterSearch.js";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  or,
} from "firebase/firestore";
import UserCard from "./Components/UserCard/UserCard.js";
import { database } from "../../config/firebase.js";

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
    if (search_tag === "") {
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
      <FilterSearch onFilterSearchChange={handleFilterSearchChange} />
      {search_tag} - Searching: {searching}
      <div className="searchResults">
        {searchResults.map((oneResult) => (
          <UserCard
            name={`${oneResult.firstName} ${oneResult.lastName}`}
            pfpLink={oneResult.pfpLink}
            userID={oneResult.id}
            key={oneResult.id}
          />
        ))}
      </div>
    </div>
  );
}
