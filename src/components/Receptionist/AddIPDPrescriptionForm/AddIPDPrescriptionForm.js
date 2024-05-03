import "./AddIPDPrescriptionForm.css";

import Select from "react-select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import placeholder from "../../../assets/imageplaceholder.png";

import * as React from "react";
import Button from "@mui/material/Button";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function AddIPDPrescriptionForm() {
  const { patients } = useSelector((state) => state.PatientState);
  const { doctors } = useSelector((state) => state.DoctorState);
  // const { wards } = useSelector((state) => state.WardState);

  const [patientId, setPatientId] = React.useState("");

  const renderedPatientForDropdownPrescription = patients?.map((data) => {
    return {
      value: data.patientId,
      label: `${data.patientId} / ${data.patientName}`,
    };
  });

  const [patientName, setPatientName] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");
  const [patientFatherName, setPatientFatherName] = React.useState("");
  const [patientHusbandName, setPatientHusbandName] = React.useState("");
  const [patientDateOfBirth, setPatientDateOfBirth] = React.useState("");
  const [patientHeight, setPatientHeight] = React.useState("");
  const [patientWeight, setPatientWeight] = React.useState("");
  const [patientGender, setPatientGender] = React.useState("");
  const [patientBloodGroup, setPatientBloodGroup] = React.useState("");
  const [patientImage, setPatientImage] = React.useState();
  const [visitTime, setVisitTime] = React.useState("");
  const [bloodPressure, setBloodPressure] = React.useState("");
  const [paymentMode, setPaymentMode] = React.useState("");
  const [standardCharge, setStandardCharge] = React.useState("");
  const [admittingDoctorDateTime, setAdmittingDoctorDateTime] =
    React.useState("");
  const [additionalInfo, setAdditionalInfo] = React.useState("");
  const [note, setNote] = React.useState("");

  React.useEffect(() => {
    if (patientId !== "") {
      const patient = patients?.find(
        (data) => data.patientId === patientId?.value
      );
      setPatientName(patient?.patientName);
      setPatientPhone(patient?.patientPhone);
      setPatientFatherName(patient?.patientFatherName);
      setPatientHusbandName(patient?.patientHusbandName);
      setPatientDateOfBirth(patient?.patientDateOfBirth);
      setPatientHeight(patient?.patientHeight);
      setPatientWeight(patient?.patientWeight);
      setPatientGender(patient?.patientGender);
      setPatientBloodGroup(patient?.patientBloodGroup);
      setPatientImage(patient?.patientImage);
    }
  }, [patientId]);

  // console.log(patients);
  const testData = [
    {
      id: `1`,
      name: `test1`,
    },
    {
      id: `2`,
      name: `test2`,
    },
  ];

  const [tests, setTests] = React.useState([]);

  const [test, setTest] = React.useState({
    value: testData[0].id,
    label: testData[0].name,
  });

  const [prescriptions, setPrescriptions] = React.useState([]);

  const handleAddInput = () => {
    setPrescriptions([
      ...prescriptions,
      { medicineName: "", qty: "", times: "" },
    ]);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...prescriptions];
    onChangeValue[index][name] = value;
    setPrescriptions(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...prescriptions];
    newArray.splice(index, 1);
    setPrescriptions(newArray);
  };

  const handleRemoveTestCard = (index) => {
    const newArray = [...tests];
    newArray.splice(index, 1);
    setTests(newArray);
  };

  // console.log(tests);

  const handleAddIPDPatientSubscription = (e) => {
    e.preventDefault();

    const submitData = {
      ipdPrescriptionPatientId: patientId?.value,
      ipdPrescriptionVisitTime: visitTime,
      ipdPrescriptionBloodPressure: bloodPressure,
      ipdPrescriptionPaymentMode: paymentMode,
      ipdPrescriptionStandardCharge: standardCharge,
      ipdPrescriptionAdmittingDoctorDateTime: admittingDoctorDateTime,
      ipdPrescriptionAdditionalInfo: additionalInfo,
      ipdPrescriptionNote: note,
      ipdPrescriptionPrescriptions: prescriptions,
      ipdPrescriptionTests: tests,
    };

    console.log(submitData);
  };

  return (
    <div className='p-[1rem] flex flex-col gap-[1rem]'>
      <div className='border-b pb-[2rem]'>
        <h2 className='headingBottomUnderline w-fit'>Patient Information</h2>
      </div>

      <form onSubmit={handleAddIPDPatientSubscription}>
        <div className='grid grid-cols-3 gap-[2rem] pb-[3rem]'>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Patient Registration No</label>
            <Select
              className='text-[12px] w-full'
              required
              options={renderedPatientForDropdownPrescription}
              onChange={setPatientId}
              value={patientId}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Patient Name</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              value={patientName}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Phone</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              value={patientPhone}
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
              value={patientFatherName}
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
              value={patientHusbandName}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Date Of Birth</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              value={patientDateOfBirth}
            />
          </div>

          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Height / Weight</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              required
              disabled
              value={`${patientHeight} / ${patientWeight}`}
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
              value={patientGender}
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
              value={patientBloodGroup}
              //   onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Profile Image</label>
            <img
              className='w-[100px] h-[100px] object-contain'
              src={
                patientImage
                  ? process.env.React_App_Base_Image_Url + patientImage
                  : placeholder
              }
              // src={placeholder}
              alt='patientImage'
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Doctor Visited</label>
            <select
              required
              className='py-[10px] outline-none border-b bg-transparent'>
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Doctor Visit Time</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='datetime-local'
              onChange={(e) => setVisitTime(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Blood Pressure</label>

            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              placeholder='Enter blood pressure'
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Payment Mode</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='text'
              placeholder='Enter payment mode'
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Standard Charge</label>
            <input
              className='py-[10px] outline-none border-b w-full'
              type='number'
              placeholder='Enter standard charge'
              value={standardCharge}
              onChange={(e) => setStandardCharge(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Doctor</label>

            <Select
              className='text-[12px] w-full'
              required
              options={renderedDoctorForDropdownPrescription}
              onChange={setDoctorId}
              value={doctorId}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Admitting Doctor Date / Time</label>
            <input
              type='datetime-local'
              className='py-[10px] outline-none border-b w-full'
              onChange={(e) => setAdmittingDoctorDateTime(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Case</label>
            <Select
              className='text-[12px] w-full'
              required
              options={renderedCaseForDropdownPrescription}
              onChange={setCaseId}
              value={caseId}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Room No.</label>
            <Select
              className='text-[12px] w-full'
              required
              options={renderedRoomForDropdownPrescription}
              onChange={setRoomId}
              value={roomId}
            />
          </div>
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Ward Room</label>
            <Select
              className='text-[12px] w-full'
              required
              options={renderedWardsForDropdownPrescription}
              onChange={setWardId}
              value={wardId}
            />
          </div> */}
        </div>

        <div className='flex flex-col gap-[2rem] border-b pb-[3rem]'>
          {/* <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Additional Info</label>
            <textarea
              rows={5}
              className='py-[10px] outline-none border rounded-lg w-full p-[1rem]'
              type='text'
              required
              placeholder='Enter additional info'
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div> */}
          <div className='flex flex-col items-start gap-[6px]'>
            <label className='text-[14px]'>Note</label>
            <textarea
              rows={5}
              className='py-[10px] outline-none border rounded-lg w-full p-[1rem]'
              type='text'
              required
              placeholder='Enter notes'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-start gap-[10px]'>
            <h2 className='border-b w-full text-start'>Prescription</h2>
            <div className='border rounded-lg w-full p-[1rem] flex flex-col gap-[1rem]'>
              <div className='flex flex-row items-center justify-between'>
                <h2 className='text-start'>Add Consumables</h2>
                <Button onClick={() => handleAddInput()}>ADD +</Button>
              </div>

              <table className='w-fit border rounded-lg'>
                <tr className='flex flex-row w-full'>
                  <th className='w-[80px] text-start border-b border-r py-[10px] px-[6px]'>
                    S No.
                  </th>
                  <th className='w-[300px] text-start border-b border-r py-[10px] px-[6px]'>
                    Name
                  </th>
                  <th className='w-[200px] text-start border-b border-r py-[10px] px-[6px]'>
                    Qty
                  </th>
                  <th className='w-[200px] text-start border-b border-r py-[10px] px-[6px]'>
                    How many time in day
                  </th>
                  <th className='text-start border-b border-r py-[10px] px-[6px]'>
                    Action
                  </th>
                </tr>
                {prescriptions.map((item, index) => (
                  <tr key={index} className='flex flex-row w-full'>
                    <td className='w-[80px] text-start border-b border-r py-[10px] px-[6px]'>
                      <p>{index + 1}</p>
                    </td>
                    <td className='w-[300px] text-start border-b border-r py-[10px] px-[6px]'>
                      <input
                        name='medicineName'
                        type='text'
                        placeholder='Enter medicine name'
                        className='w-full border'
                        value={item.medicineName}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </td>
                    <td className='w-[200px] text-start border-b border-r py-[10px] px-[6px]'>
                      <input
                        name='qty'
                        type='text'
                        placeholder='Enter quantity'
                        className='w-full border'
                        value={item.qty}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </td>
                    <td className='w-[200px] text-start border-b border-r py-[10px] px-[6px]'>
                      <input
                        name='times'
                        type='text'
                        placeholder='Enter times'
                        className='w-full border'
                        value={item.times}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </td>
                    <td className='py-[10px] px-[6px]'>
                      <MdDeleteForever
                        onClick={() => handleDeleteInput(index)}
                        className='text-[red] cursor-pointer text-[20px]'
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div className='flex flex-col items-start gap-[10px]'>
            <h2 className='border-b w-full text-start'>Test</h2>
            <div className='flex flex-row items-center w-full'>
              <Select
                className='text-[12px] w-[50%]'
                options={testData?.map((data) => {
                  return {
                    value: data.id,
                    label: data.name,
                  };
                })}
                onChange={setTest}
                value={test}
              />
              <Button
                onClick={() =>
                  setTests([
                    ...tests,
                    { testId: test.value, testName: test.label },
                  ])
                }>
                ADD +
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-6 gap-[1rem]'>
            {tests?.map((data, index) => {
              return (
                <div
                  key={`${index}-${data.testId}-${data.testName}`}
                  className='border relative w-fit'>
                  <p className='p-[1rem]'>{data.testName}</p>
                  <p
                    onClick={() => handleRemoveTestCard(index)}
                    className='text-black font-[600] absolute right-[4px] top-0 cursor-pointer'>
                    -
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='w-fit py-[1rem]'>
          <button className='buttonFilled' type='submit'>{`Save >`}</button>
        </div>
      </form>
    </div>
  );
}
