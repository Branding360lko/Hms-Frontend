// import React from "react";
import "./IPDPatientListTable.css";

import { Suspense } from "react";

import Table from "../../Table";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import placeholder from "../../../assets/imageplaceholder.png";

import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

import Select from "react-select";

import { useNavigate } from "react-router-dom";
import browserLinks from "../../../browserlinks";

import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import { MdDeleteForever } from "react-icons/md";

export default function IPDPatientList() {
  const navigate = useNavigate();

  const { patients } = useSelector((state) => state.PatientState);
  const [status, setStatus] = React.useState("");

  const [patientId, setPatientId] = React.useState("");

  const renderedPatientForDropdownPrescription = patients?.map((data) => {
    return {
      value: data.patientId,
      label: `${data.patientId} / ${data.patientName}`,
    };
  });

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

  const modalUpdatePatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <form onSubmit={handleUpdateIPDPatientSubscription}>
        <div className='grid grid-cols-3 gap-[2rem] pb-[3rem]'>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Patient Registration No</label>
            <Select
              className='text-[12px] w-full'
              required
              options={renderedPatientForDropdownPrescription}
              onChange={setPatientId}
              value={patientId}
            />
          </div>

          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Doctor Visited</label>
            <select
              required
              className='py-[10px] outline-none border-b bg-transparent'>
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Doctor Visit Time</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='datetime-local'
              onChange={(e) => setVisitTime(e.target.value)}
            />
          </div>
        </div>

        <div className='flex flex-col gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Note</label>
            <textarea
              rows={5}
              className='py-[10px] outline-none border rounded-lg w-full p-[1rem]'
              type='text'
              required
              placeholder='Enter notes'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[10px]'>
            <h2 className='border-b w-full text-start'>Prescription</h2>
            <div className='border rounded-lg w-full p-[1rem] flex flex-col gap-[1rem]'>
              <div className='flex flex-row items-center justify-between'>
                <h2 className='text-start'>Add Consumables</h2>
                <Button onClick={() => handleAddInput()}>ADD +</Button>
              </div>

              <table className='w-fit border rounded-lg'>
                <tr className='flex flex-row w-full'>
                  <th className='w-[80px] text-start border-b border-r py-[10px] px-[6px]'>
                    S No.
                  </th>
                  <th className='w-[300px] text-start border-b border-r py-[10px] px-[6px]'>
                    Name
                  </th>
                  <th className='w-[200px] text-start border-b border-r py-[10px] px-[6px]'>
                    Qty
                  </th>
                  <th className='w-[200px] text-start border-b border-r py-[10px] px-[6px]'>
                    How many time in day
                  </th>
                  <th className='text-start border-b border-r py-[10px] px-[6px]'>
                    Action
                  </th>
                </tr>
                {prescriptions.map((item, index) => (
                  <tr key={index} className='flex flex-row w-full'>
                    <td className='w-[80px] text-start border-b border-r py-[10px] px-[6px]'>
                      <p>{index + 1}</p>
                    </td>
                    <td className='w-[300px] text-start border-b border-r py-[10px] px-[6px]'>
                      <input
                        name='medicineName'
                        type='text'
                        placeholder='Enter medicine name'
                        className='w-full border'
                        value={item.medicineName}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </td>
                    <td className='w-[200px] text-start border-b border-r py-[10px] px-[6px]'>
                      <input
                        name='qty'
                        type='text'
                        placeholder='Enter quantity'
                        className='w-full border'
                        value={item.qty}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </td>
                    <td className='w-[200px] text-start border-b border-r py-[10px] px-[6px]'>
                      <input
                        name='times'
                        type='text'
                        placeholder='Enter times'
                        className='w-full border'
                        value={item.times}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </td>
                    <td className='py-[10px] px-[6px]'>
                      <MdDeleteForever
                        onClick={() => handleDeleteInput(index)}
                        className='text-[red] cursor-pointer text-[20px]'
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div className='flex flex-col items-start gap-[10px]'>
            <h2 className='border-b w-full text-start'>Test</h2>
            <div className='flex flex-row items-center w-full'>
              <Select
                className='text-[12px] w-[50%]'
                options={testData?.map((data) => {
                  return {
                    value: data.id,
                    label: data.name,
                  };
                })}
                onChange={setTest}
                value={test}
              />
              <Button
                onClick={() =>
                  setTests([
                    ...tests,
                    { testId: test.value, testName: test.label },
                  ])
                }>
                ADD +
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-6 gap-[1rem]'>
            {tests?.map((data, index) => {
              return (
                <div
                  key={`${index}-${data.testId}-${data.testName}`}
                  className='border relative w-fit'>
                  <p className='p-[1rem]'>{data.testName}</p>
                  <p
                    onClick={() => handleRemoveTestCard(index)}
                    className='text-black font-[600] absolute right-[4px] top-0 cursor-pointer'>
                    -
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='w-fit py-[1rem] flex gap-[10px]'>
          <button className='buttonFilled' type='submit'>{`Save >`}</button>
          <button className='buttonOutlined'>
            Request to Admit in Operation Theater (OT)
          </button>
          <button className='buttonOutlined'>
            Request to Admit in Emergency
          </button>
          <button className='buttonOutlined'>
            Request to Discharge from IPD
          </button>
        </div>
      </form>
    </div>
  );

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  const [search, setSearch] = React.useState("");

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
      label: "UHID",
      render: (list) => list.patientId,
    },
    {
      label: "Patient Name",
      render: (list) => list.patientName,
    },
    {
      label: "Room No",
      render: (list) => list.patientEmail,
    },
    {
      label: "Bed No",
      render: (list) => date(list.createdAt),
    },
    {
      label: "Floor No",
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
      label: "Action",
      render: (list) => (
        <div className='flex gap-[10px] justify-center'>
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
            className='p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer'>
            <MdViewKanban className='text-[25px] text-[#96999C]' />
          </div>
          <div
            onClick={() => handleOpenUpdateModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
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
  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>IPD Patient List</h2>
          {/* <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add Patient
          </button> */}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by patient id'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
        </div>
        <Table data={mappedData} config={config} keyFn={keyFn} />
      </div>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Update IPD Patient Prescription
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalUpdatePatient}
          </Typography>
        </Box>
      </Modal>
    </Suspense>
  );
}
