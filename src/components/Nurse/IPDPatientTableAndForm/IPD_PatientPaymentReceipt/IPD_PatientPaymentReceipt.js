import React, { Fragment, useEffect, useState } from "react";
import "./IPD_PatientReciept.css";

import { useParams } from "react-router-dom";

import { useRef } from "react";

import logoImage from "../../../../assets/logo.png";

import { useReactToPrint } from "react-to-print";

import { useGetIPDPatientByIdQuery } from "../../../../Store/Services/IPDPatientService";
import { useGetDoctorByIdQuery } from "../../../../Store/Services/DoctorService";
import { useGetPatientByIdQuery } from "../../../../Store/Services/PatientService";

import { ToWords } from "to-words";
import { useGetIPDPatientBalanceByIdQuery } from "../../../../Store/Services/IPDPatientBalanceService";

export default function IPD_PatientPaymentReciept() {
  const toWords = new ToWords();
  const { ipdPatientId } = useParams();

  const { dateTime } = useParams();

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");

  const [selectedDateDeposit, setSelectedDateDeposit] = useState(null);

  const responseGetIPDPatientById = useGetIPDPatientByIdQuery(ipdPatientId);
  const responseGetDoctorById = useGetDoctorByIdQuery(doctorId);
  const responseGetPatientById = useGetPatientByIdQuery(patientId);

  const responseGetIpdPatientDeposits =
    useGetIPDPatientBalanceByIdQuery(ipdPatientId);

  useEffect(() => {
    if (responseGetIPDPatientById.isSuccess) {
      setDoctorId(responseGetIPDPatientById?.currentData?.ipdDoctorId);
      setPatientId(responseGetIPDPatientById?.currentData?.ipdPatientId);
    }
  }, [responseGetIPDPatientById.isSuccess]);

  useEffect(() => {
    const allDeposits =
      responseGetIpdPatientDeposits?.currentData?.data?.balance;
    // console.log("allDeposits:", allDeposits);
    if (allDeposits) {
      const requiredDeposit = allDeposits.find(
        (deposit) => deposit.createdAt === dateTime
      );
      if (requiredDeposit) {
        setSelectedDateDeposit(requiredDeposit);
      }
    }
  }, [responseGetIpdPatientDeposits?.isSuccess]);

  // console.log("selectedDateDeposit:", selectedDateDeposit);

  // console.log("responseGetIpdPatientDeposits:", responseGetIpdPatientDeposits);

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

  //   console.log(responseGetDoctorById);

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
      responseGetPatientById.isLoading ? (
        "Loading..."
      ) : (
        <Fragment>
          {responseGetIPDPatientById.isSuccess &&
          responseGetDoctorById.isSuccess &&
          responseGetPatientById.isSuccess ? (
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
                  IPD Payment Receipt
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
                      Payment Date
                    </p>
                    {/* <p className="border-b-[2px] border-dotted border-black w-[200px]">{``}</p> */}
                    <p>
                      {/* {`${date(
                    responseGetOPDPatientById?.currentData
                      ?.opdDoctorVisitDate
                  )} - ${time(
                    responseGetOPDPatientById?.currentData
                      ?.opdDoctorVisitDate
                  )}`} */}
                      {`${date(selectedDateDeposit?.createdAt)} - ${time(
                        selectedDateDeposit?.createdAt
                      )}`}
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
                    <p>
                      {responseGetPatientById?.currentData?.patientCity ===
                        "" || responseGetPatientById?.currentData?.patientCity
                        ? responseGetPatientById?.currentData?.patientCity
                        : JSON.parse(
                            responseGetPatientById?.currentData?.patientCityNew
                          ).value}
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
                    <p className="font-[500] w-[130px] text-start">
                      IPD Patient ID:
                    </p>
                    <p>{ipdPatientId}</p>
                  </div>

                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Payment Mode
                    </p>
                    <p>
                      {/* {
                    responseGetOPDPatientById?.currentData
                      ?.opdPatientPaymentMode
                  } */}
                      {selectedDateDeposit?.paymentMethod}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Deposit Note
                    </p>
                    <p>
                      {/* {
                    responseGetOPDPatientById?.currentData
                      ?.opdPatientPaymentMode
                  } */}
                      {selectedDateDeposit?.balanceNote}
                    </p>
                  </div>
                </div>
                <div
                  className="flex justify-between p-[1rem]"
                  style={{
                    borderTop: "2px solid #373737",
                    borderBottom: "2px solid #373737",
                  }}
                >
                  <h3>Deposit Amount:</h3>
                  <p>
                    {/* {`₹ ${responseGetOPDPatientById?.currentData?.opdPatientStandardCharges}`} */}
                    ₹&nbsp; {selectedDateDeposit?.addedBalance}
                  </p>
                </div>

                <div
                  className="flex justify-end items-center px-[1rem] pb-[10px]"
                  style={{
                    // borderTop: "2px solid #373737",
                    borderBottom: "2px solid #373737",
                  }}
                >
                  <p>
                    {`₹ ${toWords.convert(selectedDateDeposit?.addedBalance, {
                      currency: true,
                    })}`}
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
