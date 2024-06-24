import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
function TraumaCasesTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Other Package</h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Charges
        </button>
      </div>
      <div className="w-full flex flex-col gap-2">
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] ">
              <p>S_N</p>
            </th>
            <th className="border-b-[1px]  ">
              <p>Accommodation (no of days)</p>
            </th>
            <th className="border-b-[1px]">
              <p>Cat -1 (03 days)</p>
            </th>
            <th className="border-b-[1px]">
              <p>Cat -2 (05 days)</p>
            </th>
            <th className="border-b-[1px]">
              <p>Cat -3 (07 days)</p>
            </th>

            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                01
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] ">
                Cardiologist
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

              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill
                      className="text-[25px] text-[#3497F9]"
                      onClick={handleOpen1}
                    />
                  </div>
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
              Trauma cases
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full flex flex-col gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p>Accommodation (no of days)</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Accommodation  (no of days)"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Cat -1 (03 days)</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Cat -1 (03 days)"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Cat -2 (05 days)</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Cat -2 (05 days)"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Cat -3 (07 days)</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Cat -3 (07 days)"
                  />
                </span>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Add
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
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Trauma cases
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full flex flex-col gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p>Accommodation (no of days)</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Accommodation  (no of days)"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Cat -1 (03 days)</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Cat -1 (03 days)"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Cat -2 (05 days)</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Cat -2 (05 days)"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Cat -3 (07 days)</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Cat -3 (07 days)"
                  />
                </span>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Update
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TraumaCasesTable;
