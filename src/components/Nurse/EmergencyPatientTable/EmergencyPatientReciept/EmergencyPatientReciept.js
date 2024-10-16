import React, { Fragment, useEffect, useState } from "react";
// import "./IPD_PatientReciept.css";

import { useParams } from "react-router-dom";

import { useRef } from "react";

import logoImage from "../../../../assets/logo.png";

import { useReactToPrint } from "react-to-print";

import {
  useGetIPDPatientByIdQuery,
  useIpdPatientDischargeReceiptGetByIdMutation,
  useIpdPatientFinalBalanceCalGetAllMutation,
  useIpdPatientFinalBalanceCalGetAllQuery,
  useIpdPatientMedDocLabChargesGetByIdMutation,
  useIpdPatientMedLabDocDetailByIdMutation,
} from "../../../../Store/Services/IPDPatientService";
import { useGetDoctorByIdQuery } from "../../../../Store/Services/DoctorService";
import { useGetPatientByIdQuery } from "../../../../Store/Services/PatientService";

import { ToWords } from "to-words";
import { useGetBedByIdQuery } from "../../../../Store/Services/BedService";
// import IpdChargesShowcase from "../../../Receptionist/IpdChargesShowcase/IpdChargesShowcase";
import PatientBedChargesCal from "../../../Receptionist/PatientBedChargesCal/PatientBedChargesCal";
import IpdPatientMedDocLabChargesShowcase from "../../../Receptionist/IpdPatientMedDocLabChargesShowcase/IpdPatientMedDocLabChargesShowcase";
import EmergencyChargesShowcase from "../../EmergencyChargesShowcase/EmergencyChargesShowcase";
import { useGetIPDPatientBalanceByIdQuery } from "../../../../Store/Services/IPDPatientBalanceService";
import {
  useEmergencyPatientDischargeReceiptGetByIdMutation,
  useGetAllEmergencyPatientBalanceQuery,
  useGetEmergencyPatientBalanceByIdQuery,
  useGetEmergencyPatientByIdQuery,
  useGetEmergencyPatientMedDocLabDetailsByIdQuery,
  useGetEmergencyPatientMedDocLabTotalByIdQuery,
} from "../../../../Store/Services/EmergencyPatientService";

export default function IPD_PatientReciept() {
  const toWords = new ToWords();
  const { emergencyPatientId } = useParams();

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [emergencyBedId, setEmergencyBedId] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);

  const [
    emergencyPatientNurseDischargeDetails,
    setEmergencyPatientNurseDischargeDetails,
  ] = useState(null);

  const [
    emergencyPatientDoctorDischargeDetails,
    setEmergencyPatientDoctorDischargeDetails,
  ] = useState(null);

  const [
    emergencyPatientFinalBalanceTotal,
    setEmergencyPatientFinalBalanceTotal,
  ] = useState(null);

  const responseGetEmergencyPatientById =
    useGetEmergencyPatientByIdQuery(emergencyPatientId);

  console.log(
    "Emergency Reciept responseGetEmergencyPatientById:",
    responseGetEmergencyPatientById
  );

  const responseGetDoctorById = useGetDoctorByIdQuery(doctorId);
  const responseGetPatientById = useGetPatientByIdQuery(patientId);
  const responseGetEmergencyBedDetails = useGetBedByIdQuery(emergencyBedId);

  console.log(
    "Emergency Reciept responseGetDoctorById:",
    responseGetDoctorById
  );

  console.log(
    "Emergency Reciept responseGetPatientById:",
    responseGetPatientById
  );

  console.log(
    "Emergency Reciept responseGetEmergencyBedDetails:",
    responseGetEmergencyBedDetails
  );

  const responseEmergencyPatientMedDocLabDetailCall =
    useGetEmergencyPatientMedDocLabDetailsByIdQuery(emergencyPatientId);

  console.log(
    "Emergency Reciept responseEmergencyPatientMedDocLabDetailCall:",
    responseEmergencyPatientMedDocLabDetailCall
  );

  const responseMedDocLabChargesGet =
    useGetEmergencyPatientMedDocLabTotalByIdQuery(emergencyPatientId);

  console.log(
    "Emergency Reciept responseMedDocLabChargesGet:",
    responseMedDocLabChargesGet
  );

  const [
    emergencyPatientDischargeReceiptGetById,
    responseEmergencyPatientDischargeReceiptGetById,
  ] = useEmergencyPatientDischargeReceiptGetByIdMutation();

  console.log(
    "Emergency Reciept responseEmergencyPatientDischargeReceiptGetById:",
    responseEmergencyPatientDischargeReceiptGetById
  );

  const responseEmergencyPatientTotalBalanceGetAll =
    useGetAllEmergencyPatientBalanceQuery();

  // console.log(
  //   "Emergency Reciept responseEmergencyPatientTotalBalanceGetAll:",
  //   responseEmergencyPatientTotalBalanceGetAll
  // );

  // console.log("responseGetPatientById:", responseGetPatientById);

  useEffect(() => {
    if (responseGetPatientById?.data) {
      setPatientDetails(responseGetPatientById?.data);
    }
  }, [responseGetPatientById]);

  // console.log("patientDetails:", patientDetails);

  useEffect(() => {
    if (responseGetEmergencyPatientById.isSuccess) {
      // console.log("responseGetEmergencyPatientById:", responseGetEmergencyPatientById);
      setDoctorId(responseGetEmergencyPatientById?.data?.doctorId);
      setPatientId(responseGetEmergencyPatientById?.data?.patientId);
      setEmergencyBedId(responseGetEmergencyPatientById?.data?.bedId);

      // emergencyPatientMedDocLabDetailCall(
      //   responseGetEmergencyPatientById?.currentData?.mainId
      // );
      // medDocLabChargesGet(responseGetEmergencyPatientById?.currentData?.mainId);

      emergencyPatientDischargeReceiptGetById(
        responseGetEmergencyPatientById?.data?.mainId
      );
    }
  }, [responseGetEmergencyPatientById.isSuccess]);

  useEffect(() => {
    // console.log(
    //   "responseEmergencyPatientDischargeReceiptGetById:",
    //   responseEmergencyPatientDischargeReceiptGetById
    // );

    const ipdNurseDischargeData =
      responseEmergencyPatientDischargeReceiptGetById?.data?.IPDPatientData[0]
        ?.NurseDischargeData;

    const ipdDoctorDischargeData =
      responseEmergencyPatientDischargeReceiptGetById?.data?.IPDPatientData[0]
        ?.DoctorDischargeData;

    setEmergencyPatientNurseDischargeDetails(ipdNurseDischargeData);
    setEmergencyPatientDoctorDischargeDetails(ipdDoctorDischargeData);
  }, [responseEmergencyPatientDischargeReceiptGetById.isSuccess]);

  useEffect(() => {
    const balanceCals =
      responseEmergencyPatientTotalBalanceGetAll?.currentData
        ?.balanceCalculation;
    // console.log("balanceCals:", balanceCals);

    // console.log("patientId in balance:", emergencyPatientId);

    if (balanceCals) {
      const currrentEmergencyPatientBalance = balanceCals.find(
        (data) => data._id === emergencyPatientId
      );
      setEmergencyPatientFinalBalanceTotal(currrentEmergencyPatientBalance);
    }

    // console.log(
    //   "responseEmergencyPatientTotalBalanceGetAll:",
    //   responseEmergencyPatientTotalBalanceGetAll
    // );
  }, [responseEmergencyPatientTotalBalanceGetAll.isSuccess]);

  const {
    data: emergencyPatientBalance,
    error,
    isLoading,
    refetch,
  } = useGetEmergencyPatientBalanceByIdQuery(emergencyPatientId);

  useEffect(() => {
    // console.log("refetch initiated...");
    refetch();
  }, []);

  const medicalCharges = emergencyPatientBalance?.data?.charges || [];
  const totalMedicalCharges = emergencyPatientBalance?.totalMedicalCharges;

  console.log(
    "emergencyPatientNurseDischargeDetails:",
    emergencyPatientNurseDischargeDetails
  );

  console.log(
    "emergencyPatientDoctorDischargeDetails:",
    emergencyPatientDoctorDischargeDetails
  );

  // console.log(
  //   "emergencyPatientDoctorDischargeDetails:",
  //   emergencyPatientDoctorDischargeDetails
  // );

  console.log("responseMedDocLabChargesGet:", responseMedDocLabChargesGet);

  console.log(
    "responseEmergencyPatientMedDocLabDetailCall:",
    responseEmergencyPatientMedDocLabDetailCall
  );

  const date = (dateTime) => {
    const newDate = new Date(dateTime);
    return newDate.toLocaleDateString("en-IN"); // specifying 'en-IN' locale for the date format
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);
    return newDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata", // specifying the time zone for Indian time
    });
  };

  // console.log("responseGetEmergencyBedDetails:", responseGetEmergencyBedDetails);

  const componentRef = useRef();

  const marginTop = "10px";
  const marginRight = "5px";
  const marginBottom = "16px";
  const marginLeft = "5px";
  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // pageStyle: "@page { size: auto;  margin: 25mm; } }",
  });

  // return <div>Receipt Page</div>;

  return (
    <>
      {responseGetEmergencyPatientById.isLoading &&
      responseGetDoctorById.isLoading &&
      responseGetPatientById.isLoading &&
      responseGetEmergencyBedDetails.isLoading &&
      responseEmergencyPatientMedDocLabDetailCall.isLoading &&
      responseMedDocLabChargesGet.isLoading &&
      responseEmergencyPatientDischargeReceiptGetById.isLoading ? (
        "Loading..."
      ) : (
        <Fragment>
          {responseGetEmergencyPatientById.isSuccess &&
          responseGetDoctorById.isSuccess &&
          responseGetPatientById.isSuccess &&
          responseGetEmergencyBedDetails.isSuccess ? (
            <div className="w-full">
              <button onClick={() => handlePrint()} className="buttonFilled">
                Print
              </button>
              <div
                // ref={reportTemplateRef}
                ref={componentRef}
                className="w-full p-[1rem] flex flex-col gap-[1rem]"
              >
                <style>{getPageMargins()}</style>
                <div className="flex justify-between items-end">
                  <div className="flex items-end gap-[1rem]">
                    <img src={logoImage} alt="chtclogo" className="w-[150px]" />
                    <div className="flex flex-col items-start">
                      <p className="text-[16px]">
                        City Hospital and Trauma Centre
                      </p>
                      <p className="text-[14px]">
                        Contact no. 9119900861, 9119900862
                      </p>
                    </div>
                  </div>
                  <div className="flex text-[12px] gap-[10px]">
                    <p className="w-[250px]">
                      C1-C2 Cinder Dump Complex, near Alambagh bus stand, Kanpur
                      road, Lucknow 226005
                    </p>
                  </div>
                </div>
                <p className="text-center text-[12px]">Billing</p>
                <h3
                  className="text-center"
                  style={{
                    borderTop: "2px solid #373737",
                    // borderBottom: "2px solid #373737",
                  }}
                >
                  IPD Discharge Slip
                </h3>

                <div className="grid grid-cols-2 gap-[10px] text-[14px]">
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">UHID</p>
                    <p>
                      {responseGetEmergencyPatientById?.currentData?.patientId}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Patient Name
                    </p>
                    <p>{responseGetPatientById?.currentData?.patientName}</p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Address</p>
                    <p>{responseGetPatientById?.currentData?.patientCity}</p>
                  </div>

                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Gender</p>
                    <p>{responseGetPatientById?.currentData?.patientGender}</p>
                  </div>
                  {/* <div className="flex">
              <p className="font-[500] w-[130px] text-start">DOB</p>
              <p>
                {date(
                  responseGetPatientById?.currentData?.patientDateOfBirth
                )}
              </p>
            </div> */}
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Age</p>
                    <p>{responseGetPatientById?.currentData?.patientAge}</p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Phone</p>
                    <p>{responseGetPatientById?.currentData?.patientPhone}</p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Bill No.</p>
                    <p>{emergencyPatientId}</p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Admitted At
                    </p>
                    {/* <p className="border-b-[2px] border-dotted border-black w-[200px]">{``}</p> */}
                    <p>
                      {`${date(
                        responseGetEmergencyPatientById?.data?.createdAt
                      )} - ${time(
                        responseGetEmergencyPatientById?.data?.createdAt
                      )}`}
                      {/* 02-04-2024 04:00 AM (Test) */}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Dicharged At
                    </p>
                    {/* <p className="border-b-[2px] border-dotted border-black w-[200px]">{``}</p> */}
                    <p>
                      {`${date(
                        responseEmergencyPatientDischargeReceiptGetById?.data
                          ?.ipdPatientDischargeRecieptData
                          ?.dateAndTimeOfDischarge
                      )} - ${time(
                        responseEmergencyPatientDischargeReceiptGetById?.data
                          ?.ipdPatientDischargeRecieptData
                          ?.dateAndTimeOfDischarge
                      )}`}
                      {/* 02-04-2024 04:00 AM (Test) */}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Doctor</p>
                    <p>
                      {
                        responseGetDoctorById?.currentData?.DoctorDetails
                          ?.doctorName
                      }
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Bed No:</p>
                    <p>
                      {responseGetEmergencyBedDetails?.currentData?.bedNumber}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Bed Floor:
                    </p>
                    <p>
                      {responseGetEmergencyBedDetails?.currentData?.bedFloor}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Bed Type:</p>
                    <p>
                      {responseGetEmergencyBedDetails?.currentData?.bedType}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Bed Sub-type:
                    </p>
                    <p>
                      {responseGetEmergencyBedDetails?.currentData?.bedSubType}
                    </p>
                  </div>

                  {/* <div className="flex">
                      <p className="font-[500] w-[130px] text-start">
                        Payment Mode
                      </p>
                      <p>
                        {
                      responseGetOPDPatientById?.currentData
                        ?.opdPatientPaymentMode
                    }
                        Card (Test)
                      </p>
                    </div> */}
                </div>
                <div
                  className="flex flex-col justify-between p-[1rem]"
                  style={{
                    borderTop: "2px solid #373737",
                    borderBottom: "2px solid #373737",
                  }}
                >
                  <PatientBedChargesCal
                    ipdPatientData={responseGetEmergencyPatientById}
                    emergencyPatientData={responseGetEmergencyPatientById}
                    currentPatientBed={responseGetEmergencyBedDetails?.data}
                  />
                  <br />
                  {responseEmergencyPatientMedDocLabDetailCall.isSuccess &&
                  responseMedDocLabChargesGet.isSuccess ? (
                    <EmergencyChargesShowcase
                      currentPatientExtraCharges={medicalCharges}
                      currentPatientExtraChargesTotal={totalMedicalCharges}
                      responseEmergencyPatientMedDocLabDetailCall={
                        responseEmergencyPatientMedDocLabDetailCall?.data?.data
                      }
                      medDocLabChargesTotal={
                        responseMedDocLabChargesGet?.data
                          ? responseMedDocLabChargesGet?.data[0]
                          : null
                      }
                    />
                  ) : (
                    ""
                  )}

                  {/* <br />
                  <div className="w-full">
                    <h3 className="text-xl font-semibold">Extra Charges</h3>
                    <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                      <thead>
                        <tr className="border-b-[1px]">
                          <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                            Item
                          </th>
                          <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                            Quantity
                          </th>
                          <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                            Price
                          </th>
                          <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-500 font-semibold">
                        {medicalCharges.map((charge, index) => (
                          <>
                            {charge.items.map((item) => (
                              <tr key={item._id}>
                                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                                  {item.itemName}
                                </td>
                                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                                  {item.quantity}
                                </td>
                                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                                  Rs. {item.price}
                                </td>
                                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                                  {new Date(item.date).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                            <tr key={charge._id}>
                    <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                      {charge.items.map((item) => item.itemName).join(", ")}
                    </td>
                    <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                      {charge.price}
                    </td>
                    <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                      {new Date(charge.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                          </>
                        ))}
                        <tr>
                          <td
                            colSpan="3"
                            className="text-right text-[16px] py-4 px-[4px] border-b-[1px] text-blue-500"
                          >
                            Sub Total
                          </td>
                          <td
                            colSpan="1"
                            className="text-center text-[16px] py-4 px-[4px] border-b-[1px] text-blue-500"
                          >
                            Rs. {totalMedicalCharges?.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center text-[16px] py-4 px-[4px] border-b-[1px] font-bold text-blue-500">
                        Total Extra Charges: &nbsp; &nbsp; Rs. &nbsp;{" "}
                        {totalMedicalCharges}
                      </div>
                  </div> */}
                  <hr />
                  <br />
                  <div
                    className="flex flex-col justify-end items-end text-left px-[1rem] pb-[10px]"
                    style={{
                      borderTop: "2px solid #373737",
                      borderBottom: "2px solid #373737",
                    }}
                  >
                    <h3>Amount Summary:</h3>
                    <br />
                    <div className=" flex flex-col justify-start items-start text-left gap-5 font-bold text-blue-500">
                      <div className=" flex w-full justify-between">
                        <span className=" min-w-[400px]">Total Deposit:</span>
                        <span>
                          ₹&nbsp;
                          {emergencyPatientFinalBalanceTotal?.totalAddedBalance}
                        </span>
                      </div>
                      <div className=" flex w-full justify-between">
                        <span className=" min-w-[400px]">Total Expense:</span>
                        <span>
                          ₹&nbsp;{emergencyPatientFinalBalanceTotal?.finalTotal}
                        </span>
                      </div>
                      <div className=" flex w-full justify-between">
                        <span className=" min-w-[400px]">
                          Remaining Balance:
                        </span>
                        <span>
                          ₹&nbsp;
                          {emergencyPatientFinalBalanceTotal?.remainingBalance}
                        </span>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="pagebreak"></div>
                  <div>
                    <h3>DISCHARGE SUMMARY</h3>
                    <br />
                    <div className=" ">
                      <br />
                      <div className="grid grid-cols-3 gap-[10px] text-[14px] mb-5">
                        <div className="flex">
                          <p className="font-[500] w-[200px] text-start">
                            PATIENT'S NAME:
                          </p>
                          <p>{patientDetails?.patientName}</p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[200px] text-start">
                            AGE/SEX:
                          </p>
                          <p>
                            {patientDetails?.patientAge}&nbsp;Y/
                            {patientDetails?.patientGender}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[200px] text-start">
                            Patient ID:
                          </p>
                          <p>{responseGetEmergencyPatientById?.data?.mainId}</p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[200px] text-start">
                            DATE OF ADMISSION:
                          </p>
                          <p>{`${date(
                            responseGetEmergencyPatientById?.data?.createdAt
                          )}`}</p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[200px] text-start">
                            DATE OF DISCHARGE:
                          </p>
                          <p>{`${date(
                            responseEmergencyPatientDischargeReceiptGetById
                              ?.data?.ipdPatientDischargeRecieptData
                              ?.dateAndTimeOfDischarge
                          )}`}</p>
                        </div>
                      </div>

                      <div className=" grid grid-cols-1 text-[14px] text-left uppercase">
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-left flex justify-start items-center px-1 border-r-2 h-full w-[150px]">
                            Admitted For:
                          </span>
                          <p>
                            {emergencyPatientNurseDischargeDetails?.admittedFor}
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-left flex justify-start items-center px-1 border-r-2 h-full w-[150px]">
                            Disease / Diagnosis:
                          </span>
                          <p>
                            {
                              emergencyPatientDoctorDischargeDetails?.disease_Diagnose
                            }
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-left flex justify-start items-center px-1 border-r-2 h-full w-[150px]">
                            ICD Code:
                          </span>
                          <p>{emergencyPatientDoctorDischargeDetails?.ICD}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-left flex justify-start items-center px-1 border-r-2 h-full w-[150px]">
                            Investigation / Procedure:
                          </span>
                          <p>
                            {
                              emergencyPatientNurseDischargeDetails?.investigationORProcedure
                            }
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-auto">
                          <span className="font-[500] text-left flex justify-start items-center px-1 border-r-2 h-full w-[150px]">
                            Treatment Given In Brief:
                          </span>
                          <div className=" w-[85%]">
                            <div>
                              <span></span>
                            </div>
                            <div className=" w-full grid grid-cols-2">
                              {emergencyPatientNurseDischargeDetails?.TreatmentGivenInBrief?.map(
                                (treatment, index) => (
                                  <div key={index}>
                                    <p>
                                      <span className=" font-bold">Date:</span>
                                      &nbsp;{treatment?.date}
                                    </p>
                                    <p>
                                      <span className=" font-bold">
                                        Operation:
                                      </span>
                                      &nbsp;{treatment?.operation}
                                    </p>
                                    <p>
                                      <span className=" font-bold">
                                        Indications:&nbsp;
                                      </span>
                                      {treatment?.indications}
                                    </p>
                                    <p>
                                      {" "}
                                      <span className=" font-bold">
                                        Surgeon:&nbsp;
                                      </span>
                                      {treatment?.surgeon}
                                    </p>
                                    <p>
                                      <span className=" font-bold">
                                        Assistants:&nbsp;
                                      </span>
                                      {treatment?.assistants}
                                    </p>
                                    <p>
                                      {" "}
                                      <span className=" font-bold">
                                        Nurse:&nbsp;
                                      </span>
                                      {treatment?.nurse}
                                    </p>
                                    <p>
                                      <span className=" font-bold">
                                        Anaesthetist:
                                      </span>
                                      &nbsp;
                                      {treatment?.anaesthetist}
                                    </p>
                                    <p>
                                      <span className=" font-bold">
                                        Anaesthesia:
                                      </span>
                                      &nbsp;{treatment?.anaesthesia}
                                    </p>
                                    <p>
                                      <span className=" font-bold">
                                        ImplantDetails:
                                      </span>
                                      &nbsp;
                                      {treatment?.implantDetails}
                                    </p>
                                    <br />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-left flex justify-start items-center px-1 border-r-2 h-full w-[150px]">
                            Condition During Discharge:
                          </span>
                          <p>
                            {
                              emergencyPatientNurseDischargeDetails?.conditionDuringDischarge
                            }
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-auto">
                          <span className="font-[500] text-left flex justify-start items-center px-1 border-r-2 h-full w-[150px] py-2">
                            Advise During Discharge:
                          </span>
                          <div>
                            {emergencyPatientDoctorDischargeDetails?.medicineAdviseDuringDischarge?.map(
                              (med, index) => (
                                <div
                                  key={index}
                                  className=" grid grid-cols-2 gap-10"
                                >
                                  <p>{med?.medicine}: </p>
                                  <p>{med?.schedule}</p>
                                </div>
                              )
                            )}
                            {emergencyPatientDoctorDischargeDetails?.adviseDuringDischarge?.map(
                              (advice, index) => (
                                <p key={index}>•&nbsp;{advice?.advice}</p>
                              )
                            )}
                          </div>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-left flex justify-start items-center px-1 border-r-2 h-full w-[150px]">
                            Summary:
                          </span>
                          <p>&nbsp; As Explained Above</p>
                        </div>
                        {/* <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                            <span className="font-[500] text-left flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                              Indications:
                            </span>
                            <p>{emergencyPatientNurseDischargeDetails?.indications}</p>
                          </div>

                          <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                            <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                              Operations:
                            </span>
                            <p>{emergencyPatientNurseDischargeDetails?.operations}</p>
                          </div>
                          <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                            <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                              Surgeon:
                            </span>
                            <p>{emergencyPatientNurseDischargeDetails?.surgeon}</p>
                          </div>
                          <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                            <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                              Anaesthesia:
                            </span>
                            <p>{emergencyPatientNurseDischargeDetails?.anaesthesia}</p>
                          </div>
                          <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                            <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                              Anaesthesiologist:
                            </span>
                            <p>{emergencyPatientNurseDischargeDetails?.anaesthetist}</p>
                          </div>
                          <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                            <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                              Implant Details:
                            </span>
                            <p>
                              {emergencyPatientNurseDischargeDetails?.implantDetails}
                            </p>
                          </div> */}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="pagebreak"></div>
                  {/* <div className=" ">
                      <h4>Doctor's Approval</h4>
                      <br />
                      <div className="grid grid-cols-2 gap-[10px] text-[14px]">
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Doctor's Name
                          </p>
                          <p>{emergencyPatientDoctorDischargeDetails?.name}</p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Doctor Id
                          </p>
                          <p>{emergencyPatientDoctorDischargeDetails?.doctorId}</p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Patient Name
                          </p>
                          <p>
                            {responseGetPatientById?.currentData?.patientName}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Patient ID
                          </p>
                          <p>
                            {emergencyPatientDoctorDischargeDetails?.ipdPatientRegId}
                          </p>
                        </div>
                      </div>
                      <br />
                      <div className=" grid grid-cols-1 text-[14px]">
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            BHT / Surgery:
                          </span>
                          <p></p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Provisional Diagnosis:
                          </span>
                          <p>
                            {
                              emergencyPatientDoctorDischargeDetails?.provisionalDiagnosis
                            }
                          </p>
                        </div>

                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Final Diagnosis:
                          </span>
                          <p>
                            {emergencyPatientDoctorDischargeDetails?.finalDiagnosis}
                          </p>
                        </div>

                        <div className=" flex justify-between items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Physician In-charge:
                          </span>
                          <p>
                            {emergencyPatientDoctorDischargeDetails?.physicianInCharge}
                          </p>
                          <div className=" flex justify-between items-center h-full">
                            <span className=" px-2">Signature:</span>
                            <span className=" px-24 h-full border-2"></span>
                          </div>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            ICD:
                          </span>
                          <p>{emergencyPatientDoctorDischargeDetails?.ICD}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Result:
                          </span>
                          <p>{emergencyPatientDoctorDischargeDetails?.result}</p>
                        </div>
                      </div>
                    </div> */}
                  <div className=" w-full flex justify-between items-center">
                    <div className=" flex flex-col w-[300px] self-end justify-center items-start h-[100px]">
                      <span className=" px-2">Remarks (If Any):</span>
                      <span className=" w-full h-full"></span>
                    </div>
                    <div className=" flex flex-col w-[300px] self-end justify-center items-start h-[100px]">
                      <span className=" px-2">
                        Signature of the Patient / Attendant
                      </span>
                      <span className=" w-full h-full border-2"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "Not Found"
          )}
        </Fragment>
      )}
    </>
  );
}

// import React, { Fragment, useEffect, useState } from "react";
// import "./EmergencyPatientReciept.css";

// import { useParams } from "react-router-dom";

// import { useRef } from "react";

// import logoImage from "../../../../assets/logo.png";

// import { useReactToPrint } from "react-to-print";

// import { useGetDoctorByIdQuery } from "../../../../Store/Services/DoctorService";
// import { useGetPatientByIdQuery } from "../../../../Store/Services/PatientService";

// import { ToWords } from "to-words";

// export default function EmergencyPatientReciept() {
//   const toWords = new ToWords();
//   const { emergencyPatientId } = useParams();

//   const [doctorId, setDoctorId] = useState("");
//   const [patientId, setPatientId] = useState("");

//   const responseGetDoctorById = useGetDoctorByIdQuery(doctorId);
//   const responseGetPatientById = useGetPatientByIdQuery(patientId);

//   //   useEffect(() => {
//   //     if (responseGetOPDPatientById.isSuccess) {
//   //       setDoctorId(responseGetOPDPatientById?.currentData?.opdDoctorId);
//   //       setPatientId(responseGetOPDPatientById?.currentData?.opdPatientId);
//   //     }
//   //   }, [responseGetOPDPatientById.isSuccess]);

//   const date = (dateTime) => {
//     const newdate = new Date(dateTime);

//     return newdate.toLocaleDateString();
//   };

//   const time = (dateTime) => {
//     const newDate = new Date(dateTime);

//     return newDate.toLocaleTimeString();
//   };

//   const componentRef = useRef();

//   const marginTop = "10px";
//   const marginRight = "5px";
//   const marginBottom = "16px";
//   const marginLeft = "5px";
//   const getPageMargins = () => {
//     return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
//   };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     // pageStyle: "@page { size: auto;  margin: 25mm; } }",
//   });
//   return (
//     <>
//       {{
//         /* responseGetOPDPatientById.isLoading  */
//       } &&
//       responseGetDoctorById.isLoading &&
//       responseGetPatientById.isLoading ? (
//         "Loading..."
//       ) : (
//         <Fragment>
//           {{
//             /* responseGetOPDPatientById.isSuccess  */
//           } &&
//           !responseGetDoctorById.isSuccess &&
//           !responseGetPatientById.isSuccess ? (
//             <div className='w-full'>
//               <button onClick={() => handlePrint()} className='buttonFilled'>
//                 Print
//               </button>
//               <div
//                 // ref={reportTemplateRef}
//                 ref={componentRef}
//                 className='w-full p-[1rem] flex flex-col gap-[1rem]'>
//                 <style>{getPageMargins()}</style>
//                 <div className='flex justify-between items-end'>
//                   <div className='flex items-end gap-[1rem]'>
//                     <img src={logoImage} alt='chtclogo' className='w-[150px]' />
//                     <div className='flex flex-col items-start'>
//                       <p className='text-[16px]'>
//                         City Hospital and Trauma Centre
//                       </p>
//                       <p className='text-[14px]'>
//                         Contact no. 9119900861, 9119900862
//                       </p>
//                     </div>
//                   </div>
//                   <div className='flex text-[12px] gap-[10px]'>
//                     <p className='w-[250px]'>
//                       C1-C2 Cinder Dump Complex, near Alambagh bus stand, Kanpur
//                       road, Lucknow 226005
//                     </p>
//                   </div>
//                 </div>
//                 <p className='text-center text-[12px]'>Billing</p>
//                 <h3
//                   className='text-center'
//                   style={{
//                     borderTop: "2px solid #373737",
//                     borderBottom: "2px solid #373737",
//                   }}>
//                   Payment Receipt
//                 </h3>

//                 <div className='grid grid-cols-2 gap-[10px] text-[14px]'>
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>UHID</p>
//                     <p>
//                       {/* {responseGetOPDPatientById?.currentData?.opdPatientId} */}
//                       5435346
//                     </p>
//                   </div>
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>
//                       Visit Date
//                     </p>
//                     {/* <p className="border-b-[2px] border-dotted border-black w-[200px]">{``}</p> */}
//                     <p>
//                       {/* {`${date(
//                         responseGetOPDPatientById?.currentData
//                           ?.opdDoctorVisitDate
//                       )} - ${time(
//                         responseGetOPDPatientById?.currentData
//                           ?.opdDoctorVisitDate
//                       )}`} */}
//                       02-04-2024 04:00 AM
//                     </p>
//                   </div>
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>
//                       Patient Name
//                     </p>
//                     <p>
//                       {/* {responseGetPatientById?.currentData?.patientName} */}
//                       Test Patient
//                     </p>
//                   </div>
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>Address</p>
//                     <p>
//                       {/* {responseGetPatientById?.currentData?.patientCity} */}
//                       Lucknow
//                     </p>
//                   </div>
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>Doctor</p>
//                     <p>
//                       {/* {
//                         responseGetDoctorById?.currentData?.DoctorDetails
//                           ?.doctorName
//                       } */}
//                       Test Doctor
//                     </p>
//                   </div>
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>Gender</p>
//                     <p>
//                       {/* {responseGetPatientById?.currentData?.patientGender} */}
//                       Male
//                     </p>
//                   </div>
//                   {/* <div className="flex">
//                 <p className="font-[500] w-[130px] text-start">DOB</p>
//                 <p>
//                   {date(
//                     responseGetPatientById?.currentData?.patientDateOfBirth
//                   )}
//                 </p>
//               </div> */}
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>Age</p>
//                     <p>
//                       {/* {responseGetPatientById?.currentData?.patientAge} */}
//                       45
//                     </p>
//                   </div>
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>Phone</p>
//                     <p>
//                       {/* {responseGetPatientById?.currentData?.patientPhone} */}
//                       4847657465
//                     </p>
//                   </div>
//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>Bill No.</p>
//                     <p>{emergencyPatientId}</p>
//                   </div>

//                   <div className='flex'>
//                     <p className='font-[500] w-[130px] text-start'>
//                       Payment Mode
//                     </p>
//                     <p>
//                       {/* {
//                         responseGetOPDPatientById?.currentData
//                           ?.opdPatientPaymentMode
//                       } */}
//                       Card
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   className='flex justify-between p-[1rem]'
//                   style={{
//                     borderTop: "2px solid #373737",
//                     borderBottom: "2px solid #373737",
//                   }}>
//                   <h3>Consultation Fees:</h3>
//                   <p>
//                     {/* {`₹ ${responseGetOPDPatientById?.currentData?.opdPatientStandardCharges}`} */}
//                     ₹ 700
//                   </p>
//                 </div>
//                 <div
//                   className='flex justify-end items-center px-[1rem] pb-[10px]'
//                   style={{
//                     // borderTop: "2px solid #373737",
//                     borderBottom: "2px solid #373737",
//                   }}>
//                   <p>
//                     {/* {`₹ ${toWords.convert(
//                 responseGetOPDPatientById?.currentData
//                   ?.opdPatientStandardCharges,
//                 {
//                   currency: true,
//                 }
//               )}`} */}
//                     ₹ Saven Hundred Only
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             "Not Found"
//           )}
//         </Fragment>
//       )}
//     </>
//   );
// }
