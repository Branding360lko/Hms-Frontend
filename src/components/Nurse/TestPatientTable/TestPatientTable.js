import { Suspense } from "react";
import "./TestPatientTable.css";

import Table from "../../Table";
import img1 from "../../../assets/logo.png";
import { FaNotEqual, FaSearch } from "react-icons/fa";
import { MdDeleteForever, MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import browserLinks from "../../../browserlinks";

import Select from "react-select";

import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";

import placeholder from "../../../assets/imageplaceholder.png";

import * as React from "react";
import Snackbars from "../../SnackBar";
import DialogBoxToDelete from "../../DialogBoxToDelete";
import logoImage from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createTestOfPatientChange,
  updateTestOfPatientChange,
  deleteTestOfPatientChange,
} from "../../../Store/Slices/TestPatientSlice";
import {
  useCreateTestOfPatientMutation,
  useUpdateTestOfPatientByIdMutation,
} from "../../../Store/Services/TestPatient";

import axios from "axios";
import { getTestDataHandle } from "../../../Store/Slices/Test";
import { useState } from "react";
import { GetAllDoctorsHandle } from "../../../Store/Slices/DoctorSlice";
import {
  addPatientsTestData,
  getAllPatientsTestData,
  getSinglePatientsTestData,
} from "../../Receptionist/NurseApi";
import { CiViewList } from "react-icons/ci";
import PaginationComponent from "../../Pagination";
import { useReactToPrint } from "react-to-print";
import { ToWords } from "to-words";
export default function TestPatientTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toWords = new ToWords();
  const [allTests, setAllTests] = React.useState([]);

  const getAllTests = async () => {
    return await axios
      .get(`${process.env.React_App_Base_url}/GET-ALL-Test`)
      .then((data) => setAllTests(data.data))
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    getAllTests();
  }, []);

  const [createTestOfPatient, responseCreateTestOfPatient] =
    useCreateTestOfPatientMutation();
  const [updateTestOfPatientById, responseUpdateTestOfPatientById] =
    useUpdateTestOfPatientByIdMutation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [mainId, setMainId] = React.useState();

  const { doctors } = useSelector((state) => state.DoctorState);
  const { patients } = useSelector((state) => state.PatientState);
  const { testOfPatients } = useSelector((state) => state.TestPatientState);
  const [allPatientsTest, setAllPatientsTest] = useState([]);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState();
  const [testPriceTotal, setTestPriceTotal] = useState(0);
  const [selectedTest, setSelectedTest] = useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTest, setSearchTest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = React.useRef(null);
  const addTestTableHandle = (e) => {
    e.preventDefault();
    setSelectedTest([
      ...selectedTest,
      { name: "", quantity: 1, price: 0, total: 0 },
    ]);
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
  const { testData } = useSelector((state) => state.TestData);
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
      setSearchTest(filter && filter);
    }, 100);
    setIsLoading(false);
  };
  const deleteTestHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...selectedTest];

    oldValue.splice(index, 1);

    setSelectedTest(oldValue && oldValue);
  };
  const getTotalOfSelectedTest = React.useMemo(() => {
    console.log(selectedTest, "selected patient");
    const total = selectedTest?.reduce((acc, curr) => {
      return acc + curr?.total;
    }, 0);
    setTestPriceTotal(total && total);
  }, [selectedTest]);
  // console.log(testPriceTotal, "sfgdgf");

  React.useEffect(() => {
    // if (!doctors || doctors.length === 0) {
    //   dispatch(GetAllDoctorsHandle());
    // }

    if (!testData || !testData.data || testData.data.length === 0) {
      dispatch(getTestDataHandle());
    }
  }, [testData]);
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

  const [testPatientData, setTestPatientData] = React.useState();

  const [testPatientUHID, setTestPatientUHID] = React.useState({
    value: "",
    label: "",
  });
  const [prescribedByDoctorTest, setPrescribedByDoctorTest] = React.useState({
    value: "",
    label: "",
  });

  const [tests, setTests] = React.useState({
    value: "",
    label: "",
  });
  const [patientType, setPatientType] = React.useState("OPD");
  const [paymentType, setPaymentType] = React.useState();
  const [notes, setNotes] = React.useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    boxShadow: 24,
    p: 4,
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

  const renderedPatientIDForDropdown = patients?.map((data) => {
    return {
      value: data.patientId,
      label: `${data.patientId} / ${data.patientName}`,
    };
  });

  const renderedDoctorIDForDropdown = doctors?.map((data) => {
    return {
      value: data.doctorId,
      label: `${data.doctorId} / ${data.doctorName}`,
    };
  });

  const filteredTest = allTests?.data?.filter((data) => {
    return data.Availability === true;
  });
  const renderedTestsForDropdown = filteredTest?.map((data) => {
    return {
      value: data._id,
      label: `${data.Name}`,
    };
  });

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
    setTestPatientUHID({
      value: "",
      label: "",
    });
    setPrescribedByDoctorTest({
      value: "",
      label: "",
    });
    setTests("");
    setPatientType("");
    setNotes("");
  };
  const handleCloseAddModal = () => setOpenAddModal(false);

  React.useEffect(() => {
    if (responseCreateTestOfPatient.isSuccess) {
      dispatch(createTestOfPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseCreateTestOfPatient?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseAddModal();
    } else if (responseCreateTestOfPatient.isError) {
      setSnackBarSuccessWarning(responseCreateTestOfPatient?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responseCreateTestOfPatient.isSuccess,
    responseCreateTestOfPatient.isError,
  ]);

  const handleAddOPDPatient = (e) => {
    e.preventDefault();

    const submitData = {
      testPatientId: testPatientUHID?.value,
      prescribedByDoctor: prescribedByDoctorTest?.value,
      test: tests?.value,
      patientType: patientType,
      notes: notes,
    };

    createTestOfPatient(submitData);
  };

  const modalAddPatientTest = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Add Test</h2>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={(e) => addPatientsTestDataHandle(e)}
      >
        <div className="grid grid-cols-2 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">UHID</label>
            <Select
              required
              options={renderedPatientIDForDropdown}
              onChange={setTestPatientUHID}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Prescribed By Doctor</label>
            <Select
              required
              options={renderedDoctorIDForDropdown}
              onChange={setPrescribedByDoctorTest}
            />
          </div>

          {/* <div className='flex flex-col gap-[6px]'>
              <label className='text-[14px]'>Blood Pressure *</label>
              <input
                className='py-[10px] outline-none border-b'
                type='text'
                required
                placeholder='Enter blood pressure'
                value={opdPatientBloodPressure}
                onChange={(e) => setOpdPatientBloodPressure(e.target.value)}
              />
            </div> */}

          {/* <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Test</label>
            <Select
              required
              isMulti
              options={renderedTestsForDropdown}
              onChange={setTests}
            />
          </div> */}

          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Tests</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter tests"
              onChange={(e) => setTests(e.target.value)}
              //   value={emergencyBedNo}
              //   onChange={(e) => {
              //     const value = e.target.value.replace(/\D/g, "");
              //     // setEmergencyBedNo(value);
              //   }}
            />
          </div> */}

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Patient Type</label>
            <select
              onChange={(e) => setPatientType(e.target.value)}
              className="py-[11.5px] outline-none border-b bg-transparent"
              required
            >
              <option value="">Select Patient Type</option>
              <option value="opd">OPD</option>
              <option value="ipd">IPD</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Payment Type</label>
            <select
              onChange={(e) => setPaymentType(e.target.value)}
              className="py-[11.5px] outline-none border-b bg-transparent"
              required
            >
              <option value="">Select Payment Type</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Check">Check</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[6px]">
          <span className="w-full flex items-center justify-between p-4">
            <h6>Test</h6>
            <button className="buttonFilled" onClick={addTestTableHandle}>
              Add Test
            </button>
          </span>
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
                      onFocus={() => setActiveIndex(index)}
                      onChange={(e) => [
                        getTestData(e, index),
                        selectTestHandle(e),
                      ]}
                      autocomplete="off"
                      required
                    />

                    {activeIndex === index && (
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
                    />
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    <input
                      type="text"
                      className="w-[5rem]  outline-none"
                      placeholder="price"
                      name="price"
                      value={item?.total}
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
          <div className="w-full flex items-end justify-end py-2 gap-1">
            <p className="text-[1.2rem] font-semibold">Total</p>:
            <strong className="text-[1.2rem] ">₹{testPriceTotal}</strong>
          </div>
        </div>
        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px]">Notes</label>
          <textarea
            className="border-b py-[10px] outline-none"
            placeholder="Enter notes"
            rows={3}
            // value={opdPatientNotes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="flex gap-[1rem] items-center">
          <button
            type="submit"
            className="buttonFilled"
            // onClick={() => setSubmitButton("add")}
          >{`Save >`}</button>
          <button
            className="buttonOutlined"
            // onClick={() => setSubmitButton("addPrint")}
          >{`Save & Print >`}</button>
        </div>
      </form>
    </div>
  );

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (list) => {
    setMainId(list?.data?.mainId);

    setTestPatientUHID({
      value: list.data.patientData.patientId,
      label: `${list.data.patientData.patientId} / ${list.data.patientData.patientName}`,
    });
    setPrescribedByDoctorTest({
      value: list.data.doctorData.doctorId,
      label: `${list.data.doctorData.doctorId} / ${list.data.doctorData.doctorName}`,
    });
    setTests({
      value: list.data.testData._id,
      label: `${list.data.testData.Name}`,
    });
    setPatientType(list?.data?.patientType);
    setNotes(list?.data?.notes);

    // console.log(data, "helllllll");

    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  React.useEffect(() => {
    if (responseUpdateTestOfPatientById.isSuccess) {
      dispatch(updateTestOfPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseUpdateTestOfPatientById?.data);
      handleClickSnackbarSuccess();

      handleCloseUpdateModal();
    } else if (responseUpdateTestOfPatientById.isError) {
      setSnackBarSuccessWarning(responseUpdateTestOfPatientById?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responseUpdateTestOfPatientById.isSuccess,
    responseUpdateTestOfPatientById.isError,
  ]);

  const handleUpdateOPDPatient = (e) => {
    e.preventDefault();

    const submitData = {
      testPatientId: testPatientUHID?.value,
      prescribedByDoctor: prescribedByDoctorTest?.value,
      test: tests?.value,
      patientType: patientType,
      notes: notes,
    };

    updateTestOfPatientById({
      id: mainId,
      data: submitData,
    });
  };

  const modalUpdateEmergencyPatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Update Test</h2>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={handleUpdateOPDPatient}
      >
        <div className="grid grid-cols-2 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">UHID</label>
            <Select
              required
              value={testPatientUHID}
              options={renderedPatientIDForDropdown}
              onChange={setTestPatientUHID}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Prescribed By Doctor</label>
            <Select
              required
              options={renderedDoctorIDForDropdown}
              onChange={setPrescribedByDoctorTest}
              value={prescribedByDoctorTest}
            />
          </div>
          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Test</label>
            <Select
              required
              isMulti
              options={renderedTestsForDropdown}
              onChange={setTests}
              value={tests}
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Patient Type</label>
            <select
              value={patientType}
              onChange={(e) => setPatientType(e.target.value)}
              className="py-[11.5px] outline-none border-b bg-transparent"
              required
            >
              <option>OPD</option>
              <option>IPD</option>
              <option>Emergency</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px]">Notes</label>
          <textarea
            className="border-b py-[10px] outline-none"
            placeholder="Enter notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="flex gap-[1rem] items-center">
          <button
            type="submit"
            className="buttonFilled"
            // onClick={() => setSubmitButton("add")}
          >{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = (list) => {
    setTestPatientData(list);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => setOpenViewModal(false);

  const modalViewEmergencyPatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <div className="border-b flex gap-[1rem] py-[1rem] w-full">
        <h3 className="font-[500]">ID: </h3>
        <h3>{selectedPatientDetails?.mainId}</h3>
      </div>
      <div className="flex w-full">
        <div className="w-[25%] flex flex-col items-center">
          <img
            className="w-[200px] h-[200px] object-contain"
            src={placeholder}
            alt="patientImage"
          />
          {/* <button className='buttonFilled w-fit'>Button</button> */}
        </div>
        <div className="w-[75%] flex flex-col gap-[10px] text-[14px]">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Id: </p>
              <p>{selectedPatientDetails?.testPatientId}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Prescribed Doctor Id: </p>
              <p>{selectedPatientDetails?.prescribedByDoctor}</p>
            </div>

            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Name: </p>
              <p>{selectedPatientDetails?.patientData?.patientName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Name: </p>
              <p>{selectedPatientDetails?.DoctorData?.doctorName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Blood Group: </p>
              <p>{selectedPatientDetails?.patientData?.patientBloodGroup}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Gender: </p>
              <p>{selectedPatientDetails?.patientData?.patientGender}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Case No: </p>
              <p>{opdPatientData?.data?.opdCaseId}</p>
            </div> */}
            {/* <div className="flex">
              <p className="font-[600] w-[150px]">Patient DOB: </p>
              <p>{date(opdPatientData?.patientData?.patientDateOfBirth)}</p>
            </div> */}
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>OPD No: </p>
              <p>{opdPatientData?.data?.opdId}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Phone: </p>
              <p>{selectedPatientDetails?.patientData?.patientPhone}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Blood Pressure: </p>
              <p>{opdPatientData?.data?.opdPatientBloodPressure}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Height: </p>
              <p>{selectedPatientDetails?.patientData?.patientHeight}</p>
            </div>

            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Weight: </p>
              <p>{selectedPatientDetails?.patientData?.patientWeight}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Type: </p>
              <p>{selectedPatientDetails?.patientType}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col py-2">
              <table>
                <thead>
                  <th className="border-[1px] p-1 font-semibold">
                    <p>S_N</p>
                  </th>
                  <th className="border-[1px] p-1 font-semibold">
                    <p>Test Name</p>
                  </th>
                  <th className="border-[1px] p-1 font-semibold">
                    <p>Price</p>
                  </th>
                  <th className="border-[1px] p-1 font-semibold">
                    <p>Quantity</p>
                  </th>

                  <th className="border-[1px] p-1 font-semibold">
                    <p>Total</p>
                  </th>
                </thead>
                <tbody>
                  {selectedPatientDetails?.test?.map((item, index) => (
                    <tr className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                        {index + 1}
                      </td>
                      <td>{item?.Name}</td>
                      <td>{item?.Price}</td>
                      <td>{item?.Quantity}</td>
                      <td>{item?.Total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex  items-end justify-end gap-2">
              <p className="font-[600] ">Test Cost: </p>
              <strong className="text-[14px]">
                ₹ {selectedPatientDetails?.total}
              </strong>
            </div>
            <div className="flex gap-2">
              <p className="font-[600]">Notes: </p>
              <p className="text-[14px]">{selectedPatientDetails?.note}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Created On: </p>
              <p className="break-word text-[14px]">
                {`${date(selectedPatientDetails?.createdAt)} ${time(
                  selectedPatientDetails?.createdAt
                )}`}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Updated On: </p>
              <p className="break-word text-[14px]">
                {`${date(selectedPatientDetails?.updatedAt)} ${time(
                  selectedPatientDetails?.updatedAt
                )}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printView = (
    <div className="print-hide">
      <div className="print-show w-full" ref={componentRef}>
        <div className="flex justify-between items-end">
          <div className="flex items-end gap-[1rem]">
            <img src={logoImage} alt="chtclogo" className="w-[150px]" />
            <div className="flex flex-col items-start">
              <p className="text-[16px]">City Hospital and Trauma Centre</p>
              <p className="text-[14px]">Contact no. 9119900861, 9119900862</p>
            </div>
          </div>
          <div className="flex text-[12px] gap-[10px]">
            <p className="w-[250px]">
              C1-C2 Cinder Dump Complex, near Alambagh bus stand, Kanpur road,
              Lucknow 226005
            </p>
          </div>
        </div>
        <p className="text-center text-[12px]">Billing</p>
        <h3
          className="text-center"
          style={{
            borderTop: "2px solid #373737",
            borderBottom: "2px solid #373737",
          }}
        >
          Test Payment Receipt
        </h3>

        <div className="grid grid-cols-2 gap-[10px] text-[14px] px-4 py-2">
          <div className="flex">
            <p className="font-[500] w-[130px] text-start">UHID</p>
            <p>{selectedPatientDetails?.testPatientId}</p>
          </div>
          <div className="flex">
            <p className="font-[500] w-[130px] text-start">Visit Date</p>
            {/* <p className="border-b-[2px] border-dotted border-black w-[200px]">{``}</p> */}
            <p>{`${date(selectedPatientDetails?.updatedAt)} - ${time(
              selectedPatientDetails?.updatedAt
            )}`}</p>
          </div>
          <div className="flex">
            <p className="font-[500] w-[130px] text-start">Patient Name</p>
            <p>{selectedPatientDetails?.patientData?.patientName}</p>
          </div>
          <div className="flex">
            <p className="font-[500] w-[130px] text-start">Address</p>
            <p>{selectedPatientDetails?.patientData?.patientCity}</p>
          </div>
          <div className="flex">
            <p className="font-[500] w-[130px] text-start">Doctor</p>
            <p>{selectedPatientDetails?.DoctorData?.doctorName}</p>
          </div>
          <div className="flex">
            <p className="font-[500] w-[130px] text-start">Gender</p>
            <p>{selectedPatientDetails?.patientData?.patientGender}</p>
          </div>
          {/* <div className="flex">
                    <p className="font-[500] w-[130px] text-start">DOB</p>
                    <p>
                      {date(
                        responseGetPatientById?.currentData?.patientDateOfBirth
                      )}
                    </p>
                  </div> */}
          <div className="flex">
            <p className="font-[500] w-[130px] text-start">Age</p>
            <p>{selectedPatientDetails?.patientData?.patientAge}</p>
          </div>
          <div className="flex">
            <p className="font-[500] w-[130px] text-start">Phone</p>
            <p>{selectedPatientDetails?.patientData?.patientPhone}</p>
          </div>

          <div className="flex">
            <p className="font-[500] w-[130px] text-start">Payment Mode</p>
            <p>{selectedPatientDetails?.paymentType}</p>
          </div>
        </div>
        <div
          className="flex justify-between p-[1rem]"
          style={{
            borderTop: "2px solid #373737",
            borderBottom: "2px solid #373737",
          }}
        >
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
            <thead>
              <th className="border-[1px] p-1 font-semibold">
                <p>S_N</p>
              </th>
              <th className="border-[1px] p-1 font-semibold">
                <p>Test</p>
              </th>

              <th className="border-[1px] p-1 font-semibold">
                <p>Price</p>
              </th>
              <th className="border-[1px] p-1 font-semibold">
                <p>Quantity</p>
              </th>
              <th className="border-[1px] p-1 font-semibold">
                <p>Total</p>
              </th>
            </thead>
            <tbody>
              {selectedPatientDetails?.test?.map((item, index) => (
                <tr className="border-b-[1px]">
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    {index + 1}
                  </td>
                  <td className="justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                    <p> {item?.Name}</p>
                  </td>

                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    <p> {item?.Price}</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    <p> {item?.Quantity}</p>
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    <p> {item?.Total}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="flex justify-between p-[1rem]"
          style={{
            borderBottom: "2px solid #373737",
          }}
        >
          <h3>Total Charge's:</h3>
          <p>{`₹ ${selectedPatientDetails?.total}`}</p>
        </div>
        <div
          className="flex justify-end items-center px-[1rem] pb-[10px]"
          style={{
            // borderTop: "2px solid #373737",
            borderBottom: "2px solid #373737",
          }}
        >
          <p>{`₹ ${toWords.convert(
            `${
              selectedPatientDetails?.total ? selectedPatientDetails?.total : 0
            }`,
            {
              currency: true,
            }
          )}`}</p>
        </div>
      </div>
    </div>
  );

  // const filteredArray = testOfPatients?.filter((data) => {
  //   if (search !== "") {
  //     const userSearch = search.toLowerCase();
  //     const searchInData = data?.testPatientId?.toLowerCase();

  //     return searchInData?.startsWith(userSearch);
  //   }
  //   return data;
  // });

  const mappedEmergencyRegTableData = testOfPatients?.map((data, index) => {
    return {
      id: index + 1,
      data,
    };
  });

  //   const mappedBillData = filteredArray?.map((data, index) => {
  //     const filteredPatientData = patients?.find(
  //       (patient) => data?.opdPatientId === patient?.patientId
  //     );
  //     const filteredDoctorData = doctors?.find(
  //       (doctor) => doctor?.doctorId === data?.opdDoctorId
  //     );
  //     return {
  //       data,
  //       patientData: filteredPatientData,
  //       doctorData: filteredDoctorData,
  //     };
  //   });

  const getAllPatientsTestDataHandle = async () => {
    const result = await getAllPatientsTestData();
    setAllPatientsTest(result?.data && result?.data);
    setFilteredData(result?.data && result?.data);
  };
  const addPatientsTestDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("testPatientId", testPatientUHID?.value);
    formData.append("prescribedByDoctor", prescribedByDoctorTest?.value);
    formData.append("patientType", patientType);
    formData.append("note", notes);
    formData.append("total", testPriceTotal);
    formData.append("paymentType", paymentType);
    formData.append("test", JSON.stringify(selectedTest));
    const result = await addPatientsTestData(formData);
    if (result?.status === 200) {
      handleCloseAddModal();
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      getAllPatientsTestDataHandle();
    }
  };
  const getSinglePatientsTestDataHandle = async (Id) => {
    const result = await getSinglePatientsTestData(Id);
    setSelectedPatientDetails(result?.data && result?.data?.[0]);
    console.log(result, "214324");
  };
  const searchHandle = () => {
    const filter = allPatientsTest?.filter((item) => {
      if (search != "") {
        return (
          item?.patientData?.patientName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item?.patientData?.patientPhone
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item?.patientData?.patientPhone2
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item?.testPatientId?.toLowerCase().includes(search.toLowerCase())
        );
      }
      return item;
    });
    setFilteredData(filter && filter);
  };
  React.useEffect(() => {
    searchHandle();
  }, [search]);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  React.useEffect(() => {
    dispatch(GetAllDoctorsHandle());
  }, []);

  React.useEffect(() => {
    getAllPatientsTestDataHandle();
  }, []);
  return (
    <Suspense fallback={<>...</>}>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <div className="flex justify-between">
          <h2 className="border-b-[4px] border-[#3497F9]">Patient Tests</h2>
          <button
            onClick={handleOpenAddModal}
            className="bg-[#3497F9] text-white p-[10px] rounded-md"
          >
            + Add Tests
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
            <FaSearch className="text-[#56585A]" />
            <input
              className="bg-transparent outline-none w-[27rem]"
              placeholder="Search by Patient Name Or Phone Number Or Uhid"
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
                <p>Patient Name</p>
              </th>
              <th className="border-[1px] p-1 font-semibold">
                <p>Prescribed by Doctor</p>
              </th>

              <th className="border-[1px] p-1 font-semibold">
                <p>Patient Type</p>
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
                      {item?.testPatientId}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {item?.patientData?.patientName}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {/* {item?.ReferredDoctorDetails?.[0]?.doctorName} */}
                      {item?.DoctorData?.doctorName}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                      {item?.patientType}
                    </td>

                    <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                      <div className="flex gap-[10px] justify-center">
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            getSinglePatientsTestDataHandle(item?.mainId),
                            handleOpenViewModal(),
                          ]}
                        >
                          <CiViewList className="text-[20px] text-[#96999C]" />
                        </div>{" "}
                        {/* <div
                          onClick={() =>
                            getSinglePatientsTestDataHandle(item?.mainId)
                          }
                          className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                        >
                          <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                        </div> */}
                        {/* <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                        onClick={() => [
                          handleOpen1(),
                          getOneReferPatientDataDataHandle(item?._id),
                        ]}
                      >
                        <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                      </div> */}
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
      {printView}
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="headingBottomUnderline w-fit pb-[10px]">
              Add Patient Test
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalAddPatientTest}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="headingBottomUnderline w-fit pb-[10px]">
              Update Patient Test
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalUpdateEmergencyPatient}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex justify-between items-center">
              <h1 className="headingBottomUnderline w-fit pb-[10px]">
                Test Patient
              </h1>
              <button
                // onClick={handleGeneratePdf}

                // to={opdPatientData?.data?.mainId}
                // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                className="buttonFilled flex items-center gap-[10px]"
                onClick={handlePrint}
              >
                <LuHardDriveDownload />
                <p>Print Slip</p>
              </button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalViewEmergencyPatient}
          </Typography>
        </Box>
      </Modal>
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
