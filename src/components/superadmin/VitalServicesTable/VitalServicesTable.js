import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { style } from "../Style";
import { FaSearch } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import PaginationComponent from "../../Pagination";
import { addVitalServiceData, deleteVitalServiceData, getAllVitalServicetData, getOneVitalServiceData, updateVitalServiceData } from "../superAdminApi";
import Snackbars from "../../SnackBar";
import { MdDelete } from "react-icons/md";

function VitalServicesTable() {
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

  // ----Warning
  const [openSnackbarWarning, setOpenSnackBarWarning] = React.useState(false);
  const [snackBarMessageWarning, setSnackBarSuccessWarning] =
    React.useState("");
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
    setSingleVitalService({
      vitalCareName: "",
      hourlyCharges: ""
    })
  };
  const [allVitalService, setAllVitalService] = useState([])
  const [singleVitalService, setSingleVitalService] = useState({
    mainId: '',
    vitalCareName: "",
    hourlyCharges: "",
  })

  const getAllVitalServicetDataHandle = async () => {
    const response = await getAllVitalServicetData()
    setAllVitalService(response?.data?.data)
    setFilteredData(response?.data?.data)



  }
  const getOneVitalServiceDataHandle = async (Id) => {
    const response = await getOneVitalServiceData(Id)
    setSingleVitalService({
      mainId: response?.data?.data?.mainId,
      vitalCareName: response?.data?.data?.vitalCareName,
      hourlyCharges: response?.data?.data?.hourlyCharges,
    })


  }
  const addVitalServiceDataHandle = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("vitalCareName", singleVitalService?.vitalCareName)
    formData.append("hourlyCharges", singleVitalService?.hourlyCharges)

    const response = await addVitalServiceData(formData)
    if (response?.status === 201) {
      handleClose()
      setSingleVitalService({
        vitalCareName: "",
        hourlyCharges: ""
      })
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      getAllVitalServicetDataHandle()
    }
    if (response?.status !== 201) {

      setOpenSnackBarWarning(true)
      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
      getAllVitalServicetDataHandle()
    }


  }
  const updateVitalServiceDataHandle = async (e, Id) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("vitalCareName", singleVitalService?.vitalCareName)
    formData.append("hourlyCharges", singleVitalService?.hourlyCharges)
    const response = await updateVitalServiceData(Id, formData)
    if (response?.status === 200) {
      handleClose1()
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      setSingleVitalService({
        vitalCareName: "",
        hourlyCharges: ""
      })
      getAllVitalServicetDataHandle()
    }
    if (response?.status !== 200) {
      handleClose1()
      setOpenSnackBarSuccess(false)

      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
    }


  }
  const deleteVitalServiceDataHandle = async (Id) => {
    const response = await deleteVitalServiceData(Id)
    if (response?.status === 200) {
      handleClose3()
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      setSingleVitalService({
        vitalCareName: "",
        hourlyCharges: ""
      })
      getAllVitalServicetDataHandle()
    }
    if (response?.status !== 200) {
      handleClose3()
      setOpenSnackBarSuccess(false)

      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
    }

  }
  const searchHandle = () => {
    const filter = allVitalService?.filter((item) => {
      if (searchTerm != "") {
        return (
          item?.vitalCareName?.toLowerCase()?.includes(
            searchTerm?.toLowerCase()
          )

        );
      }


      return item;
    });

    setFilteredData(filter && filter);
  };

  useEffect(() => {
    getAllVitalServicetDataHandle()
  }, [])

  useEffect(() => {
    searchHandle()
  }, [searchTerm])
  return <div className="flex flex-col gap-[1rem] p-[1rem]">
    <div className="flex justify-between">
      <h2 className="border-b-[4px] border-[#3497F9]">
        Vital Services List Table
      </h2>
      <button
        className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
        onClick={handleOpen}
      >
        Add  Vital Services
      </button>
    </div>
    <div className="flex justify-between">
      <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
        <FaSearch className="text-[#56585A]" />
        <input
          className="bg-transparent outline-none w-[27rem]"
          placeholder="Search by Vital Services Name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
    <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
      <thead>
        <th className="border-[1px] p-1 font-semibold">
          <p>S_N</p>
        </th>
        <th className="border-[1px] p-1 font-semibold">
          <p> Vital Services  Name</p>
        </th>
        <th className="border-[1px] p-1 font-semibold">
          <p> Vital Services Fees Per Hour</p>
        </th>

        <th className="border-[1px] p-1 font-semibold">
          <p>Action</p>
        </th>
      </thead>

      <tbody>
        {filteredData
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          ?.map((item, index) => (
            <tr className="border-b-[1px]" key={item?.mainId}>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{index + 1}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.vitalCareName}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.hourlyCharges}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                <div className="flex gap-[10px] justify-center">
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                    onClick={() => [handleOpen2(), getOneVitalServiceDataHandle(item?.mainId)]}
                  >
                    <CiViewList className="text-[20px] text-[#96999C]" />
                  </div>

                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                    onClick={() => [handleOpen1(), getOneVitalServiceDataHandle(item?.mainId)]}
                  >
                    <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                  </div>
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#000] rounded-[12px] cursor-pointer"
                    onClick={() => [handleClickOpen(), setSingleVitalService({ ...singleVitalService, Id: item?.mainId })]}
                  >
                    <MdDelete className="text-[20px] text-[#ooo]" />
                  </div>
                </div>
              </td>
            </tr>
          ))
        }

      </tbody>
    </table>
    <PaginationComponent
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      data={filteredData}
    />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="border-b-[4px] border-[#3497F9] w-fit"
        >
          Add  Vital Service Charge
        </Typography>
        <form className="w-full flex flex-col gap-3 pt-3" onSubmit={addVitalServiceDataHandle}>
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <p> Vital Service  Name</p>
            <input
              type="text"
              placeholder="Vital Service Name"
              className="border-2 rounded-md w-full p-1 outline-none"

              onChange={(e) => setSingleVitalService({ ...singleVitalService, vitalCareName: e.target.value })}
              required
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <p> Vital Service Houlry Charge</p>
            <input
              type="text"
              placeholder="Vital Service Houlry Charge"
              className="border-2 rounded-md w-full p-1 outline-none"
              onChange={(e) => setSingleVitalService({ ...singleVitalService, hourlyCharges: e.target.value })}
              required
            />
          </div>
          <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md w-fit">
            Add Vital Service Charge
          </button>
        </form>
      </Box>
    </Modal>
    <Modal
      open={open1}
      onClose={handleClose1}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="border-b-[4px] border-[#3497F9] w-fit"
        >
          Update  Vital Service Charge
        </Typography>
        <form className="w-full flex flex-col gap-3 pt-3" onSubmit={(e) => updateVitalServiceDataHandle(e, singleVitalService?.mainId)}>
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <p> Vital Service Name</p>
            <input
              type="text"
              placeholder=" Vital Service Name"
              className="border-2 rounded-md w-full p-1 outline-none"
              value={singleVitalService?.vitalCareName}
              onChange={(e) => setSingleVitalService({ ...singleVitalService, vitalCareName: e.target.value })}
              required
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <p> Vital Service Houlry Charge</p>
            <input
              type="text"
              placeholder=" Vital Service Charge"
              className="border-2 rounded-md w-full p-1 outline-none"
              value={singleVitalService?.hourlyCharges}
              onChange={(e) => setSingleVitalService({ ...singleVitalService, hourlyCharges: e.target.value })}
              required
            />
          </div>
          <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md w-fit">
            Update  Vital Service Charge
          </button>
        </form>
      </Box>
    </Modal>
    <Modal
      open={open2}
      onClose={handleClose2}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="border-b-[4px] border-[#3497F9] w-fit"
        >
          View Vital Service Charge
        </Typography>
        <form className="w-full flex flex-col gap-3 pt-3">
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <p>Vital Service Name</p>
            <input
              type="text"
              placeholder="Medicine Name"
              className="border-2 rounded-md w-full p-1 outline-none"
              value={singleVitalService?.vitalCareName}
              disabled
              required
            />
          </div>
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <p>Vital Service Houlry Charge</p>
            <input
              type="text"
              placeholder="Vital Services Charge"
              className="border-2 rounded-md w-full p-1 outline-none"
              value={singleVitalService?.hourlyCharges}
              disabled
              required
            />
          </div>
        </form>
      </Box>
    </Modal>
    <Dialog
      open={open3}
      onClose={handleClose3}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">

      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are You Sure You Want To Delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose3}>Disagree</Button>
        <Button onClick={() => [handleClose(), deleteVitalServiceDataHandle(singleVitalService?.Id)]} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>

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
}

export default VitalServicesTable;
