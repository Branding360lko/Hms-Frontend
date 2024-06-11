import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
import { IoIosArrowForward } from "react-icons/io";
import {
  addNurseDetailsForPatientsDischargeData,
  getAllDischargePatientsListData,
} from "../NurseApi";
import Snackbars from "../../SnackBar";
import PaginationComponent from "../../Pagination";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

function DischargePatientsTable() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
  const { adminUniqueId, adminLoggedInData } = useSelector(
    (state) => state.AdminState
  );
  const [allDischargeData, setAllDischargeData] = useState([]);
  const [patientsDischargeData, setPatientsDischargeData] = useState({
    ipdPatientId: "",
    admittedFor: "",
    investigationORProcedure: "",
    conditionDuringDischarge: "",
    date: "",
    operations: "",
    indications: "",
    surgeon: "",
    assistants: "",
    nurse: "",
    anaesthetist: "",
    anaesthesia: "",
    implantDetails: "",
  });
  const getAllDischargePatientsListDataHandle = async () => {
    const result = await getAllDischargePatientsListData();
    if (result) {
      const data = result?.data?.filter((item) => {
        return (
          item?.ipdNurseId === adminLoggedInData?.adminUniqueId &&
          item?.ipdPatientDoctorRequestForDischarge === true &&
          item?.ipdPatientNurseRequestForDischarge === true
        );
      });
      setAllDischargeData(data?.reverse());
      setFilteredData(data?.reverse());
      console.log(result, data);
    }
  };
  const addNurseDetailsForPatientsDischargeDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nurseId", "");
    formData.append("admittedFor", patientsDischargeData?.admittedFor);
    formData.append(
      "investigationORProcedure",
      patientsDischargeData?.investigationORProcedure
    );
    formData.append(
      "conditionDuringDischarge",
      patientsDischargeData?.conditionDuringDischarge
    );
    formData.append("date", patientsDischargeData?.date);
    formData.append("operations", patientsDischargeData?.operations);
    formData.append("indications", patientsDischargeData?.indications);
    formData.append("surgeon", patientsDischargeData?.surgeon);
    formData.append("assistants", patientsDischargeData?.assistants);
    formData.append("nurse", patientsDischargeData?.nurse);
    formData.append("anaesthetist", patientsDischargeData?.anaesthetist);
    formData.append("anaesthesia", patientsDischargeData?.anaesthesia);
    formData.append("implantDetails", patientsDischargeData?.implantDetails);
    const result = await addNurseDetailsForPatientsDischargeData(
      patientsDischargeData?.ipdPatientId,
      formData
    );
    if (result?.status === 200) {
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      handleClose();
      setPatientsDischargeData({
        ipdPatientId: "",
        admittedFor: "",
        investigationORProcedure: "",
        conditionDuringDischarge: "",
        date: "",
        operations: "",
        indications: "",
        surgeon: "",
        assistants: "",
        nurse: "",
        anaesthetist: "",
        anaesthesia: "",
        implantDetails: "",
      });
    }
    if (result?.status !== 200) {
      handleClickSnackbarWarning();
      setSnackBarSuccessWarning(result?.data?.message);
      handleClose();
      setPatientsDischargeData({
        ipdPatientId: "",
        admittedFor: "",
        investigationORProcedure: "",
        conditionDuringDischarge: "",
        date: "",
        operations: "",
        indications: "",
        surgeon: "",
        assistants: "",
        nurse: "",
        anaesthetist: "",
        anaesthesia: "",
        implantDetails: "",
      });
    }
  };
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const searchHandle = () => {
    const filter = allDischargeData?.filter((item) => {
      if (search != "") {
        return item?.ipdPatientId?.toLowerCase().includes(search.toLowerCase());
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
    getAllDischargePatientsListDataHandle();
  }, []);
  useEffect(() => {
    console.log(patientsDischargeData);
  }, [patientsDischargeData]);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Discharge Patient List
        </h2>
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
              <p>UIHD</p>
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
                    {"Uhid" + item?.ipdPatientId}
                  </td>

                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    <Switch
                      {...label}
                      checked={
                        item?.ipdPatientNurseConfirmation === true
                          ? true
                          : false
                      }
                    />
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    21/02/24 15:30
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row">
                    <div className="flex gap-[10px] justify-center">
                      {item?.ipdPatientNurseConfirmation === false ? (
                        <div
                          className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                          onClick={() => [
                            handleOpen(),
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              ipdPatientId: item?.mainId,
                            }),
                          ]}
                        >
                          <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                        </div>
                      ) : (
                        <div className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-not-allowed">
                          <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                        </div>
                      )}
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
            <h2 className="border-b-[4px] border-[#3497F9] w-fit mb-2 pb-1">
              Discharge Patient
            </h2>
            <form
              className="w-full flex flex-col justify-start items-start gap-2"
              onSubmit={addNurseDetailsForPatientsDischargeDataHandle}
            >
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p>Admitted For:</p>
                <textarea
                  rows={3}
                  placeholder="Admitted For"
                  className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                  value={patientsDischargeData?.admittedFor}
                  onChange={(e) =>
                    setPatientsDischargeData({
                      ...patientsDischargeData,
                      admittedFor: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p>Investigation / Procedure:</p>
                <textarea
                  rows={3}
                  placeholder="Investigation / Procedure"
                  className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                  value={patientsDischargeData?.investigationORProcedure}
                  onChange={(e) =>
                    setPatientsDischargeData({
                      ...patientsDischargeData,
                      investigationORProcedure: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p>Condition During Discharge:</p>
                <textarea
                  rows={3}
                  placeholder="Condition During 
                  Discharge"
                  className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                  value={patientsDischargeData?.conditionDuringDischarge}
                  onChange={(e) =>
                    setPatientsDischargeData({
                      ...patientsDischargeData,
                      conditionDuringDischarge: e.target.value,
                    })
                  }
                />
              </div>
              <p className="text-[1rem] font-semibold">
                Treatment Given in Brief:
              </p>
              <div className="w-full grid grid-cols-3 gap-2">
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Date:</p>
                  <input
                    type="date"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1 h-[3.4rem]"
                    value={patientsDischargeData?.date}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        date: e.target.value,
                      })
                    }
                  />
                </div>{" "}
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Operation:</p>
                  <textarea
                    rows={2}
                    placeholder="Operation"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={patientsDischargeData?.operations}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        operations: e.target.value,
                      })
                    }
                  />
                </div>{" "}
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Indications:</p>
                  <textarea
                    rows={2}
                    placeholder="Indications"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={patientsDischargeData?.indications}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        indications: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Surgeon:</p>
                  <textarea
                    rows={2}
                    placeholder="Surgeon"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={patientsDischargeData?.surgeon}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        surgeon: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Assistants:</p>
                  <textarea
                    rows={2}
                    placeholder="Assistants"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={patientsDischargeData?.assistants}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        assistants: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Nurse:</p>
                  <textarea
                    rows={2}
                    placeholder="Nurse"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={patientsDischargeData?.nurse}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        nurse: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Anaesthetist:</p>
                  <textarea
                    rows={2}
                    placeholder="Anaesthetist"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={patientsDischargeData?.anaesthetist}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        anaesthetist: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Anaesthesia:</p>
                  <textarea
                    rows={2}
                    placeholder="Anaesthesia"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={patientsDischargeData?.anaesthesia}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        anaesthesia: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <p>Implant Details:</p>
                  <textarea
                    rows={2}
                    placeholder="Implant Details"
                    className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                    value={patientsDischargeData?.implantDetails}
                    onChange={(e) =>
                      setPatientsDischargeData({
                        ...patientsDischargeData,
                        implantDetails: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md ">
                Save <IoIosArrowForward />
              </button>
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
