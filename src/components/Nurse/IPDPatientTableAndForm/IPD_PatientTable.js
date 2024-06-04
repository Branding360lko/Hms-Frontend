import { Suspense } from "react";
import "./IPD_PatientTable.css";

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

import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";

import placeholder from "../../../assets/imageplaceholder.png";

import * as React from "react";
import Snackbars from "../../SnackBar";
import DialogBoxToDelete from "../../DialogBoxToDelete";

import Select from "react-select";

import browserLinks from "../../../browserlinks";
import { useNavigate } from "react-router-dom";

import {
  useCreateIPDPatientMutation,
  useUpdateIPDPatientByIdMutation,
  useDeleteIPDPatientByIdMutation,
} from "../../../Store/Services/IPDPatientService";

import {
  createIpdPatientChange,
  updateIpdPatientChange,
  deleteIpdPatientChange,
} from "../../../Store/Slices/IPDPatientSlice";

import { Link } from "react-router-dom";

export default function IPD_PatientTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors } = useSelector((state) => state.DoctorState);
  const { patients } = useSelector((state) => state.PatientState);
  const { ipdPatients } = useSelector((state) => state.IPDPatientState);

  const [createIPDPatient, responseCreateIPDPatient] =
    useCreateIPDPatientMutation();
  const [updateIPDPatientById, responseUpdateIPDPatientById] =
    useUpdateIPDPatientByIdMutation();
  const [deleteIPDPatientById, responseDeleteIPDPatientById] =
    useDeleteIPDPatientByIdMutation();

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
    setMainId(data?.data?.mainId);
    setDialogMessage(`Are you sure you want to delete ${data?.data?.mainId} ?`);
    setOpenDialogBox(true);
  };
  const handleAgreeDialogBoxToDelete = () => {
    deleteIPDPatientById(mainId);
    setOpenDialogBox(false);
  };

  React.useEffect(() => {
    if (responseDeleteIPDPatientById.isSuccess) {
      dispatch(deleteIpdPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseDeleteIPDPatientById?.data?.message);
      handleClickSnackbarSuccess();
      handleAgreeDialogBoxToDelete();
      setMainId("");
    }
  }, [
    responseDeleteIPDPatientById.isSuccess,
    responseDeleteIPDPatientById.isError,
  ]);
  // ---------------------------------------------

  // Operation States
  const [ipdPatientId, setIpdPatientId] = React.useState({
    value: "",
    label: "",
  });

  const [ipdDoctorId, setIpdDoctorId] = React.useState({
    value: "",
    label: "",
  });

  const [ipdDepositAmount, setIpdDespositAmount] = React.useState();
  const [ipdPaymentMode, setIpdPaymentMode] = React.useState("UPI");
  const [ipdWardNo, setIpdWardNo] = React.useState();
  const [ipdFloorNo, setIpdFloorNo] = React.useState();
  const [ipdRoomNo, setIpdRoomNo] = React.useState();
  const [ipdBedNo, setIpdBedNo] = React.useState();
  const [ipdPatientNotes, setIpdPatientNotes] = React.useState("");
  const [submitButton, setSubmitButton] = React.useState();

  const [mainId, setMainId] = React.useState("");
  const [ipdPatientData, setIpdPatientData] = React.useState("");
  // -----------------------------------------------------------

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
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

  // Add IPD Patient
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderedPatientIDForDropdown = patients?.map((data) => {
    return {
      value: data.patientId,
      label: `${data.patientId} / ${data.patientName}`,
    };
  });

  const renderedCaseIDForDropdown = ipdPatients?.map((data) => {
    return {
      value: data.mainId,
      label: data.mainId,
    };
  });

  const renderedIPDIDForDropdown = ipdPatients?.map((data) => {
    return {
      value: data.mainId,
      label: data.mainId,
    };
  });

  const renderedDoctorIDForDropdown = doctors?.map((data) => {
    return {
      value: data.doctorId,
      label: `${data.doctorId} / ${data.doctorName}`,
    };
  });

  const renderedBedTypeForDropdown = doctors?.map((data) => {
    return {
      value: data.doctorId,
      label: `${data.doctorId} / ${data.doctorName}`,
    };
  });

  const renderedBedForDropdown = doctors?.map((data) => {
    return {
      value: data.doctorId,
      label: `${data.doctorId} / ${data.doctorName}`,
    };
  });

  React.useEffect(() => {
    if (submitButton === "add") {
      if (responseCreateIPDPatient.isSuccess) {
        dispatch(createIpdPatientChange(Math.random()));
        setSnackBarSuccessMessage(responseCreateIPDPatient?.data?.message);
        handleClickSnackbarSuccess();
        setIpdPatientId({ value: "", label: "" });

        setIpdDoctorId({ value: "", label: "" });
        setIpdDespositAmount();
        setIpdPaymentMode("UPI");
        setIpdWardNo();
        setIpdFloorNo();

        setIpdRoomNo();
        setIpdBedNo();
        setIpdPatientNotes();
        handleClose();
      }
      if (submitButton === "addPrint") {
        navigate(
          `${
            browserLinks.nurse.category
          }/${browserLinks.nurse.internalPages.ipdPatientList
            .split(" ")
            .join("")}/${responseCreateIPDPatient?.data?.data?.mainId}`
        );
      }
    } else if (responseCreateIPDPatient.isError) {
      setSnackBarSuccessWarning(responseCreateIPDPatient?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [responseCreateIPDPatient.isSuccess, responseCreateIPDPatient.isError]);

  const handleAddIPDPatient = (e) => {
    e.preventDefault();

    // const submitData = {
    //   ipdPatientId: ipdPatientId?.value,
    //   ipdCaseId: ipdCaseId?.value,
    //   ipdDoctorId: ipdDoctorId?.value,
    //   ipdId: ipdId?.value,
    //   ipdPatientBedType: ipdPatientBedType?.value,
    //   ipdPatientBed: ipdPatientBed?.value,
    //   ipdBillStatus: ipdBillStatus?.value,
    //   ipdPatientBloodPressure: ipdPatientBloodPressure,
    //   ipdPatientNotes: ipdPatientNotes,
    // };
    const submitData = {
      ipdPatientId: ipdPatientId?.value,
      ipdDoctorId: ipdDoctorId?.value,
      ipdDepositAmount: ipdDepositAmount,
      ipdPaymentMode: ipdPaymentMode,
      ipdWardNo: ipdWardNo,
      ipdFloorNo: ipdFloorNo,
      ipdRoomNo: ipdRoomNo,
      ipdBedNo: ipdBedNo,
      ipdPatientNotes: ipdPatientNotes,
    };

    // console.log(submitData);

    createIPDPatient(submitData);
  };

  const modalAddIPDPatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Add Patient</h2>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleAddIPDPatient}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>UHID *</label>
            <Select
              required
              options={renderedPatientIDForDropdown}
              onChange={setIpdPatientId}
            />
          </div>

          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Doctor Id *</label>
            <Select
              required
              options={renderedDoctorIDForDropdown}
              onChange={setIpdDoctorId}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Deposit Amount *</label>

            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter deposit amount'
              value={ipdDepositAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdDespositAmount(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Payment Mode *</label>
            <select
              required
              className='py-[10px] outline-none border-b bg-transparent'
              value={ipdPaymentMode}
              onChange={(e) => setIpdPaymentMode(e.target.value)}>
              <option>UPI</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Ward No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter ward no'
              value={ipdWardNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdWardNo(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Floor No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter floor no'
              value={ipdFloorNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdFloorNo(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Room No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter room no'
              value={ipdRoomNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdRoomNo(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bed No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter bed no'
              value={ipdBedNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdBedNo(value);
              }}
            />
          </div>
        </div>

        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Notes</label>
          <textarea
            className='border-b py-[10px] outline-none'
            placeholder='Enter notes'
            rows={3}
            value={ipdPatientNotes}
            onChange={(e) => setIpdPatientNotes(e.target.value)}
          />
        </div>
        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            className='buttonFilled'
            onClick={() => setSubmitButton("add")}>{`Save >`}</button>
          <button
            className='buttonOutlined'
            onClick={() =>
              setSubmitButton("addPrint")
            }>{`Save & Print >`}</button>
        </div>
      </form>
    </div>
  );
  // --------------------------------------------

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    // console.log(data);
    setMainId(data?.data?.mainId);
    setIpdPatientId({
      value: data?.data?.ipdPatientId,
      label: data?.data?.ipdPatientId,
    });

    setIpdDoctorId({
      value: data?.data?.ipdDoctorId,
      label: data?.data?.ipdDoctorId,
    });
    setIpdDespositAmount(data?.data?.ipdDepositAmount);
    setIpdPaymentMode(data?.data?.ipdPaymentMode);
    setIpdWardNo(data?.data?.ipdWardNo);
    setIpdFloorNo(data?.data?.ipdFloorNo);

    setIpdRoomNo(data?.data?.ipdBedNo);
    setIpdBedNo(data?.data?.ipdBedNo);
    setIpdPatientNotes(data?.data?.ipdPatientNotes);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    // setMainId("");
    // setIpdPatientId({ value: "", label: "" });
    // setIpdCaseId({ value: "", label: "" });
    // setIpdId({ value: "", label: "" });
    // setIpdDoctorId({ value: "", label: "" });
    // setIpdPatientBedType({ value: "", label: "" });
    // setIpdPatientBed({ value: "", label: "" });
    // setIpdBillStatus({ value: "", label: "" });
    // setIpdPatientBloodPressure("");
    // setIpdPatientNotes("");
    // setOpenUpdateModal(false);
    setMainId("");
    setIpdPatientId({ value: "", label: "" });

    setIpdDoctorId({ value: "", label: "" });
    setIpdDespositAmount();
    setIpdPaymentMode("UPI");
    setIpdWardNo();
    setIpdFloorNo();

    setIpdRoomNo();
    setIpdBedNo();
    setIpdPatientNotes();
    setOpenUpdateModal(false);
  };

  React.useEffect(() => {
    if (responseUpdateIPDPatientById.isSuccess) {
      dispatch(updateIpdPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseUpdateIPDPatientById?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseUpdateModal();
    } else if (responseUpdateIPDPatientById.isError) {
      setSnackBarSuccessWarning(responseUpdateIPDPatientById?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responseUpdateIPDPatientById.isSuccess,
    responseUpdateIPDPatientById.isError,
  ]);

  const handleUpdateIPDPatient = (e) => {
    e.preventDefault();

    const submitData = {
      ipdPatientId: ipdPatientId?.value,
      ipdDoctorId: ipdDoctorId?.value,
      ipdDepositAmount: ipdDepositAmount,
      ipdPaymentMode: ipdPaymentMode,
      ipdWardNo: ipdWardNo,
      ipdFloorNo: ipdFloorNo,
      ipdRoomNo: ipdRoomNo,
      ipdBedNo: ipdBedNo,
      ipdPatientNotes: ipdPatientNotes,
    };

    const updateData = {
      id: mainId,
      data: submitData,
    };

    updateIPDPatientById(updateData);

    // console.log(updateData);
  };

  const modalUpdateIPDPatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Update Patient</h2>
      <form
        className='flex flex-col gap-[1rem]'
        onSubmit={handleUpdateIPDPatient}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>UHID *</label>
            <Select
              options={renderedPatientIDForDropdown}
              onChange={setIpdPatientId}
              defaultValue={ipdPatientId}
            />
          </div>

          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Doctor ID *</label>
            <Select
              options={renderedDoctorIDForDropdown}
              onChange={setIpdDoctorId}
              defaultValue={ipdDoctorId}
            />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Deposit Amount *</label>

            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter deposit amount'
              value={ipdDepositAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdDespositAmount(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Payment Mode *</label>
            <select
              required
              className='py-[10px] outline-none border-b bg-transparent'
              value={ipdPaymentMode}
              onChange={(e) => setIpdPaymentMode(e.target.value)}>
              <option>UPI</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Ward No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter ward no'
              value={ipdWardNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdWardNo(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Floor No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter floor no'
              value={ipdFloorNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdFloorNo(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Room No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter room no'
              value={ipdRoomNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdRoomNo(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bed No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              required
              placeholder='Enter bed no'
              value={ipdBedNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdBedNo(value);
              }}
            />
          </div>
        </div>

        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Notes</label>
          <textarea
            className='border-b py-[10px] outline-none'
            placeholder='Enter notes'
            rows={3}
            value={ipdPatientNotes}
            onChange={(e) => setIpdPatientNotes(e.target.value)}
          />
        </div>
        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            className='buttonFilled'
            onClick={() => setSubmitButton("add")}>{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  // ---------------------------------------------------

  // View Modal
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = (data) => {
    setIpdPatientData(data);
    setOpenViewModal(true);
  };
  // console.log(opdPatientData);
  const handleCloseViewModal = () => setOpenViewModal(false);

  const modalViewPatientDetails = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <div className='border-b flex gap-[1rem] py-[1rem] w-full'>
        <h3 className='font-[500]'>ID: </h3>
        <h3>{ipdPatientData?.data?.mainId}</h3>
      </div>
      <div className='flex w-full'>
        <div className='w-[25%] flex flex-col items-center'>
          <img
            className='w-[200px] h-[200px] object-contain'
            src={
              ipdPatientData?.patientData?.patientImage
                ? process.env.React_App_Base_Image_Url +
                  ipdPatientData?.patientData?.patientImage
                : placeholder
            }
            alt='patientImage'
          />
          <button className='buttonFilled w-fit'>Button</button>
        </div>
        <div className='w-[75%] flex flex-col gap-[10px] text-[14px]'>
          <div className='grid grid-cols-2 gap-[10px]'>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Id: </p>
              <p>{ipdPatientData?.data?.ipdPatientId}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Doctor Id: </p>
              <p>{ipdPatientData?.data?.ipdDoctorId}</p>
            </div>

            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Name: </p>
              <p>{ipdPatientData?.patientData?.patientName}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Doctor Name: </p>
              <p>{ipdPatientData?.doctorData?.doctorName}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Blood Group: </p>
              <p>{ipdPatientData?.patientData?.patientBloodGroup}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Doctor Phone: </p>
              <p>{ipdPatientData?.doctorData?.doctorPhone}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Gender: </p>
              <p>{ipdPatientData?.patientData?.patientGender}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Case No: </p>
              <p>{ipdPatientData?.data?.ipdCaseId}</p>
            </div> */}
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient DOB: </p>
              <p>{ipdPatientData?.patientData?.patientDateOfBirth}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>OPD No: </p>
              <p>{ipdPatientData?.data?.ipdId}</p>
            </div> */}
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Phone: </p>
              <p>{ipdPatientData?.patientData?.patientPhone}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Blood Pressure: </p>
              <p>{ipdPatientData?.data?.ipdPatientBloodPressure}</p>
            </div> */}
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Bed Type: </p>
              <p>{ipdPatientData?.data?.ipdPatientBedType}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Height: </p>
              <p>{ipdPatientData?.patientData?.patientHeight}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Bill Status: </p>
              <p>
                {ipdPatientData?.data?.ipdBillStatus === true
                  ? "Paid"
                  : "Unpaid"}
              </p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Weight: </p>
              <p>{ipdPatientData?.patientData?.patientWeight}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Bed: </p>
              <p>{ipdPatientData?.data?.ipdPatientBed}</p>
            </div>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='flex flex-col'>
              <p className='font-[600] w-[150px]'>Notes: </p>
              <p className='text-[14px]'>
                {ipdPatientData?.data?.ipdPatientNotes}
              </p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Created On: </p>
              <p className='break-word text-[14px]'>
                {`${date(ipdPatientData?.data?.createdAt)} ${time(
                  ipdPatientData?.data?.createdAt
                )}`}
              </p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Updated On: </p>
              <p className='break-word text-[14px]'>
                {`${date(ipdPatientData?.data?.updatedAt)} ${time(
                  ipdPatientData?.data?.updatedAt
                )}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // ---------------
  // console.log(ipdPatientData);
  const [search, setSearch] = React.useState("");

  const filteredArray = ipdPatients?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.mainId?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const mappedBillData = filteredArray?.map((data, index) => {
    const filteredPatientData = patients?.find(
      (patient) => data?.ipdPatientId === patient?.patientId
    );
    const filteredDoctorData = doctors?.find(
      (doctor) => doctor?.doctorId === data?.ipdDoctorId
    );
    return {
      data,
      patientData: filteredPatientData,
      doctorData: filteredDoctorData,
    };
  });

  const config = [
    {
      label: "Reg No.",
      render: (list) => list?.data?.mainId,
    },
    {
      label: "Patient Name",
      render: (list) => list?.patientData?.patientName,
    },
    {
      label: "Doctor Name",
      render: (list) => list?.doctorData?.doctorName,
    },
    {
      label: "Date",
      render: (list) => date(list?.data?.createdAt),
    },
    {
      label: "Bed",
      render: (list) => list?.data?.ipdPatientBed,
    },
    {
      label: "Bill Status",
      render: (list) => (
        <>
          {list?.data?.ipdBillStatus === true ? (
            <p className='bg-[#B5FFBC] font-[600] rounded-lg p-[4px]'>Paid</p>
          ) : (
            <p className='bg-[#F76D71] font-[600] rounded-lg p-[4px]'>Unpaid</p>
          )}
        </>
      ),
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
    return list.mainId;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>IPD Patients</h2>
          <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add IPD Patients
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
              Add IPD Patient
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalAddIPDPatient}
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
              Update IPD Patient
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalUpdateIPDPatient}
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
                IPD Patient Details
              </h1>
              <Link
                // onClick={handleGeneratePdf}
                target='_blank'
                to={ipdPatientData?.data?.mainId}
                // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                className='buttonFilled flex items-center gap-[10px]'>
                <LuHardDriveDownload />
                <p>Download</p>
              </Link>
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
