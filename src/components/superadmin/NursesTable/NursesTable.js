import { Suspense } from "react";

import "./NursesTable.css";

import Table from "../../Table";
import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";

import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Snackbars from "../../SnackBar";
import DialogBoxToDelete from "../../DialogBoxToDelete";

import placeholder from "../../../assets/imageplaceholder.png";

import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import {
  useCreateNurseMutation,
  useUpdateNurseByIdMutation,
  useDeleteNurseByIdMutation,
} from "../../../Store/Services/NurseService";
import {
  createNurseChange,
  updateNurseChange,
  deleteNurseChange,
} from "../../../Store/Slices/NurseSlice";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

export default function NursesTable() {
  const dispatch = useDispatch();

  const { adminLoggedInData } = useSelector((state) => state.AdminState);

  const { nurses } = useSelector((state) => state.NurseState);
  // console.log(patients);
  const [createNurse, responseCreateNurse] = useCreateNurseMutation();
  const [updateNurseById, responseUpdateNurseById] =
    useUpdateNurseByIdMutation();
  const [deleteNurseById, responseDeleteNurseById] =
    useDeleteNurseByIdMutation();

  const [patientId, setPatientId] = React.useState("");

  // states
  const [patientName, setPatientName] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const [patientFatherName, setPatientFatherName] = React.useState("");
  const [patientHusbandName, setPatientHusbandName] = React.useState("");
  // const [patientDateOfBirth, setPatientDateOfBirth] = React.useState({
  //   startDate: new Date(),
  // });
  const [patientAge, setPatientAge] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");
  const [patientPhone2, setPatientPhone2] = React.useState("");
  const [patientHeight, setPatientHeight] = React.useState("");
  const [patientWeight, setPatientWeight] = React.useState("");
  const [patientBloodGroup, setPatientBloodGroup] = React.useState("");
  const [patientLocalAddress, setPatientLocalAddress] = React.useState("");
  const [patientPermanentAddress, setPatientPermanentAddress] =
    React.useState("");
  const [patientCity, setPatientCity] = React.useState("");
  const [patientState, setPatientState] = React.useState("");
  const [patientCountry, setPatientCountry] = React.useState("");
  const [patientZipCode, setPatientZipCode] = React.useState("");
  const [patientImage, setPatientImage] = React.useState();
  const [patientGender, setPatientGender] = React.useState("Female");

  const [sameAsLocalAddress, setSameAsLocalAddress] = React.useState(false);

  //   Nurse States

  const [nurseIdToDelete, setNurseIdToDelete] = React.useState("");
  const [nurseData, setNurseData] = React.useState("");

  const [nurseId, setNurseId] = React.useState("");
  const [nurseName, setNurseName] = React.useState("");
  const [nurseEmail, setNurseEmail] = React.useState("");
  const [nursePhone, setNursePhone] = React.useState("");
  const [nurseQualification, setNurseQualification] = React.useState("");

  const [nurseAge, setNurseAge] = React.useState("");
  const [nurseImage, setNurseImage] = React.useState();

  React.useEffect(() => {
    // console.log(sameAsLocalAddress);
    if (sameAsLocalAddress === true) {
      setPatientPermanentAddress(patientLocalAddress);
    }
  }, [sameAsLocalAddress, patientLocalAddress]);

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

  // Dialog Box------------------------
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const [dialogBoxMessage, setDialogMessage] = React.useState(
    "Are you sure you want to delete?"
  );

  const handleClickOpenDialogBox = (data) => {
    setNurseIdToDelete(data?.patientId);
    setDialogMessage(`Are you sure you want to delete ${data?.patientId} ?`);
    setOpenDialogBox(true);
  };
  const handleAgreeDialogBoxToDelete = () => {
    deleteNurseById(nurseIdToDelete);
    setOpenDialogBox(false);
  };

  React.useEffect(() => {
    if (responseDeleteNurseById.isSuccess) {
      dispatch(deleteNurseChange(Math.random()));
      setSnackBarSuccessMessage(responseDeleteNurseById?.data?.message);
      handleClickSnackbarSuccess();
      handleAgreeDialogBoxToDelete();
      setNurseIdToDelete("");
    }
    if (responseDeleteNurseById.isError) {
      setSnackBarSuccessWarning(responseDeleteNurseById?.error?.data?.error);
      handleClickSnackbarWarning();
    }
  }, [responseDeleteNurseById.isSuccess, responseDeleteNurseById.isError]);

  // ----------------------------------

  // console.log(patientDateOfBirth);

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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

  // View Modal
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = (data) => {
    setNurseData(data);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => setOpenViewModal(false);

  const modalViewPatientDetails = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <div className='border-b flex gap-[1rem] py-[1rem] w-full'>
        <h3 className='font-[500]'>Nurse ID: </h3>
        <h3>{nurseData?.nurseId}</h3>
      </div>
      <div className='flex w-full'>
        <div className='w-[25%] flex flex-col items-center'>
          <img
            className='w-[200px] h-[200px] object-contain'
            src={
              nurseData.nurseImage
                ? process.env.React_App_Base_Image_Url + nurseData.nurseImage
                : placeholder
            }
            alt='nurseImage'
          />
          {/* <button className='buttonFilled w-fit'>Button</button> */}
        </div>
        <div className='w-[75%] flex flex-col gap-[10px] text-[14px]'>
          <div className='grid grid-cols-2 gap-[10px]'>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Name: </p>
              <p>{nurseData.nurseName}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Age: </p>
              <p>{nurseData.nurseAge}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Phone: </p>
              <p>{nurseData.nursePhone}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Nurse Qualification: </p>
              <p>{nurseData.nurseQualification}</p>
            </div>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Email Id: </p>
              <p className='text-[14px]'>{nurseData.nurseEmail}</p>
            </div>

            <div className='flex'>
              <p className='font-[600] w-[150px]'>Created On: </p>
              <p className='break-word text-[14px]'>
                {`${date(nurseData?.createdAt)} ${time(nurseData?.createdAt)}`}
              </p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Updated On: </p>
              <p className='break-word text-[14px]'>
                {`${date(nurseData?.updatedAt)} ${time(nurseData?.updatedAt)}`}
              </p>
            </div>
          </div>
          {/* <div className='grid grid-cols-2 gap-[10px]'>
            
          </div> */}
        </div>
      </div>
    </div>
  );

  // console.log(patientData);

  // Add Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setNurseId("");
    setNurseName("");
    setNurseEmail("");
    setNursePhone("");
    setNurseQualification("");
    setNurseImage();

    setNurseAge("");

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    setNurseId(data?.nurseId);
    setNurseName(data?.nurseName);
    setNurseEmail(data?.nurseEmail);
    setNursePhone(data?.nursePhone);
    setNurseQualification(data?.nurseQualification);
    setNurseImage();

    setNurseAge(data?.nurseAge);

    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  // Add Patient
  React.useEffect(() => {
    if (responseCreateNurse.isSuccess) {
      dispatch(createNurseChange(Math.random()));
      setSnackBarSuccessMessage(responseCreateNurse?.data?.message);
      handleClickSnackbarSuccess();
      handleClose();

      setPatientImage();
      setPatientGender("Female");
      reset();
    } else if (responseCreateNurse.isError) {
      setSnackBarSuccessWarning(responseCreateNurse?.error?.data?.error);
      handleClickSnackbarWarning();
    }
  }, [responseCreateNurse.isSuccess, responseCreateNurse.isError]);

  const handleAddPatient = (data) => {
    const patientData = {
      ...data,
      nurseAge,
      nursePhone,
      nurseImage,
      // patientDateOfBirth,
    };

    const formData = new FormData();

    formData.append("nurseName", patientData?.nurseName);
    formData.append("nurseEmail", patientData?.nurseEmail);
    formData.append("nurseAge", patientData?.nurseAge);
    formData.append("nursePhone", patientData?.nursePhone);
    formData.append("nurseQualification", patientData?.nurseQualification);
    formData.append("nurseImage", patientData?.nurseImage);

    formData.append(
      "createdBy",
      JSON.stringify({
        email: adminLoggedInData?.adminEmail,
        name: adminLoggedInData?.adminName,
        role: adminLoggedInData?.adminRole,
        id: adminLoggedInData?.adminId,
      })
    );
    formData.append(
      "editedBy",
      JSON.stringify({
        email: adminLoggedInData?.adminEmail,
        name: adminLoggedInData?.adminName,
        role: adminLoggedInData?.adminRole,
        id: adminLoggedInData?.adminId,
      })
    );

    // console.log(formData);

    createNurse(formData);
  };

  const modalADDPatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Add Nurse Information</h2>
      <form
        className='flex flex-col gap-[1rem]'
        onSubmit={handleSubmit(handleAddPatient)}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Nurse Name *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter nurse name'
              {...register("nurseName", { required: true })}
            />
            {errors.nurseName && (
              <span className='text-[red]'>This field is required</span>
            )}
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Email</label>
            <input
              className='py-[10px] outline-none border-b'
              type='email'
              placeholder='Enter nurse email'
              {...register("nurseEmail")}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Age</label>

            <input
              className='py-[10px] outline-none border-b'
              placeholder='Enter age'
              required
              value={nurseAge}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setNurseAge(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Phone *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              minLength={10}
              maxLength={10}
              value={nursePhone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setNursePhone(value);
              }}
              placeholder='Enter nurse phone number'
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Nurse Qualification</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter nurse qualification'
              {...register("nurseQualification")}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Nurse Photo</label>
            <div className='flex flex-col gap-[1rem]'>
              <input
                type='file'
                accept='image/png, image/gif, image/jpeg'
                onChange={(e) => setNurseImage(e.target.files[0])}
              />

              <img
                className='object-contain w-[100px] h-[100px]'
                src={nurseImage ? URL.createObjectURL(nurseImage) : placeholder}
                alt='placeholderimg'
              />
            </div>
          </div>
        </div>

        <div className='flex gap-[1rem] items-center'>
          <button type='submit' className='buttonFilled'>{`Save >`}</button>
          {/* <button className='buttonOutlined'>{`Save >`}</button> */}
        </div>
      </form>
    </div>
  );

  // Update Patient
  React.useEffect(() => {
    if (responseUpdateNurseById.isSuccess) {
      dispatch(updateNurseChange(Math.random()));
      setSnackBarSuccessMessage(responseUpdateNurseById?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseUpdateModal();

      setPatientImage();
      setPatientGender("Female");
      reset();
    } else if (responseUpdateNurseById.isError) {
      setSnackBarSuccessWarning(responseUpdateNurseById?.error?.data?.error);
      handleClickSnackbarWarning();
    }
  }, [responseUpdateNurseById.isSuccess, responseUpdateNurseById.isError]);

  // console.log(responseUpdatePatientById);

  const handleUpdatePatient = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nurseName", nurseName);
    formData.append("nurseEmail", nurseEmail);
    formData.append("nursePhone", nursePhone);
    formData.append("nurseQualification", nurseQualification);
    formData.append("nurseAge", nurseAge);
    formData.append("nurseImage", nurseImage);

    formData.append(
      "editedBy",
      JSON.stringify({
        email: adminLoggedInData?.adminEmail,
        name: adminLoggedInData?.adminName,
        role: adminLoggedInData?.adminRole,
        id: adminLoggedInData?.adminId,
      })
    );

    const updateData = {
      id: nurseId,
      data: formData,
    };

    // console.log(updateData);

    updateNurseById(updateData);
  };

  const modalUpdatePatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Update Nurse Information</h2>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleUpdatePatient}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Nurse Name</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              value={nurseName}
              placeholder='Enter nurse name'
              onChange={(e) => setNurseName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Email</label>
            <input
              className='py-[10px] outline-none border-b'
              type='email'
              value={nurseEmail}
              placeholder='Enter patient email'
              onChange={(e) => setNurseEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Age</label>

            <input
              className='py-[10px] outline-none border-b'
              placeholder='Enter age'
              required
              value={nurseAge}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setNurseAge(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Phone</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              minLength={10}
              maxLength={10}
              placeholder='Enter nurse phone number'
              value={nursePhone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setNursePhone(value);
              }}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Nurse Qualification</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter weight'
              value={nurseQualification}
              onChange={(e) => setNurseQualification(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Nurse Photo</label>
            <div className='flex flex-col gap-[1rem]'>
              <input
                type='file'
                accept='image/png, image/gif, image/jpeg'
                onChange={(e) => setNurseImage(e.target.files[0])}
              />

              <img
                className='object-contain w-[100px] h-[100px]'
                src={nurseImage ? URL.createObjectURL(nurseImage) : placeholder}
                alt='placeholderimg'
              />
            </div>
          </div>
        </div>

        <div className='flex gap-[1rem] items-center'>
          <button type='submit' className='buttonFilled'>{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  const [search, setSearch] = React.useState("");

  const filteredArray = nurses?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.nurseName?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const mappedBillData = filteredArray;

  const config = [
    {
      label: "Nurse ID",
      render: (list) => list.nurseId,
    },
    {
      label: "Nurse Name",
      render: (list) => list.nurseName,
    },
    {
      label: "Nurse Email",
      render: (list) => list.nurseEmail,
    },
    {
      label: "Nurse Phone",
      render: (list) => list.nursePhone,
    },
    {
      label: "Date Created",
      render: (list) => date(list.createdAt),
    },
    {
      label: "Action",
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
    return list.patientName;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>Nurses</h2>
          <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add Nurse
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by nurse name'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
        </div>
        <Table data={mappedBillData} config={config} keyFn={keyFn} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Add Nurse
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalADDPatient}
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
              Update Nurse
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalUpdatePatient}
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
                Nurse Details
              </h1>
              {/* <Link
                // onClick={handleGeneratePdf}
                target='_blank'
                to={nurseData?.patientId}
                // to={opdPatientData?.data?.mainId}
                // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                className='buttonFilled flex items-center gap-[10px]'>
                <LuHardDriveDownload />
                <p>Download</p>
              </Link> */}
            </div>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalViewPatientDetails}
          </Typography>
        </Box>
      </Modal>
      {/* Success Snackbar */}
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
      <DialogBoxToDelete
        open={openDialogBox}
        setOpen={setOpenDialogBox}
        handleAgree={handleAgreeDialogBoxToDelete}
        message={dialogBoxMessage}
      />
    </Suspense>
  );
}
