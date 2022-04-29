import "./index.css";
import addImage from "../../assets/add.svg";
import React, { useState } from "react";
import JobCard from "../JobCard/JobCard";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES, QUERY_JOBS_BY_CATEGORY } from "../../utils/queries";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default function Listing() {
  const [filter, setFilter] = useState("");
  function filterJobs(e) {
    const selected = e.currentTarget.dataset.category;
    setFilter(selected);
  }
  let jobs;
  let categoryId;
  if (filter === "") {
    categoryId = "";
  } else {
    categoryId = filter;
  }
  const { loading: loadingJobs, data: jobsData } = useQuery(
    QUERY_JOBS_BY_CATEGORY,
    {
      variables: {
        category: categoryId,
      },
    }
  );
  jobs = jobsData?.jobsByCategory || [];

  const { loading: loadingCategories, data: categoriesData } =
    useQuery(QUERY_CATEGORIES);
  const categories = categoriesData?.categories || [];

  return (
    <div className="listing-content">
      <nav className="navbar navbar-expand-lg navbar-light category-nav">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#responsive-navbar"
          aria-controls="responsive-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse row justify-content-between"
          id="responsive-navbar"
        >
          <ul className="navbar-nav col">
            <Nav.Link as={Link} to="/">
              <h3 onClick={filterJobs} id="all-categories">
                All
              </h3>
            </Nav.Link>
            {loadingCategories
              ? ""
              : categories.map((category) => {
                  return (
                    <li className="nav-item" key={category._id}>
                      <h3
                        onClick={filterJobs}
                        data-category={category._id}
                        className="nav-link text-dark"
                      >
                        {category.name}
                      </h3>
                    </li>
                  );
                })}
            <Button
              className="align-self-right col"
              id="post-button"
              href="/post"
            >
              POST
            </Button>
          </ul>
          <div className="col"></div>
        </div>
      </nav>

      <div className="row card-row justify-content-center">
        {loadingJobs
          ? ""
          : jobs.map((job) => {
              return (
                <div className="col card-col" key={job._id}>
                  <JobCard job={job} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
