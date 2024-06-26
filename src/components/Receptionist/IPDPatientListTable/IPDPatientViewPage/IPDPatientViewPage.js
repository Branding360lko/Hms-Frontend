import React, { Fragment, useRef } from "react";
import "./IPDPatientViewPage.css";
import logoImage from "../../../../assets/logo.png";

import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function IPDPatientViewPage() {
  const { ipdPatientViewPageID } = useParams();

  console.log(ipdPatientViewPageID);

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
      <div className='flex flex-col gap-[1rem] w-full items-center'>
        <button onClick={() => handlePrint()} className='buttonFilled w-fit'>
          Print
        </button>
        <Fragment>
          <div
            // ref={reportTemplateRef}
            ref={componentRef}
            className='w-full p-[1rem] flex flex-col gap-[1rem]'>
            <style>{getPageMargins()}</style>
            <div className='flex justify-between items-end'>
              <div className='flex items-end gap-[1rem]'>
                <img src={logoImage} alt='chtclogo' className='w-[120px]' />
                <div className='flex flex-col items-start'>
                  <h3>City Hospital and Trauma Centre</h3>
                  <p className='text-[14px]'>
                    Contact No. 9119900861,9119900862
                  </p>
                </div>
              </div>
              <div className='flex text-[8px] gap-[10px]'>
                <p className='font-[600]'>Address: </p>
                <p className='w-[200px]'>
                  C1-C2 cinder dump complex ,near Alambagh bus stand ,Kanpur
                  road, Lucknow 226005
                </p>
              </div>
            </div>
            <h3
              className='text-center py-[10px]'
              style={{
                borderTop: "1px solid #CFCFCF",
                borderBottom: "1px solid #CFCFCF",
              }}>
              IPD Patient Details
            </h3>
            <div
              className='grid grid-cols-3 gap-[10px] text-[8px] pb-[1rem]'
              style={{ borderBottom: "1px solid #CFCFCF" }}>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px] '>Patients Reg ID</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>OCC Bed Category</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>MR No. and IP No.</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>Name</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px] '>Bill Date-Time</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>Admitting Doctor</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>Gender</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>Admission Date-Time</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px] '>Room No. and Bed No.</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>Age</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>Discharge Date-Time</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>Admission Category</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px] '>Patient Category</p>
                <p>Hello</p>
              </div>
              <div className='flex justify-start text-start'>
                <p className='font-[600] w-[100px]'>Tariff Category</p>
                <p>Hello</p>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </>
  );
}
