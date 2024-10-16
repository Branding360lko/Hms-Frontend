import { Suspense } from "react";

import "./PatientTable.css";

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

import { useCallback } from "react";
import { debounce } from "lodash";

import { useSelector, useDispatch } from "react-redux";
import {
  useAddPatientMutation,
  useUpdatePatientByIdMutation,
  useDeletePatientByIdMutation,
} from "../../../Store/Services/PatientService";
import {
  createPatientChange,
  updatePatientChange,
  deletePatientChange,
  pageChange,
  limitChange,
  patientUHIDforSearchChange,
  patientNameForSearchChange,
  patientMobileNumberForSearchChange,
} from "../../../Store/Slices/PatientSlice";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

import { date, time } from "../../../utils/DateAndTimeConvertor";

import TableWithApi from "../../TableWithApi";
import { GrPowerReset } from "react-icons/gr";

import { Country, State, City } from "country-state-city";

import Select from "react-select";

export default function PatientTable() {
  // console.log(Country.getAllCountries());
  // console.log(State.getAllStates());

  const dispatch = useDispatch();

  const { adminLoggedInData } = useSelector((state) => state.AdminState);

  const {
    patients,
    page,
    limit,
    totalPages,
    // patientUHIDforSearch,
    // patientNameForSearch,
    // patientMobileNumberForSearch,
  } = useSelector((state) => state.PatientState);
  // console.log(patients);
  const [addPatient, responseAddPatient] = useAddPatientMutation();
  const [updatePatientById, responseUpdatePatientById] =
    useUpdatePatientByIdMutation();
  const [deletePatientById, responseDeletePatientById] =
    useDeletePatientByIdMutation();

  const [patientId, setPatientId] = React.useState("");
  const [patientIdToDelete, setPatientIdToDelete] = React.useState("");
  const [patientData, setPatientData] = React.useState("");

  // states
  const [patientName, setPatientName] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const [patientFatherName, setPatientFatherName] = React.useState("");
  const [patientHusbandName, setPatientHusbandName] = React.useState("");
  const [patientCareOfName, setPatientCareOfName] = React.useState();
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
  const [patientCity, setPatientCity] = React.useState({
    value: "",
    label: "",
  });
  const [patientState, setPatientState] = React.useState({
    value: "",
    label: "",
  });
  const [patientCountry, setPatientCountry] = React.useState("");
  const [patientZipCode, setPatientZipCode] = React.useState("");
  const [patientImage, setPatientImage] = React.useState();
  const [patientGender, setPatientGender] = React.useState();

  const [relativeCategory, setRelativeCategory] = React.useState("Father");

  const [sameAsLocalAddress, setSameAsLocalAddress] = React.useState(false);

  const [allStates, setAllStates] = React.useState([]);
  const [allCitiesByStates, setAllCitiesByStates] = React.useState([]);

  // console.log(allCitiesByStates);
  React.useEffect(() => {
    setAllStates(State.getStatesOfCountry("IN"));
  }, []);

  React.useEffect(() => {
    setAllCitiesByStates(City.getCitiesOfState("IN", patientState?.value));
  }, [patientState]);

  const renderedStatesForDropdown = allStates?.map((data) => {
    return {
      value: data.isoCode,
      label: `${data.name} (${data.isoCode})`,
    };
  });

  const renderedCitiesByStateForDropdown = allCitiesByStates?.map((data) => {
    return {
      value: data.name,
      label: `${data.name}`,
    };
  });

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
    setPatientIdToDelete(data?.patientId);
    setDialogMessage(`Are you sure you want to delete ${data?.patientId} ?`);
    setOpenDialogBox(true);
  };
  const handleAgreeDialogBoxToDelete = () => {
    deletePatientById(patientIdToDelete);
    setOpenDialogBox(false);
  };

  React.useEffect(() => {
    if (responseDeletePatientById.isSuccess) {
      dispatch(deletePatientChange(Math.random()));
      setSnackBarSuccessMessage(responseDeletePatientById?.data?.message);
      handleClickSnackbarSuccess();
      handleAgreeDialogBoxToDelete();
      setPatientIdToDelete("");
    }
    if (responseDeletePatientById.isError) {
      setSnackBarSuccessWarning(responseDeletePatientById?.error?.data?.error);
      handleClickSnackbarWarning();
    }
  }, [responseDeletePatientById.isSuccess, responseDeletePatientById.isError]);

  // ----------------------------------

  // console.log(patientDateOfBirth);

  // const date = (dateTime) => {
  //   const newdate = new Date(dateTime);

  //   return newdate.toLocaleDateString();
  // };

  // const time = (dateTime) => {
  //   const newDate = new Date(dateTime);

  //   return newDate.toLocaleTimeString();
  // };

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
    setPatientData(data);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => setOpenViewModal(false);

  const modalViewPatientDetails = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <div className="border-b flex gap-[1rem] py-[1rem] w-full">
        <h3 className="font-[500]">Patient ID: </h3>
        <h3>{patientData?.patientId}</h3>
      </div>
      <div className="flex w-full">
        <div className="w-[25%] flex flex-col items-center">
          <img
            className="w-[200px] h-[200px] object-contain"
            src={
              patientData.patientImage
                ? process.env.React_App_Base_Image_Url +
                  patientData.patientImage
                : placeholder
            }
            alt="patientImage"
          />
          <button className="buttonFilled w-fit">Button</button>
        </div>
        <div className="w-[75%] flex flex-col gap-[10px] text-[14px]">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="flex">
              <p className="font-[600] w-[150px]">Name: </p>
              <p>{patientData.patientName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Gender: </p>
              <p>{patientData.patientGender}</p>
            </div>

            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Date Of Birth: </p>
              <p>{date(patientData.patientDateOfBirth)}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Age: </p>
              <p>{patientData.patientAge}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Phone: </p>
              <p>{patientData.patientPhone}</p>
            </div>
            {patientData.patientFatherName !== "" && (
              <div className="flex">
                <p className="font-[600] w-[150px]">Father Name: </p>
                <p>{patientData.patientFatherName}</p>
              </div>
            )}
            {patientData.patientHusbandName !== "" && (
              <div className="flex">
                <p className="font-[600] w-[150px]">Husband Name: </p>
                <p>{patientData.patientHusbandName}</p>
              </div>
            )}
            {patientData.patientCareOfName !== "" && (
              <div className="flex">
                <p className="font-[600] w-[150px]">Care Of Name: </p>
                <p>{patientData.patientCareOfName}</p>
              </div>
            )}
            {patientData.patientFatherName !== "" && (
              <div className="flex">
                <p className="font-[600] w-[150px]">Father Name: </p>
                <p>{patientData.patientFatherName}</p>
              </div>
            )}
            <div className="flex">
              <p className="font-[600] w-[150px]">Height: </p>
              <p>{patientData.patientHeight}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Weight: </p>
              <p>{patientData.patientWeight}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Blood Group: </p>
              <p>{patientData.patientBloodGroup}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">City: </p>
              <p>
                {patientData?.patientCityNew
                  ? JSON.parse(patientData?.patientCityNew)?.value
                  : patientData.patientCity}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">State: </p>
              <p>
                {patientData?.patientStateNew
                  ? JSON.parse(patientData?.patientStateNew)?.label
                  : patientData.patientState}
              </p>
            </div>
            {/* <div className="flex">
              <p className="font-[600] w-[150px]">Country: </p>
              <p>{patientData.patientCountry}</p>
            </div> */}
            <div className="flex">
              <p className="font-[600] w-[150px]">Zipcode: </p>
              <p>{patientData.patientZipCode}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex">
              <p className="font-[600] w-[150px]">Email Id: </p>
              <p className="text-[14px]">{patientData.patientEmail}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Local Address: </p>
              <p className="break-word text-[14px]">
                {patientData.patientLocalAddress}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Permanent Address: </p>
              <p className="break-word text-[14px]">
                {patientData.patientPermanentAddress}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Created On: </p>
              <p className="break-word text-[14px]">
                {`${date(patientData?.createdAt)} ${time(
                  patientData?.createdAt
                )}`}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Updated On: </p>
              <p className="break-word text-[14px]">
                {`${date(patientData?.updatedAt)} ${time(
                  patientData?.updatedAt
                )}`}
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
    setPatientId("");
    setPatientName("");
    setPatientEmail("");
    setRelativeCategory("Father");
    setPatientFatherName("");
    setPatientHusbandName("");
    setPatientCareOfName("");
    // setPatientDateOfBirth(data?.patientDateOfBirth);
    setPatientAge("");
    setPatientPhone("");
    setPatientPhone2("");
    setPatientHeight("");
    setPatientWeight("");
    setPatientBloodGroup("");
    setPatientLocalAddress("");
    setPatientPermanentAddress("");
    setPatientCity("");
    setPatientState("");
    setPatientCountry("");
    setPatientZipCode("");
    setPatientGender();

    setSameAsLocalAddress(false);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    setPatientId(data?.patientId);
    setPatientName(data?.patientName);
    setPatientEmail(data?.patientEmail);
    setPatientFatherName(data?.patientFatherName);
    setPatientHusbandName(data?.patientHusbandName);
    setPatientCareOfName(data?.patientCareOfName);
    setRelativeCategory(data?.relativeCategory);
    // setPatientDateOfBirth(data?.patientDateOfBirth);
    setPatientAge(data?.patientAge);
    setPatientPhone(data?.patientPhone);
    setPatientPhone2(data?.patientPhone2);
    setPatientHeight(data?.patientHeight);
    setPatientWeight(data?.patientWeight);
    setPatientBloodGroup(data?.patientBloodGroup);
    setPatientLocalAddress(data?.patientLocalAddress);
    setPatientPermanentAddress(data?.patientPermanentAddress);
    if (data?.patientCityNew) {
      setPatientCity(JSON.parse(data?.patientCityNew));
    } else {
      setPatientCity(data?.patientCity);
    }
    if (data?.patientStateNew) {
      setPatientState(JSON.parse(data?.patientStateNew));
    } else {
      setPatientState(data?.patientState);
    }

    // setPatientCountry(data?.patientCountry);
    setPatientZipCode(data?.patientZipCode);
    setPatientGender(data?.patientGender);
    setOpenUpdateModal(true);
    setSameAsLocalAddress(false);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  // Add Patient
  React.useEffect(() => {
    if (responseAddPatient.isSuccess) {
      dispatch(createPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseAddPatient?.data?.message);
      handleClickSnackbarSuccess();
      handleClose();

      setPatientImage();
      setPatientGender();

      setRelativeCategory("Father");
      reset();
    } else if (responseAddPatient.isError) {
      setSnackBarSuccessWarning(responseAddPatient?.error?.data?.error);
      handleClickSnackbarWarning();
    }
  }, [responseAddPatient.isSuccess, responseAddPatient.isError]);

  const handleAddPatient = (data) => {
    const patientData = {
      ...data,
      patientGender,
      patientImage,
      patientPhone,
      patientPhone2,
      patientAge,
      patientLocalAddress,
      patientPermanentAddress,
      relativeCategory,
      patientCity,
      patientState,
      // patientDateOfBirth,
    };

    const formData = new FormData();

    formData.append("patientName", patientData?.patientName);
    formData.append("patientEmail", patientData?.patientEmail);
    formData.append("relativeCategory", patientData?.relativeCategory);
    formData.append(
      "patientFatherName",
      patientData?.patientFatherName ? patientData?.patientFatherName : ""
    );
    formData.append(
      "patientHusbandName",
      patientData?.patientHusbandName ? patientData?.patientHusbandName : ""
    );
    formData.append(
      "patientCareOfName",
      patientData?.patientCareOfName ? patientData?.patientCareOfName : ""
    );
    // formData.append(
    //   "patientDateOfBirth",
    //   patientData?.patientDateOfBirth?.startDate
    // );
    formData.append("patientDateOfBirth", "NODATA");
    formData.append("patientAge", patientData?.patientAge);
    formData.append("patientPhone", patientData?.patientPhone);
    // formData.append("patientPhone2", patientData?.patientPhone2);
    formData.append("patientHeight", patientData?.patientHeight);
    formData.append("patientWeight", patientData?.patientWeight);
    formData.append("patientGender", patientData?.patientGender);
    formData.append("patientBloodGroup", patientData?.patientBloodGroup);
    formData.append("patientLocalAddress", patientData?.patientLocalAddress);
    formData.append(
      "patientPermanentAddress",
      patientData?.patientPermanentAddress
    );
    formData.append("patientCityNew", JSON.stringify(patientData?.patientCity));
    formData.append(
      "patientStateNew",
      JSON.stringify(patientData?.patientState)
    );
    // formData.append("patientCountry", patientData?.patientCountry);
    formData.append("patientZipCode", patientData?.patientZipCode);
    formData.append("patientImage", patientData?.patientImage);
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
    addPatient(formData);
  };

  // console.log(patientPermanentAddress);

  const modalADDPatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Add Patient Information</h2>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={handleSubmit(handleAddPatient)}
      >
        <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Patients Name *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter patient name"
              {...register("patientName", { required: true })}
            />
            {errors.patientName && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Email</label>
            <input
              className="py-[10px] outline-none border-b"
              type="email"
              placeholder="Enter patient email"
              {...register("patientEmail")}
            />
            {/* {errors.patientEmail && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Age </label>
            {/* <DatePicker
              className="py-[10px] outline-none border-b"
              required
              selected={patientDateOfBirth.startDate}
              maxDate={new Date()}
              onChange={(date) =>
                setPatientDateOfBirth({
                  startDate: date,
                })
              }
            /> */}
            <input
              className="py-[10px] outline-none border-b"
              // type='number'
              placeholder="Enter age"
              // {...register("patientAge", { required: true })}
              required
              value={patientAge}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPatientAge(value);
              }}
            />
            {/* {errors.patientAge && (
              <span className='text-[red]'>This field is required</span>
            )} */}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Relative category *</label>
            <select
              className="py-[11.5px] outline-none border-b bg-transparent"
              onChange={(e) => setRelativeCategory(e.target.value)}
            >
              <option>Father</option>
              <option>Husband</option>
              <option>Care Of</option>
            </select>
          </div>
          {relativeCategory === "Father" && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px]">Father Name</label>
              <input
                className="py-[10px] outline-none border-b"
                type="text"
                placeholder="Enter patient father name"
                {...register("patientFatherName")}
              />
              {errors.patientFatherName && (
                <span className="text-[red]">This field is required</span>
              )}
            </div>
          )}
          {relativeCategory === "Husband" && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px]">Husband Name</label>
              <input
                className="py-[10px] outline-none border-b"
                type="text"
                placeholder="Enter patient husband name"
                {...register("patientHusbandName")}
              />
              {errors.patientHusbandName && (
                <span className="text-[red]">This field is required</span>
              )}
            </div>
          )}
          {relativeCategory === "Care Of" && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px]">Care Of Name</label>
              <input
                className="py-[10px] outline-none border-b"
                type="text"
                placeholder="Enter patient (care of) name"
                {...register("patientCareOfName")}
              />
              {errors.patientCareOfName && (
                <span className="text-[red]">This field is required</span>
              )}
            </div>
          )}
          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Date Of Birth *</label>
            <DatePicker
              className='py-[10px] outline-none border-b'
              selected={patientDateOfBirth.startDate}
              maxDate={new Date()}
              onChange={(date) =>
                setPatientDateOfBirth({
                  startDate: date,
                })
              }
            />
            <input
              className="py-[10px] outline-none border-b"
              type="date"
              required
              {...register("patientDateOfBirth", { required: true })}
            />
            {errors.patientDateOfBirth && (
              <span className='text-[red]'>This field is required</span>
            )}
          </div> */}

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Phone *</label>
            <input
              className="py-[10px] outline-none border-b"
              // type='number'
              required
              minLength={10}
              maxLength={10}
              value={patientPhone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPatientPhone(value);
              }}
              placeholder="Enter patient phone number"
              // {...register("patientPhone", {
              //   required: true,
              //   minLength: 10,
              //   maxLength: 10,
              // })}
            />
            {/* {errors.patientPhone && (
              <span className='text-[red]'>
                This field is required with 10 digits
              </span>
            )} */}
          </div>
          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Phone Number of Attendent</label>
            <input
              className="py-[10px] outline-none border-b"
              
              minLength={10}
              maxLength={10}
              value={patientPhone2}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPatientPhone2(value);
              }}
              placeholder="Enter phone number of attendent"
              
            />
            
          </div> */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Height</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter height"
              {...register("patientHeight")}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Weight</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter weight"
              {...register("patientWeight")}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Patient Gender *</label>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={patientGender}
              name="radio-buttons-group"
              onChange={(e) => setPatientGender(e.target.value)}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                required={true}
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                required={true}
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
                required={true}
              />
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Blood Group *</label>
            <select
              className="py-[11.5px] outline-none border-b bg-transparent"
              {...register("patientBloodGroup", { required: true })}
            >
              <option>Not Available</option>
              <option>O positive</option>
              <option>O negative</option>
              <option>A positive</option>
              <option>A negative</option>
              <option>B positive</option>
              <option>B negative</option>
              <option>AB positive</option>
              <option>AB negative</option>
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Patient Photo</label>
            <div className="flex flex-col gap-[1rem]">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => setPatientImage(e.target.files[0])}
              />

              <img
                className="object-contain w-[100px] h-[100px]"
                src={
                  patientImage ? URL.createObjectURL(patientImage) : placeholder
                }
                alt="placeholderimg"
              />
            </div>
          </div>
        </div>

        <h3 className="border-b py-[1rem]">Patient Address Details</h3>
        <div className="grid grid-cols-2 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Local Address</label>
            <textarea
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter patient local address"
              value={patientLocalAddress}
              // {...register("patientLocalAddress")}
              onChange={(e) => setPatientLocalAddress(e.target.value)}
            />
            {/* {errors.patientLocalAddress && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="flex gap-[1rem]">
              <label className="text-[14px]">Permanent Address</label>
              <div className="flex gap-[10px] items-center">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setSameAsLocalAddress(e.target.checked);
                    if (e.target.checked === true) {
                      setPatientPermanentAddress(patientLocalAddress);
                    } else if (e.target.checked === false) {
                      setPatientPermanentAddress("");
                    }
                  }}
                />
                <p className="text-[12px]">Same as local address</p>
              </div>
            </div>
            <textarea
              className="py-[10px] outline-none border-b"
              type="text"
              value={patientPermanentAddress}
              disabled={sameAsLocalAddress === true ? true : false}
              placeholder="Enter patient permanent address"
              // {...register("patientPermanentAddress")}
              onChange={(e) => setPatientPermanentAddress(e.target.value)}
            />
            {/* {errors.patientPermanentAddress && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">State</label>
            <Select
              options={renderedStatesForDropdown}
              onChange={setPatientState}
            />
            {/* <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter patient state"
              {...register("patientState")}
            /> */}
            {/* {errors.patientState && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">City</label>
            <Select
              options={renderedCitiesByStateForDropdown}
              onChange={setPatientCity}
            />
            {/* <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter patient city"
              {...register("patientCity")}
            /> */}
            {/* {errors.patientCity && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>

          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Country</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter patient country"
              {...register("patientCountry")}
            />
            
          </div> */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Zipcode</label>
            <input
              className="py-[10px] outline-none border-b"
              type="number"
              placeholder="Enter patient zipcode"
              {...register("patientZipCode")}
            />
            {/* {errors.patientZipcode && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>
        </div>
        <div className="flex gap-[1rem] items-center">
          <button
            type="submit"
            className="buttonFilled"
          >{`Save & Print >`}</button>
          <button className="buttonOutlined">{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  // Update Patient
  React.useEffect(() => {
    if (responseUpdatePatientById.isSuccess) {
      dispatch(updatePatientChange(Math.random()));
      setSnackBarSuccessMessage(responseUpdatePatientById?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseUpdateModal();

      setPatientImage();
      setPatientGender();
      reset();
    } else if (responseUpdatePatientById.isError) {
      setSnackBarSuccessWarning(responseUpdatePatientById?.error?.data?.error);
      handleClickSnackbarWarning();
    }
  }, [responseUpdatePatientById.isSuccess, responseUpdatePatientById.isError]);

  // console.log(responseUpdatePatientById);

  const handleUpdatePatient = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("patientName", patientName);
    formData.append("patientEmail", patientEmail);
    formData.append("relativeCategory", relativeCategory);
    formData.append(
      "patientFatherName",
      relativeCategory !== "Father" ? "" : patientFatherName
    );
    formData.append(
      "patientHusbandName",
      relativeCategory !== "Husband" ? "" : patientHusbandName
    );
    formData.append(
      "patientCareOfName",
      relativeCategory !== "Care Of" ? "" : patientCareOfName
    );
    // formData.append("patientDateOfBirth", patientDateOfBirth?.startDate);
    formData.append("patientDateOfBirth", "NODATA");
    formData.append("patientAge", patientAge);
    formData.append("patientPhone", patientPhone);
    // formData.append("patientPhone2", patientPhone2);
    formData.append("patientHeight", patientHeight);
    formData.append("patientWeight", patientWeight);
    formData.append("patientGender", patientGender);
    formData.append("patientBloodGroup", patientBloodGroup);
    formData.append("patientLocalAddress", patientLocalAddress);
    formData.append("patientPermanentAddress", patientPermanentAddress);

    formData.append("patientCityNew", JSON.stringify(patientCity));
    formData.append("patientStateNew", JSON.stringify(patientState));
    // formData.append("patientCountry", patientCountry);
    formData.append("patientZipCode", patientZipCode);
    formData.append("patientImage", patientImage);
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
      id: patientId,
      data: formData,
    };

    // console.log(updateData);

    updatePatientById(updateData);
  };

  const modalUpdatePatient = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Update Patient Information</h2>
      <form className="flex flex-col gap-[1rem]" onSubmit={handleUpdatePatient}>
        <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Patients Name</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              value={patientName}
              placeholder="Enter patient name"
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Email</label>
            <input
              className="py-[10px] outline-none border-b"
              type="email"
              value={patientEmail}
              placeholder="Enter patient email"
              onChange={(e) => setPatientEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Age</label>
            {/* <DatePicker
              className="py-[10px] outline-none border-b"
              required
              selected={patientDateOfBirth.startDate}
              maxDate={new Date()}
              onChange={(date) =>
                setPatientDateOfBirth({
                  startDate: date,
                })
              }
            /> */}
            <input
              className="py-[10px] outline-none border-b"
              // type='number'
              placeholder="Enter age"
              // value={patientAge}
              // onChange={(e) => setPatientAge(e.target.value)}
              required
              value={patientAge}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPatientAge(value);
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Relative category *</label>
            <select
              value={relativeCategory}
              className="py-[11.5px] outline-none border-b bg-transparent"
              onChange={(e) => setRelativeCategory(e.target.value)}
            >
              <option>Father</option>
              <option>Husband</option>
              <option>Care Of</option>
            </select>
          </div>
          {relativeCategory === "Father" && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px]">Father Name</label>
              <input
                className="py-[10px] outline-none border-b"
                type="text"
                placeholder="Enter patient father name"
                value={patientFatherName}
                onChange={(e) => setPatientFatherName(e.target.value)}
              />
            </div>
          )}
          {relativeCategory === "Husband" && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px]">Husband Name</label>
              <input
                className="py-[10px] outline-none border-b"
                type="text"
                placeholder="Enter patient husband name"
                value={patientHusbandName}
                onChange={(e) => setPatientHusbandName(e.target.value)}
              />
            </div>
          )}
          {relativeCategory === "Care Of" && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px]">Care Of Name</label>
              <input
                className="py-[10px] outline-none border-b"
                type="text"
                placeholder="Enter patient (care of) name"
                value={patientCareOfName}
                onChange={(e) => setPatientCareOfName(e.target.value)}
              />
            </div>
          )}
          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Date Of Birth</label>
            <DatePicker
              className='py-[10px] outline-none border-b'
              selected={patientDateOfBirth.startDate}
              maxDate={new Date()}
              onChange={(date) =>
                setPatientDateOfBirth({
                  startDate: date,
                })
              }
            />
            <input
              className="py-[10px] outline-none border-b"
              type="date"
              required
              value={patientDateOfBirth}
              onChange={(e) => setPatientDateOfBirth(e.target.value)}
            />
          </div> */}

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Phone</label>
            <input
              className="py-[10px] outline-none border-b"
              // type='number'
              required
              minLength={10}
              maxLength={10}
              placeholder="Enter patient phone number"
              value={patientPhone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPatientPhone(value);
              }}
              // onChange={(e) => setPatientPhone(e.target.value)}
            />
          </div>
          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Phone number of attendent</label>
            <input
              className="py-[10px] outline-none border-b"
              // type='number'
              minLength={10}
              maxLength={10}
              placeholder="Enter phone number of attendent"
              value={patientPhone2}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPatientPhone2(value);
              }}
              // onChange={(e) => setPatientPhone2(e.target.value)}
            />
          </div> */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Height</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter height"
              value={patientHeight}
              onChange={(e) => setPatientHeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Weight</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter weight"
              value={patientWeight}
              onChange={(e) => setPatientWeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Patient Gender</label>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={patientGender}
              name="radio-buttons-group"
              onChange={(e) => setPatientGender(e.target.value)}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                required={true}
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                required={true}
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
                required={true}
              />
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Blood Group</label>
            <select
              className="py-[11.5px] outline-none border-b bg-transparent"
              value={patientBloodGroup}
              onChange={(e) => setPatientBloodGroup(e.target.value)}
            >
              <option>Not Available</option>
              <option>O positive</option>
              <option>O negative</option>
              <option>A positive</option>
              <option>A negative</option>
              <option>B positive</option>
              <option>B negative</option>
              <option>AB positive</option>
              <option>AB negative</option>
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Patient Photo</label>
            <div className="flex flex-col gap-[1rem]">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => setPatientImage(e.target.files[0])}
              />

              <img
                className="object-contain w-[100px] h-[100px]"
                src={
                  patientImage ? URL.createObjectURL(patientImage) : placeholder
                }
                alt="placeholderimg"
              />
            </div>
          </div>
        </div>

        <h3 className="border-b py-[1rem]">Patient Address Details</h3>
        <div className="grid grid-cols-2 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Local Address</label>
            <textarea
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter patient local address"
              value={patientLocalAddress}
              // {...register("patientLocalAddress")}
              onChange={(e) => setPatientLocalAddress(e.target.value)}
            />
            {/* {errors.patientLocalAddress && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="flex gap-[1rem]">
              <label className="text-[14px]">Permanent Address</label>
              <div className="flex gap-[10px] items-center">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setSameAsLocalAddress(e.target.checked);
                    if (e.target.checked === true) {
                      setPatientPermanentAddress(patientLocalAddress);
                    } else if (e.target.checked === false) {
                      setPatientPermanentAddress("");
                    }
                  }}
                />
                <p className="text-[12px]">Same as local address</p>
              </div>
            </div>
            <textarea
              className="py-[10px] outline-none border-b"
              type="text"
              value={patientPermanentAddress}
              disabled={sameAsLocalAddress === true ? true : false}
              placeholder="Enter patient permanent address"
              // {...register("patientPermanentAddress")}
              onChange={(e) => setPatientPermanentAddress(e.target.value)}
            />
            {/* {errors.patientPermanentAddress && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>
          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Local Address</label>
            <textarea
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter patient local address'
              value={patientLocalAddress}
              onChange={(e) => setPatientLocalAddress(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Permanent Address</label>
            <textarea
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter patient permanent address'
              value={patientPermanentAddress}
              onChange={(e) => setPatientPermanentAddress(e.target.value)}
            />
          </div> */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">State</label>
            <Select
              options={renderedStatesForDropdown}
              onChange={setPatientState}
              defaultValue={patientState}
            />
            {/* <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter patient state"
              {...register("patientState")}
            /> */}
            {/* {errors.patientState && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">City</label>
            <Select
              options={renderedCitiesByStateForDropdown}
              onChange={setPatientCity}
              defaultValue={patientCity}
            />
            {/* <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter patient city"
              {...register("patientCity")}
            /> */}
            {/* {errors.patientCity && (
              <span className="text-[red]">This field is required</span>
            )} */}
          </div>

          {/* <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Country</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              placeholder="Enter patient country"
              value={patientCountry}
              onChange={(e) => setPatientCountry(e.target.value)}
            />
          </div> */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Zipcode</label>
            <input
              className="py-[10px] outline-none border-b"
              type="number"
              placeholder="Enter patient zipcode"
              value={patientZipCode}
              onChange={(e) => setPatientZipCode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-[1rem] items-center">
          <button type="submit" className="buttonFilled">{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  const [search, setSearch] = React.useState("");
  const [search2, setSearch2] = React.useState("");
  const [search3, setSearch3] = React.useState("");

  // const filteredArray = patients?.filter((data) => {
  //   if (search !== "") {
  //     const userSearch = search.toLowerCase();
  //     const searchInData = data?.patientName?.toLowerCase();

  //     return searchInData?.startsWith(userSearch);
  //   }
  //   return data;
  // });

  const mappedPatientData = patients;

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
      label: "Patient Email",
      render: (list) => list.patientEmail,
    },
    {
      label: "Patient Phone",
      render: (list) => list.patientPhone,
    },
    {
      label: "Date Created",
      render: (list) => date(list.createdAt),
    },
    {
      label: "Blood Group",
      render: (list) => list.patientBloodGroup,
    },
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
    return list.patientName;
  };

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      dispatch(patientUHIDforSearchChange(searchTerm));
    }, 1000),
    [search]
  );
  const handleSearch1 = useCallback(
    debounce((searchTerm) => {
      dispatch(patientNameForSearchChange(searchTerm));
    }, 1000),
    [search2]
  );
  const handleSearch2 = useCallback(
    debounce((searchTerm) => {
      dispatch(patientMobileNumberForSearchChange(searchTerm));
    }, 1000),
    [search3]
  );

  return (
    <Suspense fallback={<>...</>}>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <div className="flex justify-between">
          <h2 className="border-b-[4px] border-[#3497F9]">Patient</h2>
          <button
            onClick={handleOpen}
            className="bg-[#3497F9] text-white p-[10px] rounded-md"
          >
            + Add Patient
          </button>
        </div>
        <div className="grid grid-cols-2 gap-[1rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
              <FaSearch className="text-[#56585A]" />
              <input
                value={search}
                className="bg-transparent outline-none"
                placeholder="Search by UHID"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearch2("");
                  setSearch3("");
                  // const searchTerm = e.target.value;
                  handleSearch(e.target.value);
                  dispatch(patientNameForSearchChange(""));
                  dispatch(patientMobileNumberForSearchChange(""));
                }}
              />
              {/* <button
                className="border-l-[2px] border-gray pl-[4px] hover:underline"
                onClick={() => dispatch(opdPatientIdChange(search))}
              >
                Search
              </button> */}
            </div>
            {/* <GrPowerReset
              className="text-[20px] cursor-pointer"
              onClick={() => {
                setSearch("");
                setSearch2("");
                setSearch3("");
                dispatch(patientNameChange(""));
                dispatch(opdPatientIdChange(""));
                dispatch(patientNameChange(""));
              }}
            /> */}
          </div>
          <div className="flex items-center gap-[1rem]">
            <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
              <FaSearch className="text-[#56585A]" />
              <input
                value={search2}
                className="bg-transparent outline-none"
                placeholder="Search by patient name"
                onChange={(e) => {
                  setSearch2(e.target.value);
                  setSearch("");
                  setSearch3("");
                  // handleSearch1(e.target.value);
                  handleSearch1(e.target.value);
                  dispatch(patientMobileNumberForSearchChange(""));
                  dispatch(patientUHIDforSearchChange(""));
                }}
              />
              {/* <button
                className="border-l-[2px] border-gray pl-[4px] hover:underline"
                onClick={() => dispatch(patientNameChange(search2))}
              >
                Search
              </button> */}
            </div>
            {/* <GrPowerReset
              className="text-[20px] cursor-pointer"
              onClick={() => {
                setSearch("");
                setSearch2("");
                setSearch3("");
                dispatch(patientNameChange(""));
                dispatch(opdPatientIdChange(""));
                dispatch(patientNameChange(""));
              }}
            /> */}
          </div>
          <div className="flex items-center gap-[1rem]">
            <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
              <FaSearch className="text-[#56585A]" />
              <input
                value={search3}
                className="bg-transparent outline-none"
                placeholder="Search by mobile number"
                onChange={(e) => {
                  setSearch3(e.target.value);
                  setSearch("");
                  setSearch2("");
                  handleSearch2(e.target.value);
                  dispatch(patientNameForSearchChange(""));
                  dispatch(patientUHIDforSearchChange(""));
                }}
              />
              {/* <button
                className="border-l-[2px] border-gray pl-[4px] hover:underline"
                onClick={() => dispatch(patientNameChange(search2))}
              >
                Search
              </button> */}
            </div>
            {/* <GrPowerReset
              className="text-[20px] cursor-pointer"
              onClick={() => {
                setSearch("");
                setSearch2("");
                setSearch3("");
                dispatch(patientNameChange(""));
                dispatch(opdPatientIdChange(""));
                dispatch(patientNameChange(""));
              }}
            /> */}
          </div>

          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
        </div>
        <TableWithApi
          data={mappedPatientData}
          config={config}
          keyFn={keyFn}
          pageChange={pageChange}
          limitChange={limitChange}
          page={page}
          limit={limit}
          totalPages={totalPages}
        />
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
              Add Patient
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalADDPatient}
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
              Update Patient
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalUpdatePatient}
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
                Patient Details
              </h1>
              <Link
                // onClick={handleGeneratePdf}
                target="_blank"
                to={patientData?.patientId}
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
            {modalViewPatientDetails}
          </Typography>
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
