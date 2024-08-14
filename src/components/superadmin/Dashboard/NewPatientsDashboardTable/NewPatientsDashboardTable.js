import React from "react";
import { Suspense } from "react";
import Table from "../../../Table";
import "./NewPatientsDashboardTable.css";
import { IoIosArrowForward } from "react-icons/io";
import patientImage from "../../../../assets/20180125_001_1_.jpg";
import { date, time } from "../../../../utils/DateAndTimeConvertor";
import { useNavigate } from "react-router-dom";
import browserLinks from "../../../../browserlinks";

export default function NewPatientsDashboardTable({ data }) {
  const navigate = useNavigate();
  // const mappedData = [
  //   {
  //     id: "1",
  //     time: "12:00",
  //     date: "21-01-2024",
  //     patientName: "Arman",
  //     patientPicture: patientImage,
  //     doctor: "Dr. Stone",
  //   },
  //   {
  //     id: "2",
  //     time: "12:00",
  //     date: "21-01-2024",
  //     patientName: "Arman",
  //     patientPicture: patientImage,
  //     doctor: "Dr. Stone",
  //   },
  // ];

  const config = [
    {
      label: "Date/Time",
      render: (list) => `${date(list?.createdAt)} - ${time(list?.createdAt)}`,
    },
    {
      label: "UHID",
      render: (list) => list?.patientId,
    },
    {
      label: "Patient Name",
      render: (list) => (
        <div className="flex gap-[10px] justify-center items-center">
          {list.patientImage ? (
            <img
              src={`${process.env.React_App_Base_Image_Url}/${list.patientImage}`}
              alt={"patientPicture" + list.patientId}
              className="rounded-full w-[50px] h-[50px]"
            />
          ) : (
            <img
              src={patientImage}
              alt={"patientPicture" + list.patientId}
              className="rounded-full w-[50px] h-[50px]"
            />
          )}
          <p>{list?.patientName}</p>
        </div>
      ),
    },
    {
      label: "Phone",
      render: (list) => list.patientPhone,
    },
  ];

  const keyFn = (list) => {
    return list.id;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className="appointment-dashboard-table flex flex-col py-[1rem] px-[1rem] gap-[10px] border rounded-[12px]">
        <div className="flex flex-row justify-between items-center ">
          <p className="text-[20px] border-t-[4px] border-[#3497F9] pt-[1rem]">
            New Patients
          </p>
          <button
            onClick={() =>
              navigate(
                `${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.patients}`
              )
            }
            className="bg-[#2196F3] text-white p-[10px] rounded-[8px] flex flex-row items-center gap-[10px]"
          >
            <p>See More</p>
            <IoIosArrowForward />
          </button>
        </div>
        <Table data={data} config={config} keyFn={keyFn} />
      </div>
    </Suspense>
  );
}
