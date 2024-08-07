import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
import img from "../../../assets/20180125_001_1_.jpg";
import { IoIosArrowForward } from "react-icons/io";
import {
  getReferPatientsByDoctorIdData,
  getReferPatientsData,
} from "../DoctorApi";
import { useSelector } from "react-redux";
import PaginationComponent from "../../Pagination";
import {
  getAllDoctorVisitPatientsListData,
  getIPDPatientDoctorVisitData,
  getIpdPatientsDetailsData,
  getOnePatientsDoctorVisitData,
} from "../../Receptionist/NurseApi";
import { date, time } from "../../../utils/DateAndTimeConvertor";
import { FaSearch } from "react-icons/fa";

function DoctorReferTable() {
  const { adminLoggedInData } = useSelector((state) => state.AdminState);
  const [allReferPatients, setAllReferPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewPatientsData, setViewPatientsData] = useState({
    visitRecords: [],
    patientData: [],
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
  const [allIpdDoctorVisitList, setAllIpdDoctorVisitList] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [dailyDoctorVisitData, setDailyDoctorVisitData] = useState({
    doctorId: "",
    referDoctorId: "",
    referringDoctorId: "",
    referedDoctorName: "",
    referringDoctorName: "",
    doctorName: "",
    patientsId: "",
    ipdPatientId: "",
    symtoms: "",
    notes: "",
    visitDateTime: "",
  });
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  // const getAllDoctorVisitPatientsListDataHandle = async () => {
  //   const result = await getAllDoctorVisitPatientsListData();
  //   setAllIpdDoctorVisitList(result && result?.data?.data);
  //   console.log(result, "gfhfg");
  // };

  const getReferPatientsDataHandle = async () => {
    const result = await getReferPatientsByDoctorIdData(
      adminLoggedInData?.adminUniqueId
    );
    setAllReferPatients(result?.data?.data?.reverse());
    setFilteredData(result && result?.data?.data?.reverse());
    console.log(result, "gfhfg");
  };
  const getOnePatientsDoctorVisitDataHandle = async (Id) => {
    const result = await getOnePatientsDoctorVisitData(Id);

    setViewPatientsData(result && result?.data);
    console.log(result, "resulky");
  };
  const getIpdPatientsDetailsDataHandle = async (Id) => {
    const result = await getIpdPatientsDetailsData(Id);
    setPatientData(result && result?.data?.data?.[0]);
  };
  const getIPDPatientDoctorVisitDataHandle = async (Id) => {
    const result = await getIPDPatientDoctorVisitData(Id);
    setViewPatientsData({
      visitRecords: result?.data?.data,
      patientData: result?.data?.patientData,
    });
  };
  const searchHandle = () => {
    const filter = allReferPatients?.filter((item) => {
      if (search != "") {
        return (
          item?.PatientsDetails?.[0]?.patientName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item?.PatientsDetails?.[0]?.patientPhone
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item?.PatientsDetails?.[0]?.patientPhone2
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item?.PatientsDetails?.[0]?.patientId
            ?.toLowerCase()
            .includes(search.toLowerCase())
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
    getReferPatientsDataHandle();
    // getAllDoctorVisitPatientsListDataHandle();
  }, []);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Refered Patient</h2>
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
              <p>UHID</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Patient Name</p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Referal Notes</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Refering Doctor </p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Action</p>
            </th>
          </thead>
          <tbody>
            {filteredData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item, index) => (
                <tr key={index}>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {index + 1}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {"Uhid" + item?.ipdPatientsDetails?.ipdPatientId}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {item?.PatientsDetails?.[0]?.patientName}
                  </td>{" "}
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {item?.ReasonForReferal}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    {item?.ReferringDoctorDetails?.[0]?.doctorName}
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px] flex-row">
                    <div className="flex gap-[10px] justify-center">
                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                        onClick={() => [
                          handleOpen1(),

                          getIPDPatientDoctorVisitDataHandle(
                            item?.ipdPatientsDetails?.mainId
                          ),
                          setDailyDoctorVisitData({
                            ...dailyDoctorVisitData,
                            referDoctorId:
                              item?.ReferredDoctorDetails?.[0]?._id,
                          }),
                        ]}
                      >
                        <CiViewList className="text-[20px] text-[#96999C]" />
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
              Refer Patient's
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="flex pt-[10px] pb-[10px] gap-[10%]">
                <span>
                  <img src={img} alt="patients " className="w-[15rem] " />
                </span>
                <div class="grid grid-cols-2 gap-4">
                  <div className="flex gap-[10px]">
                    <span>Patients Reg ID</span>:
                    <p>{"Uhid" + patientData?.ipdPatientId}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admission Date / Time</span>:
                    <p>
                      {date(patientData?.updatedAt)}-
                      {time(patientData?.updatedAt)}
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Name</span>:
                    <p>{patientData?.PatientData?.[0]?.patientName}</p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>Gender</span>:
                    <p>{patientData?.PatientData?.[0]?.patientGender}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Categ</span>:<p>IPD</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Age</span>:
                    <p>{patientData?.PatientData?.[0]?.patientAge}</p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>IPD NO</span>:<p>{patientData?.ipdPatientId}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Mobile</span>:
                    <p>{patientData?.PatientData?.[0]?.patientPhone}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Bed/Floor </span>:
                    <p>
                      {patientData?.ipdBedNo}/{patientData?.ipdFloorNo}
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admitting Doctor Id</span>:
                    <p>{patientData?.ipdDoctorId}</p>
                  </div>
                </div>
              </div>
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
                <div class="grid grid-cols-2 gap-1">
                  <div className="flex gap-[10px]">
                    <span>Patients Uhid</span>:
                    <p>
                      {"Uhid" +
                        viewPatientsData?.patientData?.[0]?.patientData
                          ?.patientId}
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Admission Date / Time</span>:
                    <p>
                      {date(
                        viewPatientsData?.patientData?.[0]?.patientData
                          ?.createdAt
                      )}
                      -
                      {time(
                        viewPatientsData?.patientData?.[0]?.patientData
                          ?.createdAt
                      )}
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Name</span>:
                    <p>
                      {
                        viewPatientsData?.patientData?.[0]?.patientData
                          ?.patientName
                      }
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Gender</span>:
                    <p>
                      {
                        viewPatientsData?.patientData?.[0]?.patientData
                          ?.patientGender
                      }
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Age</span>:
                    <p>
                      {
                        viewPatientsData?.patientData?.[0]?.patientData
                          ?.patientAge
                      }
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Patient Blood Group</span>:
                    <p>
                      {
                        viewPatientsData?.patientData?.[0]?.patientData
                          ?.patientBloodGroup
                      }
                    </p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>IPD NO</span>:
                    <p>{viewPatientsData?.patientData?.[0]?.mainId}</p>
                  </div>

                  <div className="flex gap-[10px]">
                    <span>Admitting Doctor</span>:
                    <p>
                      {
                        viewPatientsData?.patientData?.[0]?.doctorData
                          ?.doctorName
                      }
                    </p>
                  </div>
                </div>
              </div>
              <form className="w-full flex flex-col gap-3">
                {viewPatientsData?.visitRecords?.length > 0
                  ? viewPatientsData?.visitRecords
                      ?.filter((val) => val?.submittedBy === "Refered Doctor")
                      ?.map((item) => (
                        <div>
                          <div className="w-full flex items-center">
                            <p className="text-[1.1rem] font-semibold pr-1">
                              Date:{" "}
                            </p>
                            {date(item?.VisitDateTime)}-
                            {time(item?.VisitDateTime)} - (
                            <p className="text-[#3497f9] pl-2">
                              {item?.submittedBy}
                            </p>
                            )
                          </div>
                          <div className="w-full ">
                            <div className="w-full flex justify-between items-center pt-1 pb-3">
                              <p className="text-[1rem] font-normal">
                                Medicine
                              </p>
                            </div>
                            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                              <thead>
                                <th className="border-[1px] p-1 font-semibold">
                                  <p>S_N</p>
                                </th>
                                <th className="border-[1px] p-1 font-semibold">
                                  <p>Medicine</p>
                                </th>

                                <th className="border-[1px] p-1 font-semibold">
                                  <p>Quantity</p>
                                </th>
                                <th className="border-[1px] p-1 font-semibold">
                                  <p>Total</p>
                                </th>
                              </thead>
                              <tbody>
                                {item?.medicine?.map((item, index) => (
                                  <tr key={index} className="border-b-[1px]">
                                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                                      {index + 1}
                                    </td>
                                    <td className="justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                                      <input
                                        type="text"
                                        className="w-full  outline-none px-4"
                                        placeholder="Medicine"
                                        name="name"
                                        value={item?.Name}
                                        autocomplete="off"
                                        disabled
                                      />
                                    </td>

                                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                                      <input
                                        type="text"
                                        className="w-[5rem]  outline-none"
                                        placeholder="quantity"
                                        name="quantity"
                                        value={item?.Quantity}
                                        disabled
                                      />
                                    </td>
                                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                                      <input
                                        type="text"
                                        className="w-[5rem]  outline-none"
                                        placeholder="price"
                                        name="price"
                                        value={item?.Price}
                                        disabled
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="w-full ">
                            <div className="w-full flex justify-between items-center pt-1 pb-3">
                              <p className="text-[1rem] font-normal">Test</p>
                            </div>
                            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                              <thead>
                                <th className="border-[1px] p-1 font-semibold">
                                  <p>S_N</p>
                                </th>
                                <th className="border-[1px] p-1 font-semibold">
                                  <p>Test</p>
                                </th>

                                <th className="border-[1px] p-1 font-semibold">
                                  <p>Quantity</p>
                                </th>
                                <th className="border-[1px] p-1 font-semibold">
                                  <p>Total</p>
                                </th>
                              </thead>
                              <tbody>
                                {item?.test?.map((item, index) => (
                                  <tr key={index} className="border-b-[1px]">
                                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                                      {index + 1}
                                    </td>
                                    <td className="justify-center text-[16px] py-4  text-center border-r flex flex-col relative">
                                      <input
                                        type="text"
                                        className="w-full  outline-none px-4"
                                        placeholder="Test"
                                        name="name"
                                        value={item?.Name}
                                        disabled
                                      />
                                    </td>

                                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                                      <input
                                        type="text"
                                        className="w-[5rem]  outline-none"
                                        placeholder="quantity"
                                        name="quantity"
                                        value={item?.Quantity}
                                        disabled
                                      />
                                    </td>
                                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                                      <input
                                        type="text"
                                        className="w-[5rem]  outline-none"
                                        placeholder="quantity"
                                        name="quantity"
                                        value={item?.Price}
                                        disabled
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="w-full gap-3 py-2 grid grid-cols-2">
                            <div className="w-full flex flex-col items-start justify-start gap-2">
                              <p>Symptoms</p>
                              <textarea
                                rows={3}
                                className="w-full border outline-none pl-1 pt-1"
                                placeholder="Symptoms"
                                value={item?.Symptoms}
                                disabled
                              />{" "}
                            </div>
                            <div className="w-full flex flex-col items-start justify-start gap-2">
                              <p>Notes</p>
                              <textarea
                                rows={3}
                                className="w-full border outline-none pl-1 pt-1"
                                placeholder="Note's"
                                value={item?.Note}
                                disabled
                              />{" "}
                            </div>
                          </div>
                        </div>
                      ))
                  : "No Doctor Visit Done Yet"}
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DoctorReferTable;
