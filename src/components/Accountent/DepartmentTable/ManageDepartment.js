import React, { useState } from "react";
import { CiSearch, CiViewList } from "react-icons/ci";
import PaginationComponent from "../../Pagination";
import { RiEdit2Fill } from "react-icons/ri";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import style from "../../../styling/styling";
function ManageDepartment() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  return (
    <div className="flex flex-col gap-[1rem] p-[0.2rem]">
      <div className="flex justify-between">
        <span className="w-[20rem] bg-[#F4F6F6] flex items-center p-2 gap-1 rounded-md h-[2.2rem]">
          <CiSearch />
          <input
            type="text"
            placeholder="Search"
            className="w-[90%] h-full bg-[transparent] outline-none border-none "
          />
        </span>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add
        </button>
      </div>
      <div>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px]">
              <p>S_N</p>
            </th>
            <th className="border-b-[1px]">
              <p>Department Name</p>
            </th>
            <th className="border-b-[1px]">
              <p>Description</p>
            </th>
            <th className="border-b-[1px]">
              <p>Department Head</p>
            </th>
            <th className="border-b-[1px]">
              <p>Is Appointment Applicable</p>
            </th>

            <th className="border-b-[1px]">
              <p>Action</p>
            </th>
          </thead>
          <tbody>
            <tr key={1}>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                1
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                Neurologist
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 500.00
              </td>

              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 500.00
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 500.00
              </td>

              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] flex-row">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                    onClick={handleOpen1}
                  >
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationComponent
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          data={""}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[3px] border-[#3497F9] w-fit"
            >
              Manage Department
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form>
                <span className="flex flex-col justify-start gap-2">
                  <p>Department Code *</p>
                  <input
                    type="text"
                    placeholder="Department Code *"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p>Department name *</p>
                  <input
                    type="text"
                    placeholder="Department name *"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p> Department Description</p>
                  <input
                    type="text"
                    placeholder=" Department Description"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p> Department Notice Text</p>
                  <input
                    type="text"
                    placeholder="Department Notice Text"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p> Department Head</p>
                  <input
                    type="text"
                    placeholder="Department Head"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p> Room Number</p>
                  <input
                    type="text"
                    placeholder="Room Number"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p>IS Appointment Applicable</p>
                  <input
                    type="text"
                    placeholder="IS Appointment Applicable"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <button className="w-full mt-2 bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Add Department
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open1}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[3px] border-[#3497F9] w-fit"
            >
              Manage Department
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form>
                <span className="flex flex-col justify-start gap-2">
                  <p>Department Code *</p>
                  <input
                    type="text"
                    placeholder="Department Code *"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p>Department name *</p>
                  <input
                    type="text"
                    placeholder="Department name *"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p> Department Description</p>
                  <input
                    type="text"
                    placeholder=" Department Description"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p> Department Notice Text</p>
                  <input
                    type="text"
                    placeholder="Department Notice Text"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p> Department Head</p>
                  <input
                    type="text"
                    placeholder="Department Head"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p> Room Number</p>
                  <input
                    type="text"
                    placeholder="Room Number"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-2">
                  <p>IS Appointment Applicable</p>
                  <input
                    type="text"
                    placeholder="IS Appointment Applicable"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <button className="w-full mt-2 bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Update Department
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ManageDepartment;
