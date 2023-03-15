import React, {useState, useEffect} from "react";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@apollo/client";
import { QUERY_JOBS } from "../utils/queries";
import JobList from "../components/JobList";
import Auth from "../utils/auth";

const JobListing = () => {
return(
  <div>
    <h1>Job Listing</h1>
   <SearchBar />
  </div>
)
};


export default JobListing;


