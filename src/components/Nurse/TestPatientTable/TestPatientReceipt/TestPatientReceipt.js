import React, { Fragment, useEffect, useState } from "react";
import "./TestPatientReceipt.css";

import { useParams } from "react-router-dom";

import { useRef } from "react";

import logoImage from "../../../../assets/logo.png";

import { useReactToPrint } from "react-to-print";

import { useGetDoctorByIdQuery } from "../../../../Store/Services/DoctorService";
import { useGetPatientByIdQuery } from "../../../../Store/Services/PatientService";
import { useGetTestOfPatientByIdQuery } from "../../../../Store/Services/TestPatient";

import { ToWords } from "to-words";

import axios from "axios";

export default function TestPatientReceipt() {
  const toWords = new ToWords();
  const { testPatientId } = useParams();

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    const day = String(newdate.getDate()).padStart(2, "0");
    const month = String(newdate.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = newdate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  const responseGetDoctorById = useGetDoctorByIdQuery(doctorId);
  const responseGetPatientById = useGetPatientByIdQuery(patientId);
  const responseGetTestOfPatientByIdQuery =
    useGetTestOfPatientByIdQuery(testPatientId);

  const [testData, setTestData] = useState(false);

  const getTestData = async (id) => {
    return await axios
      .get(`${process.env.React_App_Base_url}/get-one-test/${id}`)
      .then((data) => setTestData(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (responseGetTestOfPatientByIdQuery.isSuccess) {
      setDoctorId(
        responseGetTestOfPatientByIdQuery?.currentData?.prescribedByDoctor
      );
      setPatientId(
        responseGetTestOfPatientByIdQuery?.currentData?.testPatientId
      );

      getTestData(responseGetTestOfPatientByIdQuery?.currentData?.test);
    }
  }, [responseGetTestOfPatientByIdQuery.isSuccess]);

  console.log(testData);

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
      {responseGetTestOfPatientByIdQuery.isLoading &&
      responseGetDoctorById.isLoading &&
      responseGetPatientById.isLoading &&
      !testData ? (
        "Loading..."
      ) : (
        <Fragment>
          {responseGetTestOfPatientByIdQuery.isSuccess &&
          responseGetDoctorById.isSuccess &&
          responseGetPatientById.isSuccess &&
          testData ? (
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
                <p className="text-center text-[12px]">Test Billing</p>
                <h3
                  className="text-center"
                  style={{
                    borderTop: "2px solid #373737",
                    borderBottom: "2px solid #373737",
                  }}
                >
                  Payment Receipt
                </h3>

                <div className="grid grid-cols-2 gap-[10px] text-[14px]">
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">UHID</p>
                    <p>
                      {
                        responseGetTestOfPatientByIdQuery?.currentData
                          ?.testPatientId
                      }
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">
                      Visit Date
                    </p>
                    {/* <p className="border-b-[2px] border-dotted border-black w-[200px]">{``}</p> */}
                    <p>
                      {`${date(
                        responseGetTestOfPatientByIdQuery?.currentData
                          ?.createdAt
                      )} - ${time(
                        responseGetTestOfPatientByIdQuery?.currentData
                          ?.createdAt
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
                    <p>{responseGetPatientById?.currentData?.patientCity}</p>
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
                      Test Bill No.
                    </p>
                    <p>{testPatientId}</p>
                  </div>

                  <div className="flex">
                    <p className="font-[500] w-[130px] text-start">Test Name</p>
                    <p>{testData?.data?.Name}</p>
                  </div>
                </div>
                <div
                  className="flex justify-between p-[1rem]"
                  style={{
                    borderTop: "2px solid #373737",
                    borderBottom: "2px solid #373737",
                  }}
                >
                  <h3>Test Fees:</h3>
                  <p>{`₹ ${testData?.data?.Cost}`}</p>
                </div>
                <div
                  className="flex justify-end items-center px-[1rem] pb-[10px]"
                  style={{
                    // borderTop: "2px solid #373737",
                    borderBottom: "2px solid #373737",
                  }}
                >
                  <p>
                    {`₹ ${toWords.convert(testData?.data?.Cost, {
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
