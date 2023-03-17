import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { ADD_JOB } from "../../utils/mutations";
import { QUERY_JOBS } from "../../utils/queries";

import JobForm from "../JobForm";
import JobList from "../JobList";

import Auth from "../../utils/auth";

const NEW_JOB = () => {
    const [jobData, setJobData] = useState({ title: "", description: "" });
    const [characterCount, setCharacterCount] = useState(0);
    const [addJob, { error }] = useMutation(ADD_JOB, {
        update(cache, { data: { addJob } }) {
            try {

                const { jobs } = cache.readQuery({ query: QUERY_JOBS });

                cache.writeQuery({
                    query: QUERY_JOBS,
                    data: { jobs: [addJob, ...jobs] },
                });
            } catch (e) {
                console.error(e);
            }
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addJob({
                variables: { ...jobData },
            });

            setJobData({
                title: "",
                description: "",
                keywords: "",
                location: "",
                salary: "",
                company: "",

            });
        } catch (e) {
            console.error(e);
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "keyword" && value.length <= 280) {
            setJobData({ ...jobData, [name]: value });
            setCharacterCount(value.length);
        } else if (name !== "keyword") {
            setJobData({ ...jobData, [name]: value });
        }
    };
    
   
    
    return (
        <main>
        <div className="flex-row justify-center mb-3">
            <h4 className="text-center">New Job</h4>
        </div>
        <div className="col-12 col-md-10 mb-3">
            <JobForm
            jobData={jobData}
            handleFormSubmit={handleFormSubmit}
            handleChange={handleChange}
            characterCount={characterCount}
            buttonLabel="Submit"
            />
            
        </div>
        </main>
    );
    };

    export default NEW_JOB;