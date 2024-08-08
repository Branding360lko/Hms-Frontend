import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import img from "../../../assets/20180125_001_1_.jpg";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
import Select from "react-select";
import img1 from "../../../assets/logo.png";
import { useReactToPrint } from "react-to-print";
import { getMedicineDataHandle } from "../../../Store/Slices/Medicine";
import { getTestDataHandle } from "../../../Store/Slices/Test";
import {
  addOpdDoctorCheckData,
  getAllOpdPatientsData,
  getAllOpdPatientsDoctorData,
  getAllOpdPatientsWithDoctorIdData,
  getOneOpdDoctorCheckData,
  getOneOpdDoctorCheckWithOpdPatientIdData,
  getSearchResultDoctorPanelData,
  updateOpdDoctorCheckData,
  updateOpdDoctorVisitCompletedStatusData,
} from "../DoctorApi";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { convertValue } from "../convertValueStructure";
import Snackbars from "../../SnackBar";
import { date, time } from "../../../utils/DateAndTimeConvertor";
import PaginationForApi from "../../PaginationForApi";
import useDebounce from "../../../utils/DebounceHook";
const indicatorSeparatorStyle = {
  alignSelf: "stretch",
  backgroundColor: "",
  marginBottom: 8,
  marginTop: 8,
  width: 1,
  border: "transparent",
  outline: "none",
};

function DoctorTable() {
  // Snackbar--------------------
  // ----Succcess
  const [openSnackbarSuccess, setOpenSnackBarSuccess] = React.useState(false);
  const [snackBarMessageSuccess, setSnackBarSuccessMessage] =
    React.useState("");

  // ----Warning
  const [openSnackbarWarning, setOpenSnackBarWarning] = React.useState(false);
  const [snackBarMessageWarning, setSnackBarSuccessWarning] =
    React.useState("");
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { adminLoggedInData } = useSelector((state) => state.AdminState);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setOpdPatientAlreadyExist(false);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedPatient([]);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setSelectedPatient([]);
  };
  const IndicatorSeparator = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [medicine, setMedicine] = useState([]);
  const [test, setTest] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (medicineData?.data?.length === 0) {
      dispatch(getMedicineDataHandle());
    }
    if (testData?.data?.length === 0) {
      dispatch(getTestDataHandle());
    }
  }, []);
  const { medicineData } = useSelector((state) => state.MedicineData);
  const { testData } = useSelector((state) => state.TestData);
  const [patientData, setPatientData] = useState([]);
  const [previousMedicine, setPreviousMedicine] = useState([]);
  const [previousTest, setPreviousTest] = useState([]);
  const [opdPatients, setOpdPatients] = useState([]);
  const [previousPatientsList, setoldPreviousPatientsList] = useState([]);
  const [isMedicineLoading, setIsMedicineLoading] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({
    patientId: "",
    _id: "",
    opdPatientId: "",
    test: [],
    isPatientsChecked: true,
    medicine: [],
    Symptoms: "",
    Note: "",
    appoiment: "",
    NextAppoiment: "",
  });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printView = (
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
          OPD Prescription
        </h2>
        <hr />
        <div className="flex items-start pt-[20px] pb-[20px] gap-[1%] w-full">
          <div class="grid grid-cols-2 gap-4 pl-[20px] pr-[20px] w-8/12">
            <div className="flex gap-[10px]">
              <span>UHID</span>:<p>{patientData?.patientId}</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Phone number</span>:
              <p>
                {patientData?.patientPhone
                  ? patientData?.patientPhone
                  : "-------"}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <span>Name</span>:
              <p
                className="text-start w-full text-wrap"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {patientData?.patientName}
              </p>
            </div>

            <div className="flex gap-[10px]">
              <span>Gender</span>:<p>{patientData?.patientGender}</p>
            </div>
            <div className="flex gap-[10px]">
              <span>H/ W</span>:
              <p>
                {patientData?.patientHeight}/{patientData?.patientWeight}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <span>Father's Name</span>:
              <p>
                {patientData?.patientFatherName
                  ? patientData?.patientFatherName
                  : "------"}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <span>Blood Group</span>:
              <p>
                {patientData?.patientBloodGroup
                  ? patientData?.patientBloodGroup
                  : "------"}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <span>Husband Name:</span>:
              <p>
                {patientData?.patientHusbandName
                  ? patientData?.patientHusbandName
                  : "-----"}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <span>Email</span>:
              <p>
                {patientData?.patientEmail
                  ? patientData?.patientEmail
                  : "-------"}
              </p>
            </div>
          </div>
          <div>
            <div className="flex gap-1 flex-col">
              <span>Appointment Date:</span>
              <p>
                {date(patientData?.createdAt)}-{time(patientData?.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex items-start pt-[20px] pb-[20px] gap-1 w-full px-[1rem] flex-col">
          <div className="flex items-center justify-start w-full gap-1">
            <h6 className="text-[20px] font-semibold">Rx</h6>
          </div>
          <div className="flex items-center justify-start w-full gap-1">
            <h6 className="text-[18px] font-semibold">Symptoms :</h6>
            <p>{selectedPatient?.Symptoms}</p>
          </div>
          <p>Prescribed Medicine</p>
          <div className="w-full flex flex-col gap-2">
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
              <thead>
                <th className="border-[1px] p-1 font-semibold">
                  <p>S_N</p>
                </th>
                <th className="border-[1px] p-1 font-semibold">
                  <p>Name</p>
                </th>
                <th className="border-[1px] p-1 font-semibold">
                  <p>Schedule</p>
                </th>{" "}
                <th className="border-[1px] p-1 font-semibold">
                  <p>Time</p>
                </th>
              </thead>
              <tbody>
                {selectedPatient?.medicine?.map((item, index) => (
                  <tr key={index + 1}>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                      {index + 1}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px] text-start">
                      {item?.Name}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]"></td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Prescribed Test</p>
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
              <thead>
                <th className="border-[1px] p-1 font-semibold">
                  <p>S_N</p>
                </th>
                <th className="border-[1px] p-1 font-semibold">
                  <p>Name</p>
                </th>{" "}
              </thead>
              <tbody>
                {selectedPatient?.test?.map((item, index) => (
                  <tr key={index}>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                      {index + 1}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px] text-start">
                      {item?.Name}
                    </td>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-start justify-start w-full gap-1">
            <h6 className="text-[18px] font-semibold">Note :</h6>
            <p className="w-11/12 text-start">{selectedPatient?.Note}</p>
          </div>
          <div className="flex items-start justify-start w-full gap-4">
            <h6 className="text-[18px] font-semibold text-start w-[13rem]">
              Next Appoiment :
            </h6>
            <p className="w-11/12 text-start">
              {/* {selectedPatient?.NextAppoiment} */}
              <p>20/08/2024</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const debouncedSearchTerm = useDebounce(search, 500);
  const encodedSearchTerm = encodeURIComponent(debouncedSearchTerm);
  const [totalData, setTotalData] = useState(0);
  const [visitedPages, setVisitedPages] = useState([]);
  const [opdPatientAlreadyExist, setOpdPatientAlreadyExist] = useState(false);
  const [opdpatientId, setOpdpatientId] = useState("");
  const [searchVisitedPages, setSearchVisitedPages] = useState([]);
  const getAllOpdPatientsDataHandle = async () => {
    if (!visitedPages.includes(page)) {
      const data = await getAllOpdPatientsWithDoctorIdData(
        adminLoggedInData?.adminUniqueId,
        page,
        rowsPerPage
      );

      setTotalData(data?.data?.totalPages);
      setOpdPatients(
        data && [...opdPatients, ...data?.data?.OPDPatientData?.reverse()]
      );
      setVisitedPages((prevVisitedPages) => [...prevVisitedPages, page]);
    }
  };

  // const getAllOpdPatientsDoctorDataHandle = async () => {
  //   const data = await getAllOpdPatientsDoctorData();
  //   setoldPreviousPatientsList(data?.data?.data);
  // };
  const addOpdDoctorCheckDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Note", selectedPatient?.Note);
    formData.append("Symptoms", selectedPatient?.Symptoms);
    formData.append("isPatientsChecked", true);
    formData.append("OpdPatientData", opdpatientId);
    formData.append("NextAppoiment", selectedPatient?.NextAppoiment);
    selectedPatient?.test?.forEach((testData) => {
      formData.append("test", testData?.value);
    });
    selectedPatient?.medicine?.forEach((medicineData) => {
      formData.append("medicine", medicineData?.value);
    });
    const result = await addOpdDoctorCheckData(formData);
    if (result) {
      // getAllOpdPatientsDoctorDataHandle();
      getSearchResultDoctorPanelDataHandle(adminLoggedInData?.adminUniqueId);
      handleClose();
      setSnackBarSuccessMessage(result?.data?.message);
      setOpenSnackBarSuccess(true);
    }
  };
  const getOneOpdDoctorCheckDataHandle = async (Id) => {
    const result = await getOneOpdDoctorCheckData(Id?.[0]?._id);

    setPatientData(result?.data?.[0]?.patientsData?.[0]);

    setSelectedPatient({
      ...selectedPatient,
      Note: result?.data?.[0]?.Note,
      Symptoms: result?.data?.[0]?.Symptoms,
      medicine: result?.data?.[0]?.medicineData,
      test: result?.data?.[0]?.testData,
      _id: result?.data?.[0]?._id,
      opdPatientId: result?.data?.[0]?.OpdPatientData?._id,
      appoiment: result?.data?.[0]?.OpdPatientData?.opdDoctorVisitDate,
      patientId: result?.data?.[0]?.OpdPatientData?.[0]?.opdPatientId,
      NextAppoiment: result?.data?.[0]?.NextAppoiment,
    });
  };
  const getOneOpdDoctorCheckWithOpdPatientIdDataHandle = async (Id) => {
    const result = await getOneOpdDoctorCheckWithOpdPatientIdData(Id);

    setPatientData(result?.data?.patientData?.[0]?.patientsData);
    setOpdPatientAlreadyExist(result?.data?.data?.length > 0 ? true : false);
    setSelectedPatient({
      ...selectedPatient,
      Note: result?.data?.data?.[0]?.Note,
      Symptoms: result?.data?.data?.[0]?.Symptoms,
      medicine: result?.data?.data?.[0]?.medicineData,
      test: result?.data?.data?.[0]?.testData,
      _id: result?.data?.data?.[0]?._id,
      opdPatientId: result?.data?.data?.[0]?.OpdPatientData?._id,
      appoiment: result?.data?.data?.[0]?.OpdPatientData?.opdDoctorVisitDate,
      patientId: result?.data?.data?.[0]?.OpdPatientData?.opdPatientId,
      NextAppoiment: result?.data?.data?.[0]?.NextAppoiment,
    });
  };
  const updateOpdDoctorCheckDataHandle = async (e, Id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Note", selectedPatient?.Note);
    formData.append("Symptoms", selectedPatient?.Symptoms);
    formData.append("isPatientsChecked", true);
    formData.append("NextAppoiment", selectedPatient?.NextAppoiment);
    selectedPatient?.test?.forEach((testData) => {
      formData.append("test", testData?._id ? testData?._id : testData?.value);
    });

    selectedPatient?.medicine?.forEach((medicineData) => {
      formData.append(
        "medicine",
        medicineData?._id ? medicineData?._id : medicineData?.value
      );
    });

    const result = await updateOpdDoctorCheckData(Id, formData);
    if (result) {
      // getAllOpdPatientsDoctorDataHandle();
      handleClose();
      setSnackBarSuccessMessage(result?.data?.message);
      setOpenSnackBarSuccess(true);
    }
  };
  const updateOpdDoctorVisitCompletedStatusDataHandle = async (Id) => {
    const result = await updateOpdDoctorVisitCompletedStatusData(Id);
  };
  const getSearchResultDoctorPanelDataHandle = async (Id) => {
    if (!visitedPages.includes(page)) {
      const result = await getSearchResultDoctorPanelData(
        Id,
        page,
        rowsPerPage,
        debouncedSearchTerm
      );
      // setFilteredData(result && [...filteredData, ...result?.data?.searchData]);
      setOpdPatients(result && [...opdPatients, ...result?.data?.searchData]);
      setTotalData(result && result?.data?.totalDocuments);
      setVisitedPages((prevVisitedPages) => [...prevVisitedPages, page]);
      // setOpdPatients(result && result?.data?.searchData);
    }
  };
  // useEffect(() => {
  //   getAllOpdPatientsDoctorDataHandle();
  // }, []);
  // useEffect(() => {
  //   getAllOpdPatientsDataHandle();
  // }, [page, rowsPerPage]);
  const emptyVisitedPageRecord = useMemo(() => {
    setVisitedPages([]);
    setOpdPatients([]);
    setPage(0);
  }, [rowsPerPage, debouncedSearchTerm]);
  useEffect(() => {
    getSearchResultDoctorPanelDataHandle(adminLoggedInData?.adminUniqueId);
  }, [page, rowsPerPage, debouncedSearchTerm]);
  useEffect(() => {
    const result = convertValue(medicineData?.data);
    setMedicine(result);
  }, [medicineData]);
  useEffect(() => {
    const fetchData = async () => {
      setIsMedicineLoading(true);
      try {
        const result = await convertValue(selectedPatient?.medicine);
        setPreviousMedicine(result);
      } catch (error) {
        console.error("Error converting value:", error);
      }
      setIsMedicineLoading(false);
    };

    fetchData();
  }, [selectedPatient]);
  useEffect(() => {
    const fetchData = async () => {
      setIsTestLoading(true);
      try {
        const result = await convertValue(selectedPatient?.test);
        setPreviousTest(result);
      } catch (error) {
        console.error("Error converting value:", error);
      }
      setIsTestLoading(false);
    };

    fetchData();
  }, [selectedPatient]);
  useEffect(() => {
    const result = convertValue(testData?.data);
    setTest(result);
  }, [testData]);
  useEffect(() => {
    console.log(patientData, "patientData");
  }, [patientData]);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          OPD Patient Table Data
        </h2>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
          <FaSearch className="text-[#56585A]" />
          <input
            className="bg-transparent outline-none w-[27rem]"
            placeholder="Search by Patient Name Or Phone Number Or Uhid"
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <button
            className="buttonFilled"
            disabled={search?.length > 0 ? false : true}
            onClick={() =>
              getSearchResultDoctorPanelDataHandle(
                adminLoggedInData?.adminUniqueId
              )
            }
          >
            Search
          </button> */}
        </div>
      </div>
      <div className="w-full">
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-[1px] p-1 font-semibold">
              <p>S_N</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>UHID</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Patient Name</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Patient Checked</p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Action</p>
            </th>
          </thead>
          <tbody>
            {opdPatients
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item, index) => (
                <tr key={item?._id}>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {index + 1}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {"uhid" + item?.opdPatientId}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {item?.patientName}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    <Switch
                      {...label}
                      checked={
                        item?.opdPatientCheckData?.[0]?.isPatientsChecked ===
                        true
                          ? true
                          : false
                      }
                    />
                  </td>

                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px] flex-row">
                    <div className="flex gap-[10px] justify-center">
                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                        onClick={() => [
                          handleOpen1(),
                          getOneOpdDoctorCheckWithOpdPatientIdDataHandle(
                            item?._id
                          ),
                        ]}
                      >
                        <CiViewList className="text-[20px] text-[#96999C]" />
                      </div>

                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                        onClick={() => [
                          handleOpen(),
                          setSelectedPatient({
                            ...selectedPatient,
                            opdPatientId: item?._id,
                            patientId: item?.opdPatientId,
                          }),
                          setOpdpatientId(item?._id),
                          getOneOpdDoctorCheckWithOpdPatientIdDataHandle(
                            item?._id
                          ),
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

        <PaginationForApi
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          data={totalData ? totalData : 0}
        />
      </div>
      {printView}
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
              OPD Patient Table Data
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="flex pt-[10px] pb-[10px] gap-[10%]">
                <span>
                  <img src={img} alt="patients " className="w-[15rem] " />
                </span>
                <div class="grid grid-cols-2 gap-4">
                  <div className="flex gap-[10px]">
                    <span>Patients Reg ID</span>:<p>{patientData?.patientId}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admission Date / Time</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Name</span>:<p>{patientData?.patientName}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Discharge Date / Time</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Gender</span>:<p>{patientData?.patientGender}</p>
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
              <form className="w-full flex flex-col justify-start gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p>Patient Uhid</p>
                  <input
                    type="text"
                    placeholder="Patient Uhid"
                    value={"UHID" + patientData?.patientId}
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] cursor-not-allowed"
                    disabled
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Select Medicine</p>
                  {!isMedicineLoading && (
                    <Select
                      closeMenuOnSelect={false}
                      components={{ IndicatorSeparator }}
                      isMulti
                      defaultValue={previousMedicine}
                      options={medicine}
                      onChange={(e) =>
                        setSelectedPatient({
                          ...selectedPatient,
                          medicine: e,
                        })
                      }
                      className="border-[2px] w-full rounded"
                    />
                  )}
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Select Test</p>
                  {!isTestLoading && (
                    <Select
                      closeMenuOnSelect={false}
                      components={{ IndicatorSeparator }}
                      isMulti
                      defaultValue={previousTest}
                      options={test}
                      onChange={(e) =>
                        setSelectedPatient({ ...selectedPatient, test: e })
                      }
                      className="border-[2px] w-full rounded"
                    />
                  )}
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Symptoms</p>
                  <input
                    type="text"
                    placeholder="Add Symptoms"
                    value={selectedPatient?.Symptoms}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        Symptoms: e.target.value,
                      })
                    }
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] "
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Note's</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    value={selectedPatient?.Note}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        Note: e.target.value,
                      })
                    }
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Next Appoiment</p>
                  <input
                    type="text"
                    placeholder="Next Appoiment"
                    value={selectedPatient?.NextAppoiment}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        NextAppoiment: e.target.value,
                      })
                    }
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                  />
                </span>
                {opdPatientAlreadyExist ? (
                  <button
                    className="buttonFilled"
                    onClick={(e) =>
                      updateOpdDoctorCheckDataHandle(e, selectedPatient?._id)
                    }
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="buttonFilled"
                    onClick={(e) => addOpdDoctorCheckDataHandle(e)}
                  >
                    Add
                  </button>
                )}
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
              OPD Patient Table Data
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="flex pt-[10px] pb-[10px] gap-[10%]">
                <span>
                  <img src={img} alt="patients " className="w-[15rem] " />
                </span>
                <div class="grid grid-cols-2 gap-1">
                  <div className="flex gap-[10px]">
                    <span>Patients Uhid</span>:
                    <p>{"Uhid" + patientData?.patientId}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admission Date / Time</span>:
                    <p>
                      {date(patientData?.createdAt)}-
                      {time(patientData?.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Name</span>:<p>{patientData?.patientName}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Gender</span>:<p>{patientData?.patientGender}</p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>Patient Phone NO</span>:
                    <p>{patientData?.patientPhone}</p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>Patient Blood Group</span>:
                    <p>{patientData?.patientBloodGroup}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Gender</span>:
                    <p>{patientData?.patientGender}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Age</span>:<p>{patientData?.patientAge}</p>
                  </div>
                </div>
              </div>
              {opdPatientAlreadyExist ? (
                <div className="w-full flex flex-col justify-start gap-2">
                  <span className="flex flex-col justify-start gap-1">
                    <p>Patient Uhid</p>
                    <input
                      type="text"
                      placeholder="Patient Uhid"
                      value={"UHID" + patientData?.patientId}
                      className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] cursor-not-allowed"
                      disabled
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Select Medicine</p>

                    {!isMedicineLoading && (
                      <Select
                        closeMenuOnSelect={false}
                        components={{ IndicatorSeparator }}
                        isMulti
                        defaultValue={previousMedicine}
                        options={medicine}
                        onChange={(e) =>
                          setSelectedPatient({
                            ...selectedPatient,
                            medicine: e,
                          })
                        }
                        isDisabled
                        className="border-[2px] w-full rounded"
                      />
                    )}
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Select Test</p>
                    {!isTestLoading && (
                      <Select
                        closeMenuOnSelect={false}
                        components={{ IndicatorSeparator }}
                        isMulti
                        defaultValue={previousTest}
                        options={test}
                        onChange={(e) =>
                          setSelectedPatient({ ...selectedPatient, test: e })
                        }
                        isDisabled
                        className="border-[2px] w-full rounded"
                      />
                    )}
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Symptoms</p>
                    <input
                      type="text"
                      placeholder="Symptoms"
                      value={selectedPatient?.Symptoms}
                      className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] "
                      disabled
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Note's</p>
                    <textarea
                      rows={5}
                      placeholder="Note"
                      value={selectedPatient?.Note}
                      className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                      disabled
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Next Appoiment</p>
                    <input
                      type="text"
                      placeholder="Next Appoiment"
                      value={selectedPatient?.NextAppoiment}
                      className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                      disabled
                    />
                  </span>
                  <button
                    className="buttonFilled"
                    onClick={() => [
                      handlePrint(),
                      updateOpdDoctorVisitCompletedStatusDataHandle(
                        selectedPatient?._id
                      ),
                    ]}
                  >
                    Print
                  </button>
                </div>
              ) : (
                "Patient Not Checked Yet"
              )}
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

export default DoctorTable;
