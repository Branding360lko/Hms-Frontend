import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import style from "../../../styling/styling";
import Select from "react-select";
import img1 from "../../../assets/logo.png";
import { useReactToPrint } from "react-to-print";

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

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Emergency Patient Table Data
        </h2>
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
              <p>Patient Checked</p>
            </th>

            <th className="border-[1px] p-1 font-semibold">
              <p>Action</p>
            </th>
          </thead>
          <tbody>
            <tr key={1}>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                1
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                uhid014110200
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                Arman
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px]">
                <Switch {...label} defaultChecked />
              </td>

              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-[1px] flex-row">
                <div className="flex gap-[10px] justify-center">
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                    onClick={handleOpen1}
                  >
                    <CiViewList className="text-[20px] text-[#96999C]" />
                  </div>{" "}
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                    onClick={handleOpen}
                  >
                    <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {printView}
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
              Emergency Patient Table Data
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form className="w-full flex flex-col justify-start gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p>Patient Uhid</p>
                  <input
                    type="text"
                    placeholder="Patient Uhid"
                    className=" outline-none w-full h-[2.2rem]  pl-[5px] cursor-not-allowed border-[2px] w-full rounded"
                    disabled
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Select Medicine</p>
                  <Select
                    closeMenuOnSelect={false}
                    components={{ IndicatorSeparator }}
                    isMulti
                    options={colourOptions}
                    onChange={(e) => console.log(e)}
                    className="border-[2px] w-full rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Select Test</p>
                  <Select
                    closeMenuOnSelect={false}
                    components={{ IndicatorSeparator }}
                    isMulti
                    options={colourOptions}
                    onChange={(e) => console.log(e)}
                    className="border-[2px] w-full rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Add Symptoms</p>
                  <input
                    type="text"
                    placeholder="Add Symptoms"
                    className="outline-none w-full h-[2.2rem]  pl-[5px] border-[2px] w-full rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Note's</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className=" outline-none w-full   pl-[5px] pt-[5px] border-[2px] w-full rounded"
                  />
                </span>
                <button className="buttonFilled">Update</button>
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
              Emergency Patient Table Data
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="w-full flex flex-col justify-start gap-2">
                <span className="flex flex-col justify-start gap-1">
                  <p>Patient Uhid</p>
                  <input
                    type="text"
                    placeholder="Patient Uhid"
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] cursor-not-allowed"
                    disabled
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Select Medicine</p>
                  <Select
                    closeMenuOnSelect={false}
                    components={{ IndicatorSeparator }}
                    isMulti
                    defaultValue={{
                      value: "Hydrocodone",
                      label: "Hydrocodone",
                    }}
                    options={colourOptions}
                    onChange={(e) => console.log(e)}
                    isDisabled
                    className="border-[2px] w-full rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Select Test</p>
                  <Select
                    closeMenuOnSelect={false}
                    components={{ IndicatorSeparator }}
                    isMulti
                    defaultValue={{
                      value: "Hydrocodone",
                      label: "Hydrocodone",
                    }}
                    options={colourOptions}
                    onChange={(e) => console.log(e)}
                    isDisabled
                    className="border-[2px] w-full rounded"
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Symptoms</p>
                  <input
                    type="text"
                    placeholder="Symptoms"
                    className="border-[2px] w-full rounded outline-none w-full h-[2.2rem]  pl-[5px] "
                    disabled
                  />
                </span>
                <span className="flex flex-col justify-start gap-1">
                  <p>Note's</p>
                  <textarea
                    rows={5}
                    placeholder="Note"
                    className="border-[2px] w-full rounded outline-none w-full   pl-[5px] pt-[5px]"
                    disabled
                  />
                </span>
                <button className="buttonFilled" onClick={handlePrint}>
                  Print
                </button>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DoctorEmeregencyTable;
