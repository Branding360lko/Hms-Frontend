import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";

function PhysiotheraphyOPDTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
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
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Physiotheraphy OPD</h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Charges
        </button>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <div className="flex items-center gap-4">
          <h6 className="text-[16px] font-semibold border-r-[2px] pr-4">
            Physiotheraphy OPD charges
          </h6>
          <p>₹ 400.00</p>
        </div>
        <div className="flex items-center gap-4">
          <h6 className="text-[16px] font-semibold border-r-[2px] pr-4">
            Nutritionist consultatin fees
          </h6>
          <p>₹ 300.00</p>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] my-[1rem]">
          <thead>
            <th className="border-b-[1px]">
              <p>S N</p>
            </th>
            <th className="border-b-[1px]">
              <p>Physiotheraphy OPD</p>
            </th>
            <th className="border-b-[1px]">
              <p>Per Region</p>
            </th>
            <th className="border-b-[1px]">
              <p> Per 02 Region</p>
            </th>
            <th className="border-b-[1px]">
              <p> User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                1
              </td>

              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                S.W Diathermy
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 70.00 /- Per Shift
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 100.00
              </td>
              <td className="justify-center flex items-center gap-2 text-[16px] py-4 px-[4px] text-center border-b-[1px] ">
                <div
                  className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                  onClick={handleOpen1}
                >
                  <CiViewList className="text-[25px] text-[#96999C]" />
                </div>
                <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                  <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Physiotheraphy OPD
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="flex flex-col gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p className="text-[16px] font-normal ">Physiotheraphy OPD</p>
                  <input
                    type="text"
                    placeholder="Physiotheraphy OPD"
                    className="h-[2rem] w-full border-[2px] outline-none px-[5px]"
                  />
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <span className="flex flex-col justify-start gap-1">
                    <p className="text-[16px] font-normal ">Per Region</p>
                    <input
                      type="text"
                      placeholder="Per Region"
                      className="h-[2rem] w-full border-[2px] outline-none px-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p className="text-[16px] font-normal ">Per 02 region</p>
                    <input
                      type="text"
                      placeholder="Per 02 region"
                      className="h-[2rem] w-full border-[2px] outline-none px-[5px]"
                    />
                  </span>
                  <button className="col-span-2 bg-[#3497F9] text-white p-[10px] rounded-md">
                    Add Charges
                  </button>
                </div>
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
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Physiotheraphy OPD
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="flex flex-col gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p className="text-[16px] font-normal ">Physiotheraphy OPD</p>
                  <input
                    type="text"
                    placeholder="Physiotheraphy OPD"
                    className="h-[2rem] w-full border-[2px] outline-none px-[5px]"
                  />
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <span className="flex flex-col justify-start gap-1">
                    <p className="text-[16px] font-normal ">Per Region</p>
                    <input
                      type="text"
                      placeholder="Per Region"
                      className="h-[2rem] w-full border-[2px] outline-none px-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p className="text-[16px] font-normal ">Per 02 region</p>
                    <input
                      type="text"
                      placeholder="Per 02 region"
                      className="h-[2rem] w-full border-[2px] outline-none px-[5px]"
                    />
                  </span>
                  <button className="col-span-2 bg-[#3497F9] text-white p-[10px] rounded-md">
                    Update Charges
                  </button>
                </div>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default PhysiotheraphyOPDTable;
