import React from "react";
// import ReactDOM from 'react-dom';
import ReactPaginate from "react-paginate";
import "./pagination.css";

export function PaginatedItems({ itemsPerPage, setPage, total }) {
  const pageCount = Math.floor(total / itemsPerPage);

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custome-pagination d-flex align-items-center justify-content-end flex-wrap"
        pageLinkClassName="pagination-tag-anchor mx-2 rounded-circle d-flex align-items-center justify-content-center flex-wrap"
        activeLinkClassName="text-white bg-primary"
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById('container')
// );
