import { Suspense } from "react";
import { FaSearch } from "react-icons/fa";
import "./ManageDepartment.css";
import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { MdViewKanban } from "react-icons/md";

import { RiDeleteBin6Fill } from "react-icons/ri";

import Checkbox from "@mui/material/Checkbox";

import { useSelector, useDispatch } from "react-redux";

import Table from "../../../Table";

import Snackbars from "../../../SnackBar";

import {
  useCreateDepartmentMutation,
  useDeleteDepartmentByIdMutation,
  useUpdateManageDepartmentIsAppointmentApplicableByIdMutation,
} from "../../../../Store/Services/DepartmentService";
import {
  createDepartmentChange,
  updateDepartmentChange,
  deleteDepartmentChange,
} from "../../../../Store/Slices/DepartmentSlice";

export default function ManageDepartment({ setActivePage }) {
  const dispatch = useDispatch();
  const [createDepartment, responseCreateDepartment] =
    useCreateDepartmentMutation();

  const [deleteDepartmentById, responseDeleteDepartmentById] =
    useDeleteDepartmentByIdMutation();

  const [
    updateManageDepartmentIsAppointmentApplicableById,
    responseUpdateManageDepartmentIsAppointmentApplicableById,
  ] = useUpdateManageDepartmentIsAppointmentApplicableByIdMutation();

  // console.log(responseUpdateManageDepartmentIsAppointmentApplicableById);

  const { departments } = useSelector((state) => state.DepartmentState);

  // Snackbar--------------------
  // ----Succcess
  const [openSnackbarSuccess, setOpenSnackBarSuccess] = React.useState(false);
  const [snackBarMessageSuccess, setSnackBarSuccessMessage] =
    React.useState("");

  const handleClickSnackbarSuccess = () => {
    setOpenSnackBarSuccess(true);
  };
  // ----Warning
  const [openSnackbarWarning, setOpenSnackBarWarning] = React.useState(false);
  const [snackBarMessageWarning, setSnackBarSuccessWarning] =
    React.useState("");

  const handleClickSnackbarWarning = () => {
    setOpenSnackBarWarning(true);
  };
  // ----------------------------
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

  const [departmentCode, setDepartmentCode] = React.useState("");
  const [departmentName, setDepartmentName] = React.useState("");
  const [parentDepartmentName, setParentDepartmentName] = React.useState("");
  const [departmentDescription, setDepartmentDescription] = React.useState("");
  const [departmentNoticeText, setDepartmentNoticeText] = React.useState("");
  const [departmentHead, setDepartmentHead] = React.useState("");
  const [roomNumber, setRoomNumber] = React.useState("");
  const [isAppointmentApplicable, setIsAppointmentApplicable] =
    React.useState(false);

  const [search, setSearch] = React.useState("");

  const filteredArray = departments?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.departmentId?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const mappedData = filteredArray?.map((data, index) => {
    return {
      tableid: index + 1,
      data,
    };
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const config = [
    {
      label: "S No.",
      render: (list) => list.tableid,
    },
    {
      label: "Name",
      render: (list) => list.data.departmentName,
    },
    {
      label: "Parent Department",
      render: (list) => list.data.parentDepartmentName,
    },
    {
      label: "Description",
      render: (list) => list.data.departmentDescription,
    },
    {
      label: "Is Appointment Applicable",
      render: (list) => (
        <Checkbox
          onChange={(e) =>
            updateManageDepartmentIsAppointmentApplicableById({
              id: list.data.departmentId,
              data: { isAppointmentApplicable: e.target.checked },
            })
          }
          defaultChecked={list.data.isAppointmentApplicable}
        />
      ),
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
          {/* <div
            onClick={() => handleOpenUpdateModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
          </div> */}
          <div
            // onClick={() => handleClickOpenDialogBox(list)}
            onClick={() => deleteDepartmentById(list.data.departmentId)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer'>
            <RiDeleteBin6Fill className='text-[25px] text-[#EB5757]' />
          </div>
        </div>
      ),
    },
  ];

  const keyFn = (list) => {
    return list.id;
  };

  React.useEffect(() => {
    if (responseUpdateManageDepartmentIsAppointmentApplicableById.isSuccess) {
      dispatch(updateDepartmentChange(Math.random()));
      setSnackBarSuccessMessage(responseCreateDepartment?.data?.message);
      handleClickSnackbarSuccess();
    }
  }, [responseUpdateManageDepartmentIsAppointmentApplicableById.isSuccess]);

  React.useEffect(() => {
    if (responseDeleteDepartmentById.isSuccess) {
      dispatch(deleteDepartmentChange(Math.random()));
      setSnackBarSuccessMessage(responseCreateDepartment?.data?.message);
      handleClickSnackbarSuccess();
    }
  }, [responseDeleteDepartmentById.isSuccess]);

  React.useEffect(() => {
    if (responseCreateDepartment.isSuccess) {
      dispatch(createDepartmentChange(Math.random()));
      setSnackBarSuccessMessage(responseCreateDepartment?.data?.message);
      handleClickSnackbarSuccess();
      setDepartmentCode("");
      setDepartmentName("");
      setParentDepartmentName("");
      setDepartmentDescription("");
      setDepartmentNoticeText("");
      setDepartmentHead("");
      setRoomNumber("");
      setIsAppointmentApplicable(false);
      handleClose();
    }
  }, [responseCreateDepartment.isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      departmentCode: departmentCode,
      departmentName: departmentName,
      parentDepartmentName: parentDepartmentName,
      departmentDescription: departmentDescription,
      departmentNoticeText: departmentNoticeText,
      departmentHead: departmentHead,
      roomNumber: roomNumber,
      isAppointmentApplicable: isAppointmentApplicable,
    };

    createDepartment(submitData);
  };

  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <div className='flex flex-row gap-[1rem]'>
            <h3
              onClick={() => setActivePage("Manage Department")}
              className='border-b-[4px] border-[#3497F9] cursor-pointer'>
              Manage Department
            </h3>
            <h3
              onClick={() => setActivePage("Floors Department")}
              className='border-b-[4px] border-[#3497F9] opacity-50 cursor-pointer'>
              Floors Department
            </h3>
            <h3
              onClick={() => setActivePage("Manage Ward")}
              className='border-b-[4px] border-[#3497F9] opacity-50 cursor-pointer'>
              Manage Ward
            </h3>
            <h3
              onClick={() => setActivePage("Manage BEDS")}
              className='border-b-[4px] border-[#3497F9] opacity-50 cursor-pointer'>
              Manage BEDS
            </h3>
          </div>
          <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Department
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by department id'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
        <input type='date' className='bg-transparent outline-none' />
      </div> */}
        </div>
        <Table data={mappedData} config={config} keyFn={keyFn} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Add Department
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
              <form onSubmit={handleSubmit}>
                <div className='flex items-center justify-between gap-[2rem]'>
                  <h3 className='border-r w-[400px] py-[1rem]'>
                    Department Code *
                  </h3>
                  <input
                    value={departmentCode}
                    onChange={(e) => setDepartmentCode(e.target.value)}
                    required
                    type='text'
                    className='border rounded-lg w-full p-[8px] outline-none'
                  />
                </div>
                <div className='flex items-center justify-between gap-[2rem]'>
                  <h3 className='border-r w-[400px] py-[1rem]'>
                    Department name *
                  </h3>
                  <input
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    required
                    type='text'
                    className='border rounded-lg w-full p-[8px] outline-none'
                  />
                </div>
                <div className='flex items-center justify-between gap-[2rem]'>
                  <h3 className='border-r w-[400px] py-[1rem]'>
                    Parent Department name *
                  </h3>
                  <input
                    value={parentDepartmentName}
                    onChange={(e) => setParentDepartmentName(e.target.value)}
                    required
                    type='text'
                    className='border rounded-lg w-full p-[8px] outline-none'
                  />
                </div>
                <div className='flex items-center justify-between gap-[2rem]'>
                  <h3 className='border-r w-[400px] py-[1rem]'>
                    Department Description
                  </h3>
                  <input
                    value={departmentDescription}
                    onChange={(e) => setDepartmentDescription(e.target.value)}
                    required
                    type='text'
                    className='border rounded-lg w-full p-[8px] outline-none'
                  />
                </div>
                <div className='flex items-center justify-between gap-[2rem]'>
                  <h3 className='border-r w-[400px] py-[1rem]'>
                    Department Notice Text
                  </h3>
                  <input
                    value={departmentNoticeText}
                    onChange={(e) => setDepartmentNoticeText(e.target.value)}
                    required
                    type='text'
                    className='border rounded-lg w-full p-[8px] outline-none'
                  />
                </div>
                <div className='flex items-center justify-between gap-[2rem]'>
                  <h3 className='border-r w-[400px] py-[1rem]'>
                    Department Head
                  </h3>
                  <input
                    value={departmentHead}
                    onChange={(e) => setDepartmentHead(e.target.value)}
                    required
                    type='text'
                    className='border rounded-lg w-full p-[8px] outline-none'
                  />
                </div>
                <div className='flex items-center justify-between gap-[2rem]'>
                  <h3 className='border-r w-[400px] py-[1rem]'>Room Number</h3>
                  <input
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    type='number'
                    className='border rounded-lg w-full p-[8px] outline-none'
                  />
                </div>
                <div className='flex items-center justify-between gap-[2rem]'>
                  <h3 className='border-r w-[400px] py-[1rem]'>
                    Is Appointment Applicable
                  </h3>

                  <Checkbox
                    className='w-full p-[8px]'
                    onChange={(e) =>
                      setIsAppointmentApplicable(e.target.checked)
                    }
                    defaultChecked={false}
                  />
                </div>
                <div className='py-[2rem]'>
                  <button type='submit' className='buttonFilled'>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </Typography>
        </Box>
      </Modal>
      {/* Success Snackbar */}
      <Snackbars
        open={openSnackbarSuccess}
        setOpen={setOpenSnackBarSuccess}
        severity='success'
        message={snackBarMessageSuccess}
      />
      {/* Warning Snackbar */}
      <Snackbars
        open={openSnackbarWarning}
        setOpen={setOpenSnackBarWarning}
        severity='warning'
        message={snackBarMessageWarning}
      />
    </Suspense>
  );
}
