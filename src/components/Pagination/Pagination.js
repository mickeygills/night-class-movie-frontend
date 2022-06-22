import React, { useState, useEffect } from "react";
import "./Pagination.css";

function makePaginationArray(totalMovieResult, itemLimit) {
  let roundedPaginationPage = Math.round(totalMovieResult / itemLimit);

  let array = [];

  for (let i = 1; i <= roundedPaginationPage; i++) {
    array.push(i);
  }
  return array;
}

function Pagination({ totalMovieResult, itemLimit, setPage, page }) {
  const [totalMovieArrayCount] = useState(
    makePaginationArray(totalMovieResult, itemLimit)
  );

  const [currentPaginationArray, setCurrentPaginationArray] = useState([]);

  const [startingPosition, setStartingPosition] = useState(0);

  const [reachedTheEnd, setReachedTheEnd] = useState(false);

  const [reachedTheFront, setReachedTheFront] = useState(false);

  useEffect(() => {
    renewPagination();
  }, [reachedTheEnd, reachedTheFront]);

  useEffect(() => {
    if (
      page ===
      currentPaginationArray[currentPaginationArray.length - 1] + 1
    ) {
      setStartingPosition((startingPosition) => startingPosition + 10);

      setReachedTheEnd(true);
    } else {
      setReachedTheEnd(false);
    }

    if (page === currentPaginationArray[0] - 1) {
      setStartingPosition((startingPosition) => startingPosition - 10);

      setReachedTheFront(true);
    } else {
      setReachedTheFront(false);
    }
  }, [page]);

  function renewPagination() {
    let makeCurrentPaginationArray = totalMovieArrayCount.slice(
      startingPosition,
      startingPosition + 10
    );

    setCurrentPaginationArray(makeCurrentPaginationArray);
  }

  function handlePrev() {
    setPage((page) => page - 1);
  }

  function handleNext() {
    setPage((page) => page + 1);
  }

  function selectedPage(e) {
    let numPage = Number(e.target.textContent);
    setPage(numPage);
  }
  return (
    <div className="pagination-container">
      <button className={`${page === 1 && "disabled"}`} onClick={handlePrev}>
        Prev
      </button>

      {currentPaginationArray.map((item) => {
        return (
          <button
            key={item}
            className={`paginationItem ${page === item && "active"}`}
            onClick={selectedPage}
          >
            <span>{item}</span>
          </button>
        );
      })}

      <button
        className={`${
          page === totalMovieArrayCount[totalMovieArrayCount.length - 1] &&
          "disabled"
        }`}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;