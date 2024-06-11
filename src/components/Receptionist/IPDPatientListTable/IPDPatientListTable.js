import "./IPDPatientListTable.css";

import { Suspense } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

import * as React from "react";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import browserLinks from "../../../browserlinks";

import { useDispatch, useSelector } from "react-redux";

import { GetAllDoctorsHandle } from "../../../Store/Slices/DoctorSlice";
import {
  getAllIpdPatientsAssignedData,
  getIpdPatientsFullDetailsData,
} from "../NurseApi";
import { CiViewList } from "react-icons/ci";
import { Backdrop, Fade } from "@mui/material";
import style from "../../../styling/styling";
import img from "../../../assets/20180125_001_1_.jpg";
import PaginationComponent from "../../Pagination";
export default function IPDPatientList() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { patients } = useSelector((state) => state.PatientState);
  const [status, setStatus] = React.useState("");

  const [patientId, setPatientId] = React.useState("");

  const renderedPatientForDropdownPrescription = patients?.map((data) => {
    return {
      value: data.patientId,
      label: `${data.patientId} / ${data.patientName}`,
    };
  });
  const { adminUniqueId, adminLoggedInData } = useSelector(
    (state) => state.AdminState
  );
  console.log(adminLoggedInData?.adminUniqueId, "adminLoggedInData");
  const [patientName, setPatientName] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");
  const [patientFatherName, setPatientFatherName] = React.useState("");
  const [patientHusbandName, setPatientHusbandName] = React.useState("");
  const [patientDateOfBirth, setPatientDateOfBirth] = React.useState("");
  const [patientHeight, setPatientHeight] = React.useState("");
  const [patientWeight, setPatientWeight] = React.useState("");
  const [patientGender, setPatientGender] = React.useState("");
  const [patientBloodGroup, setPatientBloodGroup] = React.useState("");
  const [patientImage, setPatientImage] = React.useState();
  const [visitTime, setVisitTime] = React.useState("");
  const [bloodPressure, setBloodPressure] = React.useState("");
  const [paymentMode, setPaymentMode] = React.useState("");
  const [standardCharge, setStandardCharge] = React.useState("");
  const [admittingDoctorDateTime, setAdmittingDoctorDateTime] =
    React.useState("");
  const [additionalInfo, setAdditionalInfo] = React.useState("");
  const [note, setNote] = React.useState("");
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (patientId !== "") {
      const patient = patients?.find(
        (data) => data.patientId === patientId?.value
      );
      setPatientName(patient?.patientName);
      setPatientPhone(patient?.patientPhone);
      setPatientFatherName(patient?.patientFatherName);
      setPatientHusbandName(patient?.patientHusbandName);
      setPatientDateOfBirth(patient?.patientDateOfBirth);
      setPatientHeight(patient?.patientHeight);
      setPatientWeight(patient?.patientWeight);
      setPatientGender(patient?.patientGender);
      setPatientBloodGroup(patient?.patientBloodGroup);
      setPatientImage(patient?.patientImage);
    }
  }, [patientId]);

  const testData = [
    {
      id: `1`,
      name: `test1`,
    },
    {
      id: `2`,
      name: `test2`,
    },
  ];

  const [tests, setTests] = React.useState([]);

  const [test, setTest] = React.useState({
    value: testData[0].id,
    label: testData[0].name,
  });

  const [prescriptions, setPrescriptions] = React.useState([]);

  const handleAddInput = () => {
    setPrescriptions([
      ...prescriptions,
      { medicineName: "", qty: "", times: "" },
    ]);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...prescriptions];
    onChangeValue[index][name] = value;
    setPrescriptions(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...prescriptions];
    newArray.splice(index, 1);
    setPrescriptions(newArray);
  };

  const handleRemoveTestCard = (index) => {
    const newArray = [...tests];
    newArray.splice(index, 1);
    setTests(newArray);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateIPDPatientSubscription = (e) => {
    e.preventDefault();

    const submitData = {
      ipdPrescriptionPatientId: patientId?.value,
      ipdPrescriptionVisitTime: visitTime,
      ipdPrescriptionBloodPressure: bloodPressure,
      ipdPrescriptionPaymentMode: paymentMode,
      ipdPrescriptionStandardCharge: standardCharge,
      ipdPrescriptionAdmittingDoctorDateTime: admittingDoctorDateTime,
      ipdPrescriptionAdditionalInfo: additionalInfo,
      ipdPrescriptionNote: note,
      ipdPrescriptionPrescriptions: prescriptions,
      ipdPrescriptionTests: tests,
    };

    console.log(submitData);
  };

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  const [search, setSearch] = React.useState("");
  const [patientsData, setPatientsData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const mappedData = [
    {
      patientId: "1",
      patientName: "jgvjhc",
      patientEmail: "patientEmailggdfg@jdkfsd.com",
      bedNo: "2",
    },
  ];

  const config = [
    {
      label: "IPD Bill No ",
      render: (list) => list.patientId,
    },
    {
      label: "Patient Name",
      render: (list) => list.patientName,
    },
    {
      label: "Doctor Name",
      render: (list) => list.patientEmail,
    },
    {
      label: "TIme / Date",
      render: (list) => date(list.createdAt),
    },
    {
      label: "Doctor Visit Checked",
      render: (list) => list.bedNo,
    },
    // {
    //   label: "Status",
    //   render: (list) => (
    //     <Box sx={{ minWidth: 100 }}>
    //       <FormControl fullWidth>
    //         <InputLabel id='demo-simple-select-label'>Status</InputLabel>
    //         <Select
    //           labelId='demo-simple-select-label'
    //           id='demo-simple-select'
    //           value={status}
    //           label='Status'
    //           onChange={handleChangeStatus}>
    //           <MenuItem value={10}>Show</MenuItem>
    //           <MenuItem value={20}>Hide</MenuItem>
    //         </Select>
    //       </FormControl>
    //     </Box>
    //   ),
    // },
    {
      label: "User Action",
      render: (list) => (
        <div className="flex gap-[10px] justify-center">
          <div
            // onClick={() => handleOpenViewModal(list)}
            onClick={() =>
              navigate(
                `${
                  browserLinks.receptionist.category
                }/${browserLinks?.receptionist?.internalPages?.ipdPatientViewPage
                  ?.split(" ")
                  .join("")}/${list.patientId}`
              )
            }
            className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
          >
            <MdViewKanban className="text-[25px] text-[#96999C]" />
          </div>
          <div
            onClick={() => handleOpenUpdateModal(list)}
            className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
          >
            <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
          </div>
          {/* <div
            // onClick={() => handleClickOpenDialogBox(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer'>
            <RiDeleteBin6Fill className='text-[25px] text-[#EB5757]' />
          </div> */}
        </div>
      ),
    },
  ];

  const keyFn = (list) => {
    return list.patientName;
  };
  const [allIpdPatientsData, setAllIpdPatientsData] = React.useState([]);
  const getAllIpdPatientsAssignedDataHandle = async () => {
    const result = await getAllIpdPatientsAssignedData();
    const filter = result?.data?.filter(
      (item) => item?.ipdNurseId === adminLoggedInData?.adminUniqueId
    );
    setAllIpdPatientsData(filter && filter?.reverse());
    setFilteredData(filter && filter?.reverse());
  };
  const getIpdPatientsFullDetailsDataHandle = async (Id) => {
    const result = await getIpdPatientsFullDetailsData(Id);
    setPatientsData(result?.data?.data?.[0]);
    console.log(result);
  };
  const searchHandle = () => {
    const filter = allIpdPatientsData?.filter((item) => {
      if (search != "") {
        return item?.ipdPatientId?.toLowerCase().includes(search.toLowerCase());
      }
      return item;
    });
    setFilteredData(filter && filter);
  };
  React.useEffect(() => {
    dispatch(GetAllDoctorsHandle());
    getAllIpdPatientsAssignedDataHandle();
  }, []);
  React.useEffect(() => {
    console.log(allIpdPatientsData, "allIpdPatientsData");
  }, [allIpdPatientsData]);
  React.useEffect(() => {
    searchHandle();
  }, [search]);
  return (
    <Suspense fallback={<>...</>}>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <div className="flex justify-between">
          <h2 className="border-b-[4px] border-[#3497F9]">IPD Patient List</h2>
          {/* <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add Patient
          </button> */}
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
                <p>Doctor Id</p>
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
                      {"Uhid" + item?.ipdPatientId}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {item?.ipdDoctorId}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {date(item?.updatedAt)}-{time(item?.updatedAt)}
                    </td>{" "}
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                      <div className="flex gap-[10px] justify-center">
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            getIpdPatientsFullDetailsDataHandle(
                              item?.ipdPatientId
                            ),
                            handleOpen(),
                          ]}
                        >
                          <CiViewList className="text-[20px] text-[#96999C]" />
                        </div>{" "}
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Patient Details
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="flex pt-[10px] pb-[10px] gap-[10%]">
                <span>
                  <img src={img} alt="patients " className="w-[15rem] " />
                </span>
                <div class="w-full grid grid-cols-2 gap-1">
                  <div className="flex gap-[10px]">
                    <span>Patients Uhid</span>:
                    <p>{"Uhid" + patientsData?.PatientData?.[0]?.patientId}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admission Date / Time</span>:
                    <p>
                      {date(patientsData?.updatedAt)}-
                      {time(patientsData?.updatedAt)}
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Name</span>:
                    <p>{patientsData?.PatientData?.[0]?.patientName}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Gender</span>:
                    <p>{patientsData?.PatientData?.[0]?.patientGender}</p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>Age</span>:
                    <p>{patientsData?.PatientData?.[0]?.patientAge}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Mobile Number</span>:
                    <p>{patientsData?.PatientData?.[0]?.patientPhone}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>IPD NO</span>:<p>{patientsData?.ipdPatientId}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admitting Doctor Id</span>:
                    <p>{patientsData?.ipdPatientId}</p>
                  </div>
                </div>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Suspense>
  );
}
