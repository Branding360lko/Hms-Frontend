import "./EditPatientForm.css";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import placeholder from "../../../../assets/imageplaceholder.png";

import { useDispatch, useSelector } from "react-redux";
import Snackbars from "../../../SnackBar";
import {
  useUpdatePatientByIdMutation,
  useGetPatientByIdQuery,
} from "../../../../Store/Services/PatientService";
import { updatePatientChange } from "../../../../Store/Slices/PatientSlice";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Select from "react-select";

export default function EditPatientForm({ patientId, setViewEditForm }) {
  const dispatch = useDispatch();

  const responseGetPatientById = useGetPatientByIdQuery(patientId);

  const [updatePatientById, responseUpdatePatientById] =
    useUpdatePatientByIdMutation();

  const [loading, setLoading] = useState(false);

  const { adminLoggedInData } = useSelector((state) => state.AdminState);

  const editor = useRef(null);

  const { patients } = useSelector((state) => state.PatientState);
  const { doctors } = useSelector((state) => state.DoctorState);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );
  //   console.log(responseGetPatientById);

  // const [patientAdmitCategory, setPatientAdminCaetgory] =
  //   React.useState("OPD Patient");
  // const [patientCase, setPatientCase] = React.useState("");
  const [patientName, setPatientName] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const [patientFatherName, setPatientFatherName] = React.useState("");
  const [patientHusbandName, setPatientHusbandName] = React.useState("");
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

  const [submitButton, setSubmitButton] = React.useState("");

  React.useEffect(() => {
    // console.log(sameAsLocalAddress);
    if (sameAsLocalAddress === true) {
      setPatientPermanentAddress(patientLocalAddress);
    }
  }, [sameAsLocalAddress, patientLocalAddress]);

  useEffect(() => {
    if (responseGetPatientById.isSuccess) {
      // setPatientAdminCaetgory(
      //   responseGetPatientById?.currentData?.patientAdmitCategory
      // );
      // setPatientCase(responseGetPatientById?.currentData?.patientCase);
      setPatientGender(responseGetPatientById?.currentData?.patientGender);
      setPatientName(responseGetPatientById?.currentData?.patientName);
      setPatientEmail(responseGetPatientById?.currentData?.patientEmail);
      setPatientFatherName(
        responseGetPatientById?.currentData?.patientFatherName
      );
      setPatientHusbandName(
        responseGetPatientById?.currentData?.patientHusbandName
      );
      setPatientAge(responseGetPatientById?.currentData?.patientAge);
      setPatientPhone(responseGetPatientById?.currentData?.patientPhone);
      setPatientPhone2(responseGetPatientById?.currentData?.patientPhone2);
      setPatientHeight(responseGetPatientById?.currentData?.patientHeight);
      setPatientWeight(responseGetPatientById?.currentData?.patientWeight);
      setPatientBloodGroup(
        responseGetPatientById?.currentData?.patientBloodGroup
      );
      // setPatientCase(responseGetPatientById?.currentData?.patientCase);
      setPatientLocalAddress(
        responseGetPatientById?.currentData?.patientLocalAddress
      );
      setPatientPermanentAddress(
        responseGetPatientById?.currentData?.patientPermanentAddress
      );
      setPatientCity(responseGetPatientById?.currentData?.patientCity);
      setPatientState(responseGetPatientById?.currentData?.patientState);
      setPatientCountry(responseGetPatientById?.currentData?.patientCountry);
      setPatientZipCode(responseGetPatientById?.currentData?.patientZipCode);
    }
  }, [responseGetPatientById.isSuccess]);

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

  React.useEffect(() => {
    if (responseUpdatePatientById.isSuccess) {
      dispatch(updatePatientChange(Math.random()));
      setSnackBarSuccessMessage(responseUpdatePatientById?.data?.message);
      handleClickSnackbarSuccess();
      responseGetPatientById.refetch();
      setTimeout(() => {
        setViewEditForm(false);
        setLoading(false);
      }, [1000]);
    } else if (responseUpdatePatientById.isError) {
      setSnackBarSuccessWarning(responseUpdatePatientById?.error?.data?.error);
      handleClickSnackbarWarning();
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    }
  }, [responseUpdatePatientById.isSuccess, responseUpdatePatientById.isError]);

  // Update Patient
  // React.useEffect(() => {
  //   if (responseUpdatePatientById.isSuccess) {
  //     dispatch(updatePatientChange(Math.random()));
  //     setSnackBarSuccessMessage(responseUpdatePatientById?.data?.message);
  //     handleClickSnackbarSuccess();

  //     setPatientImage();
  //     setPatientGender("Female");
  //     reset();
  //   } else if (responseUpdatePatientById.isError) {
  //     setSnackBarSuccessWarning(responseUpdatePatientById?.error?.data?.error);
  //     handleClickSnackbarWarning();
  //   }
  // }, [responseUpdatePatientById.isSuccess, responseUpdatePatientById.isError]);

  // console.log(responseUpdatePatientById);

  const handleUpdatePatient = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("patientName", patientName);
    formData.append("patientEmail", patientEmail);
    formData.append("patientFatherName", patientFatherName);
    formData.append("patientHusbandName", patientHusbandName);
    // formData.append("patientDateOfBirth", patientDateOfBirth?.startDate);
    formData.append("patientDateOfBirth", "NODATA");
    formData.append("patientAge", patientAge);
    formData.append("patientPhone", patientPhone);
    formData.append("patientPhone2", patientPhone2);
    formData.append("patientHeight", patientHeight);
    formData.append("patientWeight", patientWeight);
    formData.append("patientGender", patientGender);
    formData.append("patientBloodGroup", patientBloodGroup);
    formData.append("patientLocalAddress", patientLocalAddress);
    formData.append("patientPermanentAddress", patientPermanentAddress);
    formData.append("patientCity", patientCity);
    formData.append("patientState", patientState);
    formData.append("patientCountry", patientCountry);
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

    setLoading(true);

    updatePatientById(updateData);
  };

  // const renderedAdmittingDoctorForDropdown = doctors?.map((data) => {
  //   return {
  //     value: data.doctorId,
  //     label: `${data.doctorName} / ${data.doctorId}`,
  //   };
  // });
  return (
    <Suspense fallback={<>...</>}>
      <>
        <div className='flex justify-start'>
          <button
            className='buttonOutlined'
            onClick={() => setViewEditForm(false)}>
            {`< Back`}
          </button>
        </div>
        {responseGetPatientById.isLoading ? (
          "Loading..."
        ) : (
          <div className='flex flex-col gap-[1rem] p-[1rem]'>
            <div className='flex justify-between'>
              <h2 className='border-b-[4px] border-[#3497F9]'>Edit Patient</h2>
            </div>
            <div className='flex flex-col w-full text-[#3E454D] items-start text-start gap-[1rem] px-[10px] pb-[2rem]'>
              {loading ? (
                "Loading..."
              ) : (
                <form
                  className='flex flex-col gap-[1rem]'
                  onSubmit={handleUpdatePatient}>
                  <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Patients Name</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='text'
                        required
                        value={patientName}
                        placeholder='Enter patient name'
                        onChange={(e) => setPatientName(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Email</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='email'
                        value={patientEmail}
                        placeholder='Enter patient email'
                        onChange={(e) => setPatientEmail(e.target.value)}
                      />
                    </div>

                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Father Name</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='text'
                        value={patientFatherName}
                        placeholder='Enter patient father name'
                        onChange={(e) => setPatientFatherName(e.target.value)}
                      />
                    </div>

                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Husband Name</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='text'
                        value={patientHusbandName}
                        placeholder='Enter patient husband name'
                        onChange={(e) => setPatientHusbandName(e.target.value)}
                      />
                    </div>

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
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Age</label>
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
                        className='py-[10px] outline-none border-b'
                        // type='number'
                        placeholder='Enter age'
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
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Phone</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        // type='number'
                        required
                        minLength={10}
                        maxLength={10}
                        placeholder='Enter patient phone number'
                        value={patientPhone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setPatientPhone(value);
                        }}
                        // onChange={(e) => setPatientPhone(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>
                        Phone number of attendent
                      </label>
                      <input
                        className='py-[10px] outline-none border-b'
                        // type='number'
                        minLength={10}
                        maxLength={10}
                        placeholder='Enter phone number of attendent'
                        value={patientPhone2}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setPatientPhone2(value);
                        }}
                        // onChange={(e) => setPatientPhone2(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Height</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='text'
                        placeholder='Enter height'
                        value={patientHeight}
                        onChange={(e) => setPatientHeight(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Weight</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='text'
                        placeholder='Enter weight'
                        value={patientWeight}
                        onChange={(e) => setPatientWeight(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Patient Gender</label>
                      <RadioGroup
                        aria-labelledby='demo-radio-buttons-group-label'
                        value={patientGender}
                        name='radio-buttons-group'
                        onChange={(e) => setPatientGender(e.target.value)}
                        sx={{ display: "flex", flexDirection: "row" }}>
                        <FormControlLabel
                          value='Female'
                          control={<Radio />}
                          label='Female'
                        />
                        <FormControlLabel
                          value='Male'
                          control={<Radio />}
                          label='Male'
                        />
                        <FormControlLabel
                          value='Other'
                          control={<Radio />}
                          label='Other'
                        />
                      </RadioGroup>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Blood Group</label>
                      <select
                        className='py-[11.5px] outline-none border-b bg-transparent'
                        value={patientBloodGroup}
                        onChange={(e) => setPatientBloodGroup(e.target.value)}>
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
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Patient Photo</label>
                      <div className='flex flex-col gap-[1rem]'>
                        <input
                          type='file'
                          accept='image/png, image/gif, image/jpeg'
                          onChange={(e) => setPatientImage(e.target.files[0])}
                        />

                        <img
                          className='object-contain w-[100px] h-[100px]'
                          src={
                            patientImage
                              ? URL.createObjectURL(patientImage)
                              : placeholder
                          }
                          alt='placeholderimg'
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className='border-b py-[1rem]'>
                    Patient Address Details
                  </h3>
                  <div className='grid grid-cols-2 gap-[2rem] border-b pb-[3rem]'>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Local Address</label>
                      <textarea
                        className='py-[10px] outline-none border-b'
                        type='text'
                        placeholder='Enter patient local address'
                        value={patientLocalAddress}
                        // {...register("patientLocalAddress")}
                        onChange={(e) => setPatientLocalAddress(e.target.value)}
                      />
                      {/* {errors.patientLocalAddress && (
              <span className="text-[red]">This field is required</span>
            )} */}
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <div className='flex gap-[1rem]'>
                        <label className='text-[14px]'>Permanent Address</label>
                        <div className='flex gap-[10px] items-center'>
                          <input
                            type='checkbox'
                            onChange={(e) =>
                              setSameAsLocalAddress(e.target.checked)
                            }
                          />
                          <p className='text-[12px]'>Same as local address</p>
                        </div>
                      </div>
                      <textarea
                        className='py-[10px] outline-none border-b'
                        type='text'
                        value={patientPermanentAddress}
                        disabled={sameAsLocalAddress === true ? true : false}
                        placeholder='Enter patient permanent address'
                        // {...register("patientPermanentAddress")}
                        onChange={(e) =>
                          setPatientPermanentAddress(e.target.value)
                        }
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
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>City</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='text'
                        placeholder='Enter patient city'
                        value={patientCity}
                        onChange={(e) => setPatientCity(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>State</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='text'
                        placeholder='Enter patient state'
                        value={patientState}
                        onChange={(e) => setPatientState(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Country</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='text'
                        placeholder='Enter patient country'
                        value={patientCountry}
                        onChange={(e) => setPatientCountry(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <label className='text-[14px]'>Zipcode</label>
                      <input
                        className='py-[10px] outline-none border-b'
                        type='number'
                        placeholder='Enter patient zipcode'
                        value={patientZipCode}
                        onChange={(e) => setPatientZipCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='flex gap-[1rem] items-center'>
                    <button
                      type='submit'
                      className='buttonFilled'>{`Save & Print >`}</button>
                    <button className='buttonOutlined'>{`Save >`}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
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
      </>
    </Suspense>
  );
}
