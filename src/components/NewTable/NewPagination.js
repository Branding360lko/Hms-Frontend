import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function NewPagination({
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  data,
  pageCount,
  pageLimit,
  totalItems,
  totalPages,
}) {
  // const [page, setPage] = React.useState(2);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  // console.log(data.length);
  return (
    <TablePagination
      style={{ backgroundColor: "white" }}
      rowsPerPageOptions={[2, 3, 4, 50, 100]}
      component="div"
      count={totalItems}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
