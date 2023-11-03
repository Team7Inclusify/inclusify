import React from "react";
import { useParams } from "react-router-dom";

export default function Search() {
  let { search_tag } = useParams();
  search_tag = search_tag.replace(/_/g, " ");
  return <>{search_tag}</>;
}
