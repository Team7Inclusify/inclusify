import React, { useState } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import FilterSearch from "./Components/FilterSearch/FilterSearch.js";
import { getDoc } from "firebase/firestore";
import UserCard from "./Components/UserCard/UserCard.js";

export default function Search() {
  let { search_tag } = useParams();
  if (search_tag) {
    search_tag = search_tag.replace(/_/g, " ");
  } else {
    search_tag = "";
  }

  const [searching, setSearching] = useState("user");

  const handleFilterSearchChange = (filter) => {
    setSearching(filter);
  };
  return (
    <div className="SearchPage">
      <FilterSearch onFilterSearchChange={handleFilterSearchChange} />
      {search_tag} - Searching: {searching}
      <UserCard />
    </div>
  );
}
