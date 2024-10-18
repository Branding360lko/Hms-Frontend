import "./AddPatientForm.css";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import placeholder from "../../../assets/imageplaceholder.png";

import { useDispatch, useSelector } from "react-redux";
import Snackbars from "../../SnackBar";
import { useAddPatientMutation } from "../../../Store/Services/PatientService";
import { createPatientChange } from "../../../Store/Slices/PatientSlice";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Country, State, City } from "country-state-city";

import Select from "react-select";

export default function AddPatientForm() {
  const dispatch = useDispatch();
  const [addPatient, responseAddPatient] = useAddPatientMutation();
  // const editor = useRef(null);

  const [loading, setLoading] = useState(false);
  // const { doctors } = useSelector((state) => state.DoctorState);

  // const config = useMemo(
  //   () => ({
  //     readonly: false,
  //   }),
  //   []
  // );

  const { adminLoggedInData } = useSelector((state) => state.AdminState);

  const [patientId, setPatientId] = React.useState("");
  const [patientIdToDelete, setPatientIdToDelete] = React.useState("");
  const [patientData, setPatientData] = React.useState("");

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
  const [patientAdharCard, setPatientAdharCard] = React.useState();
  const [patientAgeMonth, setPatientAgeMonth] = React.useState();
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

  React.useEffect(() => {
    // console.log(sameAsLocalAddress);
    if (sameAsLocalAddress === true) {
      setPatientPermanentAddress(patientLocalAddress);
    }
  }, [sameAsLocalAddress, patientLocalAddress]);

  const [allStates, setAllStates] = React.useState([]);
  const [allCitiesByStates, setAllCitiesByStates] = React.useState([]);

  // console.log(allCitiesByStates);
  React.useEffect(() => {
    setAllStates(State.getStatesOfCountry("IN"));
  }, []);

  React.useEffect(() => {
    setAllCitiesByStates(City.getCitiesOfState("IN", patientState.value));
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

  // const [patientAdmitCategory, setPatientAdminCaetgory] =
  //   React.useState("OPD Patient");
  // const [patientCase, setPatientCase] = React.useState("");
  // const [patientAdmittingDoctor, setPatientAdmittingDoctor] = React.useState({
  //   value: "",
  //   label: "",
  // });
  // const [patientVisitingDoctor, setPatientVisitingDoctor] = React.useState({
  //   value: "",
  //   label: "",
  // });

  const [submitButton, setSubmitButton] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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
    if (responseAddPatient.isSuccess) {
      dispatch(createPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseAddPatient?.data?.message);
      handleClickSnackbarSuccess();
      setPatientPhone("");
      // setPatientPhone2("");
      setPatientAge("");
      setPatientLocalAddress("");
      setPatientPermanentAddress("");
      setPatientCity({
        value: "",
        label: "",
      });
      setPatientState({
        value: "",
        label: "",
      });
      setPatientImage();
      setPatientGender();
      // setPatientCase("");
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
      reset();
    } else if (responseAddPatient.isError) {
      setSnackBarSuccessWarning(responseAddPatient?.error?.data?.error);
      handleClickSnackbarWarning();
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
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
    formData.append("patientDateOfBirth", "NODATA");
    formData.append("patientAge", patientData?.patientAge);
    formData.append("patientAgeMonth", patientAgeMonth ? patientAgeMonth : 0);
    formData.append("patientPhone", patientData?.patientPhone);
    formData.append("patientAdharNumber", patientAdharCard);
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

    addPatient(formData);
    setLoading(true);
  };

  return (
    <Suspense fallback={<>...</>}>
      <>
        <div className="flex flex-col gap-[1rem] p-[1rem]">
          <div className="flex justify-between">
            <h2 className="border-b-[4px] border-[#3497F9]">Add New Patient</h2>
          </div>
          <div className="flex flex-col w-full text-[#3E454D] items-start text-start gap-[1rem] px-[10px] pb-[2rem]">
            {loading ? (
              "Loading..."
            ) : (
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
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px]">Age Year*</label>

                    <input
                      className="py-[10px] outline-none border-b"
                      placeholder="Enter Age Year"
                      required
                      value={patientAge}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPatientAge(value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px]">Age Month*</label>

                    {/* <input
                      className="py-[10px] outline-none border-b"
                      placeholder="Enter age"
                      required
                      value={patientAge}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPatientAge(value);
                      }}
                    /> */}
                    <select
                      className="py-[11.5px]  outline-none border-b bg-transparent"
                      onChange={(e) =>
                        setPatientAgeMonth(Number(e.target.value))
                      }
                    >
                      <option className="px-2">Select months</option>
                      <option className="px-2" value="0">
                        0 months
                      </option>
                      <option className="px-2" value="1">
                        1 month
                      </option>
                      <option className="px-2" value="2">
                        2 months
                      </option>
                      <option className="px-2" value="3">
                        3 months
                      </option>
                      <option className="px-2" value="4">
                        4 months
                      </option>
                      <option className="px-2" value="5">
                        5 months
                      </option>
                      <option className="px-2" value="6">
                        6 months
                      </option>
                      <option className="px-2" value="7">
                        7 months
                      </option>
                      <option className="px-2" value="8">
                        8 months
                      </option>
                      <option className="px-2" value="9">
                        9 months
                      </option>
                      <option className="px-2" value="10">
                        10 months
                      </option>
                      <option className="px-2" value="11">
                        11 months
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px]">Relative category</label>
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
                        <span className="text-[red]">
                          This field is required
                        </span>
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
                        <span className="text-[red]">
                          This field is required
                        </span>
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
                        <span className="text-[red]">
                          This field is required
                        </span>
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
                    />
                  </div>{" "}
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px]">Aadhaar Card No</label>
                    <input
                      className="py-[10px] outline-none border-b"
                      // type='number'
                    
                      minLength={12}
                      maxLength={12}
                      value={patientAdharCard}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPatientAdharCard(Number(value));
                      }}
                      placeholder="Enter patient Aadhaar Card Number"
                    />
                  </div>
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
                        required={true}
                        label="Female"
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
                          patientImage
                            ? URL.createObjectURL(patientImage)
                            : placeholder
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
                      onChange={(e) =>
                        setPatientPermanentAddress(e.target.value)
                      }
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
                  >{`Save >`}</button>
                  {/* <button className='buttonOutlined'>{`Save >`}</button> */}
                </div>
              </form>
            )}
          </div>
        </div>
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
      </>
    </Suspense>
  );
}
