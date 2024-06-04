import "./EmergencyPatientPrescriptionTable.css";
import { Suspense } from "react";
import Table from "../../Table";
import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";

import Select from "react-select";

export default function EmergencyPatientPrecriptionTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const modalAddForm = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <form
        className='flex flex-col gap-[1rem]'
        // onSubmit={handleAddUser}
      >
        <div className='grid grid-cols-4 gap-[2rem] border-b pb-[3rem] pt-[2rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>UHID</label>
            <Select
              required
              // options={renderedPatientIDForDropdown}
              // onChange={setOpdPatientId}
            />
          </div>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Add consumables</label>
            <Select
              required
              // options={renderedPatientIDForDropdown}
              // onChange={setOpdPatientId}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Doctor visit</label>
            <select
              required
              className='py-[10px] outline-none border-b bg-transparent'
              // value={opdPatientPaymentMode}
              // onChange={(e) => setOpdPatientPaymentMode(e.target.value)}
            >
              <option>YES</option>
              <option>NO</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Doctor visit time</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              // onChange={(e) => setOpdDoctorVisitDate(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Add Tests</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter tests'
              // onChange={(e) => setOpdDoctorVisitDate(e.target.value)}
            />
          </div>
        </div>
        <div className='py-[1rem] w-full flex flex-col gap-[1rem]'>
          <p>Note</p>
          <textarea
            rows={4}
            className='w-full border rounded-md p-[10px]'
            placeholder='Enter text here...'
          />
        </div>
        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            className='buttonFilled'
            // onClick={() => setSubmitButton("add")}
          >
            {`Save >`}
          </button>
        </div>
      </form>
    </div>
  );

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const modalUpdateForm = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <form
        className='flex flex-col gap-[1rem]'
        // onSubmit={handleAddUser}
      >
        <div className='grid grid-cols-4 gap-[2rem] border-b pb-[3rem] pt-[2rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>UHID</label>
            <Select
              required
              // options={renderedPatientIDForDropdown}
              // onChange={setOpdPatientId}
            />
          </div>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Add consumables</label>
            <Select
              required
              // options={renderedPatientIDForDropdown}
              // onChange={setOpdPatientId}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Doctor visit</label>
            <select
              required
              className='py-[10px] outline-none border-b bg-transparent'
              // value={opdPatientPaymentMode}
              // onChange={(e) => setOpdPatientPaymentMode(e.target.value)}
            >
              <option>YES</option>
              <option>NO</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Doctor visit time</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              // onChange={(e) => setOpdDoctorVisitDate(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Add Tests</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter tests'
              // onChange={(e) => setOpdDoctorVisitDate(e.target.value)}
            />
          </div>
        </div>
        <div className='py-[1rem] w-full flex flex-col gap-[1rem]'>
          <p>Note</p>
          <textarea
            rows={4}
            className='w-full border rounded-md p-[10px]'
            placeholder='Enter text here...'
          />
        </div>
        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            className='buttonFilled'
            // onClick={() => setSubmitButton("add")}
          >
            {`Save >`}
          </button>
        </div>
      </form>
    </div>
  );

  const data = [
    {
      id: 1,
      UHID: 2024100001,
      patientName: "Test Patient 1",
    },
  ];
  const [search, setSearch] = React.useState("");

  const filteredArray = data?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.adminEmail?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const config = [
    {
      label: "S No.",
      render: (list) => list.id,
    },
    {
      label: "UHID",
      render: (list) => list.UHID,
    },
    {
      label: "Patients Name",
      render: (list) => list.patientName,
    },
    {
      label: "Action",
      render: (list) => (
        <div className='flex gap-[10px] justify-center'>
          <div
            // onClick={() => handleOpenViewModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer'>
            <MdViewKanban className='text-[25px] text-[#96999C]' />
          </div>
          <div
            onClick={() => handleOpenUpdateModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
          </div>
          {/* <div
            // onClick={() => handleClickOpenDialogBox(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer'>
            <RiDeleteBin6Fill className='text-[25px] text-[#EB5757]' />
          </div> */}
        </div>
      ),
    },
  ];

  const keyFn = (list) => {
    return list.adminEmail;
  };

  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>
            Add IPD Patient Prescription
          </h2>
          <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add IPD Patient Prescription
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by Patient'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
        <input type='date' className='bg-transparent outline-none' />
      </div> */}
        </div>
        <Table data={filteredArray} config={config} keyFn={keyFn} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Add Emergency Prescription
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalAddForm}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Edit Emergency Prescription
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalUpdateForm}
          </Typography>
        </Box>
      </Modal>
    </Suspense>
  );
}
