import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";

function AdmissionCharges() {
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
    height: "600px",
    overflowY: "scroll",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Admission And File Charges
        </h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Edit Charges
        </button>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-1">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full grid grid-cols-2 gap-4 border-b-[2px] pb-2">
            <span className="grid grid-cols-3  ">
              <p className="font-semibold text-start">RF 1</p>
              <p className="font-semibold text-start col-span-2">Wards</p>
            </span>
            <span className="font-semibold">Rupees</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">File Charges</p>
            </span>
            <span className="font-normal">₹ 500.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">REG Charges</p>
            </span>
            <span className="font-normal">₹ 300.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 border-b-[2px] py-2 ">
            <span className="grid grid-cols-3  ">
              <p className="font-semibold text-start">RF 2</p>
              <p className="font-semibold text-start col-span-2">
                Emergency / Dat case
              </p>
            </span>
            <span className="font-semibold"></span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">File Charges</p>
            </span>
            <span className="font-normal">₹ 500.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">REG Charges</p>
            </span>
            <span className="font-normal">₹ 300.00</span>
          </div>{" "}
          <div className="w-full grid grid-cols-2 gap-4 border-b-[2px] py-2 ">
            <span className="grid grid-cols-3  ">
              <p className="font-semibold text-start">RF 3</p>
              <p className="font-semibold text-start col-span-2">
                OPD reg & File Charges
              </p>
            </span>
            <span className="font-semibold"></span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">
                First Time Charges
              </p>
            </span>
            <span className="font-normal">₹ 500.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">
                Subsequent Charges
              </p>
            </span>
            <span className="font-normal">₹ 300.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">
                Janta OPD (only first time)
              </p>
            </span>
            <span className="font-normal">₹ 300.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">
                Special Clinic
              </p>
            </span>
            <span className="font-normal">₹ 300.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">
                OPD with prior Appointment Extra Charges
              </p>
            </span>
            <span className="font-normal">₹ 300.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 border-b-[2px] py-2 ">
            <span className="grid grid-cols-3  ">
              <p className="font-semibold text-start">RF 4</p>
              <p className="font-semibold text-start col-span-2">
                I.C.U /NICU/HDW
              </p>
            </span>
            <span className="font-semibold">₹ 5000.00</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4  ">
            <span className="grid grid-cols-3  ">
              <p className="font-semibold text-start">RF 5</p>
              <p className="font-semibold text-start col-span-2">
                Janata ward (Charitable ward)
              </p>
            </span>
            <span className="font-semibold"></span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 ">
            <span className="grid grid-cols-3">
              <p className="font-semibold "></p>
              <p className="font-normal  col-span-2 text-start">
                REG & File Charges
              </p>
            </span>
            <span className="font-normal">₹ 500.00</span>
          </div>
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
              className="border-b-[4px] w-fit border-[#3497F9]"
            >
              Edit Admission Charges
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full">
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full grid grid-cols-2 gap-4 border-b-[2px] pb-2">
                    <span className="grid grid-cols-3  ">
                      <p className="font-semibold text-start">RF 1</p>
                      <p className="font-semibold text-start col-span-2">
                        Wards
                      </p>
                    </span>
                    <span className="font-semibold text-center">Rupees</span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        File Charges
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        REG Charges
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 border-b-[2px] py-2 ">
                    <span className="grid grid-cols-3  ">
                      <p className="font-semibold text-start">RF 2</p>
                      <p className="font-semibold text-start col-span-2">
                        Emergency / Dat case
                      </p>
                    </span>
                    <span className="font-semibold"></span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        File Charges
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        REG Charges
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>{" "}
                  <div className="w-full grid grid-cols-2 gap-4 border-b-[2px] py-2 ">
                    <span className="grid grid-cols-3  ">
                      <p className="font-semibold text-start">RF 3</p>
                      <p className="font-semibold text-start col-span-2">
                        OPD reg & File Charges
                      </p>
                    </span>
                    <span className="font-semibold"></span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        First Time Charges
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        Subsequent Charges
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        Janta OPD (only first time)
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        Special Clinic
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        OPD with prior Appointment Extra Charges
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 border-b-[2px] py-2 ">
                    <span className="grid grid-cols-3  ">
                      <p className="font-semibold text-start">RF 4</p>
                      <p className="font-semibold text-start col-span-2">
                        I.C.U /NICU/HDW
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4  ">
                    <span className="grid grid-cols-3  ">
                      <p className="font-semibold text-start">RF 5</p>
                      <p className="font-semibold text-start col-span-2">
                        Janata ward (Charitable ward)
                      </p>
                    </span>
                    <span className="font-semibold"></span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 ">
                    <span className="grid grid-cols-3">
                      <p className="font-semibold "></p>
                      <p className="font-normal  col-span-2 text-start">
                        REG & File Charges
                      </p>
                    </span>
                    <span className="font-normal text-center">
                      ₹{" "}
                      <input
                        type="text"
                        className="border-[2px] w-[5rem] outline-none"
                      />
                    </span>
                  </div>
                </div>
                <div className="text-start pt-4">
                  <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
                    Update Price
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

export default AdmissionCharges;
