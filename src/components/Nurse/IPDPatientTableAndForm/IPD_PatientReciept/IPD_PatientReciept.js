import React, { Fragment, useEffect, useState } from "react";
import "./IPD_PatientReciept.css";

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
import IpdChargesShowcase from "../../../Receptionist/IpdChargesShowcase/IpdChargesShowcase";
import PatientBedChargesCal from "../../../Receptionist/PatientBedChargesCal/PatientBedChargesCal";
import IpdPatientMedDocLabChargesShowcase from "../../../Receptionist/IpdPatientMedDocLabChargesShowcase/IpdPatientMedDocLabChargesShowcase";
import IpdPatientReciptChargesShowcase from "./IpdPatientReceiptChargesShowcase/IpdPatientReceiptChargesShowcase";
import { useGetIPDPatientBalanceByIdQuery } from "../../../../Store/Services/IPDPatientBalanceService";

export default function IPD_PatientReciept() {
  const toWords = new ToWords();
  const { ipdPatientId } = useParams();

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [ipdBedId, setIpdBedId] = useState("");

  const [ipdPatientNurseDischargeDetails, setIpdPatientNurseDischargeDetails] =
    useState(null);

  const [
    ipdPatientDoctorDischargeDetails,
    setIpdPatientDoctorDischargeDetails,
  ] = useState(null);

  const [ipdPatientFinalBalanceTotal, setIpdPatientFinalBalanceTotal] =
    useState(null);

  const responseGetIPDPatientById = useGetIPDPatientByIdQuery(ipdPatientId);
  const responseGetDoctorById = useGetDoctorByIdQuery(doctorId);
  const responseGetPatientById = useGetPatientByIdQuery(patientId);
  const responseGetIpdBedDetails = useGetBedByIdQuery(ipdBedId);

  const [ipdPatientMedDocLabDetailCall, responseIpdPatientMedDocLabDetailCall] =
    useIpdPatientMedLabDocDetailByIdMutation();

  const [medDocLabChargesGet, responseMedDocLabChargesGet] =
    useIpdPatientMedDocLabChargesGetByIdMutation();

  const [
    ipdPatientDischargeReceiptGetById,
    responseIpdPatientDischargeReceiptGetById,
  ] = useIpdPatientDischargeReceiptGetByIdMutation();

  const responseIpdPatientTotalBalanceGetAll =
    useIpdPatientFinalBalanceCalGetAllQuery();

  console.log("responseGetPatientById:", responseGetPatientById);

  useEffect(() => {
    if (responseGetIPDPatientById.isSuccess) {
      console.log("responseGetIPDPatientById:", responseGetIPDPatientById);
      setDoctorId(responseGetIPDPatientById?.currentData?.ipdDoctorId);
      setPatientId(responseGetIPDPatientById?.currentData?.ipdPatientId);
      setIpdBedId(responseGetIPDPatientById?.currentData?.ipdBedNo);

      ipdPatientMedDocLabDetailCall(
        responseGetIPDPatientById?.currentData?.mainId
      );
      medDocLabChargesGet(responseGetIPDPatientById?.currentData?.mainId);

      ipdPatientDischargeReceiptGetById(
        responseGetIPDPatientById?.currentData?.mainId
      );
    }
  }, [responseGetIPDPatientById.isSuccess]);

  useEffect(() => {
    console.log(
      "responseIpdPatientDischargeReceiptGetById:",
      responseIpdPatientDischargeReceiptGetById
    );

    const ipdNurseDischargeData =
      responseIpdPatientDischargeReceiptGetById?.data?.IPDPatientData[0]
        ?.NurseDischargeData;

    const ipdDoctorDischargeData =
      responseIpdPatientDischargeReceiptGetById?.data?.IPDPatientData[0]
        ?.DoctorDischargeData;

    setIpdPatientNurseDischargeDetails(ipdNurseDischargeData);
    setIpdPatientDoctorDischargeDetails(ipdDoctorDischargeData);
  }, [responseIpdPatientDischargeReceiptGetById.isSuccess]);

  useEffect(() => {
    const balanceCals =
      responseIpdPatientTotalBalanceGetAll?.currentData?.balanceCalculation;
    console.log("balanceCals:", balanceCals);

    console.log("patientId in balance:", ipdPatientId);

    if (balanceCals) {
      const currrentIpdPatientBalance = balanceCals.find(
        (data) => data._id === ipdPatientId
      );
      setIpdPatientFinalBalanceTotal(currrentIpdPatientBalance);
    }

    console.log(
      "responseIpdPatientTotalBalanceGetAll:",
      responseIpdPatientTotalBalanceGetAll
    );
  }, [responseIpdPatientTotalBalanceGetAll.isSuccess]);

  const {
    data: ipdPatientBalance,
    error,
    isLoading,
    refetch,
  } = useGetIPDPatientBalanceByIdQuery(ipdPatientId);

  useEffect(() => {
    // console.log("refetch initiated...");
    refetch();
  }, []);

  const medicalCharges = ipdPatientBalance?.data?.charges || [];
  const totalMedicalCharges = ipdPatientBalance?.totalMedicalCharges;

  console.log(
    "ipdPatientNurseDischargeDetails:",
    ipdPatientNurseDischargeDetails
  );

  console.log(
    "ipdPatientDoctorDischargeDetails:",
    ipdPatientDoctorDischargeDetails
  );

  console.log(
    "responseMedDocLabChargesGet:",
    responseMedDocLabChargesGet?.data
  );

  console.log(
    "responseIpdPatientMedDocLabDetailCall:",
    responseIpdPatientMedDocLabDetailCall
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

  console.log("responseGetIpdBedDetails:", responseGetIpdBedDetails);

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

  return (
    <>
      {responseGetIPDPatientById.isLoading &&
      responseGetDoctorById.isLoading &&
      responseGetPatientById.isLoading &&
      responseGetIpdBedDetails.isLoading &&
      responseIpdPatientMedDocLabDetailCall.isLoading &&
      responseMedDocLabChargesGet.isLoading &&
      responseIpdPatientDischargeReceiptGetById.isLoading ? (
        "Loading..."
      ) : (
        <Fragment>
          {responseGetIPDPatientById.isSuccess &&
          responseGetDoctorById.isSuccess &&
          responseGetPatientById.isSuccess &&
          responseGetIpdBedDetails.isSuccess ? (
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
                    borderBottom: "2px solid #373737",
                  }}
                >
                  IPD Discharge Slip
                </h3>

                <div className="grid grid-cols-2 gap-[10px] text-[14px]">
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">UHID</p>
                    <p>
                      {responseGetIPDPatientById?.currentData?.ipdPatientId}
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
                    <p>{ipdPatientId}</p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Admitted At
                    </p>
                    {/* <p className="border-b-[2px] border-dotted border-black w-[200px]">{``}</p> */}
                    <p>
                      {`${date(
                        responseGetIPDPatientById?.data?.createdAt
                      )} - ${time(responseGetIPDPatientById?.data?.createdAt)}`}
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
                        responseIpdPatientDischargeReceiptGetById?.data
                          ?.ipdPatientDischargeRecieptData
                          ?.dateAndTimeOfDischarge
                      )} - ${time(
                        responseIpdPatientDischargeReceiptGetById?.data
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
                    <p>{responseGetIpdBedDetails?.currentData?.bedNumber}</p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Bed Floor:
                    </p>
                    <p>{responseGetIpdBedDetails?.currentData?.bedFloor}</p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Bed Type:</p>
                    <p>{responseGetIpdBedDetails?.currentData?.bedType}</p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Bed Sub-type:
                    </p>
                    <p>{responseGetIpdBedDetails?.currentData?.bedSubType}</p>
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
                    ipdPatientData={responseGetIPDPatientById}
                    currentPatientBed={responseGetIpdBedDetails.currentData}
                  />
                  {responseIpdPatientMedDocLabDetailCall.isSuccess &&
                  responseMedDocLabChargesGet.isSuccess ? (
                    <IpdPatientReciptChargesShowcase
                      responseIpdPatientMedDocLabDetailCall={
                        responseIpdPatientMedDocLabDetailCall?.data
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

                  <br />
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
                            {/* <tr key={charge._id}>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {charge.items.map((item) => item.itemName).join(", ")}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {charge.price}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {new Date(charge.createdAt).toLocaleDateString()}
                  </td>
                </tr> */}
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
                    {/* <div className="text-center text-[16px] py-4 px-[4px] border-b-[1px] font-bold text-blue-500">
                      Total Extra Charges: &nbsp; &nbsp; Rs. &nbsp;{" "}
                      {totalMedicalCharges}
                    </div> */}
                  </div>
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
                          {ipdPatientFinalBalanceTotal?.totalAddedBalance}
                        </span>
                      </div>
                      <div className=" flex w-full justify-between">
                        <span className=" min-w-[400px]">Total Expense:</span>
                        <span>
                          ₹&nbsp;{ipdPatientFinalBalanceTotal?.finalTotal}
                        </span>
                      </div>
                      <div className=" flex w-full justify-between">
                        <span className=" min-w-[400px]">
                          Remaining Balance:
                        </span>
                        <span>
                          ₹&nbsp;{ipdPatientFinalBalanceTotal?.remainingBalance}
                        </span>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div>
                    <h3>Nurse and Doctor Approval</h3>
                    <br />
                    <div className=" ">
                      <h4>Nurse's Approval</h4>
                      <br />
                      <div className="grid grid-cols-2 gap-[10px] text-[14px]">
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Nurse's Name
                          </p>
                          <p>{ipdPatientNurseDischargeDetails?.nurse}</p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Nurse Id
                          </p>
                          <p>{ipdPatientNurseDischargeDetails?.nurseId}</p>
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
                            {ipdPatientNurseDischargeDetails?.ipdPatientRegId}
                          </p>
                        </div>
                      </div>
                      <br />
                      <div className=" grid grid-cols-1 text-[14px]">
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Admitted For:
                          </span>
                          <p>{ipdPatientNurseDischargeDetails?.admittedFor}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Indications:
                          </span>
                          <p>{ipdPatientNurseDischargeDetails?.indications}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Investigation / Procedure:
                          </span>
                          <p>
                            {
                              ipdPatientNurseDischargeDetails?.investigationORProcedure
                            }
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Operations:
                          </span>
                          <p>{ipdPatientNurseDischargeDetails?.operations}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Surgeon:
                          </span>
                          <p>{ipdPatientNurseDischargeDetails?.surgeon}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Anaesthesia:
                          </span>
                          <p>{ipdPatientNurseDischargeDetails?.anaesthesia}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Anaesthesiologist:
                          </span>
                          <p>{ipdPatientNurseDischargeDetails?.anaesthetist}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Implant Details:
                          </span>
                          <p>
                            {ipdPatientNurseDischargeDetails?.implantDetails}
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Condition During Discharge:
                          </span>
                          <p>
                            {
                              ipdPatientNurseDischargeDetails?.conditionDuringDischarge
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className=" ">
                      <h4>Doctor's Approval</h4>
                      <br />
                      <div className="grid grid-cols-2 gap-[10px] text-[14px]">
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Doctor's Name
                          </p>
                          <p>{ipdPatientDoctorDischargeDetails?.name}</p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Doctor Id
                          </p>
                          <p>{ipdPatientDoctorDischargeDetails?.doctorId}</p>
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
                            {ipdPatientDoctorDischargeDetails?.ipdPatientRegId}
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
                              ipdPatientDoctorDischargeDetails?.provisionalDiagnosis
                            }
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Disease Diagnose:
                          </span>
                          <p>
                            {ipdPatientDoctorDischargeDetails?.disease_Diagnose}
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Final Diagnosis:
                          </span>
                          <p>
                            {ipdPatientDoctorDischargeDetails?.finalDiagnosis}
                          </p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Advise During Discharge:
                          </span>
                          <p>
                            {
                              ipdPatientDoctorDischargeDetails?.adviseDuringDischarge
                            }
                          </p>
                        </div>
                        <div className=" flex justify-between items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Physician In-charge:
                          </span>
                          <p>
                            {
                              ipdPatientDoctorDischargeDetails?.physicianInCharge
                            }
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
                          <p>{ipdPatientDoctorDischargeDetails?.ICD}</p>
                        </div>
                        <div className=" flex justify-start items-center gap-5 border-2 px-2 h-[100px]">
                          <span className="font-[500] text-center flex justify-center items-center px-1 border-r-2 h-full w-[150px]">
                            Result:
                          </span>
                          <p>{ipdPatientDoctorDischargeDetails?.result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
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

                  <br />
                  <br />
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
