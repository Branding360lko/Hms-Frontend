import React, { useEffect, useRef, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import img from "../../../assets/20180125_001_1_.jpg";
import { IoIosArrowForward } from "react-icons/io";
import style from "../../../styling/styling";
import {
  addDoctorDetailsForPatientsDischargeData,
  getDoctorNameData,
} from "../DoctorApi";
import Snackbars from "../../SnackBar";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Pagination";
import { date } from "../../../utils/DateAndTimeConvertor";
import { getAllDoctorDischargePatientsListData } from "../../Receptionist/NurseApi";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getMedicineDataHandle } from "../../../Store/Slices/Medicine";
function DoctorDischargePatientsTable() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

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
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
  };
  const { medicineData } = useSelector((state) => state.MedicineData);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const selectRef = useRef(null);
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const [search, setSearch] = React.useState("");
  const [searchMedicine, setSearchMedicine] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = React.useState([]);
  const [allDischargeData, setAllDischargeData] = useState([]);
  const [doctorMainId, setDoctorMainId] = useState();
  const [dischargePatientsFinalReport, setDischargePatientsFinalReport] =
    useState({
      ipdPatientsId: "",
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
  const [adviseDuringDischarge, setAdviseDuringDischarge] = useState([]);
  const [medicineDuringDischarge, setMedicineAdviseDuringDischarge] = useState(
    []
  );
  const selectMedicineHandle = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      const filter = medicineData?.data?.filter((item) => {
        if (e.target.value !== "") {
          return item?.Name?.toLowerCase()?.includes(
            e.target.value?.toLowerCase()
          );
        }
      });
      setSearchMedicine(filter && filter);
    }, 100);
    setIsLoading(false);
  };
  const addSelectedMedicineDataHandle = (index, item) => {
    let oldValue = [...medicineDuringDischarge];
    oldValue[index] = {
      ...oldValue[index],
      medicine: item?.Name,
    };
    setMedicineAdviseDuringDischarge(oldValue && oldValue);
    setSearchMedicine([]);
    setActiveIndex(null);
  };
  const addMedicineTableHandle = (e) => {
    e.preventDefault();
    setMedicineAdviseDuringDischarge([
      ...medicineDuringDischarge,
      { medicine: "", schedule: "" },
    ]);
  };
  const deleteMedicineHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...medicineDuringDischarge];
    oldValue.splice(index, 1);
    setMedicineAdviseDuringDischarge(oldValue && oldValue);
  };
  const getMedicineData = (e, index) => {
    let oldValue = [...medicineDuringDischarge];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    setMedicineAdviseDuringDischarge(oldValue && oldValue);
  };
  const getScheduleData = (e, index) => {
    let oldValue = [...medicineDuringDischarge];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    setMedicineAdviseDuringDischarge(oldValue && oldValue);
  };
  const addAdviceTableHandle = (e) => {
    e.preventDefault();
    setAdviseDuringDischarge([...adviseDuringDischarge, { advice: "" }]);
  };
  const deleteAdviceHandle = (e, index) => {
    e.preventDefault();
    let oldValue = [...adviseDuringDischarge];
    oldValue.splice(index, 1);
    setAdviseDuringDischarge(oldValue && oldValue);
  };
  const getAdviceData = (e, index) => {
    let oldValue = [...adviseDuringDischarge];
    oldValue[index] = {
      ...oldValue[index],
      [e.target.name]: e.target.value,
    };
    setAdviseDuringDischarge(oldValue && oldValue);
  };
  const getAllIpdPatientsDataHandle = async () => {
    const result = await getAllDoctorDischargePatientsListData(
      adminLoggedInData?.adminUniqueId
    );
    setAllDischargeData(result && result?.data?.data?.reverse());
    setFilteredData(result && result?.data?.data);
  };
  const addDoctorDetailsForPatientsDischargeDataHandle = async (e) => {
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
      JSON.stringify(adviseDuringDischarge)
    );
    formData.append(
      "medicineAdviseDuringDischarge",
      JSON.stringify(medicineDuringDischarge)
    );
    const result = await addDoctorDetailsForPatientsDischargeData(
      doctorMainId,
      formData
    );
    if (result?.status === 200) {
      handleClickSnackbarSuccess();
      setSnackBarSuccessMessage(result?.data?.message);
      handleClose();
      getAllIpdPatientsDataHandle();
    }
    if (result?.status !== 200) {
      handleClickSnackbarWarning();
      setSnackBarSuccessWarning(result?.data?.message);
      handleClose();
      getAllIpdPatientsDataHandle();
    }
    console.log(result);
  };
  const getDoctorNameDataHandle = async () => {
    const result = await getDoctorNameData(adminLoggedInData?.adminUniqueId);
    setDischargePatientsFinalReport({
      ...dischargePatientsFinalReport,
      name: result?.data?.data,
    });
  };
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveIndex(null);
        setSearchMedicine([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (medicineData?.data?.length === 0) {
      dispatch(getMedicineDataHandle());
    }
  }, []);
  React.useEffect(() => {
    searchHandle();
  }, [search]);
  useEffect(() => {
    getAllIpdPatientsDataHandle();
  }, []);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Discharge Patient</h2>
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
                    {item?.patientName}
                  </td>

                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                    <Switch
                      {...label}
                      checked={
                        item?.ipdPatientDoctorConfirmation === true
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
                      {/* <div className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer">
                        <CiViewList className="text-[20px] text-[#96999C]" />
                      </div>{" "} */}
                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                        onClick={(e) => [
                          handleOpen(),
                          setDischargePatientsFinalReport({
                            ...dischargePatientsFinalReport,
                            doctorId: item?.ipdDoctorId,
                            ipdPatientsId: item?.mainId,
                          }),
                          getDoctorNameDataHandle(),
                          setDoctorMainId(item?.mainId),
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
                onSubmit={addDoctorDetailsForPatientsDischargeDataHandle}
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
                    placeholder="ICD"
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
                  <p>Result :</p>
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
                  <p> Advise & Medicine During Discharge</p>
                  <div className="flex items-center justify-between w-full py-1">
                    <p>Medicine During Discharge</p>
                    <button
                      onClick={(e) => addMedicineTableHandle(e)}
                      className="buttonFilled"
                    >
                      Add +
                    </button>
                  </div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-[1px] p-1 font-semibold">
                        <p>S_N</p>
                      </th>
                      <th className="border-[1px] p-1 font-semibold">
                        <p>Medicine Name</p>
                      </th>
                      <th className="border-[1px] p-1 font-semibold">
                        <p>Schedule</p>
                      </th>
                      <th className="border-[1px] p-1 font-semibold">
                        <p>Action</p>
                      </th>
                    </thead>

                    <tbody>
                      {medicineDuringDischarge?.map((item, index) => (
                        <tr className="border-b-[1px]" key={"med" + index}>
                          <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                            {index + 1}
                          </td>
                          <td className="justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                            <input
                              type="text"
                              name="medicine"
                              placeholder="medicine"
                              value={item?.medicine}
                              className="w-full h-full border-none outline-none pl-1"
                              onFocus={() => setActiveIndex(index)}
                              onChange={(e) => [
                                getMedicineData(e, index),
                                selectMedicineHandle(e),
                              ]}
                              autocomplete="off"
                              required
                            />
                            {activeIndex === index && (
                              <span
                                ref={selectRef}
                                className="bg-white z-50 overflow-y-scroll absolute flex flex-col justify-start items-start gap-2 w-full h-[15rem] border top-[3.5rem]"
                              >
                                {searchMedicine?.length > 0 ? (
                                  searchMedicine?.map((item) => (
                                    <p
                                      key={index}
                                      className="w-full hover:bg-[#2196f3] hover:text-white p-1 text-start hover:cursor-pointer"
                                      onClick={() => [
                                        addSelectedMedicineDataHandle(
                                          index,
                                          item
                                        ),
                                        setActiveIndex(null),
                                      ]}
                                    >
                                      {item?.Name}
                                    </p>
                                  ))
                                ) : (
                                  <p className="w-full flex items-center justify-center">
                                    {isLoading === true
                                      ? "Loading...."
                                      : "No Result Found"}
                                  </p>
                                )}
                              </span>
                            )}
                          </td>
                          <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                            <input
                              type="text"
                              name="schedule"
                              placeholder="schedule"
                              value={item?.schedule}
                              onChange={(e) => [getScheduleData(e, index)]}
                              className="w-full h-full border-none outline-none"
                            />
                          </td>
                          <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                            <div className="flex gap-[10px] justify-center">
                              <div
                                className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                                onClick={(e) => deleteMedicineHandle(e, index)}
                              >
                                <MdDelete className="text-[20px] text-[#96999C]" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between w-full py-1">
                    <p>Advise During Discharge</p>
                    <button
                      onClick={(e) => addAdviceTableHandle(e)}
                      className="buttonFilled"
                    >
                      Add +
                    </button>
                  </div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-[1px] p-1 font-semibold">
                        <p>S_N</p>
                      </th>
                      <th className="border-[1px] p-1 font-semibold">
                        <p>Advice</p>
                      </th>

                      <th className="border-[1px] p-1 font-semibold">
                        <p>Action</p>
                      </th>
                    </thead>

                    <tbody>
                      {adviseDuringDischarge?.map((item, index) => (
                        <tr className="border-b-[1px]" key={"advice" + index}>
                          <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                            {index + 1}
                          </td>
                          <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                            <input
                              type="text"
                              name="advice"
                              placeholder="Advice"
                              value={item?.advice}
                              onChange={(e) => [getAdviceData(e, index)]}
                              className="w-full h-full border-none outline-none"
                              required
                            />
                          </td>

                          <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                            <div className="flex gap-[10px] justify-center">
                              <div
                                className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                                onClick={(e) => deleteAdviceHandle(e, index)}
                              >
                                <MdDelete className="text-[20px] text-[#96999C]" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </span>

                <button className="buttonFilled w-fit flex items-center">
                  Save <IoIosArrowForward />
                </button>
              </form>
            </Typography>
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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Refer Patient's
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="flex pt-[10px] pb-[10px] gap-[10%]">
                <span>
                  <img src={img} alt="patients " className="w-[15rem] " />
                </span>
                <div class="grid grid-cols-2 gap-4">
                  <div className="flex gap-[10px]">
                    <span>Patients Reg ID</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admission Date / Time</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Name</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Discharge Date / Time</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Gender</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Categ</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Age</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Tarilt Catrg</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>IPD NO</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>MR and IP No</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Bill Bed Catrg</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admitting Doctor</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>OCC bed categ</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Room and bed NO</span>:<p>19</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Bill Date and Time</span>:<p>19</p>
                  </div>
                </div>
              </div>
              <form className="w-full flex flex-col justify-start gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p>Provisional Diagnosis</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                  />
                </span>

                <span className="flex flex-col justify-start gap-1">
                  <p>Final Diagnosis :</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Physician in Charge :</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Name :</p>
                  <input
                    type="text"
                    placeholder="Add Symptoms"
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] "
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>ICD :</p>
                  <input
                    type="text"
                    placeholder="Add Symptoms"
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] "
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Result : :</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p> Disease / Diagnose :</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p> Advise During Discharge</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                  />
                </span>

                <button className="buttonFilled w-fit flex items-center">
                  {" "}
                  Save <IoIosArrowForward />
                </button>
              </form>
              {/* <form className="w-full flex flex-col justify-start gap-2 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <span className="flex flex-col justify-start gap-1">
                    <p>UHID</p>
                    <input
                      type="text"
                      placeholder="UHID"
                      className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                      disabled
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Refrring Doctor Id</p>
                    <input
                      type="text"
                      placeholder="Refrring Doctor Id"
                      className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                      disabled
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="flex flex-col justify-start gap-1">
                    <p>Referred to Doc ID </p>
                    <input
                      type="text"
                      placeholder="Referred to Doc ID"
                      className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                      disabled
                    />
                  </span>
                  <span className="flex flex-col justify-start gap-1">
                    <p>Referral Date</p>
                    <input
                      type="text"
                      placeholder="Referral Date"
                      className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                      disabled
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="flex flex-col justify-start gap-1">
                    <p>Reason For Referral </p>
                    <textarea
                      rows={5}
                      placeholder="Reason For Referral "
                      className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                      disabled
                    />
                  </span>
                </div>

                <span className="flex flex-col justify-start gap-1">
                  <p> Note's</p>
                  <textarea
                    rows={5}
                    placeholder="Note's"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                    disabled
                  />
                </span>

                <button className="buttonFilled w-fit flex items-center">
                  {" "}
                  Update <IoIosArrowForward />
                </button>
              </form> */}
            </Typography>
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

export default DoctorDischargePatientsTable;
