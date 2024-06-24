import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import style from "../../../styling/styling";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
function TariffsofminorproceduresTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Tariffs of Minor Procedures
        </h2>
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
              <p>Injections</p>
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
                INJ-1 S/C
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
              <p>Dressings</p>
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
                INJ-1 S/C
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
              <p>Aspirations 50% / 50%</p>
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
                INJ-1 S/C
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
          Where EMO is involved 100% to the hospital
        </p>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px] w-[10rem]">
              <p>GP - 4</p>
            </th>
            <th className="border-b-[1px] text-start w-[30rem]">
              <p>Suturing (50% hospital/ 50% surgeon)</p>
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
                INJ-1 S/C
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
              <p>Removal</p>
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
                INJ-1 S/C
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
              <p>General procedure in wards / emergency</p>
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
                INJ-1 S/C
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
              Tariffs of Minor Procedures
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full flex flex-col gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p>Select One</p>
                  <select className="w-full border-[2px] outline-none h-[2.2rem] rounded selectStlye">
                    <option>Select One Category</option>
                    <option>Injections</option>
                    <option>Dressings</option>
                    <option>Aspirations 50% / 50%</option>
                    <option>Suturing (50% hospital/ 50% surgeon)</option>
                    <option>Removal</option>
                    <option>General procedure in wards / emergency</option>
                  </select>
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Enter Tariffs Name</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Enter Tariffs  Name"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Enter Tariffs Price</p>
                  <input
                    type="text"
                    className=" w-full border-[2px] outline-none h-[2.2rem] rounded pl-[5px]"
                    placeholder="Enter Tariffs Price"
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

export default TariffsofminorproceduresTable;
