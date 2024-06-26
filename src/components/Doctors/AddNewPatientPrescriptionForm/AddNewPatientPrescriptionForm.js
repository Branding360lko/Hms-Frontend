import React from "react";
import "./AddNewPatientPrescriptionForm.css";

import Select from "react-select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import placeholder from "../../../assets/imageplaceholder.png";

export default function AddNewPatientPrescriptionForm() {
  return (
    <div className='p-[1rem] flex flex-col gap-[1rem]'>
      <div className='border-b pb-[2rem]'>
        <h2 className='headingBottomUnderline w-fit'>Patient Information</h2>
      </div>

      <form>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Patient Registration No</label>
            <Select
              className='text-[12px] w-full'
              required
              //   options={renderedPatientForDropdownBilling}
              //   onChange={setBillingPatientId}
              //   value={billingPatientId}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Patient Name</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Phone</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Father's Name</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Husband's Name</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Date Of Birth</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Visit Time</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Height / Weight</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>

          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Patient Gender</label>
            {/* <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              // value={patientGender}
              name='radio-buttons-group'
              // onChange={(e) => setPatientGender(e.target.value)}
              sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                value='Female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='Male' control={<Radio />} label='Male' />
              <FormControlLabel
                value='Other'
                control={<Radio />}
                label='Other'
              />
            </RadioGroup> */}
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>

          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Blood Pressure</label>

            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Blood Group</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled

              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Profile Image</label>
            <img
              className='w-[100px] h-[100px] object-contain'
              // src={
              //   patientData.patientImage
              //     ? process.env.React_App_Base_Image_Url +
              //       patientData.patientImage
              //     : placeholder
              // }
              src={placeholder}
              alt='patientImage'
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Doctor</label>

            <Select
              className='text-[12px] w-full'
              required
              //   options={renderedPatientForDropdownBilling}
              //   onChange={setBillingPatientId}
              //   value={billingPatientId}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Admitting Doctor Date / Time</label>
            <input
              type='datetime-local'
              className='py-[10px] outline-none border-b w-full'
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Case</label>
            <Select
              className='text-[12px] w-full'
              required
              //   options={renderedPatientForDropdownBilling}
              //   onChange={setBillingPatientId}
              //   value={billingPatientId}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Room No.</label>
            <Select
              className='text-[12px] w-full'
              required
              //   options={renderedPatientForDropdownBilling}
              //   onChange={setBillingPatientId}
              //   value={billingPatientId}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Ward No.</label>
            <Select
              className='text-[12px] w-full'
              required
              //   options={renderedPatientForDropdownBilling}
              //   onChange={setBillingPatientId}
              //   value={billingPatientId}
            />
          </div>
        </div>

        <div className='border-b pb-[1rem]'>
          <h3 className='headingBottomUnderline w-fit'>Address Details</h3>
        </div>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Local Address</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              placeholder='Enter local address'
              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Permanent Address</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              placeholder='Enter permanent address'
              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>City</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              placeholder='Enter city'
              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>State</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              placeholder='Enter zip'
              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Country</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              placeholder='Enter zip'
              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Zipcode</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              placeholder='Enter zip'
              //   value={billingPatientName}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
