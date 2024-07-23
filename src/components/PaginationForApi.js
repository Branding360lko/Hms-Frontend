import { Pagination, Stack, TablePagination } from "@mui/material";
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
      rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
      component="div"
      count={data}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    // <Stack spacing={2}>
    //   <Pagination
    //     count={data}
    //     color="primary"
    //     onChange={(_, value) => {
    //       setPage(value);
    //       window.scroll(0, 0);
    //     }}
    //   />
    // </Stack>
  );
}

export default PaginationForApi;
