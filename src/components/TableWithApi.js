import { Fragment } from "react";
// import PaginationComponent from "./Pagination";
import { useState } from "react";
import { limitChange } from "../Store/Slices/PatientSlice";
import { useDispatch } from "react-redux";
// import { CiMenuKebab } from 'react-icons/ci';

// function Echo({children}) {    /// can be used instead of Fragment
//     return children;
// }

import PaginationComponent from "./PaginationWithApi";

function TableWithApi({
  data,
  config,
  keyFn,
  pageChange,
  limitChange,
  page,
  limit,
  totalPages,
}) {
  //Table Pagination
  // console.log(data, config, "fgfgf");

  const dispatch = useDispatch();
  //   const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    // setPage(newPage);
    dispatch(pageChange(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    dispatch(limitChange(event.target.value, 10));
    // setPage(0);
    dispatch(pageChange(1));
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

  return (
    <div>
      <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
        <thead>
          <tr className="border-b-[1px]">{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
      {/* <button onClick={() => dispatch(limitChange(2))}>Button</button> */}
      <PaginationComponent
        page={page}
        rowsPerPage={limit}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        data={data}
        totalPages={totalPages}
      />
    </div>
  );
}

export default TableWithApi;
