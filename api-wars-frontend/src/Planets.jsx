import React, { useState, useEffect } from "react";
import MUIPlanetsTable from "./MUIPlanetsTable.jsx";
import "./App.css";

function Planets() {
  const [fetchedPlanetData, setFetchedPlanetData] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState([]);

  const fetchUrl = async (url) => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFetchedPlanetData(data);
        setPageCount(Math.ceil(data.count / 10));
      });

    const last = url.charAt(url.length - 1);
    if (document.getElementById("page" + last))
      document.getElementById("page" + last).style.cssText =
        "background: #ffe81f; color: black";
  };

  useEffect(() => {
    fetchUrl("http://swapi.py4e.com/api/planets/?page=1");
  }, []);

  useEffect(() => {
    setPageNumber([...Array(pageCount + 1).keys()].slice(1));
  }, [pageCount]);

  const fetchPlanets = (url) => {
    if (!url) return;
    let btns = document.getElementsByClassName("pagination-btn") ?? null;
    for (const btn of btns) {
      btn.style.cssText = "background: black; color: #ffe81f";
    }
    fetchUrl(url);
  };

  return (
    <div>
      <div
        id="table-container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "45px",
        }}
      >
        <MUIPlanetsTable fetchedPlanetData={fetchedPlanetData.results ?? []} />
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "30px",
          display: "flex",
        }}
      >
        <button
          className="nav-btn"
          style={{ width: "200px", marginLeft: "auto" }}
          onClick={() => {
            fetchPlanets(fetchedPlanetData.previous);
          }}
        >
          Previous Page
        </button>
        <div id="pagination">
          {pageNumber.map((e, i) => {
            return (
              <button
                key={pageNumber[i]}
                id={"page" + pageNumber[i]}
                className="pagination-btn"
                onClick={() =>
                  fetchPlanets(
                    "http://swapi.py4e.com/api/planets/?page=" + pageNumber[i]
                  )
                }
              >
                {pageNumber[i]}
              </button>
            );
          })}
        </div>
        <button
          className="nav-btn"
          style={{ width: "200px", marginRight: "auto" }}
          onClick={() => {
            fetchPlanets(fetchedPlanetData.next);
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Planets;
