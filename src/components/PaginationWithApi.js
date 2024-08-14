import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
} from "@mui/material";

export default function PaginationComponent({
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  data,
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
    <Pagination
      count={totalPages}
      page={page}
      onChange={handleChangePage}
      color="primary"
      style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    />
  );
}
