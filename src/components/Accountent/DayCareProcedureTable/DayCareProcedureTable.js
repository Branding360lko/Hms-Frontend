import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";

function DayCareProcedureTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Day care Procedure</h2>
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
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 1 </p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>General surgery </p>
            </th>
            <th className="border-b-[1px]">
              <p>IND Rs</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]"></td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-start">
                GE-1 S/C
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 50
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 2</p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>Excision biopsy & aspiration (FNAC)</p>
            </th>
            <th className="border-b-[1px]">
              <p>IND Rs</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]"></td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-start">
                EXC-1 Small
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 50
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 3</p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>ENT</p>
            </th>
            <th className="border-b-[1px]">
              <p>IND Rs</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]"></td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-start">
                EN-1 Pleural effusion
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 50
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 4</p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>EYE</p>
            </th>
            <th className="border-b-[1px]">
              <p>IND Rs</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]"></td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-start">
                Ey-1 Without Anesthesia
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 50
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 5</p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>Dental</p>
            </th>
            <th className="border-b-[1px]">
              <p>IND Rs</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]"></td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-start">
                DE -1 Suture Stitches
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 50
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 6</p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>Others</p>
            </th>
            <th className="border-b-[1px]">
              <p>IND Rs</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]"></td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-start">
                Os-1 Nebulisation
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 50
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 7</p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>ICU/CCU</p>
            </th>
            <th className="border-b-[1px]">
              <p>IND Rs</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]"></td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-start">
                IC-1 Nebulisation
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 50
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 8</p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>Orthopedic</p>
            </th>
            <th className="border-b-[1px]">
              <p>IND Rs</p>
            </th>
            <th className="border-b-[1px]">
              <p>User Action</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]"></td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-start">
                OR-1 Nebulisation
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 50
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                <div className="flex gap-[10px] justify-center">
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                  <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer">
                    <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="w-fit my-2 text-[14px]">
          IF fibre cast or other material, extra charges will be taken
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
              Day care Procedure
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full flex flex-col gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p>Select One</p>
                  <select className="w-full border-[2px] outline-none h-[2.2rem] rounded selectStlye">
                    <option>Select One Category</option>
                    <option>General surgery </option>
                    <option>Excision biopsy & aspiration (FNAC)</option>
                    <option>ENT</option>
                    <option>EYE</option>
                    <option>Dental</option>
                    <option>Others</option>
                    <option>ICU/CCU</option>
                    <option>Orthopedic</option>
                  </select>
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Day care Procedure Name</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Day care Procedure  Name"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Day care Procedure Price</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Day care Procedure Price"
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
    </div>
  );
}

export default DayCareProcedureTable;
