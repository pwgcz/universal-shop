import React from "react";
import Pagination from "react-js-pagination";


export default function Paginator ({ activePage, count, handlePageChange }) {
  return (
    <div>
      <Pagination
        activeClass='pagination-li'
        innerClass='pagination-ul'
        linkClass='pagination-a'
        activeLinkClass='active-page'
        activePage={activePage}
        itemsCountPerPage={15}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
}
