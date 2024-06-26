import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";

function AccommodationChargesTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Accommodation Charges
        </h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Charges
        </button>
      </div>
      <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
        <thead>
          <th className="border-[1px] p-1 font-semibold">
            <p>S_N</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Category</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>General GW High</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>General JW Janata</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p> SEMI-private (SPW)</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Private AC (PVT)</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Private AC DLX (PVT DLX)</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Private SUITE (PVT DX)</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>ICU</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>NICU</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>HDW</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>DAYCARE</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Emergency</p>
          </th>

          <th className="border-[1px] p-1">
            <p>Action</p>
          </th>
        </thead>
        <tbody>
          <tr key={1}>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              1
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              No of BEDS
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              48
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              20
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              15
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              13
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              12
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              03
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              16
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              08
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              06
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              04
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
              06
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px] flex-row">
              <div className="flex gap-[10px] justify-center">
                <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                  <CiViewList className="text-[20px] text-[#96999C]" />
                </div>{" "}
                <div
                  className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                  onClick={handleOpen1}
                >
                  <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
              Accommodation Charges
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full flex flex-col gap-2">
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>Category</p>
                  <input
                    type="text"
                    placeholder="Enter Category"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>General GW-High</p>
                    <input
                      type="text"
                      placeholder="General GW-High"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>General JW-Janata </p>
                    <input
                      type="text"
                      placeholder="General JW-Janata"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                </div>
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>SEMI-Private(SPW)</p>
                  <input
                    type="text"
                    placeholder="SEMI-Private(SPW)"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <div className="grid grid-cols-3 gap-4">
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>Private AC(PVT)</p>
                    <input
                      type="text"
                      placeholder="Private AC(PVT)"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>Private AC DLX(PVT DLX)</p>
                    <input
                      type="text"
                      placeholder="Private AC DLX(PVT DLX)"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>Private SUITE (PVT DX)</p>
                    <input
                      type="text"
                      placeholder="Private SUITE (PVT DX)"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>ICU</p>
                    <input
                      type="text"
                      placeholder="ICU"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>ICU</p>
                    <input
                      type="text"
                      placeholder="ICU"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                </div>
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>HDW</p>
                  <input
                    type="text"
                    placeholder="Enter HDW"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>DAYCARE</p>
                  <input
                    type="text"
                    placeholder="Enter DAYCARE"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>Emergency</p>
                  <input
                    type="text"
                    placeholder="Enter Emergency"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Accommodation Charges
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full flex flex-col gap-2">
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>Category</p>
                  <input
                    type="text"
                    placeholder="Enter Category"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>General GW-High</p>
                    <input
                      type="text"
                      placeholder="General GW-High"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>General JW-Janata </p>
                    <input
                      type="text"
                      placeholder="General JW-Janata"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                </div>
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>SEMI-Private(SPW)</p>
                  <input
                    type="text"
                    placeholder="SEMI-Private(SPW)"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <div className="grid grid-cols-3 gap-4">
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>Private AC(PVT)</p>
                    <input
                      type="text"
                      placeholder="Private AC(PVT)"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>Private AC DLX(PVT DLX)</p>
                    <input
                      type="text"
                      placeholder="Private AC DLX(PVT DLX)"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>Private SUITE (PVT DX)</p>
                    <input
                      type="text"
                      placeholder="Private SUITE (PVT DX)"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>ICU</p>
                    <input
                      type="text"
                      placeholder="ICU"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                  <span className="w-full flex flex-col justify-start gap-1">
                    <p>ICU</p>
                    <input
                      type="text"
                      placeholder="ICU"
                      className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                    />
                  </span>
                </div>
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>HDW</p>
                  <input
                    type="text"
                    placeholder="Enter HDW"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>DAYCARE</p>
                  <input
                    type="text"
                    placeholder="Enter DAYCARE"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <span className="w-full flex flex-col justify-start gap-1">
                  <p>Emergency</p>
                  <input
                    type="text"
                    placeholder="Enter Emergency"
                    className="border-[2px] w-full h-[2.2rem] rounded pl-[5px] outline-none"
                  />
                </span>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Update Charges
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AccommodationChargesTable;
