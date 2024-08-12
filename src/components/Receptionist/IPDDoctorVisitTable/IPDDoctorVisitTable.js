import React, { useEffect, useRef, useState } from "react";
import "./IPDDoctorVisitTable.css";
import { Suspense } from "react";
import img from "../../../assets/20180125_001_1_.jpg";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever, MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { getMedicineDataHandle } from "../../../Store/Slices/Medicine";
import { useDispatch, useSelector } from "react-redux";
import { GiMedicinePills, GiMedicines } from "react-icons/gi";
import {
  addDailyDoctorVisitIpdData,
  addDailyMedicineAndLabVisitIpdData,
  getAllDoctorVisitPatientsListData,
  getDoctorVisitListWithIpdPatientsData,
  getDoctorVisitListWithIpdPatientsNurseData,
  getIPDPatientDoctorVisitData,
  getIpdPatientsDetailsData,
  getOnePatientsDoctorVisitData,
} from "../NurseApi";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { CiViewList } from "react-icons/ci";
import style from "../../../styling/styling";

import { getTestDataHandle } from "../../../Store/Slices/Test";
import Snackbars from "../../SnackBar";
import PaginationComponent from "../../Pagination";
import { GetAllDoctorsHandle } from "../../../Store/Slices/DoctorSlice";
export default function IPDDoctorVisitTable() {
  const { medicineData } = useSelector((state) => state.MedicineData);
  const { testData } = useSelector((state) => state.TestData);
  const { doctors } = useSelector((state) => state.DoctorState);
  // console.log(doctors);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    setDailyDoctorVisitData({
      doctorId: "",
      doctorName: "",
      patientsId: "",
      ipdPatientId: "",
      symtoms: "",
      notes: "",
      visitDateTime: "",
    });
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => {
    setOpen3(false);
    setAdditionalDoctor({
      doctorName: "",
      doctorId: "",
      doctorMainId: "",
    });
    setDailyDoctorVisitData({
      doctorId: "",
      doctorName: "",
      patientsId: "",
      ipdPatientId: "",
      symtoms: "",
      notes: "",
      visitDateTime: "",
    });
    setSelectedTest([]);
    setSelectedMedicine([]);
  };
  const [patientData, setPatientData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    const day = String(newdate.getDate()).padStart(2, "0");
    const month = String(newdate.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = newdate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };
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
  const [isLoading, setIsLoading] = useState(false);
  const { adminLoggedInData } = useSelector((state) => state.AdminState);
  const [searchByPatientsId, setSearchByPatientsId] = useState();
  const [searchByDoctorsId, setSearchByDoctorsId] = useState();
  const [doctorWithPatients, setDoctorWithPatients] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const [searchMedicine, setSearchMedicine] = useState([]);
  const [searchTest, setSearchTest] = useState([]);
  const [searchDoctor, setSearchDoctor] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [additionalDoctor, setAdditionalDoctor] = useState({
    doctorName: "",
    doctorId: "",
    doctorMainId: "",
  });
  const [allIpdDoctorVisitList, setAllIpdDoctorVisitList] = useState([]);
  const [dailyDoctorVisitData, setDailyDoctorVisitData] = useState({
    doctorId: "",
    doctorName: "",
    patientsId: "",
    ipdPatientId: "",
    ipdPatientsCurrentBed: "",
    symtoms: "",
    notes: "",
    visitDateTime: "",
    medicineAndLabSubmittedTime: "",
  });
  const [viewPatientsData, setViewPatientsData] = useState({
    patientData: [],
    visitRecords: [],
  });
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
  const selectDoctorHandle = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      const filter = doctors?.filter((item) => {
        if (e.target.value !== "") {
          return item?.doctorName
            ?.toLowerCase()
            ?.includes(e.target.value?.toLowerCase());
        }
      });
      setSearchDoctor(filter && filter);
    }, 100);
    setIsLoading(false);
  };
  const addMedicineTableHandle = (e) => {
    e.preventDefault();
    setSelectedMedicine([
      ...selectedMedicine,
      { name: "", quantity: 1, price: 0, total: 0 },
    ]);
  };
  const addTestTableHandle = (e) => {
    e.preventDefault();
    setSelectedTest([
      ...selectedTest,
      { name: "", quantity: 1, price: 0, total: 0 },
    ]);
  };
  const getMedicineData = (e, index) => {
    let oldValue = [...selectedMedicine];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    oldValue[index] = {
      ...oldValue[index],
      total: oldValue[index].quantity * oldValue[index].price,
    };
    setSelectedMedicine(oldValue && oldValue);
  };
  const getTestData = (e, index) => {
    let oldValue = [...selectedTest];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    oldValue[index] = {
      ...oldValue[index],
      total: oldValue[index].quantity * oldValue[index].price,
    };
    setSelectedTest(oldValue && oldValue);
  };

  const addSelectedMedicineDataHandle = (index, item) => {
    let oldValue = [...selectedMedicine];
    console.log(item);
    oldValue[index] = {
      ...oldValue[index],
      name: item?.Name,
      price: item?.Mrp,
      total: item?.Mrp * oldValue[index].quantity,
    };
    setSelectedMedicine(oldValue && oldValue);
    setSearchMedicine([]);
  };
  const addSelectedTestDataHandle = (index, item) => {
    let oldValue = [...selectedTest];
    oldValue[index] = {
      ...oldValue[index],
      name: item?.Name,
      price: item?.Cost,
      total: item?.Cost * oldValue[index].quantity,
    };
    setSelectedTest(oldValue && oldValue);
    setSearchTest([]);
  };
  const deleteMedicineHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...selectedMedicine];

    oldValue.splice(index, 1);

    setSelectedMedicine(oldValue && oldValue);
  };
  const deleteTestHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...selectedTest];

    oldValue.splice(index, 1);

    setSelectedTest(oldValue && oldValue);
  };

  const getDoctorVisitListWithIpdPatientsDataHandle = async () => {
    const result = await getDoctorVisitListWithIpdPatientsNurseData(
      adminLoggedInData?.adminUniqueId
    );
    setDoctorWithPatients(result?.data?.data);
    setFilteredData(result?.data?.data?.reverse());
  };
  const addDailyDoctorVisitIpdDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Symptoms", dailyDoctorVisitData?.symtoms);
    formData.append("Note", dailyDoctorVisitData?.notes);
    formData.append("ipdPatientData", dailyDoctorVisitData?.ipdPatientId);
    formData.append("ipdPatientMainId", dailyDoctorVisitData?.mainId);
    formData.append("isPatientsChecked", true);
    formData.append(
      "ipdPatientCurrentBed",
      dailyDoctorVisitData?.ipdPatientsCurrentBed
    );
    formData.append("doctorId", dailyDoctorVisitData?.doctorId);
    formData.append("submittedBy", "Assigned Doctor");
    formData.append("VisitDateTime", dailyDoctorVisitData?.visitDateTime);
    formData.append("medicine", JSON.stringify(selectedMedicine));
    formData.append("test", JSON.stringify(selectedTest));
    const result = await addDailyDoctorVisitIpdData(formData);
    if (result?.status === 201) {
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      handleClose();
      setDailyDoctorVisitData({
        doctorId: "",
        doctorName: "",
        patientsId: "",
        ipdPatientId: "",
        symtoms: "",
        notes: "",
        visitDateTime: "",
      });
    }
    if (result?.status !== 201) {
      handleClickSnackbarWarning();
      setSnackBarSuccessWarning(result?.data?.message);
      handleClose();
      setDailyDoctorVisitData({
        doctorId: "",
        doctorName: "",
        patientsId: "",
        ipdPatientId: "",
        symtoms: "",
        notes: "",
        visitDateTime: "",
      });
    }
    console.log(result);
  };
  const addDailyAdditionalDoctorVisitIpdDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Symptoms", dailyDoctorVisitData?.symtoms);
    formData.append("Note", dailyDoctorVisitData?.notes);
    formData.append("ipdPatientData", dailyDoctorVisitData?.ipdPatientId);
    formData.append("ipdPatientMainId", dailyDoctorVisitData?.mainId);
    formData.append("isPatientsChecked", true);
    formData.append(
      "ipdPatientCurrentBed",
      dailyDoctorVisitData?.ipdPatientsCurrentBed
    );
    formData.append("doctorId", dailyDoctorVisitData?.doctorId);
    formData.append("AdditionalDoctorId", additionalDoctor?.doctorId);
    formData.append("submittedBy", "Additional Doctor");
    formData.append("VisitDateTime", dailyDoctorVisitData?.visitDateTime);
    formData.append("medicine", JSON.stringify(selectedMedicine));
    formData.append("test", JSON.stringify(selectedTest));
    const result = await addDailyDoctorVisitIpdData(formData);
    if (result?.status === 201) {
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      handleClose3();
      setAdditionalDoctor({
        doctorName: "",
        doctorId: "",
        doctorMainId: "",
      });
      setDailyDoctorVisitData({
        doctorId: "",
        doctorName: "",
        patientsId: "",
        ipdPatientId: "",
        symtoms: "",
        notes: "",
        visitDateTime: "",
      });
    }
    if (result?.status !== 201) {
      handleClickSnackbarWarning();
      setSnackBarSuccessWarning(result?.data?.message);
      handleClose3();
      setAdditionalDoctor({
        doctorName: "",
        doctorId: "",
        doctorMainId: "",
      });
      setDailyDoctorVisitData({
        doctorId: "",
        doctorName: "",
        patientsId: "",
        ipdPatientId: "",
        symtoms: "",
        notes: "",
        visitDateTime: "",
      });
    }
  };
  const addDailyAdditionalMedicineLabDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Symptoms", dailyDoctorVisitData?.symtoms);
    formData.append("Note", dailyDoctorVisitData?.notes);
    formData.append("ipdPatientData", dailyDoctorVisitData?.ipdPatientId);
    formData.append("ipdPatientMainId", dailyDoctorVisitData?.mainId);
    formData.append("isPatientsChecked", true);
    formData.append(
      "ipdPatientCurrentBed",
      dailyDoctorVisitData?.ipdPatientsCurrentBed
    );
    formData.append("doctorId", null);
    formData.append("AdditionalDoctorId", null);
    formData.append(
      "VisitDateTime",
      dailyDoctorVisitData?.medicineAndLabSubmittedTime
    );
    formData.append("medicine", JSON.stringify(selectedMedicine));
    formData.append("test", JSON.stringify(selectedTest));
    const result = await addDailyMedicineAndLabVisitIpdData(formData);
    if (result?.status === 201) {
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      handleClose4();

      setDailyDoctorVisitData({
        doctorId: "",
        doctorName: "",
        patientsId: "",
        ipdPatientId: "",
        symtoms: "",
        notes: "",
        visitDateTime: "",
      });
    }
  };
  const getOnePatientsDoctorVisitDataHandle = async (Id) => {
    const result = await getOnePatientsDoctorVisitData(Id);
    setViewPatientsData(result && result?.data);
  };
  // const getAllDoctorVisitPatientsListDataHandle = async () => {
  //   const result = await getAllDoctorVisitPatientsListData();
  //   setAllIpdDoctorVisitList(result && result?.data?.data);
  //   console.log(result, "all");
  // };
  const getIpdPatientsDetailsDataHandle = async (Id) => {
    const result = await getIpdPatientsDetailsData(Id);
    setPatientData(result && result?.data?.data?.[0]);
  };
  const getIPDPatientDoctorVisitDataHandle = async (Id) => {
    const result = await getIPDPatientDoctorVisitData(Id);
    setViewPatientsData({
      visitRecords: result?.data?.data,
      patientData: result?.data?.patientData,
    });
  };
  const [activeDoctor, setActiveDoctor] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTestIndex, setActiveTestIndex] = useState(null);
  const [filteredData, setFilteredData] = React.useState([]);
  const selectRef = useRef(null);
  const searchHandle = () => {
    const filter = doctorWithPatients?.filter((item) => {
      if (searchByPatientsId != "") {
        return (
          item?.IpdPatientName?.toLowerCase()?.includes(
            searchByPatientsId?.toLowerCase()
          ) ||
          item?.IpdPatientUhid?.toLowerCase().includes(
            searchByPatientsId?.toLowerCase()
          ) ||
          item?.IpdPatientPhone?.toLowerCase().includes(
            searchByPatientsId?.toLowerCase()
          ) ||
          item?.IpdPatientPhone2?.toLowerCase().includes(
            searchByPatientsId?.toLowerCase()
          )
        );
      }

      return item;
    });

    setFilteredData(filter && filter);
  };
  useEffect(() => {
    searchHandle();
  }, [searchByPatientsId]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveIndex(null);
        setActiveTestIndex(null);
        setActiveDoctor(false);
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
    if (!doctors || doctors.length === 0) {
      dispatch(GetAllDoctorsHandle());
    }
    if (!medicineData || !medicineData.data || medicineData.data.length === 0) {
      dispatch(getMedicineDataHandle());
    }
    if (!testData || !testData.data || testData.data.length === 0) {
      dispatch(getTestDataHandle());
    }
  }, [doctors, medicineData, testData]);
  useEffect(() => {
    getDoctorVisitListWithIpdPatientsDataHandle();
    // getAllDoctorVisitPatientsListDataHandle();
  }, []);
  useEffect(() => {
    console.log(dailyDoctorVisitData);
  }, [dailyDoctorVisitData]);
  useEffect(() => {
    console.log(selectedMedicine, selectedTest);
  }, [selectedTest, selectedMedicine]);

  return (
    <Suspense fallback={<>...</>}>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <div className="flex justify-between">
          <h2 className="border-b-[4px] border-[#3497F9]">Dr Visit List</h2>
          {/* <button
            onClick={handleOpen}
            className="bg-[#3497F9] text-white p-[10px] rounded-md"
          >
            Add Additional Doctor Visit
          </button> */}
        </div>
        <div className="flex flex-col gap-[2rem]">
          <div className="flex gap-[1rem]">
            <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
              <FaSearch className="text-[#56585A]" />
              <input
                className="bg-transparent outline-none w-[27rem]"
                placeholder="Search by Patient Name Or Phone Number Or Uhid"
                onChange={(e) => setSearchByPatientsId(e.target.value)}
              />
            </div>
          </div>

          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
            <thead>
              <th className="border-[1px] p-1 font-semibold">
                <p>S_N</p>
              </th>
              <th className="border-[1px] p-1 font-semibold">
                <p>Patient Name</p>
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
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item, index) => (
                  <tr key={index} className="border-b-[1px]">
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {index + 1}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {item?.IpdPatientName}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {item?.doctorName}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {date(item?.IpdPatientCreatedTime)} /
                      {time(item?.IpdPatientCreatedTime)}
                    </td>{" "}
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                      <div className="flex gap-[10px] justify-center">
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            handleOpen1(),
                            getIPDPatientDoctorVisitDataHandle(
                              item?.IpdPatientMainId
                            ),
                          ]}
                        >
                          <CiViewList className="text-[20px] text-[#96999C]" />
                        </div>
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            handleOpen(),
                            setDailyDoctorVisitData({
                              ...dailyDoctorVisitData,
                              doctorId: item?._id,
                              doctorName: item?.doctorName,
                              patientsId: item?.IpdpatientId,
                              ipdPatientId: item?.Ipdpatient_id,
                              mainId: item?.IpdPatientMainId,
                              ipdPatientsCurrentBed: item?.IpdPatietnBed,
                            }),
                          ]}
                        >
                          <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                        </div>
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#0ba46f] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            handleOpen3(),
                            setDailyDoctorVisitData({
                              ...dailyDoctorVisitData,
                              doctorId: item?._id,
                              patientsId: item?.IpdpatientId,
                              ipdPatientId: item?.Ipdpatient_id,
                              mainId: item?.IpdPatientMainId,
                              ipdPatientsCurrentBed: item?.IpdPatietnBed,
                            }),
                          ]}
                        >
                          <IoMdPersonAdd className="text-[20px] text-[#0ba46f]" />
                        </div>
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#2B2C76] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            handleOpen4(),
                            setDailyDoctorVisitData({
                              ...dailyDoctorVisitData,
                              doctorId: item?._id,
                              patientsId: item?.IpdpatientId,
                              ipdPatientId: item?.Ipdpatient_id,
                              mainId: item?.IpdPatientMainId,
                              ipdPatientsCurrentBed: item?.IpdPatietnBed,
                            }),
                          ]}
                        >
                          <GiMedicines className="text-[20px] text-[#2B2C76]" />
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
            data={filteredData}
          />
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
              Doctor Visit
            </Typography>
            <form
              className="w-full flex flex-col gap-3"
              onSubmit={addDailyDoctorVisitIpdDataHandle}
            >
              <div className="w-full grid grid-cols-2 gap-3 pt-3">
                <div className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Assigned Doctor Name</p>
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
                      <p>Total</p>
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
                            value={item?.total}
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
                      <p>Total</p>
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
                            value={item?.total}
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
                      viewPatientsData?.patientData?.[0]?.patientData
                        ?.patientId}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Admission Date / Time</span>:
                  <p>
                    {date(
                      viewPatientsData?.patientData?.[0]?.patientData?.createdAt
                    )}
                    -
                    {time(
                      viewPatientsData?.patientData?.[0]?.patientData?.createdAt
                    )}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Name</span>:
                  <p>
                    {
                      viewPatientsData?.patientData?.[0]?.patientData
                        ?.patientName
                    }
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Gender</span>:
                  <p>
                    {
                      viewPatientsData?.patientData?.[0]?.patientData
                        ?.patientGender
                    }
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Patient Age</span>:
                  <p>
                    {
                      viewPatientsData?.patientData?.[0]?.patientData
                        ?.patientAge
                    }
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Patient Blood Group</span>:
                  <p>
                    {
                      viewPatientsData?.patientData?.[0]?.patientData
                        ?.patientBloodGroup
                    }
                  </p>
                </div>

                <div className="flex gap-[10px]">
                  <span>IPD NO</span>:
                  <p>{viewPatientsData?.patientData?.[0]?.mainId}</p>
                </div>

                <div className="flex gap-[10px]">
                  <span>Admitting Doctor</span>:
                  <p>
                    {viewPatientsData?.patientData?.[0]?.doctorData?.doctorName}
                  </p>
                </div>
              </div>
            </div>
            <form className="w-full flex flex-col gap-3">
              {viewPatientsData?.visitRecords?.length > 0 ? (
                viewPatientsData?.visitRecords?.map((item) => (
                  <div>
                    <div className="w-full flex items-center">
                      <p className="text-[1.1rem] font-semibold pr-1">Date: </p>
                      {date(item?.VisitDateTime)}-{time(item?.VisitDateTime)}{" "}
                      <p className="text-[#3497f9] pl-2">
                        ({item?.submittedBy})
                      </p>
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
                            <p>Total</p>
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
                            <p>Total</p>
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
                ))
              ) : (
                <p>No Doctor Visit Done Yet</p>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open3}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Additional Doctor Visit
            </Typography>
            <form
              className="w-full flex flex-col gap-3"
              onSubmit={addDailyAdditionalDoctorVisitIpdDataHandle}
            >
              <div className="w-full grid grid-cols-2 gap-3 pt-3">
                <div className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Search Additional Doctor Name</p>
                  <div className="w-full border-[1px] h-[1rem] rounded border-[#ccc] justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                    <input
                      type="text"
                      placeholder="Doctor Name"
                      className="w-full border-none outline-none  pl-1"
                      onChange={(e) => [
                        selectDoctorHandle(e),
                        setActiveDoctor(true),
                      ]}
                      autocomplete="off"
                    />

                    {activeDoctor === true && (
                      <span
                        ref={selectRef}
                        className="bg-white z-50 overflow-y-scroll absolute flex flex-col justify-start items-start gap-2 w-full h-[15rem] border top-[2.15rem]"
                      >
                        {searchDoctor?.length > 0 ? (
                          searchDoctor?.map((item, index) => (
                            <p
                              key={index}
                              className="w-full  hover:bg-[#2196f3] hover:text-white p-1 text-start hover:cursor-pointer"
                              onClick={() =>
                                setAdditionalDoctor({
                                  ...additionalDoctor,
                                  doctorName: item?.doctorName,
                                  doctorId: item?._id,
                                })
                              }
                            >
                              {item?.doctorName}
                            </p>
                          ))
                        ) : (
                          <p className="w-full flex items-center justify-center">
                            {isLoading === true
                              ? "Loading...."
                              : "No Result Found"}
                          </p>
                        )}
                      </span>
                    )}
                  </div>
                </div>{" "}
                <div className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Selected Additional Doctor Name</p>
                  <span className="w-full border-[1px] rounded border-[#ccc] p-1">
                    <input
                      type="text"
                      placeholder="Doctor Name"
                      className="w-full border-none outline-none"
                      value={additionalDoctor?.doctorName}
                      required
                    />
                  </span>
                </div>
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
                      <p>Total</p>
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
                            value={item?.total}
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
                      <p>Total</p>
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
                            value={item?.total}
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
        open={open4}
        onClose={handleClose4}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open4}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Additional Doctor Visit
            </Typography>
            <form
              className="w-full flex flex-col gap-3"
              onSubmit={addDailyAdditionalMedicineLabDataHandle}
            >
              <div className="w-full grid grid-cols-2 gap-3 pt-3">
                <div className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Medicine/Lab Submitted Time</p>
                  <span className="w-full border-[1px] rounded border-[#ccc] p-1">
                    <input
                      type="datetime-local"
                      placeholder="Submitted Time"
                      className="w-full border-none outline-none"
                      onChange={(e) =>
                        setDailyDoctorVisitData({
                          ...dailyDoctorVisitData,
                          medicineAndLabSubmittedTime: e.target.value,
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
                      <p>Total</p>
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
                            value={item?.total}
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
                      <p>Total</p>
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
                            value={item?.total}
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
    </Suspense>
  );
}
