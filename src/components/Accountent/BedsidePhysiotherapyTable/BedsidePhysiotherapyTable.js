import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";

function BedsidePhysiotherapyTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "transparent",
    borderRadius: "5px",
    overflowY: "scroll",
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
        <h2 className="border-b-[4px] border-[#3497F9]">
          Bedside Physiotherapy (IPD)
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
      </div>
      <div className="w-full flex flex-col justify-start">
        <p className="text-[14px] font-semibold py-[0.5rem]">
          Physiotherapy Package Charges [for five (5) or more days]
        </p>
        <span className="w-full h-[1px] border-[1px]"></span>
        <div className="flex flex-col justify-start">
          <span className="w-full text-start flex flex-col justify-start gap-1 py-2">
            <p className="text-[16px] font-semibold">Pkg 1. 5 -10 Days</p>
            <p className="text-[#56585A]">
              10% Extra Discount of the total Amount.
            </p>
          </span>{" "}
          <span className="w-full h-[1px] border-[1px]"></span>
          <span className="w-full text-start flex flex-col justify-start gap-1 py-4">
            <p className="text-[16px] font-semibold">Pkg 2. 10 -20 Days</p>
            <p className="text-[#56585A]">
              20% Extra Discount of the total Amount.
            </p>
          </span>{" "}
          <span className="w-full h-[1px] border-[1px]"></span>
          <span className="w-full text-start flex flex-col justify-start gap-1 py-4">
            <p className="text-[16px] font-semibold">Pkg 3. 21 -25 Days</p>
            <p className="text-[#56585A]">
              25% Extra Discount of the total Amount.
            </p>
          </span>{" "}
          <span className="w-full h-[1px] border-[1px]"></span>
          <span className="w-full text-start flex flex-col justify-start gap-1 py-4">
            <p className="text-[16px] font-semibold">Pkg 4. 26 -30 Days</p>
            <p className="text-[#56585A]">
              30% Extra Discount of the total Amount.
            </p>
            <p>. in package charges -- Advance pyment will be charged</p>
            <p>. if more then two modalities 10% discount</p>
            <p>. if more then three modalities 20% discount</p>
            <p>. if more then four modalities 30% discount</p>
            <p>. if more then five modalities 40% discount</p>
          </span>{" "}
          <span className="w-full h-[1px] border-[1px]"></span>
          <span className="w-full text-start flex flex-col justify-start gap-1 py-4">
            <p className="text-[16px] font-semibold">
              Package discount will be valid for services taken in that duration
              only.
            </p>
          </span>
          <span className="w-full h-[1px] border-[1px]"></span>
        </div>
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
              Bedside Physiotherapy (IPD)
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="flex flex-col gap-1">
                <span className="flex flex-col justify-start gap-1">
                  <p>Category</p>
                  <input
                    type="text"
                    placeholder="Category"
                    className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                  />
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <span className="flex flex-col justify-start gap-1">
                    <p>General GW-High</p>
                    <input
                      type="text"
                      placeholder="General GW-High"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>General JW -Janata</p>
                    <input
                      type="text"
                      placeholder="General JW -Janata"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                </div>
                <span className="flex flex-col justify-start gap-1">
                  <p>SEMI-private(SPW)</p>
                  <input
                    type="text"
                    placeholder="SEMI-private(SPW)"
                    className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                  />
                </span>
                <div className="grid grid-cols-3 gap-4">
                  <span className="flex flex-col justify-start gap-1">
                    <p>Private AC(PVT)</p>
                    <input
                      type="text"
                      placeholder="General AC(PVT)"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Private AC DLX(PVT DLX)</p>
                    <input
                      type="text"
                      placeholder="AC DLX(PVT DLX)"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Private SUITE (PVT DX)</p>
                    <input
                      type="text"
                      placeholder="SUITE (PVT DX)"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="flex flex-col justify-start gap-1">
                    <p>ICU</p>
                    <input
                      type="text"
                      placeholder="General GW-High"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>NICU</p>
                    <input
                      type="text"
                      placeholder="General JW -Janata"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                </div>
                <span className="flex flex-col justify-start gap-1">
                  <p>HDW</p>
                  <input
                    type="text"
                    placeholder="Category"
                    className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>DAYCARE DC</p>
                  <input
                    type="text"
                    placeholder="DAYCARE DC"
                    className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                  />
                </span>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Add Price
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
              Bedside Physiotherapy (IPD)
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="flex flex-col gap-1">
                <span className="flex flex-col justify-start gap-1">
                  <p>Category</p>
                  <input
                    type="text"
                    placeholder="Category"
                    className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                  />
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <span className="flex flex-col justify-start gap-1">
                    <p>General GW-High</p>
                    <input
                      type="text"
                      placeholder="General GW-High"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>General JW -Janata</p>
                    <input
                      type="text"
                      placeholder="General JW -Janata"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                </div>
                <span className="flex flex-col justify-start gap-1">
                  <p>SEMI-private(SPW)</p>
                  <input
                    type="text"
                    placeholder="SEMI-private(SPW)"
                    className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                  />
                </span>
                <div className="grid grid-cols-3 gap-4">
                  <span className="flex flex-col justify-start gap-1">
                    <p>Private AC(PVT)</p>
                    <input
                      type="text"
                      placeholder="General AC(PVT)"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Private AC DLX(PVT DLX)</p>
                    <input
                      type="text"
                      placeholder="AC DLX(PVT DLX)"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Private SUITE (PVT DX)</p>
                    <input
                      type="text"
                      placeholder="SUITE (PVT DX)"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="flex flex-col justify-start gap-1">
                    <p>ICU</p>
                    <input
                      type="text"
                      placeholder="General GW-High"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>NICU</p>
                    <input
                      type="text"
                      placeholder="General JW -Janata"
                      className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                    />
                  </span>
                </div>
                <span className="flex flex-col justify-start gap-1">
                  <p>HDW</p>
                  <input
                    type="text"
                    placeholder="Category"
                    className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>DAYCARE DC</p>
                  <input
                    type="text"
                    placeholder="DAYCARE DC"
                    className="border-[2px] rounded outline-none h-[2rem] pl-[5px]"
                  />
                </span>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
                  Update Price
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default BedsidePhysiotherapyTable;
