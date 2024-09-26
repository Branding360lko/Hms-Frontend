import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
import { IoIosArrowForward } from "react-icons/io";
import {
  addNurseDetailsForPatientsDischargeData,
  getAllDischargePatientsListData,
  getAllNurseDischargePatientsListData,
  getInvestigationORProcedureData,
} from "../NurseApi";
import Snackbars from "../../SnackBar";
import PaginationComponent from "../../Pagination";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { date } from "../../../utils/DateAndTimeConvertor";

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
  const [id, setId] = useState();
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [treatmentInBreif, setTreatmentInBreif] = useState([
    {
      date: "",
      operation: "",
      indications: "",
      surgeon: "",
      assistants: "",
      nurse: "",
      anaesthetist: "",
      anaesthesia: "",
      implantDetails: "",
    },
  ]);
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
  const { adminLoggedInData } = useSelector((state) => state.AdminState);
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
    const result = await getAllNurseDischargePatientsListData(
      adminLoggedInData?.adminUniqueId
    );
    setAllDischargeData(result?.data?.data?.reverse());
    setFilteredData(result?.data?.data);
  };
  const getInvestigationORProcedureDataHandle = async (Id) => {
    const result = await getInvestigationORProcedureData(Id);
    setPatientsDischargeData({
      ...patientsDischargeData,
      investigationORProcedure: String(result?.data?.data?.[0]?.tests),
      nurse: String(result?.data?.nurse?.nurseData),
    });
  };
  const addNurseDetailsForPatientsDischargeDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
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
    formData.append("TreatmentGivenInBrief", JSON.stringify(treatmentInBreif));
    formData.append("nurseId", adminLoggedInData?.adminUniqueId);
    const result = await addNurseDetailsForPatientsDischargeData(id, formData);
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
      getAllDischargePatientsListDataHandle();
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
  const addNewTreatmentTabHandle = (e) => {
    e.preventDefault();
    setTreatmentInBreif([
      ...treatmentInBreif,
      {
        operationDate: "",
        operation: "",
        indications: "",
        surgeon: "",
        assistants: "",
        nurse: "",
        anaesthetist: "",
        anaesthesia: "",
        implantDetails: "",
      },
    ]);
  };
  const deleteTreatmentTabHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...treatmentInBreif];

    oldValue.splice(index, 1);

    setTreatmentInBreif(oldValue && oldValue);
  };
  const handleUpdate = (index, field, value) => {
    setTreatmentInBreif((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = {
        ...updatedState[index],
        [field]: value,
      };
      return updatedState;
    });
  };
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const searchHandle = () => {
    const filter = allDischargeData?.filter((item) => {
      if (search != "") {
        return (
          item?.patientName?.toLowerCase().includes(search.toLowerCase()) ||
          item?.patientPhone?.toLowerCase().includes(search.toLowerCase()) ||
          item?.patientPhone2?.toLowerCase().includes(search.toLowerCase()) ||
          item?.patientUhid?.toLowerCase().includes(search.toLowerCase())
        );
      }
      return item;
    });
    setFilteredData(filter && filter);
  };
  React.useEffect(() => {
    searchHandle();
  }, [search]);
  useEffect(() => {
    getAllDischargePatientsListDataHandle();
  }, []);
  return (
    <Suspense fallback={<>...</>}>
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
              className="bg-transparent outline-none w-[27rem]"
              placeholder="Search by Patient Name Or Phone Number Or Uhid"
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
                <p>Patient Name</p>
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
                      {item?.patientName}
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
                      {date(item?.updatedAt)}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row">
                      <div className="flex gap-[10px] justify-center">
                        {item?.ipdPatientNurseConfirmation === false ? (
                          <div
                            className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                            onClick={() => [
                              handleOpen(),
                              getInvestigationORProcedureDataHandle(
                                item?.mainId
                              ),
                              setPatientsDischargeData({
                                ...patientsDischargeData,
                                ipdPatientId: item?.mainId,
                              }),
                              setId(item?.mainId),
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
                <span className="flex justify-between w-full py-1">
                  <p className="text-[1rem] font-semibold">
                    Treatment Given in Brief:
                  </p>
                  <button
                    onClick={(e) => addNewTreatmentTabHandle(e)}
                    className="flex items-center justify-center gap-2 bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
                  >
                    Add
                  </button>
                </span>

                {treatmentInBreif?.map((item, index) => (
                  <div className="w-full py-1">
                    <span className="w-full flex justify-end">
                      <button
                        className="bg-[red] text-[white] py-1 px-2 rounded-md"
                        onClick={(e) => deleteTreatmentTabHandle(e, index)}
                      >
                        Delete
                      </button>
                    </span>
                    <div className="w-full grid grid-cols-3 gap-2">
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Date:</p>
                        <input
                          type="date"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1 h-[3.4rem]"
                          name="date"
                          value={item?.operationDate}
                          onChange={(e) => [
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              date: e.target.value,
                            }),
                            handleUpdate(
                              index,
                              "operationDate",
                              e.target.value
                            ),
                          ]}
                          required
                        />
                      </div>{" "}
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Operation:</p>
                        <textarea
                          rows={2}
                          placeholder="Operation"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                          value={item?.operations}
                          onChange={(e) => [
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              operations: e.target.value,
                            }),
                            handleUpdate(index, "operation", e.target.value),
                          ]}
                          required
                        />
                      </div>{" "}
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Indications:</p>
                        <textarea
                          rows={2}
                          placeholder="Indications"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                          value={item?.indications}
                          onChange={(e) => [
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              indications: e.target.value,
                            }),
                            handleUpdate(index, "indications", e.target.value),
                          ]}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Surgeon:</p>
                        <textarea
                          rows={2}
                          placeholder="Surgeon"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                          value={item?.surgeon}
                          onChange={(e) => [
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              surgeon: e.target.value,
                            }),
                            handleUpdate(index, "surgeon", e.target.value),
                          ]}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Assistants:</p>
                        <textarea
                          rows={2}
                          placeholder="Assistants"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                          value={item?.assistants}
                          onChange={(e) => [
                            [
                              setPatientsDischargeData({
                                ...patientsDischargeData,
                                assistants: e.target.value,
                              }),
                              handleUpdate(index, "assistants", e.target.value),
                            ],
                          ]}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Nurse:</p>
                        <textarea
                          rows={2}
                          placeholder="Nurse"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                          value={item?.nurse}
                          onChange={(e) => [
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              nurse: e.target.value,
                            }),
                            handleUpdate(index, "nurse", e.target.value),
                          ]}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Anaesthetist:</p>
                        <textarea
                          rows={2}
                          placeholder="Anaesthetist"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                          value={item?.anaesthetist}
                          onChange={(e) => [
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              anaesthetist: e.target.value,
                            }),
                            handleUpdate(index, "anaesthetist", e.target.value),
                          ]}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Anaesthesia:</p>
                        <textarea
                          rows={2}
                          placeholder="Anaesthesia"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                          value={item?.anaesthesia}
                          onChange={(e) => [
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              anaesthesia: e.target.value,
                            }),
                            handleUpdate(index, "anaesthesia", e.target.value),
                          ]}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p>Implant Details:</p>
                        <textarea
                          rows={2}
                          placeholder="Implant Details"
                          className="border-[2px] w-full rounded outline-none pl-1 pt-1"
                          value={item?.implantDetails}
                          onChange={(e) => [
                            setPatientsDischargeData({
                              ...patientsDischargeData,
                              implantDetails: e.target.value,
                            }),
                            handleUpdate(
                              index,
                              "implantDetails",
                              e.target.value
                            ),
                          ]}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
    </Suspense>
  );
}

export default DischargePatientsTable;
