import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import PaginationComponent from "../../Pagination";
import { date, time } from "../../../utils/DateAndTimeConvertor";
import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { addDoctorDetailsForEmergencyPatientsDischargeData } from "../DoctorApi";
import {
  getAllEmergencyDischargePatientsDoctorListData,
  getAllEmergencyDischargePatientsListData,
} from "../../Receptionist/NurseApi";
import style from "../../../styling/styling";
import { IoIosArrowForward } from "react-icons/io";
import Snackbars from "../../SnackBar";
import { FaSearch } from "react-icons/fa";

function DoctorEmergencyDischargeTable() {
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { adminLoggedInData } = useSelector((state) => state.AdminState);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [allDischargeData, setAllDischargeData] = useState([]);
  const [dischargePatientsFinalReport, setDischargePatientsFinalReport] =
    useState({
      emergencyPatientsId: "",
      doctorId: "",
      provisionalDiagnosis: "",
      finalDiagnosis: "",
      physicianInCharge: "",
      name: "",
      ICD: "",
      result: "",
      disease_Diagnose: "",
      adviseDuringDischarge: "",
    });
  const getAllEmergencyDischargePatientsListDataHandle = async () => {
    const result = await getAllEmergencyDischargePatientsDoctorListData(
      adminLoggedInData?.adminUniqueId
    );

    setAllDischargeData(result?.data?.data?.reverse());
    setFilteredData(result?.data?.data?.reverse());
  };
  const addDoctorDetailsForEmergencyPatientsDischargeDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("doctorId", dischargePatientsFinalReport?.doctorId);
    formData.append(
      "provisionalDiagnosis",
      dischargePatientsFinalReport?.provisionalDiagnosis
    );
    formData.append(
      "finalDiagnosis",
      dischargePatientsFinalReport?.finalDiagnosis
    );
    formData.append(
      "physicianInCharge",
      dischargePatientsFinalReport?.physicianInCharge
    );
    formData.append("name", dischargePatientsFinalReport?.name);
    formData.append("ICD", dischargePatientsFinalReport?.ICD);
    formData.append("result", dischargePatientsFinalReport?.result);
    formData.append(
      "disease_Diagnose",
      dischargePatientsFinalReport?.disease_Diagnose
    );
    formData.append(
      "adviseDuringDischarge",
      dischargePatientsFinalReport?.adviseDuringDischarge
    );
    const result = await addDoctorDetailsForEmergencyPatientsDischargeData(
      dischargePatientsFinalReport?.emergencyPatientsId,
      formData
    );
    if (result?.status === 200) {
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      handleClose();
      getAllEmergencyDischargePatientsListDataHandle();
    }
    if (result?.status !== 200) {
      handleClickSnackbarWarning();
      setSnackBarSuccessWarning(result?.data?.message);
      handleClose();
    }
    console.log(result);
  };
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const searchHandle = () => {
    const filter = allDischargeData?.filter((item) => {
      if (search != "") {
        return item?.PatientName?.toLowerCase().includes(search.toLowerCase());
      }
      return item;
    });
    setFilteredData(filter && filter);
  };
  React.useEffect(() => {
    searchHandle();
  }, [search]);
  useEffect(() => {
    getAllEmergencyDischargePatientsListDataHandle();
  }, []);

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Emergency Discharge Patient
        </h2>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
          <FaSearch className="text-[#56585A]" />
          <input
            className="bg-transparent outline-none"
            placeholder="Search by Patient Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-[1px] p-1 font-semibold">
              <p>S_N</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Emergency Patient Name</p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Dis Checked</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Date and time</p>
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
                    {item?.PatientName}
                  </td>

                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    <Switch
                      checked={
                        item?.emergencyPatientDoctorConfirmation === true
                          ? true
                          : false
                      }
                    />
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    {date(item?.updatedAt)}-{time(item?.updatedAt)}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row">
                    <div className="flex gap-[10px] justify-center">
                      {/* <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                        <CiViewList className="text-[20px] text-[#96999C]" />
                      </div>{" "} */}
                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                        onClick={(e) => [
                          handleOpen(),
                          setDischargePatientsFinalReport({
                            ...dischargePatientsFinalReport,
                            doctorId: item?.doctorId,
                            emergencyPatientsId: item?.mainId,
                          }),
                        ]}
                      >
                        <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                      </div>
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
          data={allDischargeData}
        />
      </div>
      {/* Success Snackbar */}
      <Snackbars
        open={openSnackbarSuccess}
        setOpen={setOpenSnackBarSuccess}
        severity="success"
        message={snackBarMessageSuccess}
      />
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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Discharge Patient
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form
                className="w-full flex flex-col justify-start gap-2"
                onSubmit={
                  addDoctorDetailsForEmergencyPatientsDischargeDataHandle
                }
              >
                <span className="flex flex-col justify-start gap-1">
                  <p>Provisional Diagnosis</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                    value={dischargePatientsFinalReport?.provisionalDiagnosis}
                    onChange={(e) =>
                      setDischargePatientsFinalReport({
                        ...dischargePatientsFinalReport,
                        provisionalDiagnosis: e.target.value,
                      })
                    }
                    required
                  />
                </span>

                <span className="flex flex-col justify-start gap-1">
                  <p>Final Diagnosis :</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                    value={dischargePatientsFinalReport?.fi}
                    onChange={(e) =>
                      setDischargePatientsFinalReport({
                        ...dischargePatientsFinalReport,
                        finalDiagnosis: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Physician in Charge :</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                    value={dischargePatientsFinalReport?.physicianInCharge}
                    onChange={(e) =>
                      setDischargePatientsFinalReport({
                        ...dischargePatientsFinalReport,
                        physicianInCharge: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Name :</p>
                  <input
                    type="text"
                    placeholder="Add Symptoms"
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] "
                    value={dischargePatientsFinalReport?.name}
                    onChange={(e) =>
                      setDischargePatientsFinalReport({
                        ...dischargePatientsFinalReport,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>ICD :</p>
                  <input
                    type="text"
                    placeholder="Add Symptoms"
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] "
                    value={dischargePatientsFinalReport?.ICD}
                    onChange={(e) =>
                      setDischargePatientsFinalReport({
                        ...dischargePatientsFinalReport,
                        ICD: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Result : :</p>
                  <select
                    onChange={(e) =>
                      setDischargePatientsFinalReport({
                        ...dischargePatientsFinalReport,
                        result: e.target.value,
                      })
                    }
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] "
                    required
                  >
                    <option value="">Select One Reason</option>
                    <option value="Cured">Cured </option>
                    <option value="Relived">Relived </option>
                    <option value="LAMA">LAMA </option>
                    <option value="Absconded">Absconded </option>
                    <option value="Expired">Expired </option>
                    <option value="Referred">Referred </option>
                  </select>
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p> Disease / Diagnose :</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                    value={dischargePatientsFinalReport?.disease_Diagnose}
                    onChange={(e) =>
                      setDischargePatientsFinalReport({
                        ...dischargePatientsFinalReport,
                        disease_Diagnose: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p> Advise During Discharge</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                    value={dischargePatientsFinalReport?.adviseDuringDischarge}
                    onChange={(e) =>
                      setDischargePatientsFinalReport({
                        ...dischargePatientsFinalReport,
                        adviseDuringDischarge: e.target.value,
                      })
                    }
                    required
                  />
                </span>

                <button className="buttonFilled w-fit flex items-center">
                  {" "}
                  Save <IoIosArrowForward />
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
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

export default DoctorEmergencyDischargeTable;
