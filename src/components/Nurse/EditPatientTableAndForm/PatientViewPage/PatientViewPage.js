import React, { Fragment, useEffect, useState } from "react";
import "./PatientViewPage.css";

import { useParams } from "react-router-dom";

import { useRef } from "react";

import logoImage from "../../../../assets/logo.png";

import { useReactToPrint } from "react-to-print";

import { useGetDoctorByIdQuery } from "../../../../Store/Services/DoctorService";
import { useGetPatientByIdQuery } from "../../../../Store/Services/PatientService";

import { ToWords } from "to-words";

export default function PatientViewPage() {
  const toWords = new ToWords();
  const { patientId } = useParams();

  const responseGetPatientById = useGetPatientByIdQuery(patientId);

  //   useEffect(() => {
  //     if (responseGetOPDPatientById.isSuccess) {
  //       setDoctorId(responseGetOPDPatientById?.currentData?.opdDoctorId);
  //       setPatientId(responseGetOPDPatientById?.currentData?.opdPatientId);
  //     }
  //   }, [responseGetOPDPatientById.isSuccess]);

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

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
      {responseGetPatientById.isLoading ? (
        "Loading..."
      ) : (
        <Fragment>
          {responseGetPatientById.isSuccess ? (
            <div className='w-full'>
              <button onClick={() => handlePrint()} className='buttonFilled'>
                Print
              </button>
              <div
                // ref={reportTemplateRef}
                ref={componentRef}
                className='w-full p-[1rem] flex flex-col gap-[1rem]'>
                <style>{getPageMargins()}</style>
                <div className='flex justify-between items-end'>
                  <div className='flex items-end gap-[1rem]'>
                    <img src={logoImage} alt='chtclogo' className='w-[150px]' />
                    <div className='flex flex-col items-start'>
                      <p className='text-[16px]'>
                        City Hospital and Trauma Centre
                      </p>
                      <p className='text-[14px]'>
                        Contact no. 9119900861, 9119900862
                      </p>
                    </div>
                  </div>
                  <div className='flex text-[12px] gap-[10px]'>
                    <p className='w-[250px]'>
                      C1-C2 Cinder Dump Complex, near Alambagh bus stand, Kanpur
                      road, Lucknow 226005
                    </p>
                  </div>
                </div>

                <h3
                  className='text-center'
                  style={{
                    borderTop: "2px solid #373737",
                    borderBottom: "2px solid #373737",
                  }}>
                  Patient Table Data
                </h3>

                <div
                  className='flex justify-between items-start pb-[1rem]'
                  style={{
                    borderBottom: "2px solid #373737",
                  }}>
                  <div className='grid grid-cols-2 gap-[10px] text-[8px]'>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>UHID</p>
                      <p>{responseGetPatientById?.currentData?.patientId}</p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>
                        Phone Number
                      </p>

                      {/* <p>
                      {`${date(
                        responseGetOPDPatientById?.currentData
                          ?.opdDoctorVisitDate
                      )} - ${time(
                        responseGetOPDPatientById?.currentData
                          ?.opdDoctorVisitDate
                      )}`}
                    </p> */}
                      <p>{responseGetPatientById?.currentData?.patientPhone}</p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>Name</p>
                      <p>{responseGetPatientById?.currentData?.patientName}</p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>
                        Phone Number of Attendent:
                      </p>
                      <p>
                        {responseGetPatientById?.currentData?.patientPhone2}hgfh
                      </p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>Gender:</p>
                      <p>
                        {responseGetPatientById?.currentData?.patientGender}
                      </p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>
                        Height and Weight:
                      </p>
                      <p>
                        {`${responseGetPatientById?.currentData?.patientHeight} / ${responseGetPatientById?.currentData?.patientWeight}`}
                      </p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>Age:</p>
                      <p>{responseGetPatientById?.currentData?.patientAge}</p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>
                        Blood Group:
                      </p>
                      <p>
                        {responseGetPatientById?.currentData?.patientBloodGroup}
                      </p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>
                        Father Name:
                      </p>
                      <p>
                        {responseGetPatientById?.currentData?.patientFatherName}
                      </p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>
                        Husband Name:
                      </p>
                      <p>
                        {
                          responseGetPatientById?.currentData
                            ?.patientHusbandName
                        }
                      </p>
                    </div>
                    <div className='flex'>
                      <p className='font-[500] w-[150px] text-start'>Email:</p>
                      <p>{responseGetPatientById?.currentData?.patientEmail}</p>
                    </div>
                  </div>
                  <div>
                    <div className='text-[#00000099] flex items-center gap-[10px] text-[12px]'>
                      <p>Appointment Date: </p>
                      <p>{`${date(
                        responseGetPatientById?.currentData?.createdAt
                      )}`}</p>
                    </div>
                    <div className='text-[#00000099] flex items-center gap-[10px] text-[14px]'>
                      <p>UHID: </p>
                      <p>{responseGetPatientById?.currentData?.patientId}</p>
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
