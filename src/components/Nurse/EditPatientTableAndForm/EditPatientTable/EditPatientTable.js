import React from "react";
import "./EditPatientTable.css";
import Table from "../../../Table";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Suspense } from "react";
import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";

import Checkbox from "@mui/material/Checkbox";

import { Link } from "react-router-dom";

export default function EditPatientTable({ setViewEditForm, setPatientId }) {
  const { patients } = useSelector((state) => state.PatientState);
  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  const [search, setSearch] = React.useState("");

  const filteredArray = patients?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.patientId?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  // const mappedPatientData = filteredArray?.map((patient, index) => {
  //   return {
  //     tableId: index + 1,
  //     data: patient,
  //   };
  // });

  const config = [
    {
      label: "UHID",
      render: (list) => list.patientId,
    },
    {
      label: "Patient Name",
      render: (list) => list.patientName,
    },
    {
      label: "Patient Email",
      render: (list) => list.patientEmail,
    },
    {
      label: "Patient Phone",
      render: (list) => list.patientPhone,
    },
    {
      label: "Date Created",
      render: (list) => `${date(list.createdAt)} - ${time(list.createdAt)}`,
    },
    {
      label: "Blood Group",
      render: (list) => list.patientBloodGroup,
    },
    {
      label: "User Action",
      render: (list) => (
        <div className='flex gap-[10px] justify-center'>
          <div
            // onClick={() => handleOpenViewModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer'>
            <Link
              // onClick={handleGeneratePdf}
              target='_blank'
              to={list?.patientId}
              // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
            >
              <MdViewKanban className='text-[25px] text-[#96999C]' />
            </Link>
          </div>
          <div
            // onClick={() => handleOpenUpdateModal(list)}
            onClick={() => {
              setPatientId(list?.patientId);
              setViewEditForm(true);
            }}
            className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
          </div>
          {/* <div
            // onClick={() => handleClickOpenDialogBox(list)}
            className="p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer"
          >
            <RiDeleteBin6Fill className="text-[25px] text-[#EB5757]" />
          </div> */}
        </div>
      ),
    },
  ];

  const keyFn = (list) => {
    return list.patientName;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>Patient List</h2>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by UHID'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
        </div>
        <Table data={filteredArray} config={config} keyFn={keyFn} />
      </div>
    </Suspense>
  );
}
