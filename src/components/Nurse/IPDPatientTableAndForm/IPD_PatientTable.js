import { Suspense } from "react";
import "./IPD_PatientTable.css";

import Table from "../../Table";

import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaBed } from "react-icons/fa";

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
  useAddIPDPatientBalanceByIdMutation,
  useIpdPatientDischargeRequestMutation,
  useIpdPatientFinalBalanceCalGetAllMutation,
  useIpdPatientFinalDischargeByIdMutation,
} from "../../../Store/Services/IPDPatientService";

import {
  createIpdPatientChange,
  updateIpdPatientChange,
  deleteIpdPatientChange,
} from "../../../Store/Slices/IPDPatientSlice";

// Add Bed Imports

import BedSelector from "../AddBedSelector/AddBedSelector";

import { Link } from "react-router-dom";
import { useUpdateBedAvailabilityMutation } from "../../../Store/Services/BedService";

import PatientBedChargesCal from "../../Receptionist/PatientBedChargesCal/PatientBedChargesCal";
import AddOtherCharges from "../../Receptionist/AddOtherCharges/AddOtherCharges";
import {
  useGetIPDPatientBalanceByIdQuery,
  useUpdateIPDPatientLabTestChargesByIdMutation,
  useUpdateIPDPatientMedicalChargesByIdMutation,
} from "../../../Store/Services/IPDPatientBalanceService";
import {
  updateIpdPatientLabTestChargesChange,
  updateIpdPatientMedicalChargesChange,
} from "../../../Store/Slices/IPDPatientBalanceSlice";
import IpdChargesShowcase from "../../Receptionist/IpdChargesShowcase/IpdChargesShowcase";
import axios from "axios";

export default function IPD_PatientTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nurses } = useSelector((state) => state.NurseState);
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

  const [ipdNurseId, setIpdNurseId] = React.useState({
    value: "",
    label: "",
  });

  // View Modal State

  const [openViewModal, setOpenViewModal] = React.useState(false);

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

  // Add Bed Form Open State and Logic
  const [addBedFormOpen, setAddBedFormOpen] = React.useState(false);
  const [selectedBed, setSelectedBed] = React.useState(null);

  const [updatedBed, setUpdatedBed] = React.useState(null);
  const [previousBed, setPreviousBed] = React.useState(null);

  const [currentPatientBed, setCurrentPatientBed] = React.useState(null);

  const [currentPatientBedCharges, setCurrentPatientBedCharges] =
    React.useState(0);

  const [updateBedAvailability, responseUpdateBedAvailability] =
    useUpdateBedAvailabilityMutation();

  // console.log("selectedBed:", selectedBed);

  const { beds } = useSelector((state) => state.BedState);

  // console.log("beds in ipd:", beds);

  // IPD ADD BALANCE

  const [openAddBalanceModal, setOpenAddBalanceModal] = React.useState(false);

  const [ipdAddBalanceData, setIpdAddBalanceData] = React.useState({
    ipdPatientMainId: null,
  });

  const [addIpdPatientBalance, responeAddIpdPatientBalance] =
    useAddIPDPatientBalanceByIdMutation();

  const updateIpdBalanceState = (newState) => {
    setIpdAddBalanceData((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  function handleAddBedFormOpen(e) {
    e.preventDefault();

    setAddBedFormOpen(true);
  }

  const handleBedSelect = (bed) => {
    setSelectedBed(bed);
  };

  const handleUpdatedBedSelect = (bed) => {
    setUpdatedBed(bed);
  };

  // Add Medical Charges State and Logic

  const [addMedicalCharges, responseAddMedicalCharges] =
    useUpdateIPDPatientMedicalChargesByIdMutation();

  const handleAddMedicalCharges = (updateData) => {
    console.log("updateData:", updateData);
    addMedicalCharges(updateData);
  };

  React.useEffect(() => {
    if (responseAddMedicalCharges.isSuccess) {
      dispatch(updateIpdPatientMedicalChargesChange(Math.random()));

      setSnackBarSuccessMessage(responseAddMedicalCharges?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseUpdateModal();
    } else if (responseAddMedicalCharges.isError) {
      setSnackBarSuccessWarning(responseAddMedicalCharges?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [responseAddMedicalCharges.isSuccess, responseAddMedicalCharges.isError]);

  // Add Lab Charges State and Logic

  const [addLabCharges, responseAddLabCharges] =
    useUpdateIPDPatientLabTestChargesByIdMutation();

  const handleAddLabCharges = (updateData) => {
    addLabCharges(updateData);
  };

  React.useEffect(() => {
    if (responseAddLabCharges.isSuccess) {
      dispatch(updateIpdPatientLabTestChargesChange(Math.random()));

      setSnackBarSuccessMessage(responseAddLabCharges?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseUpdateModal();
    } else if (responseAddLabCharges.isError) {
      setSnackBarSuccessWarning(responseAddLabCharges?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [responseAddLabCharges.isSuccess, responseAddLabCharges.isError]);

  // Ipd Patient Balance Details

  const [ipdPatientCurrentBalance, setIpdPatientCurrentBalance] =
    React.useState(null);

  // const [ipdPatientTotalDeposit, setIpdPatientTotalDeposit] =
  //   React.useState(null);

  // const [ipdPatientTotalExpenditure, setIpdPatientTotalExpenditure] =
  //   React.useState(null);

  // const [ipdPatientRemainingBalance, setIpdPatientRemainingBalance] =
  //   React.useState(null);

  const [ipdPatientNegativeBalanceAlert, setIpdPatientNegativeBalanceAlert] =
    React.useState(false);

  // const calculateIpdPatientBalances = () => {
  //   if (ipdPatientCurrentBalance) {
  //     // Calculate total deposit
  //     const lastDeposit =
  //       ipdPatientCurrentBalance?.data?.balance[
  //         ipdPatientCurrentBalance?.data?.balance?.length - 1
  //       ];
  //     const totalDepositAmount = Number(lastDeposit?.totalBalance || 0);
  //     setIpdPatientTotalDeposit(totalDepositAmount);

  //     console.log("totalDepositAmount:", totalDepositAmount);

  //     // Calculate total expenditure
  //     const totalExpenditure = Number(ipdPatientCurrentBalance?.total || 0);
  //     setIpdPatientTotalExpenditure(totalExpenditure);

  //     console.log("totalExpenditure:", totalExpenditure);

  //     // Calculate remaining balance
  //     const remainingBalance = ipdPatientCurrentBalance?.remainingBalance;
  //     setIpdPatientRemainingBalance(remainingBalance);
  //     console.log("remainingBalance:", remainingBalance);

  //     // Set negative balance alert
  //     setIpdPatientNegativeBalanceAlert(remainingBalance < 0);
  //   }
  // };
  // React.useEffect(() => {
  //   calculateIpdPatientBalances();
  // }, [ipdPatientCurrentBalance, currentPatientBedCharges, openViewModal]);

  // Discharge Function and Logic

  const [ipdPatientDischargeState, setIpdPatientDischargeState] =
    React.useState({
      dischargeNurseRequestSent:
        ipdPatientData?.data?.ipdPatientNurseRequestForDischarge,
      dischargeDoctorRequestSent:
        ipdPatientData?.data?.ipdPatientDoctorRequestForDischarge,

      nurseUpdate: ipdPatientData?.data?.ipdPatientNurseConfirmation,
      doctorUpdate: ipdPatientData?.data?.ipdPatientDoctorConfirmation,

      discharged: ipdPatientData?.data?.ipdPatientDischarged,
    });
  const [ipdPatientDischargeReq, responseIpdPatientDischargeReq] =
    useIpdPatientDischargeRequestMutation();

  React.useEffect(() => {
    if (responseIpdPatientDischargeReq.isSuccess) {
      dispatch(createIpdPatientChange(Math.random()));
      updateIpdPatientDischargeState({
        dischargeNurseRequestSent: true,
        dischargeDoctorRequestSent: true,
      });
      setSnackBarSuccessMessage(responseIpdPatientDischargeReq?.data?.message);
      handleClickSnackbarSuccess();
    } else if (responseIpdPatientDischargeReq.isError) {
      setSnackBarSuccessWarning(responseIpdPatientDischargeReq?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responseIpdPatientDischargeReq.isSuccess,
    responseIpdPatientDischargeReq.isError,
  ]);

  const updateIpdPatientDischargeState = (updatedState) => {
    setIpdPatientDischargeState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };

  React.useEffect(() => {
    updateIpdPatientDischargeState({
      dischargeNurseRequestSent:
        ipdPatientData?.data?.ipdPatientNurseRequestForDischarge,
      dischargeDoctorRequestSent:
        ipdPatientData?.data?.ipdPatientDoctorRequestForDischarge,

      nurseUpdate: ipdPatientData?.data?.ipdPatientNurseConfirmation,
      doctorUpdate: ipdPatientData?.data?.ipdPatientDoctorConfirmation,

      discharged: ipdPatientData?.data?.ipdPatientDischarged,
    });
  }, [ipdPatientData]);

  const handleDischargeButtonClick = (e) => {
    e.preventDefault();
    ipdPatientDischargeReq(ipdPatientData?.data?.mainId);

    ipdPatientDischargeLoaderToggle();
    // updateIpdPatientDischargeState({ dischargeRequestSent: true });
  };

  const [ipdPatientDischargeLoader, setIpdPatientDischargeLoader] =
    React.useState(false);

  const ipdPatientDischargeLoaderToggle = () => {
    setIpdPatientDischargeLoader(true);

    setTimeout(() => {
      setIpdPatientDischargeLoader(false);
    }, 2000);
  };

  console.log("ipdPatientDischargeState:", ipdPatientDischargeState);

  // Final Discharge

  const [ipdPatientFinalDischargeReq, responseIpdPatientFinalDischargeReq] =
    useIpdPatientFinalDischargeByIdMutation();

  const handleFinalIpdDischarge = () => {
    ipdPatientFinalDischargeReq(ipdPatientData.data.mainId);
    ipdPatientDischargeLoaderToggle();
  };

  React.useEffect(() => {
    if (responseIpdPatientFinalDischargeReq.isSuccess) {
      dispatch(createIpdPatientChange(Math.random()));
      updateIpdPatientDischargeState({
        discharged: true,
      });

      console.log(
        "Ipd Patient Discharge successful:",
        responseIpdPatientFinalDischargeReq
      );

      setSnackBarSuccessMessage(
        responseIpdPatientFinalDischargeReq?.data?.message
      );
      handleClickSnackbarSuccess();
    } else if (responseIpdPatientFinalDischargeReq.isError) {
      setSnackBarSuccessWarning(
        responseIpdPatientFinalDischargeReq?.error?.data
      );
      handleClickSnackbarWarning();
    }
  }, [
    responseIpdPatientFinalDischargeReq.isSuccess,
    responseIpdPatientFinalDischargeReq.isError,
  ]);

  // const bedData = [
  //   // Floor 1
  //   { bdId: "1", floorNo: 1, bedType: "pvt", availability: false },
  //   { bdId: "2", floorNo: 1, bedType: "dlx", availability: true },
  //   { bdId: "3", floorNo: 1, bedType: "sem", availability: true },
  //   { bdId: "4", floorNo: 1, bedType: "gen", availability: false },
  //   { bdId: "5", floorNo: 1, bedType: "pvt", availability: true },
  //   { bdId: "6", floorNo: 1, bedType: "sem", availability: false },
  //   { bdId: "7", floorNo: 1, bedType: "dlx", availability: true },
  //   { bdId: "8", floorNo: 1, bedType: "gen", availability: false },
  //   { bdId: "9", floorNo: 1, bedType: "pvt", availability: false },
  //   { bdId: "10", floorNo: 1, bedType: "sem", availability: true },
  //   { bdId: "11", floorNo: 1, bedType: "dlx", availability: true },
  //   { bdId: "12", floorNo: 1, bedType: "gen", availability: true },
  //   { bdId: "13", floorNo: 1, bedType: "pvt", availability: false },
  //   { bdId: "14", floorNo: 1, bedType: "sem", availability: true },
  //   { bdId: "15", floorNo: 1, bedType: "dlx", availability: false },
  //   { bdId: "16", floorNo: 1, bedType: "gen", availability: true },
  //   { bdId: "17", floorNo: 1, bedType: "pvt", availability: true },
  //   { bdId: "18", floorNo: 1, bedType: "sem", availability: true },
  //   { bdId: "19", floorNo: 1, bedType: "dlx", availability: false },
  //   { bdId: "20", floorNo: 1, bedType: "gen", availability: false },

  //   // Floor 2
  //   { bdId: "21", floorNo: 2, bedType: "pvt", availability: false },
  //   { bdId: "22", floorNo: 2, bedType: "dlx", availability: true },
  //   { bdId: "23", floorNo: 2, bedType: "sem", availability: true },
  //   { bdId: "24", floorNo: 2, bedType: "gen", availability: false },
  //   { bdId: "25", floorNo: 2, bedType: "pvt", availability: true },
  //   { bdId: "26", floorNo: 2, bedType: "sem", availability: false },
  //   { bdId: "27", floorNo: 2, bedType: "dlx", availability: true },
  //   { bdId: "28", floorNo: 2, bedType: "gen", availability: false },
  //   { bdId: "29", floorNo: 2, bedType: "pvt", availability: false },
  //   { bdId: "30", floorNo: 2, bedType: "sem", availability: true },
  //   { bdId: "31", floorNo: 2, bedType: "dlx", availability: true },
  //   { bdId: "32", floorNo: 2, bedType: "gen", availability: true },
  //   { bdId: "33", floorNo: 2, bedType: "pvt", availability: false },
  //   { bdId: "34", floorNo: 2, bedType: "sem", availability: true },
  //   { bdId: "35", floorNo: 2, bedType: "dlx", availability: false },
  //   { bdId: "36", floorNo: 2, bedType: "gen", availability: true },
  //   { bdId: "37", floorNo: 2, bedType: "pvt", availability: true },
  //   { bdId: "38", floorNo: 2, bedType: "sem", availability: true },
  //   { bdId: "39", floorNo: 2, bedType: "dlx", availability: false },
  //   { bdId: "40", floorNo: 2, bedType: "gen", availability: false },

  //   // Floor 3
  //   { bdId: "41", floorNo: 3, bedType: "pvt", availability: false },
  //   { bdId: "42", floorNo: 3, bedType: "dlx", availability: true },
  //   { bdId: "43", floorNo: 3, bedType: "sem", availability: true },
  //   { bdId: "44", floorNo: 3, bedType: "gen", availability: false },
  //   { bdId: "45", floorNo: 3, bedType: "pvt", availability: true },
  //   { bdId: "46", floorNo: 3, bedType: "sem", availability: false },
  //   { bdId: "47", floorNo: 3, bedType: "dlx", availability: true },
  //   { bdId: "48", floorNo: 3, bedType: "gen", availability: false },
  //   { bdId: "49", floorNo: 3, bedType: "pvt", availability: false },
  //   { bdId: "50", floorNo: 3, bedType: "sem", availability: true },
  //   { bdId: "51", floorNo: 3, bedType: "dlx", availability: true },
  //   { bdId: "52", floorNo: 3, bedType: "gen", availability: true },
  //   { bdId: "53", floorNo: 3, bedType: "pvt", availability: false },
  //   { bdId: "54", floorNo: 3, bedType: "sem", availability: true },
  //   { bdId: "55", floorNo: 3, bedType: "dlx", availability: false },
  //   { bdId: "56", floorNo: 3, bedType: "gen", availability: true },
  //   { bdId: "57", floorNo: 3, bedType: "pvt", availability: true },
  //   { bdId: "58", floorNo: 3, bedType: "sem", availability: true },
  //   { bdId: "59", floorNo: 3, bedType: "dlx", availability: false },
  //   { bdId: "60", floorNo: 3, bedType: "gen", availability: false },

  //   // Floor 4
  //   { bdId: "61", floorNo: 4, bedType: "pvt", availability: false },
  //   { bdId: "62", floorNo: 4, bedType: "dlx", availability: true },
  //   { bdId: "63", floorNo: 4, bedType: "sem", availability: true },
  //   { bdId: "64", floorNo: 4, bedType: "gen", availability: false },
  //   { bdId: "65", floorNo: 4, bedType: "pvt", availability: true },
  //   { bdId: "66", floorNo: 4, bedType: "sem", availability: false },
  //   { bdId: "67", floorNo: 4, bedType: "dlx", availability: true },
  //   { bdId: "68", floorNo: 4, bedType: "gen", availability: false },
  //   { bdId: "69", floorNo: 4, bedType: "pvt", availability: false },
  //   { bdId: "70", floorNo: 4, bedType: "sem", availability: true },
  //   { bdId: "71", floorNo: 4, bedType: "dlx", availability: true },
  //   { bdId: "72", floorNo: 4, bedType: "gen", availability: true },
  //   { bdId: "73", floorNo: 4, bedType: "pvt", availability: false },
  //   { bdId: "74", floorNo: 4, bedType: "sem", availability: true },
  //   { bdId: "75", floorNo: 4, bedType: "dlx", availability: false },
  //   { bdId: "76", floorNo: 4, bedType: "gen", availability: true },
  //   { bdId: "77", floorNo: 4, bedType: "pvt", availability: true },
  //   { bdId: "78", floorNo: 4, bedType: "sem", availability: true },
  //   { bdId: "79", floorNo: 4, bedType: "dlx", availability: false },
  //   { bdId: "80", floorNo: 4, bedType: "gen", availability: false },
  // ];

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

  const renderedNursesIDForDropdown = nurses?.map((data) => {
    return {
      value: data.nurseId,
      label: `${data.nurseId} / ${data.nurseName}`,
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
        setIpdNurseId({ value: "", label: "" });
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
      ipdNurseId: ipdNurseId?.value,
      ipdDepositAmount: ipdDepositAmount,
      ipdPaymentMode: ipdPaymentMode,
      // ipdWardNo: ipdWardNo,
      ipdFloorNo: selectedBed?.bedFloor,
      // ipdRoomNo: ipdRoomNo,
      ipdBedNo: selectedBed?.bedId,
      ipdPatientNotes: ipdPatientNotes,
    };

    const bedAvailabilityData = {
      bedId: selectedBed.bedId,
      data: { bedAvailableOrNot: false },
    };

    updateBedAvailability(bedAvailabilityData);

    // console.log(submitData);

    createIPDPatient(submitData);
  };

  // console.log(responseUpdateBedAvailability);

  const modalAddIPDPatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Add Patient</h2>
      <form className="flex flex-col gap-[1rem]" onSubmit={handleAddIPDPatient}>
        <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">UHID *</label>
            <Select
              required
              options={renderedPatientIDForDropdown}
              onChange={setIpdPatientId}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Doctor Id *</label>
            <Select
              required
              options={renderedDoctorIDForDropdown}
              onChange={setIpdDoctorId}
            />
          </div>
          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Nurse Id *</label>
            <Select
              required
              options={renderedNursesIDForDropdown}
              onChange={setIpdNurseId}
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Deposit Amount *</label>

            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter deposit amount"
              value={ipdDepositAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdDespositAmount(value);
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Payment Mode *</label>
            <select
              required
              className="py-[10px] outline-none border-b bg-transparent"
              value={ipdPaymentMode}
              onChange={(e) => setIpdPaymentMode(e.target.value)}
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
          </div>
          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Ward No. *</label>
            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter ward no"
              value={ipdWardNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdWardNo(value);
              }}
            />
          </div> */}
          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Floor No. *</label>
            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter floor no"
              value={ipdFloorNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdFloorNo(value);
              }}
            />
          </div> */}
          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Room No. *</label>
            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter room no"
              value={ipdRoomNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdRoomNo(value);
              }}
            />
          </div> */}
          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Bed No. *</label>
            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter bed no"
              value={ipdBedNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdBedNo(value);
              }}
            />
          </div> */}
        </div>
        {/* // Add Bed */}
        <div>
          {addBedFormOpen === false ? (
            <button
              onClick={(e) => handleAddBedFormOpen(e)}
              className=" flex justify-center items-start w-[100px] gap-1 bg-green-500 py-1 text-white
             hover:text-black rounded-md "
            >
              <FaBed className=" text-3xl " /> +
            </button>
          ) : (
            <div className=" flex flex-col justify-center items-start gap-5">
              <h2>Select A Bed</h2>
              <div>
                <BedSelector beds={beds} handleBedSelect={handleBedSelect} />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px]">Notes</label>
          <textarea
            className="border-b py-[10px] outline-none"
            placeholder="Enter notes"
            rows={3}
            value={ipdPatientNotes}
            onChange={(e) => setIpdPatientNotes(e.target.value)}
          />
        </div>
        <div className="flex gap-[1rem] items-center">
          <button
            type="submit"
            className="buttonFilled"
            onClick={() => setSubmitButton("add")}
          >{`Save >`}</button>
          <button
            className="buttonOutlined"
            onClick={() => setSubmitButton("addPrint")}
          >{`Save & Print >`}</button>
        </div>
      </form>
    </div>
  );
  // --------------------------------------------

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    // console.log("data in update modal:", data);
    const currentBedId = data.data.ipdBedNo;
    const currentBedData = beds.find((bed) => bed.bedId === currentBedId);

    setPreviousBed(currentBedData);

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
      setPreviousBed(null);
      setUpdatedBed(null);

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
      // ipdWardNo: ipdWardNo,
      ipdFloorNo: updatedBed?.bedFloor,
      // ipdRoomNo: ipdRoomNo,
      ipdBedNo: updatedBed?.bedId,
      ipdPatientNotes: ipdPatientNotes,
    };

    const updateData = {
      id: mainId,
      data: submitData,
    };

    updateIPDPatientById(updateData);

    if (updatedBed) {
      if (updatedBed?.bedId !== previousBed.bedId) {
        handleIpdPatientBedUpdate();
      }
    }

    // console.log(updateData);
  };

  // console.log("updatedBed:", updatedBed);
  // console.log("previousBed:", previousBed);
  // console.log("previousBed.bedId:", previousBed?.bedId);

  const handleIpdPatientBedUpdate = () => {
    // console.log("inside handleBedUpdate");
    // console.log("previousBed.bedId:", previousBed?.bedId);
    const previousBedAvailData = {
      bedId: previousBed.bedId,
      data: { bedAvailableOrNot: true },
    };

    updateBedAvailability(previousBedAvailData);

    const updatedBedAvailabilityData = {
      bedId: updatedBed.bedId,
      data: { bedAvailableOrNot: false },
    };

    updateBedAvailability(updatedBedAvailabilityData);
  };

  // console.log("ipdPatientData in patientTable:", ipdPatientData);
  const modalUpdateIPDPatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Update Patient</h2>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={handleUpdateIPDPatient}
      >
        <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">UHID *</label>
            <Select
              options={renderedPatientIDForDropdown}
              onChange={setIpdPatientId}
              defaultValue={ipdPatientId}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Doctor ID *</label>
            <Select
              options={renderedDoctorIDForDropdown}
              onChange={setIpdDoctorId}
              defaultValue={ipdDoctorId}
            />
          </div>

          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Deposit Amount *</label>

            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter deposit amount"
              value={ipdDepositAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdDespositAmount(value);
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Payment Mode *</label>
            <select
              required
              className="py-[10px] outline-none border-b bg-transparent"
              value={ipdPaymentMode}
              onChange={(e) => setIpdPaymentMode(e.target.value)}
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
          </div> */}

          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Ward No. *</label>
            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter ward no"
              value={ipdWardNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdWardNo(value);
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Floor No. *</label>
            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter floor no"
              value={ipdFloorNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdFloorNo(value);
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Room No. *</label>
            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter room no"
              value={ipdRoomNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdRoomNo(value);
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Bed No. *</label>
            <input
              className="py-[10px] outline-none border-b"
              required
              placeholder="Enter bed no"
              value={ipdBedNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setIpdBedNo(value);
              }}
            />
          </div> */}
        </div>
        <BedSelector
          beds={beds}
          handleBedSelect={handleUpdatedBedSelect}
          ipdPtientEdit={true}
        />

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px]">Notes</label>
          <textarea
            className="border-b py-[10px] outline-none"
            placeholder="Enter notes"
            rows={3}
            value={ipdPatientNotes}
            onChange={(e) => setIpdPatientNotes(e.target.value)}
          />
        </div>
        <div className="flex gap-[1rem] items-center">
          <button
            type="submit"
            className="buttonFilled"
            onClick={() => setSubmitButton("add")}
          >{`Save >`}</button>
        </div>
      </form>
      <br />
      <div className=" flex flex-col justify-center items-start gap-5">
        <h2>Add Medical Charges </h2>
        <AddOtherCharges
          handleAddMedicalCharges={handleAddMedicalCharges}
          mainId={mainId}
        />
        <br />

        <h2>Add Lab Test Charges</h2>

        <AddOtherCharges
          handleAddMedicalCharges={handleAddLabCharges}
          mainId={mainId}
        />
      </div>
    </div>
  );

  // ---------------------------------------------------

  // View Modal

  const handleOpenViewModal = (data) => {
    setIpdPatientData(data);
    if (data?.balanceData?.remainingBalance < 0) {
      setIpdPatientNegativeBalanceAlert(true);
    } else {
      setIpdPatientNegativeBalanceAlert(false);
    }
    // const currentPatientBed = beds.find(
    //   (bed) => bed?.bedId === ipdPatientData?.data?.ipdBedNo
    // );

    // setCurrentPatientBed(currentPatientBed);
    setOpenViewModal(true);
  };
  React.useEffect(() => {
    const currentPatientBed = beds.find(
      (bed) => bed?.bedId === ipdPatientData?.data?.ipdBedNo
    );

    setCurrentPatientBed(currentPatientBed);
  }, [handleOpenViewModal]);

  // console.log(opdPatientData);
  const handleCloseViewModal = () => setOpenViewModal(false);

  // console.log("currentPatientBed:", currentPatientBed);

  // console.log("ipdPatientCurrentBalance:", ipdPatientCurrentBalance);

  const modalViewPatientDetails = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <div className="border-b flex gap-[1rem] py-[1rem] w-full">
        <h3 className="font-[500]">ID: </h3>
        <h3>{ipdPatientData?.data?.mainId}</h3>
      </div>
      <div className=" flex justify-center items-center">
        <div className="border-b flex gap-[1rem] py-[1rem] w-full">
          <h3 className="font-[500]">Total Deposit: </h3>
          <h3>
            Rs.
            {ipdPatientData?.balanceData?.totalAddedBalance
              ? ipdPatientData?.balanceData?.totalAddedBalance
              : "Not Found"}
          </h3>
        </div>
        <div className="border-b flex gap-[1rem] py-[1rem] w-full">
          <h3 className="font-[500]">Total Expense: </h3>
          <h3>
            Rs.
            {ipdPatientData?.balanceData?.finalTotal
              ? ipdPatientData?.balanceData?.finalTotal
              : "Not Found"}
          </h3>
        </div>
        <div
          className={`border-b flex gap-[1rem] py-[1rem] w-full ${
            ipdPatientNegativeBalanceAlert ? "text-red-500" : ""
          }`}
        >
          <h3 className="font-[500]">Remaining Balance: </h3>
          <h3>
            Rs.
            {ipdPatientData?.balanceData?.remainingBalance
              ? ipdPatientData?.balanceData?.remainingBalance
              : "Not Found"}
          </h3>
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-[25%] flex flex-col items-center">
          <img
            className="w-[200px] h-[200px] object-contain"
            src={
              ipdPatientData?.patientData?.patientImage
                ? process.env.React_App_Base_Image_Url +
                  ipdPatientData?.patientData?.patientImage
                : placeholder
            }
            alt="patientImage"
          />
          {/* <button className="buttonFilled w-fit">Button</button> */}
        </div>
        <div className="w-[75%] flex flex-col gap-[10px] text-[14px]">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Id: </p>
              <p>{ipdPatientData?.data?.ipdPatientId}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Id: </p>
              <p>{ipdPatientData?.data?.ipdDoctorId}</p>
            </div>

            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Name: </p>
              <p>{ipdPatientData?.patientData?.patientName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Name: </p>
              <p>{ipdPatientData?.doctorData?.doctorName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Blood Group: </p>
              <p>{ipdPatientData?.patientData?.patientBloodGroup}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Phone: </p>
              <p>{ipdPatientData?.doctorData?.doctorPhone}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Gender: </p>
              <p>{ipdPatientData?.patientData?.patientGender}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Case No: </p>
              <p>{ipdPatientData?.data?.ipdCaseId}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient DOB: </p>
              <p>{ipdPatientData?.patientData?.patientDateOfBirth}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>OPD No: </p>
              <p>{ipdPatientData?.data?.ipdId}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Phone: </p>
              <p>{ipdPatientData?.patientData?.patientPhone}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Blood Pressure: </p>
              <p>{ipdPatientData?.data?.ipdPatientBloodPressure}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Bed No: </p>
              <p>{currentPatientBed?.bedNumber}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Bed Floor: </p>
              <p>{currentPatientBed?.bedFloor}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Height: </p>
              <p>{ipdPatientData?.patientData?.patientHeight}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Bill Status: </p>
              <p>
                {ipdPatientData?.data?.ipdBillStatus === true
                  ? "Paid"
                  : "Unpaid"}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Weight: </p>
              <p>{ipdPatientData?.patientData?.patientWeight}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Bed: </p>
              <p>{ipdPatientData?.data?.ipdPatientBed}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col">
              <p className="font-[600] w-[150px]">Notes: </p>
              <p className="text-[14px]">
                {ipdPatientData?.data?.ipdPatientNotes}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Created On: </p>
              <p className="break-word text-[14px]">
                {`${date(ipdPatientData?.data?.createdAt)} ${time(
                  ipdPatientData?.data?.createdAt
                )}`}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Updated On: </p>
              <p className="break-word text-[14px]">
                {`${date(ipdPatientData?.data?.updatedAt)} ${time(
                  ipdPatientData?.data?.updatedAt
                )}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <IpdChargesShowcase
        currentPatientBed={currentPatientBed}
        ipdPatientData={ipdPatientData}
        setIpdPatientCurrentBalance={setIpdPatientCurrentBalance}
        setCurrentPatientBedCharges={setCurrentPatientBedCharges}
        openViewModal={openViewModal}
      />
    </div>
  );
  // ---------------
  console.log(ipdPatientData);
  const [search, setSearch] = React.useState("");

  const apiBaseUrl = process.env.React_App_Base_url;

  const [ipdPatientsFinalBalance, setIpdPatientsFinalBalance] =
    React.useState(null);

  const handleIpdPatientsFinalBalanceCall = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}IPDPatient-Balance-GET-ALL`
      );
      // console.log(response);

      if (response?.request?.status === 200) {
        setIpdPatientsFinalBalance(response.data.balanceCalculation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("ipdPatientsFinalBalance:", ipdPatientsFinalBalance);

  React.useEffect(() => {
    handleIpdPatientsFinalBalanceCall();
  }, []);

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

    // console.log("data inside mappedBilledData:", data);

    const filteredFinalBalance = ipdPatientsFinalBalance?.find(
      (balance) => balance.ipdPatientRegId === data.mainId
    );
    return {
      data,
      patientData: filteredPatientData,
      doctorData: filteredDoctorData,
      balanceData: filteredFinalBalance,
    };
  });

  console.log("mappedBillData:", mappedBillData);

  // Add balance Modal Funtiontionality

  const handleAddBalanceModalOpen = (list) => {
    const currentIpdPatientMainId = list.data.mainId;
    updateIpdBalanceState({ ipdPatientMainId: currentIpdPatientMainId });

    setOpenAddBalanceModal(true);
  };

  const handleAddBalanceModalClose = () => {
    setOpenAddBalanceModal(false);

    setIpdDespositAmount(0);

    updateIpdBalanceState({
      ipdPatientMainId: null,
    });
  };

  const handleAddBalanceFormSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      ipdPatientMainId: ipdAddBalanceData.ipdPatientMainId,
      data: {
        ipdAddedAmount: Number(ipdDepositAmount),
        ipdPaymentMode: ipdPaymentMode,
      },
    };

    console.log("updatedData:", updateData);

    addIpdPatientBalance(updateData);
  };

  React.useEffect(() => {
    if (responeAddIpdPatientBalance.isSuccess) {
      dispatch(updateIpdPatientChange(Math.random()));
      updateIpdBalanceState({
        ipdPatientMainId: null,
      });

      setSnackBarSuccessMessage(responeAddIpdPatientBalance?.data?.message);
      handleClickSnackbarSuccess();
      handleAddBalanceModalClose();
    } else if (responeAddIpdPatientBalance.isError) {
      setSnackBarSuccessWarning(responeAddIpdPatientBalance?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responeAddIpdPatientBalance.isSuccess,
    responeAddIpdPatientBalance.isError,
  ]);

  //////////////

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
      render: (list) =>
        beds.find((bed) => bed.bedId === list?.data?.ipdBedNo)?.bedNumber,
    },
    {
      label: "Total Deposit",
      render: (list) => (
        <>
          <div className="">
            <h2
            // className={`${
            //   list.data.ipdDepositAmount > 5000 ? "" : " text-red-500"
            // }`}
            >
              ₹ {list?.data?.ipdDepositAmount}
            </h2>
          </div>
          <button
            onClick={() => handleAddBalanceModalOpen(list)}
            className=" bg-blue-400 hover:bg-blue-500 text-white font-semibold px-2 py-1 rounded-md"
          >
            Add Balance
          </button>
        </>
      ),
    },
    {
      label: "Remaining Balance",
      render: (list) => (
        <>
          <div className="">
            <h2
              className={`${
                list.balanceData?.remainingBalance > 5000 ? "" : " text-red-500"
              }`}
            >
              ₹ {list?.balanceData?.remainingBalance}
            </h2>
          </div>
          {list.balanceData?.remainingBalance < 5000 &&
          list.balanceData?.remainingBalance > 0 ? (
            <button
              disabled
              className=" bg-red-500 text-white font-semibold px-2 py-1 rounded-md"
            >
              Low Balance
            </button>
          ) : list.balanceData?.remainingBalance < 0 ? (
            <button
              disabled
              className=" bg-red-500 text-white font-semibold px-2 py-1 rounded-md"
            >
              Negative Balance
            </button>
          ) : (
            ""
          )}
        </>
      ),
    },
    // {
    //   label: "Remaining Balance",
    //   render: (list) => (
    //     <>
    //       <div className="">
    //         <h2
    //         // className={`${
    //         //   list.data.ipdDepositAmount > 5000 ? "" : " text-red-500"
    //         // }`}
    //         >
    //           ₹ {list?.data?.ipdDepositAmount}
    //         </h2>
    //       </div>
    //       <button
    //         onClick={() => handleAddBalanceModalOpen(list)}
    //         className=" bg-blue-400 hover:bg-blue-500 text-white font-semibold px-2 py-1 rounded-md"
    //       >
    //         Add Balance
    //       </button>
    //     </>
    //   ),
    // },
    {
      label: "Action",
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
          <h2 className="border-b-[4px] border-[#3497F9]">IPD Patients</h2>
          <button
            onClick={handleOpen}
            className="bg-[#3497F9] text-white p-[10px] rounded-md"
          >
            + Add IPD Patients
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
            <FaSearch className="text-[#56585A]" />
            <input
              className="bg-transparent outline-none"
              placeholder="Search by id"
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="headingBottomUnderline w-fit pb-[10px]">
              Add IPD Patient
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalAddIPDPatient}
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
              Update IPD Patient
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalUpdateIPDPatient}
          </Typography>
        </Box>
      </Modal>

      {/* Add Balance Modal */}
      <Modal
        open={openAddBalanceModal}
        onClose={handleAddBalanceModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "40%",
            bgcolor: "background.paper",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="headingBottomUnderline w-fit pb-[10px]">
              Update IPD Patient Balance
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form
              className="flex flex-col gap-[1rem]"
              onSubmit={(e) => handleAddBalanceFormSubmit(e)}
            >
              <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px]">Deposit Amount *</label>

                  <input
                    className="py-[10px] outline-none border-b"
                    required
                    placeholder="Enter deposit amount"
                    defaultValue={0}
                    value={ipdDepositAmount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setIpdDespositAmount(value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px]">Payment Mode *</label>
                  <select
                    required
                    className="py-[10px] outline-none border-b bg-transparent"
                    value={ipdPaymentMode}
                    onChange={(e) => setIpdPaymentMode(e.target.value)}
                  >
                    <option>UPI</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Card</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-[1rem] items-center">
                <button
                  type="submit"
                  className="buttonFilled"
                  onClick={() => setSubmitButton("add")}
                >{`Save >`}</button>
              </div>
            </form>
            {/* ///// */}
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
                IPD Patient Details
              </h1>

              {ipdPatientDischargeLoader ? (
                <div>Loading...</div>
              ) : ipdPatientNegativeBalanceAlert ? (
                <button
                  onClick={(e) => e.preventDefault()}
                  disabled={true}
                  className=" bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Negative Balance
                </button>
              ) : ipdPatientDischargeState.discharged === true ? (
                <div>
                  {" "}
                  <Link
                    // onClick={handleGeneratePdf}
                    target="_blank"
                    to={ipdPatientData?.data?.mainId}
                    // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                    className="buttonFilled flex items-center gap-[10px]"
                  >
                    <LuHardDriveDownload />
                    <p>Download</p>
                  </Link>
                </div>
              ) : (
                <>
                  {ipdPatientDischargeState.dischargeDoctorRequestSent &&
                  (!ipdPatientDischargeState.doctorUpdate ||
                    !ipdPatientDischargeState.nurseUpdate) ? (
                    <div className=" flex flex-col justify-start items-start gap-2">
                      <button
                        className=" bg-gray-500 text-white px-2 py-1 rounded-md"
                        disabled
                      >
                        Request Pending
                      </button>
                      <div className=" flex flex-col justify-center items-start text-base ">
                        <div>
                          Doctor's Approval:{" "}
                          <span
                            className={`${
                              ipdPatientDischargeState.doctorUpdate
                                ? " text-green-500 "
                                : " text-red-500"
                            }`}
                          >
                            {ipdPatientDischargeState.doctorUpdate
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>

                        <div>
                          Nurse's Approval:{" "}
                          <span
                            className={`${
                              ipdPatientDischargeState.nurseUpdate
                                ? " text-green-500 "
                                : " text-red-500"
                            }`}
                          >
                            {ipdPatientDischargeState.nurseUpdate
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : ipdPatientDischargeState.dischargeDoctorRequestSent &&
                    ipdPatientDischargeState.doctorUpdate &&
                    ipdPatientDischargeState.nurseUpdate ? (
                    <div className=" flex flex-col justify-start items-start gap-2">
                      <button
                        onClick={handleFinalIpdDischarge}
                        className=" bg-blue-500 text-white px-2 py-1 rounded-md"
                      >
                        Final Discharge
                      </button>
                      <div className=" flex flex-col justify-center items-start text-base ">
                        <div>
                          Doctor's Approval:{" "}
                          <span
                            className={`${
                              ipdPatientDischargeState.doctorUpdate
                                ? " text-green-500 "
                                : " text-red-500"
                            }`}
                          >
                            {ipdPatientDischargeState.doctorUpdate
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>

                        <div>
                          Nurse's Approval:{" "}
                          <span
                            className={`${
                              ipdPatientDischargeState.nurseUpdate
                                ? " text-green-500 "
                                : " text-red-500"
                            }`}
                          >
                            {ipdPatientDischargeState.nurseUpdate
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      onClick={(e) => handleDischargeButtonClick(e)}
                      // target="_blank"
                      // to={ipdPatientData?.data?.mainId}
                      // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                      className="buttonFilled flex items-center gap-[10px]"
                    >
                      <MdOutlineReceiptLong />
                      <p>Discharge Request</p>
                    </Link>
                  )}
                </>
              )}
              {/* {ipdPatientNegativeBalanceAlert ? (
                <button
                  onClick={(e) => e.preventDefault()}
                  disabled={true}
                  className=" bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Negative Balance
                </button>
              ) : ipdPatientDischargeState.discharged === true ? (
                <div>Download Discharge Reciept</div>
              ) : (ipdPatientDischargeState.dischargeDoctorRequestSent ===
                  true &&
                  ipdPatientDischargeState.doctorUpdate === false) ||
                ipdPatientDischargeState.nurseUpdate === false ? (
                <div>Request Pending</div>
              ) : (
                <Link
                  onClick={(e) => handleDischargeButtonClick(e)}
                  target="_blank"
                  to={ipdPatientData?.data?.mainId}
                  // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                  className="buttonFilled flex items-center gap-[10px]"
                >
                  <MdOutlineReceiptLong />
                  <p>Discharge</p>
                </Link>
              )} */}
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalViewPatientDetails}
          </Typography>
          {/* <Typography></Typography> */}
        </Box>
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
      <DialogBoxToDelete
        open={openDialogBox}
        setOpen={setOpenDialogBox}
        handleAgree={handleAgreeDialogBoxToDelete}
        message={dialogBoxMessage}
      />
    </Suspense>
  );
}
