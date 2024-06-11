import { Backdrop, Box, Fade, Modal, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
import Select from "react-select";
import { IoIosArrowForward } from "react-icons/io";
import {
  addNurseReferPatientsData,
  getAllNurseReferData,
  getOneReferPatientDataData,
} from "../NurseApi";
import { useDispatch, useSelector } from "react-redux";
import { GetIpdPatientsHandle } from "../../../Store/Slices/IPDPatientSlice";
import { GetAllDoctorsHandle } from "../../../Store/Slices/DoctorSlice";
import Snackbars from "../../SnackBar";
import PaginationComponent from "../../Pagination";
import { FaSearch } from "react-icons/fa";
function DischargePatientsTable() {
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [allReferedpatients, setAllReferedpatients] = useState([]);
  const todayDate = new Date();
  const startOfDay = new Date(todayDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(todayDate.setHours(23, 59, 59, 999));
  const dispatch = useDispatch();
  const { ipdPatients } = useSelector((state) => state.IPDPatientState);
  const { doctors } = useSelector((state) => state.DoctorState);
  const { adminUniqueId, adminLoggedInData } = useSelector(
    (state) => state.AdminState
  );
  const [referPatientData, setReferPatientData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addReferPatients, setAddReferPatients] = useState({
    ipdPatients: "",
    referingDoctor: "",
    referedDoctor: "",
    referingDate: "",
    reasonForReferal: "",
    note: "",
  });
  const renderedIpdPatientsForDropdown = ipdPatients?.map((data) => {
    return {
      value: data._id,
      label: `${"Uhid" + data.ipdPatientId}`,
    };
  });
  const renderedDoctorIDForDropdown = doctors?.map((data) => {
    return {
      value: data._id,
      label: `${data.doctorName}`,
    };
  });

  const indicatorSeparatorStyle = {
    alignSelf: "stretch",
    backgroundColor: "",
    marginBottom: 8,
    marginTop: 8,
    width: 1,
    border: "transparent",
    outline: "none",
  };
  const getAllNurseReferDataHandle = async () => {
    const result = await getAllNurseReferData();
    if (result?.status === 200) {
      const filter = result?.data?.data?.filter(
        (item) =>
          item?.ipdPatientsDetails?.ipdNurseId ===
          adminLoggedInData?.adminUniqueId
      );
      setAllReferedpatients(filter);
      setFilteredData(filter);
    }
  };
  const addNurseReferPatientsDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ipdPatient", addReferPatients?.ipdPatients?.value);
    formData.append("referringDoctor", addReferPatients?.referingDoctor?.value);
    formData.append("ReferredDoctor", addReferPatients?.referedDoctor?.value);
    formData.append("ReferedDateAndTime", addReferPatients?.referingDate);
    formData.append("ReasonForReferal", addReferPatients?.reasonForReferal);
    formData.append("Note", addReferPatients?.note);
    const result = await addNurseReferPatientsData(formData);
    if (result?.status === 201) {
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      handleClose();
      getAllNurseReferDataHandle();
    }
    console.log(result);
  };
  const getOneReferPatientDataDataHandle = async (Id) => {
    setIsLoading(true);
    const result = await getOneReferPatientDataData(Id);
    setReferPatientData(result && result?.data?.data?.[0]);
    setIsLoading(false);
    console.log(result);
  };
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const searchHandle = () => {
    const filter = allReferedpatients?.filter((item) => {
      if (search != "") {
        return item?.PatientsDetails?.[0]?.patientId
          ?.toLowerCase()
          .includes(search.toLowerCase());
      }
      return item;
    });
    setFilteredData(filter && filter);

    console.log(filter);
  };
  React.useEffect(() => {
    searchHandle();
  }, [search]);
  useEffect(() => {
    getAllNurseReferDataHandle();
  }, []);
  useEffect(() => {
    dispatch(GetIpdPatientsHandle());
    dispatch(GetAllDoctorsHandle());
  }, []);
  useEffect(() => {
    console.log(addReferPatients);
  }, [addReferPatients]);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Refer Patient List</h2>
        <button
          className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Referral
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
          <FaSearch className="text-[#56585A]" />
          <input
            className="bg-transparent outline-none"
            placeholder="Search by patient id"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
      </div>
      <div className="w-full">
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-[1px] p-1 font-semibold">
              <p>S_N</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Patient Uhid</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Referring Doctor</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Referred Doctor</p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>ReferralDate</p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Action</p>
            </th>
          </thead>
          <tbody>
            {filteredData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item, index) => (
                <tr key={index} className="border-b-[1px]">
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    {index + 1}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    {"UHID" + item?.PatientsDetails?.[0]?.patientId}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    {item?.ReferringDoctorDetails?.[0]?.doctorName}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    {item?.ReferredDoctorDetails?.[0]?.doctorName}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    {item?.ReferedDateAndTime}
                  </td>

                  <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                    <div className="flex gap-[10px] justify-center">
                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                        onClick={() => [
                          handleOpen2(),
                          getOneReferPatientDataDataHandle(item?._id),
                        ]}
                      >
                        <CiViewList className="text-[20px] text-[#96999C]" />
                      </div>{" "}
                      {/* <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                        onClick={() => [
                          handleOpen1(),
                          getOneReferPatientDataDataHandle(item?._id),
                        ]}
                      >
                        <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                      </div> */}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <PaginationComponent
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          data={filteredData}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form
              className="w-full flex flex-col items-start justify-start gap-2"
              onSubmit={addNurseReferPatientsDataHandle}
            >
              <div className="grid grid-cols-2 gap-4 w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Patients Uhid</p>
                  <Select
                    closeMenuOnSelect={false}
                    components={{ indicatorSeparatorStyle }}
                    options={renderedIpdPatientsForDropdown}
                    className="border-[2px] w-full rounded"
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        ipdPatients: e,
                      })
                    }
                    required
                  />
                </span>
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Refrring Doc ID</p>
                  <Select
                    closeMenuOnSelect={false}
                    components={{ indicatorSeparatorStyle }}
                    options={renderedDoctorIDForDropdown}
                    className="border-[2px] w-full rounded"
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        referingDoctor: e,
                      })
                    }
                    required
                  />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Referred Doc ID </p>
                  <Select
                    closeMenuOnSelect={false}
                    components={{ indicatorSeparatorStyle }}
                    options={renderedDoctorIDForDropdown}
                    className="border-[2px] w-full rounded"
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        referedDoctor: e,
                      })
                    }
                    required
                  />
                </span>
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Referral Date</p>
                  <input
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    min={startOfDay.toISOString().slice(0, 16)}
                    max={endOfDay.toISOString().slice(0, 16)}
                    className="border-[2px] w-full h-[2.4rem] rounded outline-none"
                    style={{ borderWidth: "2px" }}
                    value={addReferPatients?.referingDate}
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        referingDate: e.target.value,
                      })
                    }
                    required
                  />
                </span>
              </div>
              <div className="grid grid-cols-2 gap- w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Reason for Referral </p>
                  <textarea
                    rows={3}
                    placeholder="Reason for Referral"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        reasonForReferal: e.target.value,
                      })
                    }
                    required
                  />
                </span>
              </div>
              <div className="flex flex-col items-start justify-start gap-2 w-full">
                <p>Note </p>
                <textarea
                  rows={4}
                  placeholder="Additional Info"
                  className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                  onChange={(e) =>
                    setAddReferPatients({
                      ...addReferPatients,
                      note: e.target.value,
                    })
                  }
                />
              </div>
              <button className="flex items-center gap-1 bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md">
                Save <IoIosArrowForward />
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open1}>
          <Box sx={style}>
            <form
              className="w-full flex flex-col items-start justify-start gap-2"
              // onSubmit={addNurseReferPatientsDataHandle}
            >
              <div className="grid grid-cols-2 gap-4 w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Patients Uhid</p>
                  {!isLoading && (
                    <Select
                      closeMenuOnSelect={false}
                      components={{ indicatorSeparatorStyle }}
                      options={renderedIpdPatientsForDropdown}
                      defaultValue={{
                        label:
                          referPatientData?.IpdPatientDetails?.[0]
                            ?.ipdPatientId,
                        value: referPatientData?.IpdPatientDetails?.[0]?._id,
                      }}
                      className="border-[2px] w-full rounded"
                      onChange={(e) =>
                        setAddReferPatients({
                          ...addReferPatients,
                          ipdPatients: e,
                        })
                      }
                      required
                    />
                  )}
                </span>
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Refrring Doc ID</p>
                  {!isLoading && (
                    <Select
                      closeMenuOnSelect={false}
                      components={{ indicatorSeparatorStyle }}
                      options={renderedDoctorIDForDropdown}
                      defaultValue={{
                        label:
                          referPatientData?.referringDoctor?.[0]?.doctorName,
                        value: referPatientData?.referringDoctor?.[0]?._id,
                      }}
                      className="border-[2px] w-full rounded"
                      onChange={(e) =>
                        setAddReferPatients({
                          ...addReferPatients,
                          referingDoctor: e,
                        })
                      }
                      required
                    />
                  )}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Referred Doc ID </p>
                  {!isLoading && (
                    <Select
                      closeMenuOnSelect={false}
                      components={{ indicatorSeparatorStyle }}
                      options={renderedDoctorIDForDropdown}
                      className="border-[2px] w-full rounded"
                      defaultValue={{
                        label:
                          referPatientData?.ReferredDoctor?.[0]?.doctorName,
                        value: referPatientData?.ReferredDoctor?.[0]?._id,
                      }}
                      onChange={(e) =>
                        setAddReferPatients({
                          ...addReferPatients,
                          referedDoctor: e,
                        })
                      }
                      required
                    />
                  )}
                </span>
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Referral Date</p>
                  <input
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    min={startOfDay.toISOString().slice(0, 16)}
                    max={endOfDay.toISOString().slice(0, 16)}
                    className="border-[2px] w-full h-[2.4rem] rounded outline-none"
                    style={{ borderWidth: "2px" }}
                    value={referPatientData?.ReferedDateAndTime}
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        referingDate: e.target.value,
                      })
                    }
                    required
                  />
                </span>
              </div>
              <div className="grid grid-cols-2 gap- w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Reason for Referral </p>
                  <textarea
                    rows={3}
                    placeholder="Reason for Referral"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={referPatientData?.ReasonForReferal}
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        reasonForReferal: e.target.value,
                      })
                    }
                    required
                  />
                </span>
              </div>
              <div className="flex flex-col items-start justify-start gap-2 w-full">
                <p>Note </p>
                <textarea
                  rows={4}
                  placeholder="Additional Info"
                  className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                  value={referPatientData?.Note}
                  onChange={(e) =>
                    setAddReferPatients({
                      ...addReferPatients,
                      note: e.target.value,
                    })
                  }
                />
              </div>
              <button className="flex items-center gap-1 bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md">
                Update <IoIosArrowForward />
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style}>
            <form
              className="w-full flex flex-col items-start justify-start gap-2"
              // onSubmit={addNurseReferPatientsDataHandle}
            >
              <div className="grid grid-cols-2 gap-4 w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Patients Uhid</p>
                  {!isLoading && (
                    <Select
                      closeMenuOnSelect={false}
                      components={{ indicatorSeparatorStyle }}
                      options={renderedIpdPatientsForDropdown}
                      defaultValue={{
                        label:
                          referPatientData?.IpdPatientDetails?.[0]
                            ?.ipdPatientId,
                        value: referPatientData?.IpdPatientDetails?.[0]?._id,
                      }}
                      className="border-[2px] w-full rounded"
                      isDisabled
                      required
                    />
                  )}
                </span>
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Refrring Doc ID</p>
                  {!isLoading && (
                    <Select
                      closeMenuOnSelect={false}
                      components={{ indicatorSeparatorStyle }}
                      options={renderedDoctorIDForDropdown}
                      defaultValue={{
                        label:
                          referPatientData?.referringDoctor?.[0]?.doctorName,
                        value: referPatientData?.referringDoctor?.[0]?._id,
                      }}
                      className="border-[2px] w-full rounded"
                      isDisabled
                      required
                    />
                  )}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Referred Doc ID </p>
                  {!isLoading && (
                    <Select
                      closeMenuOnSelect={false}
                      components={{ indicatorSeparatorStyle }}
                      options={renderedDoctorIDForDropdown}
                      className="border-[2px] w-full rounded"
                      defaultValue={{
                        label:
                          referPatientData?.ReferredDoctor?.[0]?.doctorName,
                        value: referPatientData?.ReferredDoctor?.[0]?._id,
                      }}
                      isDisabled
                      required
                    />
                  )}
                </span>
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Referral Date</p>
                  <input
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    min={startOfDay.toISOString().slice(0, 16)}
                    max={endOfDay.toISOString().slice(0, 16)}
                    className="border-[2px] w-full h-[2.4rem] rounded outline-none"
                    style={{ borderWidth: "2px" }}
                    value={referPatientData?.ReferedDateAndTime}
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        referingDate: e.target.value,
                      })
                    }
                    disabled
                    required
                  />
                </span>
              </div>
              <div className="grid grid-cols-2 gap- w-full">
                <span className="flex flex-col justify-start items-start w-full gap-2">
                  <p>Reason for Referral </p>
                  <textarea
                    rows={3}
                    placeholder="Reason for Referral"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={referPatientData?.ReasonForReferal}
                    onChange={(e) =>
                      setAddReferPatients({
                        ...addReferPatients,
                        reasonForReferal: e.target.value,
                      })
                    }
                    disabled
                    required
                  />
                </span>
              </div>
              <div className="flex flex-col items-start justify-start gap-2 w-full">
                <p>Note </p>
                <textarea
                  rows={4}
                  placeholder="Additional Info"
                  className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                  value={referPatientData?.Note}
                  onChange={(e) =>
                    setAddReferPatients({
                      ...addReferPatients,
                      note: e.target.value,
                    })
                  }
                  disabled
                />
              </div>
              {/* <button className="flex items-center gap-1 bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md">
                Update <IoIosArrowForward />
              </button> */}
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* Success Snackbar */}
      <Snackbars
        open={openSnackbarSuccess}
        setOpen={setOpenSnackBarSuccess}
        severity="success"
        message={snackBarMessageSuccess}
      />
      {/* Warning Snackbar */}
      <Snackbars
        open={openSnackbarWarning}
        setOpen={setOpenSnackBarWarning}
        severity="warning"
        message={snackBarMessageWarning}
      />
    </div>
  );
}
export default DischargePatientsTable;
