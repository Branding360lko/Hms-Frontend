import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";

function OTChargesSuperSpecialtyoperationTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid transaprent",
    boxShadow: 24,
    p: 4,
    outline: "transaprent",
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
          O.T Charges / Super Specialty operation
        </h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Update Charges
        </button>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <h6 className="text-[14px] font-semibold">OT -1</h6>
            <p>Modulat OT</p>
          </span>
          <span className="text-start">
            <p>₹ 12,0000.00 / (up to 2hrs)</p>
            <p>₹ 2500.00 / (Extra FOr per 1/2 hrs)</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <h6 className="text-[14px] font-semibold">OT -2</h6>
            <p>Modulat OT</p>
          </span>
          <span className="text-start">
            <p>₹ 12,0000.00 / (up to 2hrs)</p>
            <p>₹ 2500.00 / (Extra FOr per 1/2 hrs)</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <h6 className="text-[14px] font-semibold">OT -3</h6>
            <p>Modulat OT</p>
          </span>
          <span className="text-start">
            <p>₹ 12,0000.00 / (up to 2hrs)</p>
            <p>₹ 2500.00 / (Extra FOr per 1/2 hrs)</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <h6 className="text-[14px] font-semibold">OT -4</h6>
            <p>Modulat OT</p>
          </span>
          <span className="text-start">
            <p>₹ 12,0000.00 / (up to 2hrs)</p>
            <p>₹ 2500.00 / (Extra FOr per 1/2 hrs)</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <h6 className="text-[14px] font-semibold">OT -5</h6>
            <p>Modulat OT</p>
          </span>
          <span className="text-start">
            <p>₹ 12,0000.00 / (up to 2hrs)</p>
            <p>₹ 2500.00 / (Extra FOr per 1/2 hrs)</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <h6 className="text-[14px] font-semibold">OT -6</h6>
            <p>Modulat OT</p>
          </span>
          <span className="text-start">
            <p>₹ 12,0000.00 / (up to 2hrs)</p>
            <p>₹ 2500.00 / (Extra FOr per 1/2 hrs)</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <h6 className="text-[14px] font-semibold">OT -7</h6>
            <p>Modulat OT</p>
          </span>
          <span className="text-start">
            <p>₹ 12,0000.00 / (up to 2hrs)</p>
            <p>₹ 2500.00 / (Extra FOr per 1/2 hrs)</p>
          </span>
        </div>
        <p className="text-[12px] text-start">
          Special Case/ Instrument , Monitor , ventilator Will be charged Extra
          Emergency Visit Charges Will be Charges At Emergency Rate
        </p>
      </div>
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Surgery charges (internal use)
        </h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen1}
        >
          Update Charges
        </button>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <p>Super Specialty surgery</p>
          </span>
          <span className="text-start">
            <p>₹ 20,000 To 25,000</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <p>Specialist Major surgery</p>
          </span>
          <span className="text-start">
            <p>₹ 20,000 To 25,000</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <p>Major Surgery</p>
          </span>
          <span className="text-start">
            <p>₹ 20,000 To 25,000</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <p>Less Major</p>
          </span>
          <span className="text-start">
            <p>₹ 20,000 To 25,000</p>
          </span>
        </div>{" "}
        <div className="grid grid-cols-3 gap-4 border-b-[2px]">
          <span className="col-span-2 flex justify-start items-center gap-4">
            <p>Less Major</p>
          </span>
          <span className="text-start">
            <p>₹ 20,000 To 25,000</p>
          </span>
        </div>{" "}
        <p className="text-[12px] text-start">
          If surgeon brings his own assistant his/her charges will be borne by
          surgeonrged Extra Emergency Visit Charges Will be Charges At Emergency
          Rate
        </p>
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
              O.T Charges / Super Specialty operation
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full">
                <div className="w-full flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4 border-b-[2px]">
                    <span className="flex justify-start items-center gap-4">
                      <h6 className="text-[14px] font-semibold">OT -1</h6>
                      <p>Modulat OT</p>
                    </span>
                    <span className="text-start flex flex-col gap-2">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-4 border-b-[2px]">
                    <span className=" flex justify-start items-center gap-4">
                      <h6 className="text-[14px] font-semibold">OT -2</h6>
                      <p>Modulat OT</p>
                    </span>
                    <span className="text-start flex flex-col gap-2">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-4 border-b-[2px]">
                    <span className=" flex justify-start items-center gap-4">
                      <h6 className="text-[14px] font-semibold">OT -3</h6>
                      <p>Modulat OT</p>
                    </span>
                    <span className="text-start flex flex-col gap-2">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-4 border-b-[2px]">
                    <span className=" flex justify-start items-center gap-4">
                      <h6 className="text-[14px] font-semibold">OT -4</h6>
                      <p>Modulat OT</p>
                    </span>
                    <span className="text-start flex flex-col gap-2">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-4 border-b-[2px]">
                    <span className=" flex justify-start items-center gap-4">
                      <h6 className="text-[14px] font-semibold">OT -5</h6>
                      <p>Modulat OT</p>
                    </span>
                    <span className="text-start flex flex-col gap-2">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-4 border-b-[2px]">
                    <span className=" flex justify-start items-center gap-4">
                      <h6 className="text-[14px] font-semibold">OT -6</h6>
                      <p>Modulat OT</p>
                    </span>
                    <span className="text-start flex flex-col gap-2">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-4 border-b-[2px]">
                    <span className=" flex justify-start items-center gap-4">
                      <h6 className="text-[14px] font-semibold">OT -7</h6>
                      <p>Modulat OT</p>
                    </span>
                    <span className="text-start flex flex-col gap-2">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="200"
                      />
                    </span>
                  </div>
                </div>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md mt-[0.5rem]">
                  Update Value
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
              O.T Charges / Super Specialty operation
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full">
                <div className="w-full flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-4 border-b-[2px] pb-[1rem]">
                    <span className="col-span-2 flex justify-start items-center gap-4">
                      <p>Super Specialty surgery</p>
                    </span>
                    <span className="text-start gap-2 flex flex-col">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="20,000"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="25,000"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-3 gap-4 border-b-[2px] pb-[1rem]">
                    <span className="col-span-2 flex justify-start items-center gap-4">
                      <p>Specialist Major surgery</p>
                    </span>
                    <span className="text-start gap-2 flex flex-col">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="20,000"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="25,000"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-3 gap-4 border-b-[2px] pb-[1rem]">
                    <span className="col-span-2 flex justify-start items-center gap-4">
                      <p>Major Surgery</p>
                    </span>
                    <span className="text-start gap-2 flex flex-col">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="20,000"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="25,000"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-3 gap-4 border-b-[2px] pb-[1rem]">
                    <span className="col-span-2 flex justify-start items-center gap-4">
                      <p>Less Major</p>
                    </span>
                    <span className="text-start gap-2 flex flex-col">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="20,000"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="25,000"
                      />
                    </span>
                  </div>{" "}
                  <div className="grid grid-cols-3 gap-4 border-b-[2px] pb-[1rem]">
                    <span className="col-span-2 flex justify-start items-center gap-4">
                      <p>Less Major</p>
                    </span>
                    <span className="text-start gap-2 flex flex-col ">
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="20,000"
                      />
                      <input
                        type="text"
                        className="w-[10rem] border-[2px] outline-none pl-[5px]"
                        placeholder="25,000"
                      />
                    </span>
                  </div>{" "}
                </div>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md mt-[0.5rem]">
                  Update Value
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default OTChargesSuperSpecialtyoperationTable;
