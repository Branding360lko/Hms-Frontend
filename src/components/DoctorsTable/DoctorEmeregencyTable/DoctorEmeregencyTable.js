import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
import Select from "react-select";
import img1 from "../../../assets/logo.png";
import { useReactToPrint } from "react-to-print";
import { date, time } from "../../../utils/DateAndTimeConvertor";
import img from "../../../assets/20180125_001_1_.jpg";
import {
  getAllEmergencyPatientsData,
  getAllEmergencyPatientsListData,
  getAllEmergencyPatientsWithDoctorIdData,
  getOneEmergencyPatientsDoctorVisitData,
} from "../../Receptionist/NurseApi";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const indicatorSeparatorStyle = {
  alignSelf: "stretch",
  backgroundColor: "",
  marginBottom: 8,
  marginTop: 8,
  width: 1,
  border: "transparent",
  outline: "none",
};
const colourOptions = [
  { value: "Amlodipine", label: "Amlodipine" },
  { value: "Albuterol", label: "Albuterol" },
  { value: "Amoxicillin", label: "Amoxicillin" },
  { value: "Atorvastatin", label: "Atorvastatin" },
  { value: "Levothyroxine", label: "Levothyroxine" },
  { value: "Metformin", label: "Metformin" },
  { value: "Azithromycin", label: "Azithromycin" },
  { value: "Cephalexin", label: "Cephalexin" },
  { value: "Lisinopril", label: "Lisinopril" },
  { value: "Hydrocodone", label: "Hydrocodone" },
];

function DoctorEmeregencyTable() {
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
  const IndicatorSeparator = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
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
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const printView = (
    <div className="print-hide">
      <div className="print-show w-full" ref={componentRef}>
        <div className="flex justify-between items-center pl-[15px] pr-[15px]">
          <span className="flex items-center gap-[18px]">
            <img
              src={img1}
              alt="logo"
              className="w-[150px] h-[120px] object-contain"
            />
            <span>
              <h4 className="text-start text-[20px] font-bold">
                City Hospital and Trauma Centre
              </h4>
              <p className="text-start text-[14px]">
                Contact No. 9119900861,9119900862
              </p>
            </span>
          </span>
          <p className="text-start w-[20rem] text-[14px]">
            C1-C2 cinder dump complex ,near Alambagh bus stand ,Kanpur road,
            Lucknow 226005{" "}
          </p>
        </div>
        <hr />
        <h2 className="pt-[10px] pb-[10px] font-semibold text-center">
          Emergency Patients
        </h2>
        <hr />
        <div className="flex items-start pt-[20px] pb-[20px] gap-[10%] w-full">
          <div class="grid grid-cols-2 gap-4 pl-[20px] pr-[20px] w-7/12">
            <div className="flex gap-[10px]">
              <span>UHID</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Phone number</span>:<p>--------</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Name</span>:<p>Arman Ali</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Phone Number of Attendent:</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Gender</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>H/ W</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Father's Name</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Blood Group</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Husband Name:</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Room and Bed NO</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Email</span>:<p>19</p>
            </div>
          </div>
          <div>
            <div className="flex gap-[10px]">
              <span>Appointment Date:</span>:<p>12/04/24</p>
            </div>
            <div className="flex gap-[10px]">
              <span>ID:</span>:<p>4565235</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex items-start pt-[20px] pb-[20px] gap-4 w-full px-[1rem] flex-col">
          <div className="flex items-center justify-start w-full gap-1">
            <h6 className="text-[18px] font-semibold">Symptoms :</h6>
            <p>Abdominal Pain ,Body Pian,Cough,FatiGue</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
              <thead>
                <th className="border-[1px] p-1 font-semibold">
                  <p>S_N</p>
                </th>
                <th className="border-[1px] p-1 font-semibold">
                  <p>Medicine</p>
                </th>{" "}
                <th className="border-[1px] p-1 font-semibold">
                  <p>Schedule</p>
                </th>{" "}
                <th className="border-[1px] p-1 font-semibold">
                  <p>Time</p>
                </th>
              </thead>
              <tbody>
                <tr key={1}>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    1
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    No of BEDS
                  </td>{" "}
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]"></td>{" "}
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]"></td>
                </tr>
              </tbody>
            </table>
            <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
              <thead>
                <th className="border-[1px] p-1 font-semibold">
                  <p>S_N</p>
                </th>
                <th className="border-[1px] p-1 font-semibold">
                  <p>Test's</p>
                </th>{" "}
                <th className="border-[1px] p-1 font-semibold">
                  <p>Time</p>
                </th>
              </thead>
              <tbody>
                <tr key={1}>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    1
                  </td>
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                    Blood Test
                  </td>{" "}
                  <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-start justify-start w-full gap-1">
            <h6 className="text-[18px] font-semibold">Note :</h6>
            <p className="w-11/12 text-start">
              Pain is a complex protective mechanism. It is an essential part of
              evolution that protects the body from danger and harm. The body
              has pain receptors that are attached to 2 main types of nerves
              that detect danger. One nerve type relays messages quickly,
              causing a sharp, sudden pain. The other relays messages slowly,
              causing a dull, throbbing pain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  const { adminLoggedInData } = useSelector((state) => state.AdminState);
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const [viewPatientsData, setViewPatientsData] = useState([]);
  const [allEmergencyPatients, setAllEmergencyPatients] = useState([]);
  const [allEmergencyPatientsListData, setAllEmergencyPatientsListData] =
    useState([]);
  const getAllEmergencyPatientsDataHandle = async () => {
    const result = await getAllEmergencyPatientsWithDoctorIdData(
      adminLoggedInData?.adminUniqueId
    );
    setAllEmergencyPatients(result && result?.data?.data?.reverse());
    setFilteredData(result && result?.data?.data?.reverse());
  };
  const getAllEmergencyPatientsListDataHandle = async () => {
    const result = await getAllEmergencyPatientsListData();
    setAllEmergencyPatientsListData(result && result?.data?.data);
  };
  const getOneEmergencyPatientsDoctorVisitDataHandle = async (Id) => {
    const result = await getOneEmergencyPatientsDoctorVisitData(Id);
    setViewPatientsData(result && result?.data?.data);
  };
  useEffect(() => {
    getAllEmergencyPatientsDataHandle();
    getAllEmergencyPatientsListDataHandle();
  }, []);
  const searchHandle = () => {
    const filter = allEmergencyPatients?.filter((item) => {
      if (search != "") {
        return item?.EmergencyPatientName?.toLowerCase().includes(
          search.toLowerCase()
        );
      }
      return item;
    });
    setFilteredData(filter && filter);
  };
  React.useEffect(() => {
    searchHandle();
  }, [search]);

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Emergency Patient Table Data
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
              <p>Patient Name</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p>Doctor Name</p>
            </th>
            <th className="border-[1px] p-1 font-semibold">
              <p> Admiited Date/TIme </p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Action</p>
            </th>
          </thead>

          <tbody>
            {filteredData?.map((item, index) => (
              <tr key={index} className="border-b-[1px]">
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {index + 1}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {item?.PatientName}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {item?.doctorName}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {date(item?.updatedAt)}-{time(item?.updatedAt)}
                </td>{" "}
                <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                  <div className="flex gap-[10px] justify-center">
                    {allEmergencyPatientsListData?.find(
                      (val) =>
                        val?.EmergencyPatientData === item?.Emergencypatient_id
                    ) ? (
                      <div
                        onClick={() => [
                          getOneEmergencyPatientsDoctorVisitDataHandle(
                            item?.Emergencypatient_id
                          ),
                          handleOpen1(),
                        ]}
                        className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                      >
                        <CiViewList className="text-[20px] text-[#96999C]" />
                      </div>
                    ) : (
                      <div
                        className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                        onClick={handleOpen2}
                      >
                        <CiViewList className="text-[20px] text-[#96999C]" />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {printView}

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
              Doctor Visit
            </Typography>
            <div className="flex pt-[10px] pb-[10px] gap-[10%]">
              <span>
                <img src={img} alt="patients " className="w-[15rem] " />
              </span>
              <div class="grid grid-cols-2 gap-1">
                <div className="flex gap-[10px]">
                  <span>Patients Uhid</span>:
                  <p>
                    {"Uhid" +
                      viewPatientsData?.[0]?.patientsData?.[0]?.patientId}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Admission Date / Time</span>:
                  <p>
                    {date(viewPatientsData?.[0]?.patientsData?.[0]?.createdAt)}-
                    {time(viewPatientsData?.[0]?.patientsData?.[0]?.createdAt)}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Name</span>:
                  <p>{viewPatientsData?.[0]?.patientsData?.[0]?.patientName}</p>
                </div>
                <div className="flex gap-[10px]">
                  <span>Gender</span>:
                  <p>
                    {viewPatientsData?.[0]?.patientsData?.[0]?.patientGender}
                  </p>
                </div>

                <div className="flex gap-[10px]">
                  <span>Emergency NO</span>:
                  <p>{viewPatientsData?.[0]?.EmergencyPatientData?.mainId}</p>
                </div>

                <div className="flex gap-[10px]">
                  <span>Admitting Doctor</span>:
                  <p>{viewPatientsData?.[0]?.doctorData?.[0]?.doctorName}</p>
                </div>
              </div>
            </div>
            <form className="w-full flex flex-col gap-3">
              {viewPatientsData?.map((item) => (
                <div>
                  <div className="w-full flex items-center">
                    <p className="text-[1.1rem] font-semibold pr-1">Date: </p>
                    {date(item?.VisitDateTime)}-{time(item?.VisitDateTime)}
                  </div>
                  <div className="w-full ">
                    <div className="w-full flex justify-between items-center pt-1 pb-3">
                      <p className="text-[1rem] font-normal">Medicine</p>
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
                          <p>Price</p>
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
                          <p>Price</p>
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
              ))}
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
            <Typography className="flex items-center justify-center">
              NO Doctor Visit done
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DoctorEmeregencyTable;
