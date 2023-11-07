import React from "react";
import { useParams } from "react-router-dom";

export default function Search() {
  let { search_tag } = useParams();
  if (search_tag) {
    search_tag = search_tag.replace(/_/g, " ");
  } else {
    search_tag = "";
  }
  return <>{search_tag}</>;
}
