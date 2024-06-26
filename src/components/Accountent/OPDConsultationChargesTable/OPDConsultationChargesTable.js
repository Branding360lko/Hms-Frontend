import React, { useState } from "react";
import PaginationComponent from "../../Pagination";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";

function OPDConsultationChargesTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "transparent",
    borderRadius: "5px",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          OPD Consultation Charges
        </h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Charges
        </button>
      </div>
      <div>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px]">
              <p>S_N</p>
            </th>
            <th className="border-b-[1px]">
              <p>Medicine</p>
            </th>
            <th className="border-b-[1px]">
              <p>Normal</p>
            </th>
            <th className="border-b-[1px]">
              <p>Emergency Day</p>
            </th>
            <th className="border-b-[1px]">
              <p>Emergency Night</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
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
                  <div
                    onClick={() => [
                      handleOpen2(),
                      // getOneAppoimentDataHandle(item?._id),
                    ]}
                    className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                  >
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div
                    onClick={() => [
                      handleOpen1(),
                      // getOneAppoimentDataHandle(item?._id),
                    ]}
                    className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              OPD Consultation Charges
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form>
                <span className="flex flex-col justify-start gap-2">
                  <p>Medicine</p>
                  <input
                    type="text"
                    placeholder="Medicine"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <div className="grid grid-cols-3 gap-4 py-3">
                  <span className="flex flex-col justify-start gap-2">
                    <p>Normal Price</p>
                    <input
                      type="text"
                      placeholder="Normal Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-2">
                    <p>Emergency Day Price</p>
                    <input
                      type="text"
                      placeholder="Emergency Day Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-2">
                    <p>Emergency Night Price</p>
                    <input
                      type="text"
                      placeholder="Emergency Night Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                </div>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Add Charges
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              OPD Consultation Charges
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form>
                <span className="flex flex-col justify-start gap-2">
                  <p>Medicine</p>
                  <input
                    type="text"
                    placeholder="Medicine"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <div className="grid grid-cols-3 gap-4 py-3">
                  <span className="flex flex-col justify-start gap-2">
                    <p>Normal Price</p>
                    <input
                      type="text"
                      placeholder="Normal Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-2">
                    <p>Emergency Day Price</p>
                    <input
                      type="text"
                      placeholder="Emergency Day Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-2">
                    <p>Emergency Night Price</p>
                    <input
                      type="text"
                      placeholder="Emergency Night Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                </div>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Edit Charges
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              OPD Consultation Charges
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form>
                <span className="flex flex-col justify-start gap-2">
                  <p>Medicine</p>
                  <input
                    type="text"
                    placeholder="Medicine"
                    className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                  />
                </span>
                <div className="grid grid-cols-3 gap-4 py-3">
                  <span className="flex flex-col justify-start gap-2">
                    <p>Normal Price</p>
                    <input
                      type="text"
                      placeholder="Normal Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-2">
                    <p>Emergency Day Price</p>
                    <input
                      type="text"
                      placeholder="Emergency Day Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-2">
                    <p>Emergency Night Price</p>
                    <input
                      type="text"
                      placeholder="Emergency Night Price"
                      className="w-full border-[2px] border-[#c6c6c6] outline-none pl-[5px] h-[35px] rounded"
                    />
                  </span>
                </div>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default OPDConsultationChargesTable;
