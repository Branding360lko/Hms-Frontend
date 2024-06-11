import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IoMdAdd, IoMdPrint } from "react-icons/io";
import { CiSearch, CiViewList } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import img from "../../../assets/20180125_001_1_.jpg";
import img1 from "../../../assets/logo.png";
import jsPdf from "jspdf";
import ReactDOMServer from "react-dom/server";
import { useReactToPrint } from "react-to-print";
import "./PatientsTable.css";
import { getAllIpdPatientsData, getAllPharmacyData } from "../PharamyApi";
import PaginationComponent from "../../Pagination";
function PatientsTable() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "transparent",
    height: "600px",
    overflowY: "scroll",
    borderRadius: "5px",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [consumables, setConsumables] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ipdPatientsList, setIpdPatientsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const addConsumableHandle = (e) => {
    e.preventDefault();
    setConsumables([
      ...consumables,
      { title: "", date: "", qty: 0, rate: 0, discount: 0, amount: 0 },
    ]);
  };
  const addMedicinesHandle = (e) => {
    e.preventDefault();
    setMedicines([
      ...medicines,
      { title: "", date: "", qty: 0, rate: 0, discount: 0, amount: 0 },
    ]);
  };
  const getConsumableValueHandle = (e, index) => {
    let oldValue = [...consumables];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    setConsumables(oldValue && oldValue);
  };
  const getMedicinesValueHandle = (e, index) => {
    let oldValue = [...medicines];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    setMedicines(oldValue && oldValue);
  };
  const deleteConsumableValueHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...consumables];
    oldValue.splice(index, 1);
    setConsumables(oldValue && oldValue);
  };
  const deleteMedicinesValueHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...medicines];
    oldValue.splice(index, 1);
    setMedicines(oldValue && oldValue);
  };
  const getConsumableTotalAmountHandle = () => {
    let getTotalArray = [...consumables];
    const result = getTotalArray?.map((item, index) => {
      const amount =
        item?.qty * item?.rate -
        (item?.qty * item?.rate * item?.discount) / 100;

      return { ...item, amount };
    });
    setConsumables(result && result);
  };
  const getMedicineTotalAmountHandle = useCallback(() => {
    let getTotalArray = [...medicines];
    const result = getTotalArray?.map((item, index) => {
      const amount =
        item?.qty * item?.rate -
        (item?.qty * item?.rate * item?.discount) / 100;
      return { ...item, amount };
    });
    setMedicines(result && result);
  }, [medicines]);
  const getConsumeableTotalPriceHandle = useMemo(() => {
    const sumWithInitial = consumables.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.amount,
      0
    );
    return sumWithInitial;
  }, [consumables]);

  const getMedicineTotalPriceHandle = useMemo(() => {
    const sumWithInitial = medicines.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.amount,
      0
    );
    return sumWithInitial;
  }, [medicines]);
  const getSearchValueHandle = () => {
    console.log(searchValue);
  };

  // Api Call
  const getAllPharmacyDataHandle = async () => {
    const respone = await getAllPharmacyData();
    console.log(respone);
  };

  const getAllIpdPatientsDataHandle = async () => {
    const respone = await getAllIpdPatientsData();
    setIpdPatientsList(respone && respone?.data?.reverse());
    console.log(respone);
  };
  useEffect(() => {
    getSearchValueHandle();
  }, [searchValue]);
  useEffect(() => {
    getConsumableTotalAmountHandle();
    getAllPharmacyDataHandle();
  }, []);

  useEffect(() => {
    getMedicineTotalAmountHandle();
  }, []);
  useEffect(() => {
    getAllIpdPatientsDataHandle();
  }, []);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-start flex-col gap-2">
        <h2 className="border-b-[4px] border-[#3497F9] w-fit">
          IPD Patients List
        </h2>
        <span className="w-[20rem] border-[2px] rounded flex bg-[#F4F6F6] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search Patients By Uhid"
            className="w-11/12 border-none outline-none pl-[5px] h-[2rem] bg-[#F4F6F6]"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <CiSearch className="text-[1rem]" />
        </span>
      </div>
      <div>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <tr>
              <th className="border-b-[1px]">
                <p>S N</p>
              </th>
              <th className="border-b-[1px]">
                <p>Patients Uhid</p>
              </th>

              <th className="border-b-[1px]">
                <p>Date</p>
              </th>
              <th className="border-b-[1px]">
                <p>Ipd Patients Notes</p>
              </th>
              <th className="border-b-[1px]">
                <p> Add Medicine </p>
              </th>
              <th className="border-b-[1px]">
                <p> View Medicine </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {ipdPatientsList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item, index) => (
                <tr key={index}>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    {index + 1}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    {"Uhid" + item?.ipdPatientId}
                  </td>

                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    {item?.updatedAt?.split("T", 1)}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    {item?.ipdPatientNotes}
                  </td>
                  <td className="justify-center align-center flex text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <div
                      onClick={handleOpen}
                      className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                    >
                      <IoMdAdd className="text-[25px] text-[#3497F9]" />
                    </div>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] flex-row">
                    <div className="flex gap-[10px] justify-center">
                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                        onClick={handleOpen1}
                      >
                        <CiViewList className="text-[25px] text-[#96999C]" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <PaginationComponent
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          data={ipdPatientsList}
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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#444444] w-fit"
            >
              Patients Details
            </Typography>
            <div class="grid grid-cols-3 gap-4 pt-[10px] pb-[10px]">
              <div className="">
                <span>Patients Reg ID</span>:
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Admission Date / Time</span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Name</span>: <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Discharge Date / Time</span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Gender</span>: <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Patient Categ</span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Age</span>: <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Tarilt Catrg</span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>IPD NO</span>: <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>MR and IP No</span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>OPD NO </span>: <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Admitting Doctor </span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>OCC bed categ</span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Room and bed NO</span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
              <div className="">
                <span>Bill Date and Time</span>:{" "}
                <span className="text-[#444444]">19</span>
              </div>
            </div>
            <hr />
            <form>
              <div className="w-full">
                <div className="flex justify-between pt-[10px] pb-[10px]">
                  <p className="border-b-[4px] border-[#444444]">Consumables</p>
                  <button
                    className="bg-[#3497F9] text-white p-[8px] rounded-md "
                    onClick={addConsumableHandle}
                  >
                    Add Items
                  </button>
                </div>
                <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
                  <thead>
                    <tr>
                      <th className="border-b-[1px]">
                        <p>SN</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Material Name</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Qty</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Rate</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Discount</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Amount</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="overflow-x-scroll">
                    {consumables?.map((item, index) => (
                      <tr>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <p>{index + 1}</p>
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <input
                            type="date"
                            name="date"
                            onChange={(e) => getConsumableValueHandle(e, index)}
                            className="w-[8rem] h-[2rem] border-[2px] border-[#888] rounded outline-none"
                          />
                        </td>
                        <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <textarea
                            rows={5}
                            name="title"
                            placeholder="Medicine Name"
                            onChange={(e) => getConsumableValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                          <input
                            type="text"
                            name="qty"
                            placeholder="Quantity"
                            onChange={(e) => getConsumableValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <input
                            type="text"
                            name="rate"
                            placeholder="Price"
                            onChange={(e) => getConsumableValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <input
                            type="text"
                            name="discount"
                            placeholder="In Percentage"
                            onChange={(e) => getConsumableValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <input
                            type="text"
                            name="amount"
                            value={item?.amount}
                            placeholder="Total"
                            disabled
                            // onChange={(e) => getConsumableValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <button
                            className="bg-[red] text-white p-[4px] rounded-md "
                            onClick={(e) =>
                              deleteConsumableValueHandle(e, index)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="w-full justify-end flex pt-[10px] pb-[10px] text-[#0495F5]">
                  <p className="font-bold mr-[10px]">Sub Total</p>
                  <strong>₹ {getConsumeableTotalPriceHandle}</strong>
                </div>
                <hr />
              </div>
              <div className="w-full">
                <div className="flex justify-between pt-[10px] pb-[10px]">
                  <p className="border-b-[4px] border-[#444444]">Medicines</p>
                  <button
                    className="bg-[#3497F9] text-white p-[8px] rounded-md "
                    onClick={addMedicinesHandle}
                  >
                    Add Items
                  </button>
                </div>
                <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
                  <thead>
                    <tr>
                      <th className="border-b-[1px]">
                        <p>SN</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Material Name</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Qty</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Rate</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Discount</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Amount</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="overflow-x-scroll">
                    {medicines?.map((item, index) => (
                      <tr>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <p>{index + 1}</p>
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <input
                            type="date"
                            name="date"
                            onChange={(e) => getMedicinesValueHandle(e, index)}
                            className="w-[8rem] h-[2rem] border-[2px] border-[#888] rounded outline-none"
                          />
                        </td>
                        <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <textarea
                            rows={5}
                            name="title"
                            placeholder="Medicine Name"
                            onChange={(e) => getMedicinesValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                          <input
                            type="text"
                            name="qty"
                            placeholder="Quantity"
                            onChange={(e) => getMedicinesValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <input
                            type="text"
                            name="rate"
                            placeholder="Price"
                            onChange={(e) => getMedicinesValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <input
                            type="text"
                            name="discount"
                            placeholder="In Percentage"
                            onChange={(e) => getMedicinesValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <input
                            type="text"
                            name="amount"
                            value={item?.amount}
                            placeholder="Amount"
                            onChange={(e) => getMedicinesValueHandle(e, index)}
                            className=" border-[2px] border-[#888] w-[10rem] h-[2rem] rounded pl-[5px] outline-none"
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          <button
                            className="bg-[red] text-white p-[4px] rounded-md "
                            onClick={(e) =>
                              deleteMedicinesValueHandle(e, index)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="w-full justify-end flex pt-[10px] pb-[10px] text-[#0495F5]">
                  <p className="font-bold mr-[10px]">Sub Total</p>
                  <strong>₹ {getMedicineTotalPriceHandle}</strong>
                </div>
                <hr />
                <div className="w-full justify-end flex pt-[10px] pb-[10px] text-[#0495F5]">
                  <p className="font-bold mr-[10px]">Total</p>
                  <strong>
                    ₹{" "}
                    {Math.round(
                      getMedicineTotalPriceHandle +
                        getConsumeableTotalPriceHandle
                    )}
                  </strong>
                </div>
                <hr />
                <div className="w-full flex justify-center pt-[10px]">
                  <button className="bg-[#3497F9] text-white p-[8px] rounded-md ">
                    Save
                  </button>
                </div>
              </div>
            </form>
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
              className="w-full pb-[10px]"
            >
              <span className="w-full justify-between flex">
                <h2 className="border-b-[4px] border-[#3497F9]">
                  Patients Full Details
                </h2>
                <button
                  className="bg-[#3497F9] text-white p-[4px] rounded-md text-[14px] flex items-center"
                  onClick={handlePrint}
                >
                  <FaDownload className="pr-[2px]" /> Download
                </button>
              </span>
            </Typography>
            <hr />
            <div className="flex pt-[10px] pb-[10px] gap-[10%]">
              <span>
                <img src={img} alt="patients " className="w-[15rem] " />
              </span>
              <div class="grid grid-cols-2 gap-4">
                <div className="flex gap-[10px]">
                  <span>Patients Reg ID</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Admission Date / Time</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Name</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Discharge Date / Time</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Gender</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Patient Categ</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Age</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Tarilt Catrg</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>IPD NO</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>MR and IP No</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Bill Bed Catrg</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Admitting Doctor</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>OCC bed categ</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Room and bed NO</span>:<p>19</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Bill Date and Time</span>:<p>19</p>
                </div>
              </div>
            </div>
            <hr />
            <h4 className="border-b-[4px] border-[#3497F9] w-fit pt-[10px] pb-[10px]">
              Patients Medicine wise details
            </h4>

            <div className="w-full ">
              <div className="flex justify-start pt-[10px] pb-[10px]">
                <p className="border-b-[4px] border-[#444444]">Consumables</p>
              </div>
              <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
                <thead>
                  <tr>
                    <th className="border-b-[1px]">
                      <p>S N</p>
                    </th>
                    <th className="border-b-[1px]">
                      <p>Date</p>
                    </th>
                    <th className="border-b-[1px]">
                      <p>Item Name</p>
                    </th>
                    <th className="border-b-[1px]">
                      <p>Qty</p>
                    </th>
                    <th className="border-b-[1px]">
                      <p>Rate</p>
                    </th>

                    <th className="border-b-[1px]">
                      <p>Amount</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-x-scroll">
                  <tr>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>1</p>
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>12/02/2024</p>
                    </td>
                    <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>Ghjj</p>
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                      <p>vgfg</p>
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>grfg</p>
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>fdgf</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr />
            </div>
            <div className="w-full ">
              <div className="flex justify-start pt-[10px] pb-[10px]">
                <p className="border-b-[4px] border-[#444444]">Medicine</p>
              </div>
              <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
                <thead>
                  <tr>
                    <th className="border-b-[1px]">
                      <p>S N</p>
                    </th>
                    <th className="border-b-[1px]">
                      <p>Date</p>
                    </th>
                    <th className="border-b-[1px]">
                      <p>Item Name</p>
                    </th>
                    <th className="border-b-[1px]">
                      <p>Qty</p>
                    </th>
                    <th className="border-b-[1px]">
                      <p>Rate</p>
                    </th>

                    <th className="border-b-[1px]">
                      <p>Amount</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-x-scroll">
                  <tr>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>1</p>
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>12/02/2024</p>
                    </td>
                    <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>Ghjj</p>
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                      <p>vgfg</p>
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>grfg</p>
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      <p>fdgf</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr />
            </div>
            <div className="w-full pt-[20px]">
              <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
                <thead>
                  <tr>
                    <th className="border-b-[1px] text-start">Service Name</th>
                    <th className="border-b-[1px] text-start">CN AMT</th>
                    <th className="border-b-[1px] text-start">
                      Credit Note Type
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-x-scroll w-full">
                  <tr className="justify-between  w-full">
                    <td className="justify-start text-[16px] py-4 px-[4px]  ">
                      <p>IP Routine Visit</p>
                    </td>
                    <td className="justify-start text-[16px] py-4 px-[4px]  ">
                      <p>1500.00</p>
                    </td>
                    <td className="justify-start text-[16px] py-4 px-[4px]  ">
                      <p>Doctor sugession</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <div className="w-full pt-[10px]">
              <div class="grid grid-cols-2 gap-4">
                <div className="flex gap-[10px]">
                  <span>Authorised by :</span>
                  <p className="text-[#3E454D]">Nemesis12312</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Total Amount :</span>
                  <p className="text-[#3E454D]">₹90,000.00</p>
                </div>
              </div>
            </div>
            <div className="w-full pt-[10px]">
              <div class="grid grid-cols-2 gap-4">
                <div className="flex gap-[10px]">
                  <span>Amount in words :</span>
                  <p className="text-[#3E454D]">one one one two three five .</p>
                </div>
              </div>
            </div>
            <div className="w-full pt-[10px]">
              <div class="grid grid-cols-2 gap-4">
                <div className="flex gap-[10px]">
                  <span>Remarks :</span>
                  <p className="text-[#3E454D]">Dr Aquib Nemesis</p>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="print-hide">
        <div className="print-show w-full" ref={componentRef}>
          <div className="flex justify-between items-center pl-[15px] pr-[15px]">
            <span className="flex items-center gap-[18px]">
              <img
                src={img1}
                alt="logo"
                className="w-[150px] h-[120px] object-contain"
              />
              <span>
                <h4 className="text-start text-[20px] font-bold">
                  City Hospital and Trauma Centre
                </h4>
                <p className="text-start text-[14px]">
                  Contact No. 9119900861,9119900862
                </p>
              </span>
            </span>
            <p className="text-start w-[20rem] text-[14px]">
              C1-C2 cinder dump complex ,near Alambagh bus stand ,Kanpur road,
              Lucknow 226005{" "}
            </p>
          </div>
          <hr />
          <h2 className="pt-[10px] pb-[10px] font-semibold text-center">
            Medicine wise details
          </h2>
          <hr />
          <div className="flex items-center pt-[20px] pb-[20px] gap-[10%]">
            <div class="grid grid-cols-3 gap-4 w-full pl-[20px] pr-[20px]">
              <div className="flex gap-[10px]">
                <span>Patients Reg ID</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Admission Date / Time</span>:<p>19/02/24 10:30pm</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Name</span>:<p>Arman Ali</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Discharge Date / Time</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Gender</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Patient Categ</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Age</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Tarilt Catrg</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>IPD NO</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>MR and IP No</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Bill Bed Catrg</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Admitting Doctor</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>OCC bed categ</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Room and bed NO</span>:<p>19</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Bill Date and Time</span>:<p>19</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full pl-[15px] pr-[15px]">
            <div className="flex justify-start pt-[10px] pb-[10px]">
              <p className="border-b-[4px] border-[#444444]">Consumables</p>
            </div>
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
              <thead>
                <tr>
                  <th className="border-b-[1px]">
                    <p>S N</p>
                  </th>
                  <th className="border-b-[1px]">
                    <p>Date</p>
                  </th>
                  <th className="border-b-[1px]">
                    <p>Item Name</p>
                  </th>
                  <th className="border-b-[1px]">
                    <p>Qty</p>
                  </th>
                  <th className="border-b-[1px]">
                    <p>Rate</p>
                  </th>

                  <th className="border-b-[1px]">
                    <p>Amount</p>
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-x-scroll">
                <tr>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>1</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>12/02/2024</p>
                  </td>
                  <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>Ghjj</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                    <p>vgfg</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>grfg</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>fdgf</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <hr />
          </div>
          <div className="w-full pl-[15px] pr-[15px]">
            <div className="flex justify-start pt-[10px] pb-[10px]">
              <p className="border-b-[4px] border-[#444444]">Medicine</p>
            </div>
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
              <thead>
                <tr>
                  <th className="border-b-[1px]">
                    <p>S N</p>
                  </th>
                  <th className="border-b-[1px]">
                    <p>Date</p>
                  </th>
                  <th className="border-b-[1px]">
                    <p>Item Name</p>
                  </th>
                  <th className="border-b-[1px]">
                    <p>Qty</p>
                  </th>
                  <th className="border-b-[1px]">
                    <p>Rate</p>
                  </th>

                  <th className="border-b-[1px]">
                    <p>Amount</p>
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-x-scroll">
                <tr>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>1</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>12/02/2024</p>
                  </td>
                  <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>Ghjj</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                    <p>vgfg</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>grfg</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                    <p>fdgf</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <hr />
          </div>
          <div className="w-full pt-[20px]  pl-[15px] pr-[15px]">
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
              <thead>
                <tr>
                  <th className="border-b-[1px] text-start">Service Name</th>
                  <th className="border-b-[1px] text-start">CN AMT</th>
                  <th className="border-b-[1px] text-start">
                    Credit Note Type
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-x-scroll w-full">
                <tr className="justify-between  w-full">
                  <td className="justify-start text-start text-[16px] py-4 px-[4px]  ">
                    <p>IP Routine Visit</p>
                  </td>
                  <td className="justify-start text-start text-[16px] py-4 px-[4px]  ">
                    <p>1500.00</p>
                  </td>
                  <td className="justify-start text-start text-[16px] py-4 px-[4px]  ">
                    <p>Doctor sugession</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full pt-[10px]  pl-[15px] pr-[15px]">
            <div class="grid grid-cols-2 gap-4">
              <div className="flex gap-[10px]">
                <span>Authorised by :</span>
                <p className="text-[#3E454D]">Nemesis12312</p>
              </div>
              <div className="flex gap-[10px]">
                <span>Total Amount :</span>
                <p className="text-[#3E454D]">₹90,000.00</p>
              </div>
            </div>
          </div>
          <div className="w-full pt-[10px]  pl-[15px] pr-[15px]">
            <div class="grid grid-cols-2 gap-4">
              <div className="flex gap-[10px]">
                <span>Amount in words :</span>
                <p className="text-[#3E454D]">one one one two three five .</p>
              </div>
            </div>
          </div>
          <div className="w-full pt-[10px]  pl-[15px] pr-[15px]">
            <div class="grid grid-cols-2 gap-4">
              <div className="flex gap-[10px]">
                <span>Remarks :</span>
                <p className="text-[#3E454D]">Dr Aquib Nemesis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsTable;
