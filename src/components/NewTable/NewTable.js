import { Fragment, useContext, useEffect } from "react";
// import PaginationComponent from "./Pagination";
import { useState } from "react";
import NewPagination from "./NewPagination";
// import { CiMenuKebab } from 'react-icons/ci';

// function Echo({children}) {    /// can be used instead of Fragment
//     return children;
// }

function NewTable({
  data,
  config,
  keyFn,
  setPageLimit,
  setPageCount,
  pageCount,
  pageLimit,
  totalItems,
  totalPages,
}) {
  //Table Pagination
  // console.log(data, config, "fgfgf");
  const [page, setPage] = useState(pageCount - 1);
  const [rowsPerPage, setRowsPerPage] = useState(pageLimit);

  useEffect(() => {
    // console.log("handleChangePage useEffect called with page:", page);

    if (setPageCount && setPageLimit) {
      setPageCount(page + 1);
      setPageLimit(rowsPerPage);
    }
  }, [rowsPerPage, page, setPageCount, setPageLimit]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    // console.log("handleChangePage called with newpage:", newPage);

    setPage(newPage);
  };

  // ////////////////////////////////////////

  const renderedHeaders = config?.map((column) => {
    if (column.header) {
      return <Fragment key={column?.label}>{column?.header()}</Fragment>;
    }
    return (
      <th
        className="text-center px-[4px] border-b-[1px] p-[10px]"
        key={column.label}
      >
        {column.label}
      </th>
    );
  });

  const renderedRows = data?.map((row, index) => {
    // console.log(row, "row");
    const renderedCells = config?.map((column, index) => {
      // console.log(column, "column");
      return (
        <td
          key={`column-${index}`}
          className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]"
        >
          {column?.render(row)}
        </td>
      );
    });

    return (
      <tr className="" key={keyFn(row)}>
        {renderedCells}
        {/* {
            <div className="flex flex-row items-center justify-center">
              <CiMenuKebab
                onClick={() => setActionBar(`${row.id}-${index}`)}
                className="h-full w-fit"
              />
              {actionBar ? (
                <div className="flex flex-col bg-white p-[8px] shadow-md">
                  <p className="border-b">Edit</p>
                  <p className="">Delete</p>
                </div>
              ) : null}
            </div>
          } */}
      </tr>
    );
  });

  //   const renderedRows = data
  //     ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //     ?.map((row, index) => {
  //       // console.log(row, "row");
  //       const renderedCells = config?.map((column, index) => {
  //         // console.log(column, "column");
  //         return (
  //           <td
  //             key={`column-${index}`}
  //             className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]"
  //           >
  //             {column?.render(row)}
  //           </td>
  //         );
  //       });

  //       return (
  //         <tr className="" key={keyFn(row)}>
  //           {renderedCells}
  //           {/* {
  //             <div className="flex flex-row items-center justify-center">
  //               <CiMenuKebab
  //                 onClick={() => setActionBar(`${row.id}-${index}`)}
  //                 className="h-full w-fit"
  //               />
  //               {actionBar ? (
  //                 <div className="flex flex-col bg-white p-[8px] shadow-md">
  //                   <p className="border-b">Edit</p>
  //                   <p className="">Delete</p>
  //                 </div>
  //               ) : null}
  //             </div>
  //           } */}
  //         </tr>
  //       );
  //     });

  // useEffect(() => {
  //   console.log("renderedRows:", renderedRows);
  // }, [renderedRows]);

  return (
    <div>
      <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
        <thead>
          <tr className="border-b-[1px]">{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
      <NewPagination
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        data={data}
        pageCount={pageCount}
        pageLimit={pageLimit}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </div>
  );
}

export default NewTable;
