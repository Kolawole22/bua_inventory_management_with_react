import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

export default function PaginatedItems({
  itemsPerPage,
  pageCount,
  page,
  setPage,
}) {
  const endOffset = page.page + itemsPerPage;
  console.log(`Loading items from ${page.page} to ${endOffset}`);
  //const currentItems = items.slice(itemOffset, endOffset);
  //const pageCount = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    console.log(`User requested page number ${page.page}`);
  }, [page]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;

    setPage({ ...page, page: event.selected + 1 });
  };

  return (
    <div className="flex justify-center mb-4">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="flex flex-row gap-4 rounded-md p-2"
        pageClassName=" "
        pageLinkClassName="border border-blue-400 bg-white hover:bg-red-700 px-2 rounded-md "
        activeLinkClassName="text-black bg-red-700 rounded-lg px-2"
        activeClassName=""
        previousLinkClassName="hover:text-red-700"
        nextLinkClassName="hover:text-red-700"
        disabledLinkClassName="text-slate-400 hover:text-slate-400"
      />
    </div>
  );
}
