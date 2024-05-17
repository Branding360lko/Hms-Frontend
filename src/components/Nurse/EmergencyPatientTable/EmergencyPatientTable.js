import { Suspense } from "react";
import "./EmergencyPatientTable.css";

import Table from "../../Table";

import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";
import { FaBed } from "react-icons/fa";

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

import { useUpdateBedAvailabilityMutation } from "../../../Store/Services/BedService";

import {
  useCreateEmergencyPatientMutation,
  useDeleteEmergencyPatientByIdMutation,
  useUpdateEmergencyPatientByIdMutation,
} from "../../../Store/Services/EmergencyPatientService";

import {
  createEmergencyPatientChange,
  updateEmergencyPatientChange,
  deleteEmergencyPatientChange,
} from "../../../Store/Slices/EmergencyPatientSlice";

import BedSelector from "../AddBedSelector/AddBedSelector";

export default function EmergencyPatientTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.DoctorState);
  const { patients } = useSelector((state) => state.PatientState);
  const { emergencyPatients } = useSelector(
    (state) => state.EmergencyPatientState
  );

  // Add Bed Form Open State and Logic
  const [addBedFormOpen, setAddBedFormOpen] = React.useState(false);

  const [selectedBed, setSelectedBed] = React.useState(null);

  const [updateBedAvailability, responseUpdateBedAvailability] =
    useUpdateBedAvailabilityMutation();
  const [createEmergencyPatient, responseCreateEmergencyPatient] =
    useCreateEmergencyPatientMutation();
  const [updateEmergencyPatientById, responseUpdateEmergencyPatientById] =
    useUpdateEmergencyPatientByIdMutation();

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

  function handleAddBedFormOpen(e) {
    e.preventDefault();

    setAddBedFormOpen(true);
  }

  const handleBedSelect = (bed) => {
    setSelectedBed(bed);
  };

  const { beds } = useSelector((state) => state.BedState);

  const data = [
    {
      emergencyRegId: "234344566",
      doctorName: "doctor1",
      patientName: "Patient1",
      bedNo: 1,
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
  // const [emergencyBedNo, setEmergencyBedNo] = React.useState("");
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

    setEmergencyNotes("");
  };
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  React.useEffect(() => {
    if (responseCreateEmergencyPatient.isSuccess) {
      dispatch(createEmergencyPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseCreateEmergencyPatient?.data?.message);
      handleClickSnackbarSuccess();
      updateBedAvailability({
        bedId: responseCreateEmergencyPatient?.data?.data?.bedId,
        data: { bedAvailableOrNot: false },
      });
      handleCloseAddModal();
    } else if (responseCreateEmergencyPatient.isError) {
      setSnackBarSuccessWarning(responseCreateEmergencyPatient?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responseCreateEmergencyPatient.isSuccess,
    responseCreateEmergencyPatient.isError,
  ]);

  // console.log(selectedBed);
  const handleAddOPDPatient = (e) => {
    e.preventDefault();

    const submitData = {
      patientId: emergencyPatientUHID?.value,
      doctorId: emergencydoctorId?.value,
      admittingDateTime: emergencyAdmittingTime,
      bedId: selectedBed?.bedId,
      notes: emergencyNotes,
    };
    createEmergencyPatient(submitData);
  };

  const modalAddEmergencyPatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Add Patient</h2>
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
            <label className='text-[14px]'>Doctor Id</label>
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
            <label className='text-[14px]'>Admitting Date / Time</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              onChange={(e) => setEmergencyAdmittingTime(e.target.value)}
            />
          </div>
          <div>
            {addBedFormOpen === false ? (
              <button
                onClick={(e) => handleAddBedFormOpen(e)}
                className=' flex justify-center items-start w-[100px] gap-1 bg-green-500 py-1 text-white
             hover:text-black rounded-md '>
                <FaBed className=' text-3xl ' /> +
              </button>
            ) : (
              <div className=' flex flex-col justify-center items-start gap-5'>
                <h2>Select A Bed</h2>
                <div>
                  <BedSelector
                    beds={beds?.filter((data) => data.bedType === "Emergency")}
                    handleBedSelect={handleBedSelect}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Notes</label>
          <textarea
            className='border-b py-[10px] outline-none'
            placeholder='Enter notes'
            rows={3}
            value={emergencyNotes}
            onChange={(e) => setEmergencyNotes(e.target.value)}
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

  const [previousSelectedBed, setPreviousSelectedBed] = React.useState("");
  const [emergencyPatientId, setEmergencyPatientId] = React.useState("");
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (list) => {
    setEmergencyPatientId(list?.data?.mainId);
    setemergencyPatientUHID({
      value: list.patientData.patientId,
      label: `${list.patientData.patientId} / ${list.patientData.patientName}`,
    });
    setEmergencyDoctorId({
      value: list.doctorData.doctorId,
      label: `${list.doctorData.doctorId} / ${list.doctorData.doctorName}`,
    });
    setPreviousSelectedBed(list.bedData.bedId);
    setSelectedBed(list.bedData);
    setEmergencyAdmittingTime(list.data.admittingDateTime);
    setEmergencyNotes(list.data.notes);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  React.useEffect(() => {
    if (responseUpdateEmergencyPatientById.isSuccess) {
      dispatch(updateEmergencyPatientChange(Math.random()));
      setSnackBarSuccessMessage(
        responseUpdateEmergencyPatientById?.data?.message
      );
      handleClickSnackbarSuccess();
      if (previousSelectedBed !== selectedBed.bedId) {
        updateBedAvailability({
          bedId: selectedBed.bedId,
          data: { bedAvailableOrNot: false },
        });
        updateBedAvailability({
          bedId: previousSelectedBed,
          data: { bedAvailableOrNot: true },
        });
      }

      handleCloseUpdateModal();
    } else if (responseUpdateEmergencyPatientById.isError) {
      setSnackBarSuccessWarning(
        responseUpdateEmergencyPatientById?.error?.data
      );
      handleClickSnackbarWarning();
    }
  }, [
    responseUpdateEmergencyPatientById.isSuccess,
    responseUpdateEmergencyPatientById.isError,
  ]);

  const handleUpdateOPDPatient = (e) => {
    e.preventDefault();
    const submitData = {
      patientId: emergencyPatientUHID.value,
      doctorId: emergencydoctorId.value,
      bedId: selectedBed.bedId,
      admittingDateTime: emergencyAdmittingTime,
      notes: emergencyNotes,
    };

    updateEmergencyPatientById({
      id: emergencyPatientId,
      data: submitData,
    });
  };

  const modalUpdateEmergencyPatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Update Patient</h2>
      <form
        className='flex flex-col gap-[1rem]'
        onSubmit={handleUpdateOPDPatient}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>UHID</label>
            <Select
              required
              value={emergencyPatientUHID}
              options={renderedPatientIDForDropdown}
              onChange={setemergencyPatientUHID}
            />
          </div>

          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Doctor Id</label>
            <Select
              required
              value={emergencydoctorId}
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
            <label className='text-[14px]'>Admitting Date / Time</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              value={emergencyAdmittingTime}
              onChange={(e) => setEmergencyAdmittingTime(e.target.value)}
            />
          </div>
          <div>
            {addBedFormOpen === false ? (
              <button
                onClick={(e) => handleAddBedFormOpen(e)}
                className=' flex justify-center items-start w-[100px] gap-1 bg-green-500 py-1 text-white
             hover:text-black rounded-md '>
                <FaBed className=' text-3xl ' /> +
              </button>
            ) : (
              <div className=' flex flex-col justify-center items-start gap-5'>
                <h2>Select A Bed</h2>
                <div>
                  <BedSelector
                    beds={beds?.filter((data) => data.bedType === "Emergency")}
                    handleBedSelect={handleBedSelect}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Notes</label>
          <textarea
            className='border-b py-[10px] outline-none'
            placeholder='Enter notes'
            rows={3}
            value={emergencyNotes}
            onChange={(e) => setEmergencyNotes(e.target.value)}
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

  const filteredArray = emergencyPatients?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.mainId?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const mappedEmergencyRegTableData = filteredArray?.map((data, index) => {
    const filteredPatientData = patients?.find(
      (patient) => data?.patientId === patient?.patientId
    );
    const filteredDoctorData = doctors?.find(
      (doctor) => doctor?.doctorId === data?.doctorId
    );
    const filteredBedData = beds?.find((bed) => bed?.bedId === data?.bedId);
    return {
      id: index + 1,
      data,
      patientData: filteredPatientData,
      doctorData: filteredDoctorData,
      bedData: filteredBedData,
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
      label: "Emergency Reg Id",
      render: (list) => list?.data?.mainId,
    },
    {
      label: "Doctor Name",
      render: (list) => list?.doctorData?.doctorName,
    },
    {
      label: "Patient Name",
      render: (list) => list?.patientData?.patientName,
    },
    {
      label: "Bed No",
      render: (list) => list?.bedData?.bedNumber,
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
          <h2 className='border-b-[4px] border-[#3497F9]'>
            Emergency Patients
          </h2>
          <button
            onClick={handleOpenAddModal}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add Emergency Patient
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by id'
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
              Add Emergency Patient
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
              Update Emergency Patient
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
                Emergency Patient
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
      <Snackbars
        open={openSnackbarSuccess}
        setOpen={setOpenSnackBarSuccess}
        severity='success'
        message={snackBarMessageSuccess}
      />
      {/* Warning Snackbar */}
      <Snackbars
        open={openSnackbarWarning}
        setOpen={setOpenSnackBarWarning}
        severity='warning'
        message={snackBarMessageWarning}
      />
    </Suspense>
  );
}
