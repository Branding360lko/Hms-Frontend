import React, { Fragment, useEffect, useState } from "react";
import "./IPD_PatientReciept.css";

import { useParams } from "react-router-dom";

import { useRef } from "react";

import logoImage from "../../../../assets/logo.png";

import { useReactToPrint } from "react-to-print";

import {
  useGetIPDPatientByIdQuery,
  useIpdPatientDischargeReceiptGetByIdMutation,
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
          responseGetIpdBedDetails.isSuccess &&
          responseIpdPatientMedDocLabDetailCall.isSuccess &&
          responseMedDocLabChargesGet.isSuccess &&
          responseIpdPatientDischargeReceiptGetById.isSuccess ? (
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
                  <div>
                    <h3>Nurse and Doctor Approval</h3>
                    <div>
                      <h4>Nurse Approval</h4>
                      <div className="grid grid-cols-2 gap-[10px] text-[14px]">
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Nurse
                          </p>
                          <p>
                            {
                              responseIpdPatientDischargeReceiptGetById?.data
                                ?.IPDPatientData?.NurseDischargeData?.nurse
                            }
                          </p>
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
                            Address
                          </p>
                          <p>
                            {responseGetPatientById?.currentData?.patientCity}
                          </p>
                        </div>

                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Gender
                          </p>
                          <p>
                            {responseGetPatientById?.currentData?.patientGender}
                          </p>
                        </div>

                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">Age</p>
                          <p>
                            {responseGetPatientById?.currentData?.patientAge}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Phone
                          </p>
                          <p>
                            {responseGetPatientById?.currentData?.patientPhone}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="font-[500] w-[130px] text-start">
                            Bill No.
                          </p>
                          <p>{ipdPatientId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex justify-end items-center px-[1rem] pb-[10px]"
                  style={{
                    // borderTop: "2px solid #373737",
                    borderBottom: "2px solid #373737",
                  }}
                >
                  <p>
                    {/* {`₹ ${toWords.convert(
            responseGetOPDPatientById?.currentData
              ?.opdPatientStandardCharges,
            {
              currency: true,
            }
          )}`} */}
                    ₹ Saven Hundred Only
                  </p>
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
