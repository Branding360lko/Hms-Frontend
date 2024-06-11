import React, { useEffect, useRef, useState } from "react";
import { CiViewList } from "react-icons/ci";
import {
  addDailyDoctorVisitEmergencyData,
  addDailyDoctorVisitIpdData,
  getAllEmergencyPatientsData,
  getAllEmergencyPatientsListData,
  getOneEmergencyPatientsDoctorVisitData,
} from "../NurseApi";
import img from "../../../assets/20180125_001_1_.jpg";
import { RiEdit2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import style from "../../../styling/styling";
import { getMedicineDataHandle } from "../../../Store/Slices/Medicine";
import { getTestDataHandle } from "../../../Store/Slices/Test";
import { date } from "../../../utils/DateAndTimeConvertor";
import { time } from "../../../utils/DateAndTimeConvertor";
import Snackbars from "../../SnackBar";
import { FaSearch } from "react-icons/fa";

function EmergencyPatientsTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [viewPatientsData, setViewPatientsData] = useState([]);
  const [allEmergencyPatientsListData, setAllEmergencyPatientsListData] =
    useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { medicineData } = useSelector((state) => state.MedicineData);
  const { testData } = useSelector((state) => state.TestData);
  const dispatch = useDispatch();
  const [doctorWithPatients, setDoctorWithPatients] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const [searchMedicine, setSearchMedicine] = useState([]);
  const [searchTest, setSearchTest] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [dailyDoctorVisitData, setDailyDoctorVisitData] = useState({
    doctorId: "",
    doctorName: "",
    patientsId: "",
    ipdPatientId: "",
    symtoms: "",
    notes: "",
    visitDateTime: "",
  });
  // Snackbar--------------------
  // ----Succcess
  const [openSnackbarSuccess, setOpenSnackBarSuccess] = React.useState(false);
  const [snackBarMessageSuccess, setSnackBarSuccessMessage] =
    React.useState("");

  const handleClickSnackbarSuccess = () => {
    setOpenSnackBarSuccess(true);
  };
  // ----Warning
  const [openSnackbarWarning, setOpenSnackBarWarning] = React.useState(false);
  const [snackBarMessageWarning, setSnackBarSuccessWarning] =
    React.useState("");

  const handleClickSnackbarWarning = () => {
    setOpenSnackBarWarning(true);
  };
  // ----------------------------
  const selectMedicineHandle = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      const filter = medicineData?.data?.filter((item) => {
        if (e.target.value !== "") {
          return item?.Name?.toLowerCase()?.includes(
            e.target.value?.toLowerCase()
          );
        }
      });
      console.log(filter);
      setSearchMedicine(filter && filter);
    }, 100);
    setIsLoading(false);
  };
  const selectTestHandle = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      const filter = testData?.data?.filter((item) => {
        if (e.target.value !== "") {
          return item?.Name?.toLowerCase()?.includes(
            e.target.value?.toLowerCase()
          );
        }
      });
      console.log(filter);
      setSearchTest(filter && filter);
    }, 100);
    setIsLoading(false);
  };
  const addMedicineTableHandle = (e) => {
    e.preventDefault();
    setSelectedMedicine([
      ...selectedMedicine,
      { name: "", quantity: 1, price: "" },
    ]);
  };
  const addTestTableHandle = (e) => {
    e.preventDefault();
    setSelectedTest([...selectedTest, { name: "", quantity: 1, price: "" }]);
  };
  const getMedicineData = (e, index) => {
    let oldValue = [...selectedMedicine];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    setSelectedMedicine(oldValue && oldValue);
    console.log(selectedMedicine);
  };
  const getTestData = (e, index) => {
    let oldValue = [...selectedTest];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    setSelectedTest(oldValue && oldValue);
    console.log(selectedTest);
  };
  const addSelectedMedicineDataHandle = (index, item) => {
    let oldValue = [...selectedMedicine];
    console.log(item);
    oldValue[index] = {
      ...oldValue[index],
      name: item?.Name,
      price: item?.RATE,
    };
    setSelectedMedicine(oldValue && oldValue);
    setSearchMedicine([]);
  };
  const addSelectedTestDataHandle = (index, item) => {
    let oldValue = [...selectedTest];
    console.log(item);
    oldValue[index] = {
      ...oldValue[index],
      name: item?.Name,
      price: item?.Cost,
    };
    setSelectedTest(oldValue && oldValue);
    setSearchTest([]);
  };
  const deleteMedicineHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...selectedMedicine];
    console.log(oldValue);
    oldValue.splice(index, 1);
    console.log(oldValue);
    setSelectedMedicine(oldValue && oldValue);
  };
  const deleteTestHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...selectedTest];

    oldValue.splice(index, 1);

    setSelectedTest(oldValue && oldValue);
  };
  const addDailyDoctorVisitEmergencyDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Symptoms", dailyDoctorVisitData?.symtoms);
    formData.append("Note", dailyDoctorVisitData?.notes);
    formData.append("EmergencyPatientData", dailyDoctorVisitData?.ipdPatientId);
    formData.append("isPatientsChecked", true);
    formData.append("doctorId", dailyDoctorVisitData?.doctorId);
    formData.append("VisitDateTime", dailyDoctorVisitData?.visitDateTime);
    formData.append("medicine", JSON.stringify(selectedMedicine));
    formData.append("test", JSON.stringify(selectedTest));
    const result = await addDailyDoctorVisitEmergencyData(formData);
    if (result?.status === 201) {
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      handleClose();
    }
    if (result?.status !== 201) {
      handleClickSnackbarWarning();
      setSnackBarSuccessWarning(result?.data?.message);
      handleClose();
    }
    console.log(result);
  };
  const getOneEmergencyPatientsDoctorVisitDataHandle = async (Id) => {
    const result = await getOneEmergencyPatientsDoctorVisitData(Id);
    setViewPatientsData(result && result?.data?.data);
    console.log(result, "ghfgfh");
  };
  const [allEmergencyPatients, setAllEmergencyPatients] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTestIndex, setActiveTestIndex] = useState(null);
  const selectRef = useRef(null);
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveIndex(null);
        setActiveTestIndex(null);
        setSearchMedicine([]);
        setSearchTest([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    dispatch(getMedicineDataHandle());
    dispatch(getTestDataHandle());
  }, []);

  const getAllEmergencyPatientsDataHandle = async () => {
    const result = await getAllEmergencyPatientsData();
    setAllEmergencyPatients(result && result?.data?.data);
    setFilteredData(result && result?.data?.data);
    console.log(result, "dasfsgZ");
  };
  const getAllEmergencyPatientsListDataHandle = async () => {
    const result = await getAllEmergencyPatientsListData();
    setAllEmergencyPatientsListData(result && result?.data?.data);
  };
  const searchHandle = () => {
    const filter = allEmergencyPatients?.filter((item) => {
      if (search != "") {
        return item?.patientsId?.toLowerCase().includes(search.toLowerCase());
      }
      return item;
    });
    setFilteredData(filter && filter);

    console.log(filter);
  };
  React.useEffect(() => {
    searchHandle();
  }, [search]);
  useEffect(() => {
    getAllEmergencyPatientsDataHandle();
    getAllEmergencyPatientsListDataHandle();
  }, []);
  console.log(allEmergencyPatients, "allEmergencyPatients");
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Emergency Visit List
        </h2>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
          <FaSearch className="text-[#56585A]" />
          <input
            className="bg-transparent outline-none"
            placeholder="Search by patient id"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
      </div>
      <div className="w-full">
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-[1px] p-1 font-semibold">
              <p>S_N</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Patient Uhid</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Doctor Name</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p> Admiited Date/TIme </p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Action</p>
            </th>
          </thead>

          <tbody>
            {filteredData?.map((item, index) => (
              <tr key={index} className="border-b-[1px]">
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {index + 1}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {"Uhid" + item?.patientsId}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {item?.doctorName}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {date(item?.EmergencyPatientCreatedTime)}-
                  {time(item?.EmergencyPatientCreatedTime)}
                </td>{" "}
                <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                  <div className="flex gap-[10px] justify-center">
                    {allEmergencyPatientsListData?.find(
                      (val) =>
                        val?.EmergencyPatientData === item?.Emergencypatient_id
                    ) ? (
                      <div
                        onClick={() => [
                          getOneEmergencyPatientsDoctorVisitDataHandle(
                            item?.Emergencypatient_id
                          ),
                          handleOpen1(),
                        ]}
                        className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                      >
                        <CiViewList className="text-[20px] text-[#96999C]" />
                      </div>
                    ) : (
                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                        onClick={handleOpen2}
                      >
                        <CiViewList className="text-[20px] text-[#96999C]" />
                      </div>
                    )}

                    <div
                      className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                      onClick={() => [
                        handleOpen(),
                        setDailyDoctorVisitData({
                          ...dailyDoctorVisitData,
                          doctorId: item?._id,
                          doctorName: item?.doctorName,
                          patientsId: item?.patientsId,
                          ipdPatientId: item?.Emergencypatient_id,
                        }),
                      ]}
                    >
                      <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
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
              Doctor Visit
            </Typography>
            <form
              className="w-full flex flex-col gap-3"
              onSubmit={addDailyDoctorVisitEmergencyDataHandle}
            >
              <div className="w-full grid grid-cols-2 gap-3 pt-3">
                <div className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Doctor Name</p>
                  <span className="w-full border-[1px] rounded border-[#ccc] p-1">
                    <input
                      type="text"
                      placeholder="Doctor Name"
                      className="w-full border-none outline-none"
                      value={dailyDoctorVisitData?.doctorName}
                      disabled
                    />
                  </span>
                </div>{" "}
                <div className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Doctor Visti Time</p>
                  <span className="w-full border-[1px] rounded border-[#ccc] p-1">
                    <input
                      type="datetime-local"
                      placeholder="Doctor Name"
                      className="w-full border-none outline-none"
                      onChange={(e) =>
                        setDailyDoctorVisitData({
                          ...dailyDoctorVisitData,
                          visitDateTime: e.target.value,
                        })
                      }
                      required
                    />
                  </span>
                </div>{" "}
              </div>
              <div className="w-full ">
                <div className="w-full flex justify-between items-center pt-1 pb-3">
                  <p className="text-[1.2rem] font-semibold">Medicine</p>
                  <button
                    className="buttonFilled w-fit flex items-center"
                    onClick={addMedicineTableHandle}
                  >
                    Add Medicine
                  </button>
                </div>
                <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                  <thead>
                    <th className="border-[1px] p-1 font-semibold">
                      <p>S_N</p>
                    </th>
                    <th className="border-[1px] p-1 font-semibold">
                      <p>Medicine</p>
                    </th>

                    <th className="border-[1px] p-1 font-semibold">
                      <p>Quantity</p>
                    </th>
                    <th className="border-[1px] p-1 font-semibold">
                      <p>Price</p>
                    </th>

                    <th className="border-[1px] p-1 font-semibold">
                      <p>Action</p>
                    </th>
                  </thead>
                  <tbody>
                    {selectedMedicine?.map((item, index) => (
                      <tr key={index} className="border-b-[1px]">
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                          {index + 1}
                        </td>
                        <td className="justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                          <input
                            type="text"
                            className="w-full  outline-none px-4"
                            placeholder="Medicine"
                            name="name"
                            value={item?.name}
                            onFocus={() => setActiveIndex(index)}
                            onChange={(e) => [
                              getMedicineData(e, index),
                              selectMedicineHandle(e),
                            ]}
                            autocomplete="off"
                            required
                          />

                          {activeIndex === index && (
                            <span
                              ref={selectRef}
                              className="bg-white z-50 overflow-y-scroll absolute flex flex-col justify-start items-start gap-2 w-full h-[15rem] border top-[3.5rem]"
                            >
                              {searchMedicine?.length > 0 ? (
                                searchMedicine?.map((item) => (
                                  <p
                                    key={index}
                                    className="w-full hover:bg-[#2196f3] hover:text-white p-1 text-start hover:cursor-pointer"
                                    onClick={() => [
                                      addSelectedMedicineDataHandle(
                                        index,
                                        item
                                      ),
                                      setActiveIndex(null),
                                    ]}
                                  >
                                    {item?.Name}
                                  </p>
                                ))
                              ) : (
                                <p className="w-full flex items-center justify-center">
                                  {isLoading === true
                                    ? "Loading...."
                                    : "No Result Found"}
                                </p>
                              )}
                              {/* <Select
                                name="colors"
                                className="basic-multi-select"
                                classNamePrefix="select"
                              /> */}
                            </span>
                          )}
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                          <input
                            type="text"
                            className="w-[5rem]  outline-none"
                            placeholder="quantity"
                            name="quantity"
                            value={item?.quantity}
                            onChange={(e) => getMedicineData(e, index)}
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                          <input
                            type="text"
                            className="w-[5rem]  outline-none"
                            placeholder="price"
                            name="price"
                            value={item?.price}
                            onChange={(e) => getMedicineData(e, index)}
                          />
                        </td>

                        <td
                          className="justify-center text-[16px] py-4 px-[4px] text-center border-r flex items-center justify-center"
                          onClick={(e) => deleteMedicineHandle(e, index)}
                        >
                          <MdDeleteForever className="text-[red] text-[1.5rem] cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full ">
                <div className="w-full flex justify-between items-center pt-1 pb-3">
                  <p className="text-[1.2rem] font-semibold">Test</p>
                  <button
                    className="buttonFilled w-fit flex items-center"
                    onClick={addTestTableHandle}
                  >
                    Add Test
                  </button>
                </div>
                <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                  <thead>
                    <th className="border-[1px] p-1 font-semibold">
                      <p>S_N</p>
                    </th>
                    <th className="border-[1px] p-1 font-semibold">
                      <p>Test</p>
                    </th>

                    <th className="border-[1px] p-1 font-semibold">
                      <p>Quantity</p>
                    </th>
                    <th className="border-[1px] p-1 font-semibold">
                      <p>Price</p>
                    </th>

                    <th className="border-[1px] p-1 font-semibold">
                      <p>Action</p>
                    </th>
                  </thead>
                  <tbody>
                    {selectedTest?.map((item, index) => (
                      <tr key={index} className="border-b-[1px]">
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                          {index + 1}
                        </td>
                        <td className="justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                          <input
                            type="text"
                            className="w-full  outline-none px-4"
                            placeholder="Test"
                            name="name"
                            value={item?.name}
                            onFocus={() => setActiveTestIndex(index)}
                            onChange={(e) => [
                              getTestData(e, index),
                              selectTestHandle(e),
                            ]}
                            autocomplete="off"
                            required
                          />
                          {activeTestIndex === index && (
                            <span
                              ref={selectRef}
                              className="bg-white z-50 overflow-y-scroll absolute flex flex-col justify-start items-start gap-2 w-full h-[15rem] border top-[3.5rem]"
                            >
                              {searchTest?.length > 0 ? (
                                searchTest?.map((item) => (
                                  <p
                                    key={index}
                                    className="w-full hover:bg-[#2196f3] hover:text-white p-1 text-start hover:cursor-pointer"
                                    onClick={() => [
                                      addSelectedTestDataHandle(index, item),
                                      setActiveTestIndex(null),
                                    ]}
                                  >
                                    {item?.Name}
                                  </p>
                                ))
                              ) : (
                                <p className="w-full flex items-center justify-center">
                                  {isLoading === true
                                    ? "Loading...."
                                    : "No Result Found"}
                                </p>
                              )}
                              {/* <Select
                                name="colors"
                                className="basic-multi-select"
                                classNamePrefix="select"
                              /> */}
                            </span>
                          )}
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                          <input
                            type="text"
                            className="w-[5rem]  outline-none"
                            placeholder="quantity"
                            name="quantity"
                            value={item?.quantity}
                            onChange={(e) => getTestData(e, index)}
                          />
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                          <input
                            type="text"
                            className="w-[5rem]  outline-none"
                            placeholder="price"
                            name="price"
                            value={item?.price}
                            onChange={(e) => getTestData(e, index)}
                          />
                        </td>

                        <td
                          className="justify-center text-[16px] py-4 px-[4px] text-center border-r flex items-center justify-center"
                          onClick={(e) => deleteTestHandle(e, index)}
                        >
                          <MdDeleteForever className="text-[red] text-[1.5rem] cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <p>Symptoms</p>
                <textarea
                  rows={3}
                  className="w-full border outline-none pl-1 pt-1"
                  placeholder="Symptoms"
                  onChange={(e) =>
                    setDailyDoctorVisitData({
                      ...dailyDoctorVisitData,
                      symtoms: e.target.value,
                    })
                  }
                  required
                />{" "}
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <p>Notes</p>
                <textarea
                  rows={3}
                  className="w-full border outline-none pl-1 pt-1"
                  placeholder="Note's"
                  onChange={(e) =>
                    setDailyDoctorVisitData({
                      ...dailyDoctorVisitData,
                      notes: e.target.value,
                    })
                  }
                />{" "}
              </div>
              <button className="buttonFilled w-fit flex items-center">
                Save +
              </button>
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
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Doctor Visit
            </Typography>
            <div className="flex pt-[10px] pb-[10px] gap-[10%]">
              <span>
                <img src={img} alt="patients " className="w-[15rem] " />
              </span>
              <div class="grid grid-cols-2 gap-1">
                <div className="flex gap-[10px]">
                  <span>Patients Uhid</span>:
                  <p>
                    {"Uhid" +
                      viewPatientsData?.[0]?.patientsData?.[0]?.patientId}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Admission Date / Time</span>:
                  <p>
                    {date(viewPatientsData?.[0]?.patientsData?.[0]?.createdAt)}-
                    {time(viewPatientsData?.[0]?.patientsData?.[0]?.createdAt)}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Name</span>:
                  <p>{viewPatientsData?.[0]?.patientsData?.[0]?.patientName}</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Gender</span>:
                  <p>
                    {viewPatientsData?.[0]?.patientsData?.[0]?.patientGender}
                  </p>
                </div>

                <div className="flex gap-[10px]">
                  <span>Emergency NO</span>:
                  <p>{viewPatientsData?.[0]?.EmergencyPatientData?.mainId}</p>
                </div>

                <div className="flex gap-[10px]">
                  <span>Admitting Doctor</span>:
                  <p>{viewPatientsData?.[0]?.doctorData?.[0]?.doctorName}</p>
                </div>
              </div>
            </div>
            <form className="w-full flex flex-col gap-3">
              {viewPatientsData?.map((item) => (
                <div>
                  <div className="w-full flex items-center">
                    <p className="text-[1.1rem] font-semibold pr-1">Date: </p>
                    {date(item?.VisitDateTime)}-{time(item?.VisitDateTime)}
                  </div>
                  <div className="w-full ">
                    <div className="w-full flex justify-between items-center pt-1 pb-3">
                      <p className="text-[1rem] font-normal">Medicine</p>
                    </div>
                    <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                      <thead>
                        <th className="border-[1px] p-1 font-semibold">
                          <p>S_N</p>
                        </th>
                        <th className="border-[1px] p-1 font-semibold">
                          <p>Medicine</p>
                        </th>

                        <th className="border-[1px] p-1 font-semibold">
                          <p>Quantity</p>
                        </th>
                        <th className="border-[1px] p-1 font-semibold">
                          <p>Price</p>
                        </th>
                      </thead>
                      <tbody>
                        {item?.medicine?.map((item, index) => (
                          <tr key={index} className="border-b-[1px]">
                            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                              {index + 1}
                            </td>
                            <td className="justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                              <input
                                type="text"
                                className="w-full  outline-none px-4"
                                placeholder="Medicine"
                                name="name"
                                value={item?.Name}
                                autocomplete="off"
                                disabled
                              />
                            </td>

                            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                              <input
                                type="text"
                                className="w-[5rem]  outline-none"
                                placeholder="quantity"
                                name="quantity"
                                value={item?.Quantity}
                                disabled
                              />
                            </td>
                            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                              <input
                                type="text"
                                className="w-[5rem]  outline-none"
                                placeholder="price"
                                name="price"
                                value={item?.Price}
                                disabled
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full ">
                    <div className="w-full flex justify-between items-center pt-1 pb-3">
                      <p className="text-[1rem] font-normal">Test</p>
                    </div>
                    <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                      <thead>
                        <th className="border-[1px] p-1 font-semibold">
                          <p>S_N</p>
                        </th>
                        <th className="border-[1px] p-1 font-semibold">
                          <p>Test</p>
                        </th>

                        <th className="border-[1px] p-1 font-semibold">
                          <p>Quantity</p>
                        </th>
                        <th className="border-[1px] p-1 font-semibold">
                          <p>Price</p>
                        </th>
                      </thead>
                      <tbody>
                        {item?.test?.map((item, index) => (
                          <tr key={index} className="border-b-[1px]">
                            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                              {index + 1}
                            </td>
                            <td className="justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                              <input
                                type="text"
                                className="w-full  outline-none px-4"
                                placeholder="Test"
                                name="name"
                                value={item?.Name}
                                disabled
                              />
                            </td>

                            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                              <input
                                type="text"
                                className="w-[5rem]  outline-none"
                                placeholder="quantity"
                                name="quantity"
                                value={item?.Quantity}
                                disabled
                              />
                            </td>
                            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                              <input
                                type="text"
                                className="w-[5rem]  outline-none"
                                placeholder="quantity"
                                name="quantity"
                                value={item?.Price}
                                disabled
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full gap-3 py-2 grid grid-cols-2">
                    <div className="w-full flex flex-col items-start justify-start gap-2">
                      <p>Symptoms</p>
                      <textarea
                        rows={3}
                        className="w-full border outline-none pl-1 pt-1"
                        placeholder="Symptoms"
                        value={item?.Symptoms}
                        disabled
                      />{" "}
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-2">
                      <p>Notes</p>
                      <textarea
                        rows={3}
                        className="w-full border outline-none pl-1 pt-1"
                        placeholder="Note's"
                        value={item?.Note}
                        disabled
                      />{" "}
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style}>
            <Typography className="flex items-center justify-center">
              NO Doctor Visit done
            </Typography>
          </Box>
        </Fade>
      </Modal>
      {/* Success Snackbar */}
      <Snackbars
        open={openSnackbarSuccess}
        setOpen={setOpenSnackBarSuccess}
        severity="success"
        message={snackBarMessageSuccess}
      />
      {/* Warning Snackbar */}
      <Snackbars
        open={openSnackbarWarning}
        setOpen={setOpenSnackBarWarning}
        severity="warning"
        message={snackBarMessageWarning}
      />
    </div>
  );
}

export default EmergencyPatientsTable;
