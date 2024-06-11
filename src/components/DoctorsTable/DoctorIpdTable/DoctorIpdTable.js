import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import img from "../../../assets/20180125_001_1_.jpg";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
import Select from "react-select";
import img1 from "../../../assets/logo.png";
import { useReactToPrint } from "react-to-print";
import {
  addIpdDoctorCheckData,
  getAllIPDPatientsDataByDoctorId,
  getAllIPDPatientsDoctorVisitData,
  getOneIpdDoctorCheckData,
} from "../DoctorApi";
import { useSelector } from "react-redux";
import { convertValue } from "../convertValueStructure";
import PaginationComponent from "../../Pagination";
import {
  getAllDoctorVisitPatientsListData,
  getIpdPatientsDetailsData,
  getOnePatientsDoctorVisitData,
} from "../../Receptionist/NurseApi";
import { date, time } from "../../../utils/DateAndTimeConvertor";
const indicatorSeparatorStyle = {
  alignSelf: "stretch",
  backgroundColor: "",
  marginBottom: 8,
  marginTop: 8,
  width: 1,
  border: "transparent",
  outline: "none",
};
const colourOptions = [
  { value: "Amlodipine", label: "Amlodipine" },
  { value: "Albuterol", label: "Albuterol" },
  { value: "Amoxicillin", label: "Amoxicillin" },
  { value: "Atorvastatin", label: "Atorvastatin" },
  { value: "Levothyroxine", label: "Levothyroxine" },
  { value: "Metformin", label: "Metformin" },
  { value: "Azithromycin", label: "Azithromycin" },
  { value: "Cephalexin", label: "Cephalexin" },
  { value: "Lisinopril", label: "Lisinopril" },
  { value: "Hydrocodone", label: "Hydrocodone" },
];

function DoctorIpdTable() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { adminUniqueId, adminLoggedInData } = useSelector(
    (state) => state.AdminState
  );
  const { medicineData } = useSelector((state) => state.MedicineData);
  const { testData } = useSelector((state) => state.TestData);
  const [medicine, setMedicine] = useState([]);
  const [test, setTest] = useState([]);
  const [previousMedicine, setPreviousMedicine] = useState([]);
  const [previousTest, setPreviousTest] = useState([]);
  const [isMedicineLoading, setIsMedicineLoading] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [allIpdDoctorVisitList, setAllIpdDoctorVisitList] = useState([]);
  const [viewPatientsData, setViewPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({
    patientId: "",
    _id: "",
    ipdPatientId: "",
    test: [],
    isPatientsChecked: true,
    medicine: [],
    Symptoms: "",
    Note: "",
    appoiment: "",
  });
  const [ipdPatientsListByDoctorId, setIpdPatientsListByDoctorId] = useState(
    []
  );
  const [previouePatientsData, setPreviouePatientsData] = useState([]);
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
          IPD Patients
        </h2>
        <hr />
        <div className="flex items-start pt-[20px] pb-[20px] gap-[10%] w-full">
          <div class="grid grid-cols-2 gap-4 pl-[20px] pr-[20px] w-7/12">
            <div className="flex gap-[10px]">
              <span>UHID</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Phone number</span>:<p>--------</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Name</span>:<p>Arman Ali</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Phone Number of Attendent:</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Gender</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>H/ W</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Father's Name</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Blood Group</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Husband Name:</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Room and Bed NO</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Email</span>:<p>19</p>
            </div>
          </div>
          <div>
            <div className="flex gap-[10px]">
              <span>Appointment Date:</span>:<p>12/04/24</p>
            </div>
            <div className="flex gap-[10px]">
              <span>ID:</span>:<p>4565235</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex items-start pt-[20px] pb-[20px] gap-4 w-full px-[1rem] flex-col">
          <div className="flex items-center justify-start w-full gap-1">
            <h6 className="text-[18px] font-semibold">Symptoms :</h6>
            <p>Abdominal Pain ,Body Pian,Cough,FatiGue</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
              <thead>
                <th className="border-[1px] p-1 font-semibold">
                  <p>S_N</p>
                </th>
                <th className="border-[1px] p-1 font-semibold">
                  <p>Medicine</p>
                </th>
                <th className="border-[1px] p-1 font-semibold">
                  <p>Schedule</p>
                </th>{" "}
                <th className="border-[1px] p-1 font-semibold">
                  <p>Time</p>
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
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]"></td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]"></td>
                </tr>
              </tbody>
            </table>
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
              <thead>
                <th className="border-[1px] p-1 font-semibold">
                  <p>S_N</p>
                </th>
                <th className="border-[1px] p-1 font-semibold">
                  <p>Test's</p>
                </th>{" "}
                <th className="border-[1px] p-1 font-semibold">
                  <p>Time</p>
                </th>
              </thead>
              <tbody>
                <tr key={1}>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    1
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    Blood Test
                  </td>{" "}
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-start justify-start w-full gap-1">
            <h6 className="text-[18px] font-semibold">Note :</h6>
            <p className="w-11/12 text-start">
              Pain is a complex protective mechanism. It is an essential part of
              evolution that protects the body from danger and harm. The body
              has pain receptors that are attached to 2 main types of nerves
              that detect danger. One nerve type relays messages quickly,
              causing a sharp, sudden pain. The other relays messages slowly,
              causing a dull, throbbing pain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const getAllIPDPatientsDataByDoctorIdHandle = async (Id) => {
    const response = await getAllIPDPatientsDataByDoctorId(Id);
    setIpdPatientsListByDoctorId(response?.data?.data?.reverse());
    console.log(response);
  };
  const getAllIPDPatientsDoctorVisitDataHandle = async () => {
    const response = await getAllIPDPatientsDoctorVisitData();
    setPreviouePatientsData(response?.data?.data?.reverse());
  };
  const addIpdDoctorCheckDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ipdPatientData", selectedPatient?.ipdPatientId);
    formData.append("Symptoms", selectedPatient?.Symptoms);
    formData.append("Note", selectedPatient?.Note);
    formData.append("isPatientsChecked", true);
    selectedPatient?.test?.forEach((testData) => {
      formData.append("test", testData?.value);
    });
    selectedPatient?.medicine?.forEach((medicineData) => {
      formData.append("medicine", medicineData?.value);
    });
    const result = addIpdDoctorCheckData(formData);
    if (result) {
      getAllIPDPatientsDoctorVisitDataHandle();
      handleClose();
    }
  };
  const getOneIpdDoctorCheckDataHandle = async (Id) => {
    const result = await getOneIpdDoctorCheckData(Id?._id);
    setSelectedPatient({
      ...selectedPatient,
      Symptoms: result?.data?.[0]?.Symptoms,
      Note: result?.data?.[0]?.Note,
      medicine: result?.data?.[0]?.medicineData,
      test: result?.data?.[0]?.testData,
      _id: result?.data?.[0]?._id,
      ipdPatientId: result?.data?.[0]?.IpdPatientData?.[0]?._id,
      appoiment: result?.data?.[0]?.IpdPatientData?.[0]?.opdDoctorVisitDate,
      patientId: result?.data?.[0]?.IpdPatientData?.[0]?.ipdPatientId,
    });
    console.log(result);
  };
  const getAllDoctorVisitPatientsListDataHandle = async () => {
    const result = await getAllDoctorVisitPatientsListData();
    setAllIpdDoctorVisitList(result && result?.data?.data);
  };
  const getOnePatientsDoctorVisitDataHandle = async (Id) => {
    const result = await getOnePatientsDoctorVisitData(Id);
    setViewPatientsData(result && result?.data);
    console.log(result, "result");
  };
  const getIpdPatientsDetailsDataHandle = async (Id) => {
    const result = await getIpdPatientsDetailsData(Id);
    setPatientData(result && result?.data?.data?.[0]);
  };
  useEffect(() => {
    getAllIPDPatientsDataByDoctorIdHandle(adminLoggedInData?.adminUniqueId);
    getAllIPDPatientsDoctorVisitDataHandle();
    getAllDoctorVisitPatientsListDataHandle();
  }, []);
  useEffect(() => {
    const result = convertValue(medicineData?.data);
    setMedicine(result);
  }, [medicineData]);
  useEffect(() => {
    const result = convertValue(testData?.data);
    setTest(result);
  }, [testData]);
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
    console.log(selectedPatient, previouePatientsData);
  }, [selectedPatient]);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          IPD Patient Table Data
        </h2>
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
              <p>Doctor Id</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Bed/Floor </p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Patient Notes</p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Action</p>
            </th>
          </thead>
          <tbody>
            {ipdPatientsListByDoctorId
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item, index) => (
                <tr key={index}>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {index + 1}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {"uhid" + item?.ipdPatientId}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {item?.ipdDoctorId}
                  </td>{" "}
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {item?.ipdBedNo}/{item?.ipdFloorNo}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {item?.ipdPatientNotes}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px] flex-row">
                    <div className="flex gap-[10px] justify-center">
                      {allIpdDoctorVisitList?.find(
                        (val) => val.ipdPatientMainId === item?.mainId
                      ) ? (
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            handleOpen1(),
                            getOnePatientsDoctorVisitDataHandle(item?.mainId),
                          ]}
                        >
                          <CiViewList className="text-[20px] text-[#96999C]" />
                        </div>
                      ) : (
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            handleOpen(),
                            getIpdPatientsDetailsDataHandle(item?.ipdPatientId),
                          ]}
                        >
                          <CiViewList className="text-[20px] text-[#96999C]" />
                        </div>
                      )}
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
          data={ipdPatientsListByDoctorId}
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
              IPD Patient Table Data
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="flex pt-[10px] pb-[10px] gap-[10%]">
                <span>
                  <img src={img} alt="patients " className="w-[15rem] " />
                </span>
                <div class="grid grid-cols-2 gap-4">
                  <div className="flex gap-[10px]">
                    <span>Patients Reg ID</span>:
                    <p>{"Uhid" + patientData?.ipdPatientId}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admission Date / Time</span>:
                    <p>
                      {date(patientData?.updatedAt)}-
                      {time(patientData?.updatedAt)}
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Name</span>:
                    <p>{patientData?.PatientData?.[0]?.patientName}</p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>Gender</span>:
                    <p>{patientData?.PatientData?.[0]?.patientGender}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Categ</span>:<p>IPD</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Age</span>:
                    <p>{patientData?.PatientData?.[0]?.patientAge}</p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>IPD NO</span>:<p>{patientData?.ipdPatientId}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Mobile</span>:
                    <p>{patientData?.PatientData?.[0]?.patientPhone}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Bed/Floor </span>:
                    <p>
                      {patientData?.ipdBedNo}/{patientData?.ipdFloorNo}
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admitting Doctor Id</span>:
                    <p>{patientData?.ipdDoctorId}</p>
                  </div>
                </div>
              </div>
            </Typography>
            <Typography>No Doctor Visit one Yet!</Typography>
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
              IPD Patient Table Data
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
                  <span>IPD NO</span>:
                  <p>{viewPatientsData?.[0]?.IpdPatientData?.ipdPatientId}</p>
                </div>

                <div className="flex gap-[10px]">
                  <span>Admitting Doctor</span>:
                  <p>{viewPatientsData?.[0]?.doctorData?.[0]?.doctorName}</p>
                </div>
              </div>
            </div>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
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
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DoctorIpdTable;
