import React, { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import PaginationComponent from "../../Pagination";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from "@mui/material";
import { style } from "../Style";
import { FaSearch } from "react-icons/fa";
import { addAdmissionChargeData, deleteAdmissionChargeData, getAllAdmissionChargeData, getOneAdmissionChargeData, updateAdmissionChargeData } from "../superAdminApi";
import Snackbars from "../../SnackBar";
import { MdDelete } from "react-icons/md";

function AdmissionChargesTable() {
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
    setSingleAdmissionCharge({
      AdmissionFees: '',
      AdmissionType: '',
      Id: ""
    })
  };
  const [allAdmissionChrages, setAllAdmissionCharges] = useState([])
  const [singleAdmissionCharge, setSingleAdmissionCharge] = useState({
    AdmissionType: "",
    AdmissionFees: "",
    Id: ""
  })

  const getAllAdmissionChargeDataHandle = async () => {
    const response = await getAllAdmissionChargeData()
    setAllAdmissionCharges(response?.data?.data)
    setFilteredData(response?.data?.data)



  }
  const getOneAdmissionChargeDataHandle = async (Id) => {
    const response = await getOneAdmissionChargeData(Id)
    setSingleAdmissionCharge({
      AdmissionType: response?.data?.data?.admissionType,
      AdmissionFees: response?.data?.data?.admissionFees,
      Id: response?.data?.data?.mainId,
    })

  }
  const addAdmissionChargeDataHandle = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("admissionType", singleAdmissionCharge?.AdmissionType)
    formData.append("admissionFees", singleAdmissionCharge?.AdmissionFees)

    const response = await addAdmissionChargeData(formData)
    if (response?.status === 201) {
      handleClose()
      setSingleAdmissionCharge({
        AdmissionFees: '',
        AdmissionType: '',
        Id: ""
      })
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      getAllAdmissionChargeDataHandle()
    }
    if (response?.status !== 201) {

      setOpenSnackBarWarning(true)
      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
      getAllAdmissionChargeDataHandle()
    }


  }
  const updateAdmissionChargeDataHandle = async (e, Id) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("admissionType", singleAdmissionCharge?.AdmissionType)
    formData.append("admissionFees", singleAdmissionCharge?.AdmissionFees)
    const response = await updateAdmissionChargeData(Id, formData)
    if (response?.status === 200) {
      handleClose1()
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      setSingleAdmissionCharge({
        AdmissionFees: '',
        AdmissionType: '',
        Id: ""
      })
      getAllAdmissionChargeDataHandle()
    }
    if (response?.status !== 200) {
      handleClose1()
      setOpenSnackBarSuccess(false)

      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
    }


  }
  const deleteAdmissionChargeDataHandle = async (Id) => {
    const response = await deleteAdmissionChargeData(Id)
    if (response?.status === 200) {
      handleClose3()
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      setSingleAdmissionCharge({
        AdmissionFees: '',
        AdmissionType: '',
        Id: ""
      })
      getAllAdmissionChargeDataHandle()
    }
    if (response?.status !== 200) {
      handleClose3()
      setOpenSnackBarSuccess(false)

      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
    }

  }
  const searchHandle = () => {
    const filter = allAdmissionChrages?.filter((item) => {
      if (searchTerm != "") {
        return (
          item?.admissionType?.toLowerCase()?.includes(
            searchTerm?.toLowerCase()
          )

        );
      }
    

      return item;
    });
    console.log(filter, "filter",searchTerm);

    setFilteredData(filter && filter);
  };

  useEffect(() => {
    getAllAdmissionChargeDataHandle()
  }, [])
  useEffect(() => {
    searchHandle()
  }, [searchTerm])
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Admission Charges Table
        </h2>
        <button
          className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Admission Charge
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
          <FaSearch className="text-[#56585A]" />
          <input
            className="bg-transparent outline-none w-[27rem]"
            placeholder="Search by Admission Charge Name"
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
            <p>Admission Charge Name</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Admission Charge Fees</p>
          </th>

          <th className="border-[1px] p-1 font-semibold">
            <p>Action</p>
          </th>
        </thead>

        <tbody>
          {filteredData
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((item, index) =>
            (<tr className="border-b-[1px]" key={item?._id}>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{index + 1}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.admissionType}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.admissionFees}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                <div className="flex gap-[10px] justify-center">
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                    onClick={() => [handleOpen2(), getOneAdmissionChargeDataHandle(item?.mainId)]}
                  >
                    <CiViewList className="text-[20px] text-[#96999C]" />
                  </div>

                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                    onClick={() => [handleOpen1(), getOneAdmissionChargeDataHandle(item?.mainId)]}
                  >
                    <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                  </div>
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#000] rounded-[12px] cursor-pointer"
                    onClick={() => [handleClickOpen(), setSingleAdmissionCharge({ ...singleAdmissionCharge, Id: item?.mainId })]}
                  >
                    <MdDelete className="text-[20px] text-[#ooo]" />
                  </div>
                </div>
              </td>
            </tr>)
            )}

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
            Add Admission Charge
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3" onSubmit={addAdmissionChargeDataHandle} >
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Admission Charges Name</p>
              <input
                type="text"
                placeholder="Admission Charges Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleAdmissionCharge({ ...singleAdmissionCharge, AdmissionType: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Admission Charges Fees</p>
              <input
                type="text"
                placeholder="Admission Charges"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleAdmissionCharge({ ...singleAdmissionCharge, AdmissionFees: e.target.value })}
                required
              />
            </div>
            <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md w-fit">
              Add Admission Charge
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
            Update Admission Charge
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3" onSubmit={(e) => updateAdmissionChargeDataHandle(e, singleAdmissionCharge?.Id)}>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Admission Charges Name</p>
              <input
                type="text"
                placeholder="Admission Charges Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleAdmissionCharge?.AdmissionType}
                onChange={(e) => setSingleAdmissionCharge({ ...singleAdmissionCharge, AdmissionType: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Admission Charges Fees</p>
              <input
                type="text"
                placeholder="Admission Charges"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleAdmissionCharge?.AdmissionFees}
                onChange={(e) => setSingleAdmissionCharge({ ...singleAdmissionCharge, AdmissionFees: e.target.value })}
                required
              />
            </div>
            <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md w-fit">
              Update Admission Charge
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
            View Admission Charge
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3">
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Admission Charges Name</p>
              <input
                type="text"
                placeholder="Medicine Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleAdmissionCharge?.AdmissionType}
                disabled
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Admission Charges Fees</p>
              <input
                type="text"
                placeholder="Batch"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleAdmissionCharge?.AdmissionFees}
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
          <Button onClick={() => [handleClose(), deleteAdmissionChargeDataHandle(singleAdmissionCharge?.Id)]} autoFocus>
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
  );
}

export default AdmissionChargesTable;
