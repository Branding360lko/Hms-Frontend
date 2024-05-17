import { Suspense } from "react";
import "./TestPatientTable.css";

import Table from "../../Table";

import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
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

export default function TestPatientTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.DoctorState);
  const { patients } = useSelector((state) => state.PatientState);

  const data = [
    {
      UHID: "234344566",
      testName: "Test 1",
      prescribedByDoctor: "Dr. Dank",
      patientType: "OPD Patient",
    },
  ];

  const [emergencyPatientUHID, setemergencyPatientUHID] = React.useState({
    value: "",
    label: "",
  });
  const [emergencydoctorId, setEmergencyDoctorId] = React.useState({
    value: "",
    label: "",
  });
  const [emergencyAdmittingTime, setEmergencyAdmittingTime] =
    React.useState("");
  const [emergencyBedNo, setEmergencyBedNo] = React.useState("");
  const [emergencyNotes, setEmergencyNotes] = React.useState("");

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

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
    setemergencyPatientUHID({
      value: "",
      label: "",
    });
    setEmergencyDoctorId({
      value: "",
      label: "",
    });
    setEmergencyAdmittingTime("");
    setEmergencyBedNo("");
    setEmergencyNotes("");
  };
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleAddOPDPatient = (e) => {
    e.preventDefault();
  };

  const modalAddEmergencyPatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Add Test</h2>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleAddOPDPatient}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>UHID</label>
            <Select
              required
              options={renderedPatientIDForDropdown}
              onChange={setemergencyPatientUHID}
            />
          </div>

          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Prescribed By Doctor</label>
            <Select
              required
              options={renderedDoctorIDForDropdown}
              onChange={setEmergencyDoctorId}
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

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Tests</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter tests'
              //   value={emergencyBedNo}
              //   onChange={(e) => {
              //     const value = e.target.value.replace(/\D/g, "");
              //     // setEmergencyBedNo(value);
              //   }}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Patient Type</label>
            <select className='py-[11.5px] outline-none border-b bg-transparent'>
              <option>OPD</option>
              <option>IPD</option>
              <option>Emergency</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Notes</label>
          <textarea
            className='border-b py-[10px] outline-none'
            placeholder='Enter notes'
            rows={3}
            // value={opdPatientNotes}
            // onChange={(e) => setOpdPatientNotes(e.target.value)}
          />
        </div>
        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            className='buttonFilled'
            // onClick={() => setSubmitButton("add")}
          >{`Save >`}</button>
          <button
            className='buttonOutlined'
            // onClick={() => setSubmitButton("addPrint")}
          >{`Save & Print >`}</button>
        </div>
      </form>
    </div>
  );

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const modalUpdateEmergencyPatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Update Test</h2>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleAddOPDPatient}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>UHID</label>
            <Select
              required
              options={renderedPatientIDForDropdown}
              onChange={setemergencyPatientUHID}
            />
          </div>

          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Prescribed By Doctor</label>
            <Select
              required
              options={renderedDoctorIDForDropdown}
              onChange={setEmergencyDoctorId}
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

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Tests</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter tests'
              //   value={emergencyBedNo}
              //   onChange={(e) => {
              //     const value = e.target.value.replace(/\D/g, "");
              //     // setEmergencyBedNo(value);
              //   }}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Patient Type</label>
            <select className='py-[11.5px] outline-none border-b bg-transparent'>
              <option>OPD</option>
              <option>IPD</option>
              <option>Emergency</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Notes</label>
          <textarea
            className='border-b py-[10px] outline-none'
            placeholder='Enter notes'
            rows={3}
            // value={opdPatientNotes}
            // onChange={(e) => setOpdPatientNotes(e.target.value)}
          />
        </div>
        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            className='buttonFilled'
            // onClick={() => setSubmitButton("add")}
          >{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = () => setOpenViewModal(true);
  const handleCloseViewModal = () => setOpenViewModal(false);

  const modalViewEmergencyPatient = <div>Hello</div>;

  const [search, setSearch] = React.useState("");

  const filteredArray = data?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.emergencyRegId?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const mappedEmergencyRegTableData = filteredArray?.map((data, index) => {
    //   const filteredPatientData = patients?.find(
    //     (patient) => data?.opdPatientId === patient?.patientId
    //   );
    //   const filteredDoctorData = doctors?.find(
    //     (doctor) => doctor?.doctorId === data?.opdDoctorId
    //   );
    return {
      id: index + 1,
      data,
      // patientData: filteredPatientData,
      // doctorData: filteredDoctorData,
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
      render: (list) => list?.data?.UHID,
    },
    {
      label: "Test Name",
      render: (list) => list?.data?.testName,
    },
    {
      label: "Prescribed by Doctor",
      render: (list) => list?.data?.prescribedByDoctor,
    },
    {
      label: "Patient Type",
      render: (list) => list?.data?.patientType,
    },
    {
      label: "User Action",
      render: (list) => (
        <div className='flex gap-[10px] justify-center'>
          <div
            onClick={() => handleOpenViewModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer'>
            <MdViewKanban className='text-[25px] text-[#96999C]' />
          </div>
          <div
            onClick={() => handleOpenUpdateModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
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
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>Patient Tests</h2>
          <button
            onClick={handleOpenAddModal}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add Tests
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by uhid'
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
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Add Patient Test
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalAddEmergencyPatient}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Update Patient Test
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalUpdateEmergencyPatient}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <div className='flex justify-between items-center'>
              <h1 className='headingBottomUnderline w-fit pb-[10px]'>
                Test Patient
              </h1>
              <Link
                // onClick={handleGeneratePdf}
                target='_blank'
                to={"01"}
                // to={opdPatientData?.data?.mainId}
                // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                className='buttonFilled flex items-center gap-[10px]'>
                <LuHardDriveDownload />
                <p>Download</p>
              </Link>
            </div>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalViewEmergencyPatient}
          </Typography>
        </Box>
      </Modal>
    </Suspense>
  );
}
