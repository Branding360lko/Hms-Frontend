import { Suspense } from "react";
import "./EmergencyPatientTable.css";

import Table from "../../Table";

import { FaSearch } from "react-icons/fa";
import { MdOutlineReceiptLong, MdViewKanban } from "react-icons/md";
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
  useAddEmergencyPatientBalanceByIdMutation,
  useAddEmergencyPatientExtraChargesByIdMutation,
  useCreateEmergencyPatientMutation,
  useDeleteEmergencyPatientByIdMutation,
  useEmergencyPatientDischargeRequestMutation,
  useEmergencyPatientFinalDischargeMutation,
  useGetAllEmergencyPatientBalanceQuery,
  useGetEmergencyPatientBalanceByIdQuery,
  useGetEmergencyPatientMedDocLabDetailsByIdQuery,
  useGetEmergencyPatientMedDocLabTotalByIdQuery,
  useUpdateEmergencyPatientByIdMutation,
} from "../../../Store/Services/EmergencyPatientService";

import {
  createEmergencyPatientChange,
  updateEmergencyPatientChange,
  deleteEmergencyPatientChange,
} from "../../../Store/Slices/EmergencyPatientSlice";

import BedSelector from "../AddBedSelector/AddBedSelector";
import EmergencyChargesShowcase from "../EmergencyChargesShowcase/EmergencyChargesShowcase";
import AddOtherCharges from "../../Receptionist/AddOtherCharges/AddOtherCharges";
import {
  updateEmergencyPatientDepositAmountChange,
  updateEmergencyPatientMedicalChargesChange,
} from "../../../Store/Slices/EmergencyPatientBalanceSlice";

import axios from "axios";

import { date, time } from "../../../utils/DateAndTimeConvertor";
import NewTable from "../../NewTable/NewTable";
import { useDebouncedSearch } from "../../../utils/useDebouncedSearch";
import ChangPatientBedModal from "../ChangPatientBed/ChangPatientBedModal";

export default function EmergencyPatientTable({
  setPageCount,
  setPageLimit,
  totalPages,
  totalItems,
  pageLimit,
  pageCount,
  setNameSearch,
  setPhoneSearch,
  setUhidSearch,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.DoctorState);
  const { patients } = useSelector((state) => state.PatientState);
  const { nurses } = useSelector((state) => state.NurseState);
  const { emergencyPatients } = useSelector(
    (state) => state.EmergencyPatientState
  );

  const [searchQuery, setSearchQuery] = React.useState({
    name: null,
    value: null,
  });

  const debouncedSearch = useDebouncedSearch(searchQuery?.value, 2000);

  const debouncedSearching = (e) => {
    setSearchQuery({
      name: e.target.name,
      value: e.target.value,
    });
  };

  React.useEffect(() => {
    // console.log("debouncedSearch:", debouncedSearch);
    if (debouncedSearch) {
      if (searchQuery?.name === "UHID") {
        setNameSearch("");
        setPhoneSearch("");
        setUhidSearch(debouncedSearch);
      } else if (searchQuery?.name === "PhoneNumber") {
        // console.log("Phonenumber search called");
        setNameSearch("");
        setUhidSearch("");
        setPhoneSearch(debouncedSearch);
      } else if (searchQuery?.name === "PatientName") {
        // console.log("PatientName search called");
        setUhidSearch("");
        setPhoneSearch("");
        setNameSearch(debouncedSearch);
      }
    } else {
      setUhidSearch("");
      setPhoneSearch("");
      setNameSearch("");
    }
  }, [debouncedSearch]);
  // console.log("emergencyPatients from store:", emergencyPatients);

  // console.log(
  //   "pageCount and pageLimit in emergencyTable :",
  //   pageCount,
  //   pageLimit
  // );

  // console.log("nurses:", nurses);

  // const date = (dateTime) => {
  //   const newdate = new Date(dateTime);

  //   return newdate.toLocaleDateString();
  // };

  // const time = (dateTime) => {
  //   const newDate = new Date(dateTime);

  //   return newDate.toLocaleTimeString();
  // };

  // Emergency Patient state

  // const fetchBalanceData = async () => {

  //   await axios.get(`${process.env.React_App_Base_url}/EmergencyPatient-Balance-GET-ALL`).then((data) => setAllPatientsFinalBalance(data)).catch((error) => console.log(error));
  // }

  const [currentEmergencyPatient, setCurrentEmergencyPatient] =
    React.useState(null);

  const [currentEmergencyPatientBedTotal, setCurrentEmergencyPatientBedTotal] =
    React.useState(null);

  const [currentEmergencyPatientBalance, setCurrentEmergencyPatientBalance] =
    React.useState(null);

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
  const [emergencyNurseId, setEmergencyNurseId] = React.useState({
    value: "",
    label: "",
  });
  const [emergencyAdmittingTime, setEmergencyAdmittingTime] =
    React.useState("");
  // const [emergencyBedNo, setEmergencyBedNo] = React.useState("");
  const [emergencyNotes, setEmergencyNotes] = React.useState("");

  const [emergencyDepositAmount, setEmergencyDepositAmount] =
    React.useState("");
  const [emergencyPaymentMode, setEmergencyPaymentMode] = React.useState(null);
  const [emergencyDepositNote, setEmergencyDepositNote] = React.useState("");

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
    overflowY: "scroll",
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

  const renderedNurseIDForDropdown = nurses?.map((nurse) => {
    return {
      value: nurse.nurseId,
      label: `${nurse.nurseId} / ${nurse.nurseName}`,
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
    setEmergencyNurseId({
      value: "",
      label: "",
    });
    setEmergencyAdmittingTime("");
    setEmergencyDepositAmount("");
    setEmergencyDepositNote("");
    setEmergencyPaymentMode("UPI");

    setEmergencyNotes("");
  };
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  // console.log("Logger...");

  React.useEffect(() => {
    if (responseCreateEmergencyPatient.isSuccess) {
      dispatch(createEmergencyPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseCreateEmergencyPatient?.data?.message);
      handleClickSnackbarSuccess();
      updateBedAvailability({
        bedId: responseCreateEmergencyPatient?.data?.data?.bedId,
        data: { bedAvailableOrNot: false },
      });
      setEmergencyDepositAmount("");
      setEmergencyDepositNote("");
      setEmergencyPaymentMode("UPI");
      handleCloseAddModal();
    } else if (responseCreateEmergencyPatient.isError) {
      setSnackBarSuccessWarning(responseCreateEmergencyPatient?.error?.data);
      console.log(responseCreateEmergencyPatient?.error);
      handleClickSnackbarWarning();
    }
  }, [
    responseCreateEmergencyPatient.isSuccess,
    responseCreateEmergencyPatient.isError,
  ]);

  // console.log(selectedBed);
  const handleAddEmergencyPatient = (e) => {
    e.preventDefault();

    const submitData = {
      patientId: emergencyPatientUHID?.value,
      doctorId: emergencydoctorId?.value,
      nurseId: emergencyNurseId?.value,

      admittingDateTime: emergencyAdmittingTime,
      bedId: selectedBed?.bedId,
      notes: emergencyNotes,
      emergencyDepositAmount: emergencyDepositAmount
        ? emergencyDepositAmount
        : "",
      emergencyPaymentMode: emergencyPaymentMode,
      // emergencyFloorNo:emerge,
      balanceNote: emergencyDepositNote,
    };
    createEmergencyPatient(submitData);
  };

  const modalAddEmergencyPatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Add Patient</h2>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={handleAddEmergencyPatient}
      >
        <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">UHID</label>
            <Select
              required
              options={renderedPatientIDForDropdown}
              onChange={setemergencyPatientUHID}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Doctor Id</label>
            <Select
              required
              options={renderedDoctorIDForDropdown}
              onChange={setEmergencyDoctorId}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Nurse Id</label>
            <Select
              required
              options={renderedNurseIDForDropdown}
              onChange={setEmergencyNurseId}
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Deposit Amount *</label>

            <input
              className="py-[10px] outline-none border-b"
              placeholder="Enter deposit amount"
              type="number"
              value={emergencyDepositAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setEmergencyDepositAmount(value);
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Payment Mode *</label>
            <select
              required
              className="py-[10px] outline-none border-b bg-transparent"
              value={emergencyPaymentMode}
              onChange={(e) => setEmergencyPaymentMode(e.target.value)}
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Deposit Note</label>
            <textarea
              className="border-b py-[10px] outline-none"
              placeholder="Enter notes"
              rows={1}
              value={emergencyDepositNote}
              onChange={(e) => setEmergencyDepositNote(e.target.value)}
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
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Admitting Date / Time</label>
            <input
              className="py-[10px] outline-none border-b"
              type="datetime-local"
              required
              onChange={(e) => setEmergencyAdmittingTime(e.target.value)}
            />
          </div>
        </div>
        <div className=" w-full">
          {addBedFormOpen === false ? (
            <button
              onClick={(e) => handleAddBedFormOpen(e)}
              className=" flex justify-center items-start w-[100px] gap-1 bg-green-500 py-1 text-white
             hover:text-black rounded-md "
            >
              <FaBed className=" text-3xl " /> +
            </button>
          ) : (
            <div className=" flex flex-col justify-center items-start gap-5 w-full">
              <h2>Select A Bed</h2>
              <div className=" w-full">
                <BedSelector
                  beds={beds?.filter((data) => data.bedType === "EMERGENCY")}
                  handleBedSelect={handleBedSelect}
                />
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
            value={emergencyNotes}
            onChange={(e) => setEmergencyNotes(e.target.value)}
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

  const [previousSelectedBed, setPreviousSelectedBed] = React.useState("");
  const [emergencyPatientId, setEmergencyPatientId] = React.useState("");
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  const [isBedChange, setIsBedChange] = React.useState(false);

  const handleBedChangeModalClose = () => {
    setIsBedChange(false);
  };

  const handleBedChangeClick = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to change the bed? \n This will change the bed cost! `
      )
    )
      setIsBedChange(true);
  };

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
    setIsBedChange(false);
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

  const [
    addEmergencyPatientExtraCharges,
    responseAddEmergencyPatientExtraCharges,
  ] = useAddEmergencyPatientExtraChargesByIdMutation();

  const handleAddEmergencyPatientExtraCharges = (updateData) => {
    addEmergencyPatientExtraCharges(updateData);
  };

  React.useEffect(() => {
    if (responseAddEmergencyPatientExtraCharges.isSuccess) {
      dispatch(updateEmergencyPatientMedicalChargesChange(Math.random()));

      handleAllPatientsBalanceCall();

      setSnackBarSuccessMessage(
        responseAddEmergencyPatientExtraCharges?.data?.message
      );
      handleClickSnackbarSuccess();
      handleCloseUpdateModal();
    } else if (responseAddEmergencyPatientExtraCharges.isError) {
      setSnackBarSuccessWarning(
        responseAddEmergencyPatientExtraCharges?.error?.data
      );
      handleClickSnackbarWarning();
    }
  }, [
    responseAddEmergencyPatientExtraCharges.isSuccess,
    responseAddEmergencyPatientExtraCharges.isError,
  ]);

  const modalUpdateEmergencyPatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Update Patient</h2>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={handleUpdateOPDPatient}
      >
        <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">UHID</label>
            <Select
              required
              value={emergencyPatientUHID}
              options={renderedPatientIDForDropdown}
              onChange={setemergencyPatientUHID}
            />
          </div>

          <div className="flex flex-col gap-[6px] relative w-full">
            <label className="text-[14px]">Doctor Id</label>
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

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Admitting Date / Time</label>
            <input
              className="py-[10px] outline-none border-b"
              type="datetime-local"
              required
              value={emergencyAdmittingTime}
              onChange={(e) => setEmergencyAdmittingTime(e.target.value)}
            />
          </div>
          <div className=" w-full">
            {/* {addBedFormOpen === false ? (
              <button
                onClick={(e) => handleAddBedFormOpen(e)}
                className=" flex justify-center items-start w-[100px] gap-1 bg-green-500 py-1 text-white
             hover:text-black rounded-md "
              >
                <FaBed className=" text-3xl " /> +
              </button>
            ) : (
              <div className=" flex flex-col w-full justify-center items-start gap-5">
                <h2>Select A Bed</h2>
                <div>
                  <BedSelector
                    beds={beds?.filter((data) => data.bedType === "EMERGENCY")}
                    handleBedSelect={handleBedSelect}
                  />
                </div>
              </div>
            )} */}
            {!isBedChange && (
              <div>
                <button onClick={handleBedChangeClick} className="buttonFilled">
                  Switch Bed
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px]">Notes</label>
          <textarea
            className="border-b py-[10px] outline-none"
            placeholder="Enter notes"
            rows={3}
            value={emergencyNotes}
            onChange={(e) => setEmergencyNotes(e.target.value)}
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

      <AddOtherCharges
        handleAddMedicalCharges={handleAddEmergencyPatientExtraCharges}
        mainId={emergencyPatientId}
      />
    </div>
  );

  const [openViewModal, setOpenViewModal] = React.useState(false);

  // const responseGetAllBalanceData = useGetAllEmergencyPatientBalanceQuery();

  // console.log("responseGetAllBalanceData:", responseGetAllBalanceData);

  const [currentPatientId, setCurrentPatientId] = React.useState(null);
  const [currentPatientFinalBalance, setCurrentPatientFinalBalance] =
    React.useState(null);

  const [currentPatientExtraCharges, setCurrentPatientExtraCharges] =
    React.useState(null);

  const [currentPatientExtraChargesTotal, setCurrentPatientExtraChargesTotal] =
    React.useState(null);

  const {
    data: responseAllBalanceCallData,
    isError: isErrorAllBalanceDataCall,
    isLoading: isLoadingAllBalanceDataCall,
    isFetching: isFetchingAllBalanceDataCall,
    refetch: refetchAllBalanceDataCall,
  } = useGetAllEmergencyPatientBalanceQuery();

  const { data: responseGetPatientBalance, refetch: refetchGetPatientBalance } =
    useGetEmergencyPatientBalanceByIdQuery(currentPatientId);

  const { data: responseMedDocLabDetails, refetch: refetchMedDocLabDetails } =
    useGetEmergencyPatientMedDocLabDetailsByIdQuery(currentPatientId);

  const { data: responseMedDocLabTotal, refetch: refetchMedDocLabTotal } =
    useGetEmergencyPatientMedDocLabTotalByIdQuery(currentPatientId);

  // console.log("responseGetPatientBalance:", responseGetPatientBalance);

  // console.log("responseMedDocLabDetails:", responseMedDocLabDetails);

  // console.log("responseMedDocLabTotal:", responseMedDocLabTotal);

  React.useEffect(() => {
    refetchAllBalanceDataCall();
    refetchGetPatientBalance();
    refetchMedDocLabDetails();
    refetchMedDocLabTotal();
  }, [currentPatientId]);

  React.useEffect(() => {
    if (responseGetPatientBalance?.data?.charges) {
      setCurrentPatientExtraCharges(responseGetPatientBalance?.data?.charges);
      setCurrentPatientExtraChargesTotal(
        responseGetPatientBalance?.totalMedicalCharges
      );
    }
  }, [currentPatientId, responseGetPatientBalance]);

  // console.log("currentPatientExtraCharges:", currentPatientExtraCharges);

  React.useEffect(() => {
    const currentPatientData =
      responseAllBalanceCallData?.balanceCalculation?.find(
        (patientData) => patientData._id === currentPatientId
      );

    setCurrentPatientFinalBalance(currentPatientData);
  }, [responseAllBalanceCallData, currentPatientId]);

  // console.log("currentPatientFinalBalance:", currentPatientFinalBalance);

  // const currentPatientBalance =
  //   resposnseAllBalanceCallData?.balanceCalculation?.find(
  //     (patient) => patient._id === currentPatientId
  //   );

  const [negativeBalanceAlert, setNegativeBalaneAlert] = React.useState(false);

  const handleOpenViewModal = (patientData) => {
    setCurrentEmergencyPatient(patientData);
    if (patientData?.balanceData?.remainingBalance < 0) {
      setNegativeBalaneAlert(true);
    } else {
      setNegativeBalaneAlert(false);
    }
    setCurrentPatientId(patientData?.data?.mainId);
    setOpenViewModal(true);
  };

  // console.log("currentPatientId:", currentPatientId);
  console.log("currentEmergencyPatient:", currentEmergencyPatient);
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedPayment(null);
  };

  const modalViewEmergencyPatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <div className="border-b flex gap-[1rem] py-[1rem] w-full">
        <h3 className="font-[500]">ID: </h3>
        <h3>{currentEmergencyPatient?.data?.mainId}</h3>
      </div>
      {currentPatientFinalBalance ? (
        <div className=" flex justify-center items-center">
          <div className="border-b flex gap-[1rem] py-[1rem] w-full">
            <h3 className="font-[500]">Total Deposit: </h3>
            <h3>
              Rs.
              {currentPatientFinalBalance?.totalAddedBalance}
            </h3>
          </div>
          <div className="border-b flex gap-[1rem] py-[1rem] w-full">
            <h3 className="font-[500]">Total Expense: </h3>
            <h3>
              Rs.
              {currentPatientFinalBalance?.finalTotal}
            </h3>
          </div>
          {/* <div
          className={`border-b flex gap-[1rem] py-[1rem] w-full ${
            ipdPatientNegativeBalanceAlert ? "text-red-500" : ""
          }`}
        >
          <h3 className="font-[500]">Remaining Balance: </h3>
          <h3>
            Rs.
            {currentEmergencyPatient?.balanceData?.remainingBalance
              ? currentEmergencyPatient?.balanceData?.remainingBalance
              : "Not Found"}
          </h3>
        </div> */}
        </div>
      ) : (
        <div>Not Found</div>
      )}

      <div className="flex w-full">
        <div className="w-[25%] flex flex-col items-center">
          <img
            className="w-[200px] h-[200px] object-contain"
            src={
              currentEmergencyPatient?.patientData?.patientImage
                ? process.env.React_App_Base_Image_Url +
                  currentEmergencyPatient?.patientData?.patientImage
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
              <p>{currentEmergencyPatient?.data?.mainId}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Id: </p>
              <p>{currentEmergencyPatient?.data?.doctorId}</p>
            </div>

            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Name: </p>
              <p>{currentEmergencyPatient?.patientData?.patientName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Name: </p>
              <p>{currentEmergencyPatient?.doctorData?.doctorName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Blood Group: </p>
              <p>
                {currentEmergencyPatient?.data?.patientData?.patientBloodGroup}
              </p>
            </div>
            {/* <div className="flex">
              <p className="font-[600] w-[150px]">Doctor Phone: </p>
              <p>{currentEmergencyPatient?.doctorData?.doctorPhone}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Gender: </p>
              <p>{currentEmergencyPatient?.data?.patientData?.patientGender}</p>
            </div>
            {/* <div className='flex'>
          <p className='font-[600] w-[150px]'>Case No: </p>
          <p>{currentEmergencyPatient?.data?.ipdCaseId}</p>
        </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient DOB: </p>
              <p>
                {currentEmergencyPatient?.data?.patientData?.patientDateOfBirth}
              </p>
            </div>
            {/* <div className='flex'>
          <p className='font-[600] w-[150px]'>OPD No: </p>
          <p>{currentEmergencyPatient?.data?.ipdId}</p>
        </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Phone: </p>
              <p>{currentEmergencyPatient?.data?.patientData?.patientPhone}</p>
            </div>
            {/* <div className='flex'>
          <p className='font-[600] w-[150px]'>Blood Pressure: </p>
          <p>{currentEmergencyPatient?.data?.ipdPatientBloodPressure}</p>
        </div> */}
            {/* <div className="flex">
              <p className="font-[600] w-[150px]">Bed No: </p>
              <p>{currentPatientBed?.bedNumber}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Bed Floor: </p>
              <p>{currentPatientBed?.bedFloor}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Height: </p>
              <p>{currentEmergencyPatient?.data?.patientData?.patientHeight}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Discharge Status: </p>
              <p>
                {currentEmergencyPatient?.data?.emergencyPatientDischarged ===
                true
                  ? "Discharged"
                  : "Not Discharged"}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Patient Weight: </p>
              <p>{currentEmergencyPatient?.data?.patientData?.patientWeight}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Bed Number: </p>
              <p>{currentEmergencyPatient?.bedData?.bedNumber}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Bed Floor: </p>
              <p>{currentEmergencyPatient?.bedData?.bedFloor}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col">
              <p className="font-[600] w-[150px]">Notes: </p>
              <p className="text-[14px]">
                {currentEmergencyPatient?.data?.notes}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Created On: </p>
              <p className="break-word text-[14px]">
                {`${date(currentEmergencyPatient?.data?.createdAt)} ${time(
                  currentEmergencyPatient?.data?.createdAt
                )}`}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Updated On: </p>
              <p className="break-word text-[14px]">
                {`${date(currentEmergencyPatient?.data?.updatedAt)} ${time(
                  currentEmergencyPatient?.data?.updatedAt
                )}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <EmergencyChargesShowcase
        currentPatientFinalBalance={currentPatientFinalBalance}
        currentPatientMedDocLabTotal={responseMedDocLabTotal?.data}
        currentPatientExtraCharges={currentPatientExtraCharges}
        currentPatientExtraChargesTotal={currentPatientExtraChargesTotal}
      />

      {/* <IpdChargesShowcase
        currentPatientBed={currentPatientBed}
        currentEmergencyPatient={currentEmergencyPatient}
        setIpdPatientCurrentBalance={setIpdPatientCurrentBalance}
        setCurrentPatientBedCharges={setCurrentPatientBedCharges}
        openViewModal={openViewModal}
      /> */}
    </div>
  );

  const [search, setSearch] = React.useState("");

  const [allPatientsFinalBalance, setAllPatientsFinalBalance] =
    React.useState(null);

  const handleAllPatientsBalanceCall = () => {
    refetchAllBalanceDataCall();
  };

  // console.log(
  //   "responseAllBalanceCallData from handler:",
  //   responseAllBalanceCallData
  // );

  // console.log("allPatientsFinalBalance:", allPatientsFinalBalance);

  React.useEffect(() => {
    handleAllPatientsBalanceCall();
  }, []);

  React.useEffect(() => {
    setAllPatientsFinalBalance(responseAllBalanceCallData?.balanceCalculation);
  }, [responseAllBalanceCallData?.balanceCalculation]);

  // console.log("emergencyPatients:", emergencyPatients);

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

    const filteredFinalBalance = allPatientsFinalBalance?.find(
      (patientData) => patientData?._id === data?.mainId
    );
    return {
      id: index + 1,
      data,
      patientData: filteredPatientData,
      doctorData: filteredDoctorData,
      bedData: filteredBedData,
      balanceData: filteredFinalBalance,
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

  // Add Balance Modal States And Logic

  const [openAddBalanceModal, setOpenAddBalanceModal] = React.useState(false);

  const [addBalanceData, setAddBalanceData] = React.useState({
    emergencyPatientMainId: null,
    depositAmount: null,
    balanceNote: null,
    paymentMode: null,
  });

  const [addEmergencyPatientBalance, responeAddEmergencyPatientBalance] =
    useAddEmergencyPatientBalanceByIdMutation();

  const updateBalanceState = (newState) => {
    setAddBalanceData((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleAddBalanceModalOpen = (list) => {
    const currentPatientId = list.data.mainId;
    updateBalanceState({ emergencyPatientMainId: currentPatientId });

    setOpenAddBalanceModal(true);
  };

  const handleAddBalanceModalClose = () => {
    setOpenAddBalanceModal(false);

    updateBalanceState({
      emergencyPatientMainId: null,
      depositAmount: null,
      balanceNote: null,
      paymentMode: null,
    });
  };

  const handleAddBalanceFormSubmit = (e) => {
    e.preventDefault();
    // console.log("Handle Add Balance Called !!!!");

    const updateData = {
      emergencyPatientMainId: addBalanceData.emergencyPatientMainId,
      data: {
        emergencyAddedAmount: Number(addBalanceData.depositAmount),
        emergencyPaymentMode: addBalanceData.paymentMode,
        balanceNote: addBalanceData.balanceNote,
      },
    };

    // console.log("updatedData:", updateData);

    addEmergencyPatientBalance(updateData);
  };

  React.useEffect(() => {
    if (responeAddEmergencyPatientBalance.isSuccess) {
      dispatch(updateEmergencyPatientDepositAmountChange(Math.random()));
      handleAllPatientsBalanceCall();
      updateBalanceState({
        emergencyPatientMainId: null,
        depositAmount: null,
        balanceNote: null,
        paymentMode: null,
      });

      setSnackBarSuccessMessage(
        responeAddEmergencyPatientBalance?.data?.message
      );
      handleClickSnackbarSuccess();
      handleAddBalanceModalClose();
    } else if (responeAddEmergencyPatientBalance.isError) {
      setSnackBarSuccessWarning(responeAddEmergencyPatientBalance?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responeAddEmergencyPatientBalance.isSuccess,
    responeAddEmergencyPatientBalance.isError,
  ]);

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
      label: "Total Deposit",
      render: (list) => (
        <>
          <div className="">
            <h2
            // className={`${
            //   list.data.ipdDepositAmount > 5000 ? "" : " text-red-500"
            // }`}
            >
              ₹ {list?.data?.emergencyDepositAmount}
            </h2>
          </div>
          {list?.data?.emergencyPatientDischarged ? (
            <button
              disabled
              className=" bg-green-500  text-white font-semibold px-2 py-1 rounded-md"
            >
              Discharged
            </button>
          ) : (
            <button
              onClick={() => handleAddBalanceModalOpen(list)}
              className=" bg-blue-400 hover:bg-blue-500 text-white font-semibold px-2 py-1 rounded-md"
            >
              Add Balance
            </button>
          )}
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

  // console.log("mappedEmergencyRegTableData:", mappedEmergencyRegTableData);

  const keyFn = (list) => {
    return list.mainId;
  };

  // Balance deposits state and logic

  const [patientAllDeposits, setPatientAllDeposits] = React.useState(null);

  const [selectedPayment, setSelectedPayment] = React.useState(null);
  const [depositErrorMessage, setDepositErrorMessage] = React.useState("");

  // const responseGetIpdPatientDeposits = useGetIPDPatientBalanceByIdQuery(
  //   ipdPatientData?.data?.mainId
  // );

  const handleDepositsRefetch = async () => {
    const responseGetDepositsRefetch = await refetchGetPatientBalance();

    // console.log("responseGetDepositsRefetch:", responseGetDepositsRefetch);

    setPatientAllDeposits(responseGetDepositsRefetch?.data?.data?.balance);
  };

  React.useEffect(() => {
    handleDepositsRefetch();
  }, [currentPatientId]);

  // React.useEffect(() => {
  //   setIpdPatientDeposits(
  //     responseGetIpdPatientDeposits?.currentData?.data?.balance
  //   );
  // }, [responseGetIpdPatientDeposits?.isSuccess]);

  // console.log("patientAllDeposits:", patientAllDeposits);

  // console.log("selectedPayment:", selectedPayment);

  const renderedPaymentsForDropdown = patientAllDeposits?.map((payment) => {
    return {
      value: payment.createdAt,
      label: `${new Date(payment.createdAt).toLocaleString()} / ${
        payment.addedBalance
      }`,
    };
  });

  const handlePaymentReceiptDownloadClick = (e) => {
    if (!selectedPayment) {
      e.preventDefault();
      setDepositErrorMessage("Please select a payment");
    }
  };

  // Discharge Function and Logic

  const [patientDischargeState, setPatientDischargeState] = React.useState({
    dischargeNurseRequestSent:
      currentEmergencyPatient?.data?.emergencyPatientNurseRequestForDischarge,
    dischargeDoctorRequestSent:
      currentEmergencyPatient?.data?.emergencyPatientDoctorRequestForDischarge,

    nurseUpdate:
      currentEmergencyPatient?.data?.emergencyPatientNurseConfirmation,
    doctorUpdate:
      currentEmergencyPatient?.data?.emergencyPatientDoctorConfirmation,

    discharged: currentEmergencyPatient?.data?.emergencyPatientDischarged,
  });
  const [patientDischargeReq, responsePatientDischargeReq] =
    useEmergencyPatientDischargeRequestMutation();

  React.useEffect(() => {
    if (responsePatientDischargeReq.isSuccess) {
      dispatch(createEmergencyPatientChange(Math.random()));
      updatePatientDischargeState({
        dischargeNurseRequestSent: true,
        dischargeDoctorRequestSent: true,
      });
      setSnackBarSuccessMessage(responsePatientDischargeReq?.data?.message);
      handleClickSnackbarSuccess();
    } else if (responsePatientDischargeReq.isError) {
      setSnackBarSuccessWarning(responsePatientDischargeReq?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responsePatientDischargeReq.isSuccess,
    responsePatientDischargeReq.isError,
  ]);

  const updatePatientDischargeState = (updatedState) => {
    setPatientDischargeState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };

  React.useEffect(() => {
    updatePatientDischargeState({
      dischargeNurseRequestSent:
        currentEmergencyPatient?.data?.emergencyPatientNurseRequestForDischarge,
      dischargeDoctorRequestSent:
        currentEmergencyPatient?.data
          ?.emergencyPatientDoctorRequestForDischarge,

      nurseUpdate:
        currentEmergencyPatient?.data?.emergencyPatientNurseConfirmation,
      doctorUpdate:
        currentEmergencyPatient?.data?.emergencyPatientDoctorConfirmation,

      discharged: currentEmergencyPatient?.data?.emergencyPatientDischarged,
    });
  }, [currentEmergencyPatient]);

  const handleDischargeButtonClick = (e) => {
    e.preventDefault();
    patientDischargeReq(currentEmergencyPatient?.data?.mainId);

    patientDischargeLoaderToggle();
    // updatePatientDischargeState({ dischargeRequestSent: true });
  };

  const [patientDischargeLoader, setPatientDischargeLoader] =
    React.useState(false);

  const patientDischargeLoaderToggle = () => {
    setPatientDischargeLoader(true);

    setTimeout(() => {
      setPatientDischargeLoader(false);
    }, 2000);
  };

  // console.log("ipdPatientDischargeState:", ipdPatientDischargeState);

  // Final Discharge

  const [patientFinalDischargeReq, responsePatientFinalDischargeReq] =
    useEmergencyPatientFinalDischargeMutation();

  const handleFinalIpdDischarge = () => {
    patientFinalDischargeReq(currentEmergencyPatient.data.mainId);
    patientDischargeLoaderToggle();
  };

  React.useEffect(() => {
    if (responsePatientFinalDischargeReq.isSuccess) {
      dispatch(createEmergencyPatientChange(Math.random()));
      updatePatientDischargeState({
        discharged: true,
      });

      // console.log(
      //   "Ipd Patient Discharge successful:",
      //   responsePatientFinalDischargeReq
      // );

      setSnackBarSuccessMessage(
        responsePatientFinalDischargeReq?.data?.message
      );
      handleClickSnackbarSuccess();
    } else if (responsePatientFinalDischargeReq.isError) {
      setSnackBarSuccessWarning(responsePatientFinalDischargeReq?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responsePatientFinalDischargeReq.isSuccess,
    responsePatientFinalDischargeReq.isError,
  ]);

  return (
    <Suspense fallback={<>...</>}>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <div className="flex justify-between">
          <h2 className="border-b-[4px] border-[#3497F9]">
            Emergency Patients
          </h2>
          <button
            onClick={handleOpenAddModal}
            className="bg-[#3497F9] text-white p-[10px] rounded-md"
          >
            + Add Emergency Patient
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
            <FaSearch className="text-[#56585A]" />
            <input
              className="bg-transparent outline-none"
              placeholder="Search by UHID"
              name="UHID"
              onChange={(e) => debouncedSearching(e)}
            />
          </div>
          <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
            <FaSearch className="text-[#56585A]" />
            <input
              className="bg-transparent outline-none"
              placeholder="Search by Patient Phone Number"
              name="PhoneNumber"
              onChange={(e) => debouncedSearching(e)}
            />
          </div>
          <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
            <FaSearch className="text-[#56585A]" />
            <input
              className="bg-transparent outline-none"
              placeholder="Search by Patient Name"
              name="PatientName"
              onChange={(e) => debouncedSearching(e)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
        <input type='date' className='bg-transparent outline-none' />
      </div> */}
        </div>
        {/* <Table
          data={mappedEmergencyRegTableData}
          config={config}
          keyFn={keyFn}
        /> */}
        <NewTable
          data={mappedEmergencyRegTableData}
          config={config}
          keyFn={keyFn}
          pageLimit={pageLimit}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setPageLimit={setPageLimit}
          totalPages={totalPages}
          totalItems={totalItems}
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
              Add Emergency Patient
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalAddEmergencyPatient}
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
              Update Emergency Patient
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
                Emergency Patient Details
              </h1>
              <div className="flex justify-center items-end gap-5 bg-blue-50 px-3 py-2 rounded-md">
                <div className="flex flex-col gap-[6px] relative w-[300px]">
                  <label className="text-[14px]">Previous Payments *</label>
                  <Select
                    required
                    options={renderedPaymentsForDropdown}
                    onChange={(option) => {
                      setSelectedPayment(option.value);
                      setDepositErrorMessage("");
                    }}
                    className="text-sm"
                  />
                </div>

                <div>
                  <Link
                    target="_blank"
                    to={`${
                      browserLinks?.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.emergencyPatientPaymentReceipt
                      .split(" ")
                      .join("")}/${currentPatientId}/${selectedPayment}`}
                    className={`buttonFilled flex items-center gap-[10px] text-sm no-underline ${
                      !selectedPayment ? "disabled" : ""
                    }`}
                    onClick={handlePaymentReceiptDownloadClick}
                  >
                    <LuHardDriveDownload />
                    <p>Download Payment Receipt</p>
                  </Link>
                  {depositErrorMessage && (
                    <p className="text-red-500 text-sm mt-2">
                      {depositErrorMessage}
                    </p>
                  )}
                </div>
              </div>
              {patientDischargeLoader ? (
                <div>Loading...</div>
              ) : negativeBalanceAlert ? (
                <button
                  onClick={(e) => e.preventDefault()}
                  disabled={true}
                  className=" bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Negative Balance
                </button>
              ) : patientDischargeState.discharged === true ? (
                <div>
                  {" "}
                  <Link
                    // onClick={handleGeneratePdf}
                    target="_blank"
                    to={currentEmergencyPatient?.data?.mainId}
                    // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                    className="buttonFilled flex items-center gap-[10px]"
                  >
                    <LuHardDriveDownload />
                    <p>Download</p>
                  </Link>
                </div>
              ) : (
                <>
                  {patientDischargeState.dischargeDoctorRequestSent &&
                  (!patientDischargeState.doctorUpdate ||
                    !patientDischargeState.nurseUpdate) ? (
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
                              patientDischargeState.doctorUpdate
                                ? " text-green-500 "
                                : " text-red-500"
                            }`}
                          >
                            {patientDischargeState.doctorUpdate
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>

                        <div>
                          Nurse's Approval:{" "}
                          <span
                            className={`${
                              patientDischargeState.nurseUpdate
                                ? " text-green-500 "
                                : " text-red-500"
                            }`}
                          >
                            {patientDischargeState.nurseUpdate
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : patientDischargeState.dischargeDoctorRequestSent &&
                    patientDischargeState.doctorUpdate &&
                    patientDischargeState.nurseUpdate ? (
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
                              patientDischargeState.doctorUpdate
                                ? " text-green-500 "
                                : " text-red-500"
                            }`}
                          >
                            {patientDischargeState.doctorUpdate
                              ? "Approved"
                              : "Pending"}
                          </span>
                        </div>

                        <div>
                          Nurse's Approval:{" "}
                          <span
                            className={`${
                              patientDischargeState.nurseUpdate
                                ? " text-green-500 "
                                : " text-red-500"
                            }`}
                          >
                            {patientDischargeState.nurseUpdate
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
                      // to={currentEmergencyPatient?.data?.mainId}
                      // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                      className="buttonFilled flex items-center gap-[10px]"
                    >
                      <MdOutlineReceiptLong />
                      <p>Discharge Request</p>
                    </Link>
                  )}
                </>
              )}
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalViewEmergencyPatient}
          </Typography>
        </Box>
      </Modal>
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
            height: "60%",
            bgcolor: "background.paper",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            boxShadow: 24,
            overflowY: "scroll",
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="headingBottomUnderline w-fit pb-[10px]">
              Update Emergency Patient Balance
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
                    // defaultValue={0}
                    value={addBalanceData?.depositAmount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      updateBalanceState({ depositAmount: value });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px]">Payment Mode *</label>
                  <select
                    required
                    className="py-[10px] outline-none border-b bg-transparent"
                    value={addBalanceData?.paymentMode}
                    onChange={(e) =>
                      updateBalanceState({ paymentMode: e.target.value })
                    }
                  >
                    <option>UPI</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Card</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px]">Deposit Note</label>
                  <textarea
                    className="border-b py-[10px] outline-none"
                    placeholder="Enter notes"
                    rows={1}
                    value={addBalanceData?.balanceNote}
                    onChange={(e) =>
                      updateBalanceState({ balanceNote: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-[1rem] items-center">
                <button
                  type="submit"
                  className="buttonFilled"
                  // onClick={() => setSubmitButton("add")}
                >{`Save >`}</button>
              </div>
            </form>
            {/* ///// */}
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
      <ChangPatientBedModal
        beds={beds}
        isEmergencyPatient={true}
        // handleBedSelect={handleUpdatedBedSelect}
        ipdPtientEdit={true}
        bedModalOpen={isBedChange}
        handleModalClose={handleBedChangeModalClose}
        ipdPatientId={emergencyPatientId}
      />
    </Suspense>
  );
}
