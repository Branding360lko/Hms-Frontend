import { TablePagination } from "@mui/material";
import React from "react";

function PaginationForApi({
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  data,
}) {
  return (
    <TablePagination
      style={{ backgroundColor: "white" }}
      rowsPerPageOptions={[5, 10, 20, 50, 100]}
      component="div"
      count={data}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default PaginationForApi;
