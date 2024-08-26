import { Suspense } from "react";
import "./TestPatientTable.css";

import Table from "../../Table";

import { FaSearch } from "react-icons/fa";
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

export default function TestPatientTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [mainId, setMainId] = React.useState();

  const { doctors } = useSelector((state) => state.DoctorState);
  const { patients } = useSelector((state) => state.PatientState);
  const { testOfPatients } = useSelector((state) => state.TestPatientState);
  const [selectedTest, setSelectedTest] = useState([]);
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
      <form className="flex flex-col gap-[1rem]" onSubmit={handleAddOPDPatient}>
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
        <h3>{testPatientData?.data?.mainId}</h3>
      </div>
      <div className="flex w-full">
        <div className="w-[25%] flex flex-col items-center">
          <img
            className="w-[200px] h-[200px] object-contain"
            src={
              testPatientData?.data?.patientData?.patientImage
                ? process.env.React_App_Base_Image_Url +
                  testPatientData?.data?.patientData?.patientImage
                : placeholder
            }
            alt="patientImage"
          />
          {/* <button className='buttonFilled w-fit'>Button</button> */}
        </div>
        <div className="w-[75%] flex flex-col gap-[10px] text-[14px]">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Id: </p>
              <p>{testPatientData?.data?.testPatientId}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Prescribed Doctor Id: </p>
              <p>{testPatientData?.data?.prescribedByDoctor}</p>
            </div>

            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Name: </p>
              <p>{testPatientData?.data?.patientData?.patientName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Name: </p>
              <p>{testPatientData?.data?.doctorData?.doctorName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Blood Group: </p>
              <p>{testPatientData?.data?.patientData?.patientBloodGroup}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Phone: </p>
              <p>{testPatientData?.data?.doctorData?.doctorPhone}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Gender: </p>
              <p>{testPatientData?.data?.patientData?.patientGender}</p>
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
              <p>{testPatientData?.data?.patientData?.patientPhone}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Blood Pressure: </p>
              <p>{opdPatientData?.data?.opdPatientBloodPressure}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Height: </p>
              <p>{testPatientData?.data?.patientData?.patientHeight}</p>
            </div>

            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Weight: </p>
              <p>{testPatientData?.data?.patientData?.patientWeight}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Type: </p>
              <p>{testPatientData?.data?.patientType}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col">
              <p className="font-[600] w-[150px]">Test Name: </p>
              <p className="text-[16px]">
                {testPatientData?.data?.testData?.Name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-[600] w-[150px]">Test Cost: </p>
              <p className="text-[14px]">
                ₹ {testPatientData?.data?.testData?.Cost}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-[600] w-[150px]">Notes: </p>
              <p className="text-[14px]">{testPatientData?.data?.notes}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Created On: </p>
              <p className="break-word text-[14px]">
                {`${date(testPatientData?.data?.createdAt)} ${time(
                  testPatientData?.data?.createdAt
                )}`}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Updated On: </p>
              <p className="break-word text-[14px]">
                {`${date(testPatientData?.data?.updatedAt)} ${time(
                  testPatientData?.data?.updatedAt
                )}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const [search, setSearch] = React.useState("");

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

  const config = [
    {
      label: "S No.",
      render: (list) => list?.id,
    },
    {
      label: "UHID",
      render: (list) => list?.data?.testPatientId,
    },
    {
      label: "Patient Name",
      render: (list) => list?.data?.patientData?.patientName,
    },
    {
      label: "Test Name",
      render: (list) => list?.data?.testData?.Name,
    },
    {
      label: "Prescribed by Doctor",
      render: (list) => list?.data?.doctorData?.doctorName,
    },
    {
      label: "Patient Type",
      render: (list) => list?.data?.patientType,
    },
    {
      label: "User Action",
      render: (list) => (
        <div className="flex gap-[10px] justify-center">
          <div
            onClick={() => handleOpenViewModal(list)}
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
              onClick={() => handleClickOpenDialogBox(list)}
              className='p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer'>
              <RiDeleteBin6Fill className='text-[25px] text-[#EB5757]' />
            </div> */}
        </div>
      ),
    },
  ];

  const keyFn = (list) => {
    return list.mainId;
  };
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
              className="bg-transparent outline-none"
              placeholder="Search by uhid"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
        <input type='date' className='bg-transparent outline-none' />
      </div> */}
        </div>
        <Table
          data={mappedEmergencyRegTableData}
          config={config}
          keyFn={keyFn}
        />
      </div>
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
              <Link
                // onClick={handleGeneratePdf}
                target="_blank"
                to={testPatientData?.data?.mainId}
                // to={opdPatientData?.data?.mainId}
                // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                className="buttonFilled flex items-center gap-[10px]"
              >
                <LuHardDriveDownload />
                <p>Download</p>
              </Link>
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
