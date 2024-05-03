import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";

function DoctorVisitChargesTable() {
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
    borderRadius: "5px",
    outline: "transparent",
    overflowY: "scroll",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Doctor visit Charges (INDOOR)
        </h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Update Charges
        </button>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 border-b-[2px] py-[0.4rem]">
          <h6 className="text-[18px] font-medium">Super Specialist</h6>
          <p className="text-[16px] font-normal">Rupess</p>
        </div>
        <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
          <p className="text-[16px] font-normal">General Ward / S.Pvt. ward</p>
          <p className="text-[16px] font-normal">
            ₹ 1500.00 / Day (Including 2 Visit/Day)
          </p>
        </span>
        <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
          <p className="text-[16px] font-normal">Private Ward</p>
          <p className="text-[16px] font-normal">
            ₹ 2000.00 / Day (Including 2 Visit/Day)
          </p>
        </span>
        <div className="w-full h-[0.5px] border-b-[2px] py-[0.4rem]"></div>
        <div className="grid grid-cols-2 gap-4 border-b-[2px] py-[0.4rem]">
          <h6 className="text-[18px] font-medium">
            General Physicians / General Surgeon
          </h6>
        </div>

        <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
          <p className="text-[16px] font-normal">General Ward / S.Pvt. ward</p>
          <p className="text-[16px] font-normal">
            ₹ 800.00 / Day (Including 2 Visit/Day)
          </p>
        </span>
        <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
          <p className="text-[16px] font-normal">Private Ward</p>
          <p className="text-[16px] font-normal">
            ₹ 1000.00 / Day (Including 2 Visit/Day)
          </p>
        </span>
        <div className="w-full h-[0.5px] border-b-[2px] py-[0.4rem]"></div>
        <div className="grid grid-cols-2 gap-4 border-b-[2px] py-[0.4rem]">
          <h6 className="text-[18px] font-medium">Ayushmaan / Janata Ward</h6>
        </div>
        <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
          <p className="text-[16px] font-normal">First Time Charges</p>
          <p className="text-[16px] font-normal">₹ 200.00</p>
        </span>
        <div className="w-full h-[0.5px] border-b-[2px] py-[0.4rem]"></div>
        <p className="w-fit text-[14px] my-[0.5rem]">
          30% To The Hospital & 70% TO The Consultant, In case J.W 100% To
          Consultant*.
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
              Doctor visit Charges
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form>
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-4 border-b-[2px] py-[0.4rem]">
                    <h6 className="text-[18px] font-medium">
                      Super Specialist
                    </h6>
                    <p className="text-[16px] font-normal">Rupess</p>
                  </div>
                  <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
                    <p className="text-[16px] font-normal">
                      General Ward / S.Pvt. ward
                    </p>
                    <input
                      type="text"
                      className="w-[10rem] border-[2px] outline-none pl-[5px]"
                      placeholder="200"
                    />
                  </span>
                  <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
                    <p className="text-[16px] font-normal">Private Ward</p>
                    <input
                      type="text"
                      className="w-[10rem] border-[2px] outline-none pl-[5px]"
                      placeholder="200"
                    />
                  </span>
                  <div className="w-full h-[0.5px] border-b-[2px] py-[0.4rem]"></div>
                  <div className="grid grid-cols-2 gap-4 border-b-[2px] py-[0.4rem]">
                    <h6 className="text-[18px] font-medium">
                      General Physicians / General Surgeon
                    </h6>
                  </div>

                  <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
                    <p className="text-[16px] font-normal">
                      General Ward / S.Pvt. ward
                    </p>
                    <input
                      type="text"
                      className="w-[10rem] border-[2px] outline-none pl-[5px]"
                      placeholder="200"
                    />
                  </span>
                  <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
                    <p className="text-[16px] font-normal">Private Ward</p>
                    <input
                      type="text"
                      className="w-[10rem] border-[2px] outline-none pl-[5px]"
                      placeholder="200"
                    />
                  </span>
                  <div className="w-full h-[0.5px] border-b-[2px] py-[0.4rem]"></div>
                  <div className="grid grid-cols-2 gap-4 border-b-[2px] py-[0.4rem]">
                    <h6 className="text-[18px] font-medium">
                      Ayushmaan / Janata Ward
                    </h6>
                  </div>
                  <span className="grid grid-cols-2 gap-4  py-[0.4rem] my-[0.4rem]">
                    <p className="text-[16px] font-normal">
                      First Time Charges
                    </p>
                    <input
                      type="text"
                      className="w-[10rem] border-[2px] outline-none pl-[5px]"
                      placeholder="200"
                    />
                  </span>
                  <div className="w-full h-[0.5px] border-b-[2px] py-[0.4rem]"></div>
                </div>
                <button className="bg-[#3497F9] text-white p-[10px] rounded-md mt-[0.5rem]">
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

export default DoctorVisitChargesTable;
