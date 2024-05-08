import React from "react";
import "./IPDDoctorVisitTable.css";
import { Suspense } from "react";

import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";

import { FaRegSave } from "react-icons/fa";

import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";

export default function IPDDoctorVisitTable() {
  const { patients } = useSelector((state) => state.PatientState);
  const { doctors } = useSelector((state) => state.DoctorState);

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  const [searchByPatientReg, setSearchByPatientReg] = React.useState("");
  const [searchByDoctorName, setSearchByDoctorName] = React.useState("");
  const [searchByDate, setSearchByDate] = React.useState("");

  const doctorVisitData = [
    {
      doctorName: "Doctor 1",
      patientId: "Patient12345",
      dateTime: "2024,04,13",
    },
    {
      doctorName: "Doctor 2",
      patientId: "Patient22346",
      dateTime: "2024,04,14",
    },
    {
      doctorName: "Doctor 3",
      patientId: "Patient2254346",
      dateTime: "2024,04,15",
    },
    {
      doctorName: "Doctor 4",
      patientId: "Patient65346",
      dateTime: "2024,04,16",
    },
  ];

  const filteredArray = doctorVisitData?.filter((data) => {
    if (searchByPatientReg !== "") {
      const userSearch = searchByPatientReg.toLowerCase();
      const searchInData = data?.patientId?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    if (searchByDoctorName !== "") {
      const userSearch = searchByDoctorName.toLowerCase();
      const searchInData = data?.doctorName?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    if (searchByDate !== "") {
      const userSearch = date(searchByDate);
      const searchInData = date(data?.dateTime);

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const [patientId, setPatientId] = React.useState("");

  const renderedPatientForDropdownPrescription = patients?.map((data) => {
    return {
      value: data.patientId,
      label: `${data.patientId} / ${data.patientName}`,
    };
  });

  const [doctorId, setDoctorId] = React.useState("");

  const renderedDoctorForDropdownPrescription = doctors?.map((data) => {
    return {
      value: data.doctorId,
      label: `${data.doctorId} / ${data.doctorName}`,
    };
  });

  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>Dr Visit List</h2>
          {/* <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add Patient
          </button> */}
        </div>
        <div className='flex flex-col gap-[2rem]'>
          <div className='flex gap-[1rem]'>
            <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
              <FaSearch className='text-[#56585A]' />
              <input
                className='bg-transparent outline-none'
                placeholder='Search by patient'
                value={searchByPatientReg}
                onChange={(e) => {
                  setSearchByPatientReg(e.target.value);
                  setSearchByDoctorName("");
                  setSearchByDate("");
                }}
              />
            </div>
            <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
              <FaSearch className='text-[#56585A]' />
              <input
                className='bg-transparent outline-none'
                placeholder='Search by doctor'
                value={searchByDoctorName}
                onChange={(e) => {
                  setSearchByDoctorName(e.target.value);
                  setSearchByDate("");
                  setSearchByPatientReg("");
                }}
              />
            </div>

            <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
              <input
                type='date'
                className='bg-transparent outline-none'
                value={searchByDate}
                onChange={(e) => {
                  setSearchByDate(e.target.value);
                  setSearchByDoctorName("");
                  setSearchByPatientReg("");
                }}
              />
            </div>
          </div>
          <div className='grid grid-cols-4 gap-[1rem] border-b pb-[1rem]'>
            <p>Dr. Name</p>
            <p>p..Registration Number</p>
            <p>Date / time</p>
            <p>Save Details</p>
          </div>
          <form className='grid grid-cols-4 gap-[1rem] border-b pb-[1rem]'>
            <Select
              className='text-[12px] w-full'
              required
              options={renderedDoctorForDropdownPrescription}
              onChange={setDoctorId}
              value={doctorId}
            />
            <Select
              className='text-[12px] w-full'
              required
              options={renderedPatientForDropdownPrescription}
              onChange={setPatientId}
              value={patientId}
            />
            <input
              className='py-[10px] outline-none border-b w-full'
              type='datetime-local'
              required
              //   onChange={(e) => setVisitTime(e.target.value)}
            />
            <div className='flex justify-center'>
              <button type='submit' className='w-fit'>
                <FaRegSave className='text-[30px] cursor-pointer' />
              </button>
            </div>
          </form>

          <table>
            <tr className='py-[1rem]'>
              <th className='py-[1rem] border'>S No.</th>
              <th className='py-[1rem] border'>Dr name</th>
              <th className='py-[1rem] border'>p..Registration Number</th>
              <th className='py-[1rem] border'>Date / time</th>
              <th className='py-[1rem] border'>Action</th>
            </tr>
            {filteredArray?.map((data, index) => {
              return (
                <tr
                  className=''
                  key={`${index}-${data.patientId}-${data.doctorName}-${data.dateTime}`}>
                  <td className='py-[1rem] border'>{index + 1}</td>
                  <td className='py-[1rem] border'>{data.doctorName}</td>
                  <td className='py-[1rem] border'>{data.patientId}</td>
                  <td className='py-[1rem] border'>{data.dateTime}</td>
                  <td className='py-[1rem] border flex justify-center'>
                    <FaEdit className='text-[30px]' />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Suspense>
  );
}
