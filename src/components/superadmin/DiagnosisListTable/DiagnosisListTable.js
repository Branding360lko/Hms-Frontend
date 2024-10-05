import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { style } from "../Style";
import PaginationComponent from "../../Pagination";
import { RiEdit2Fill } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { addDiagonsisData, deleteOneDiagonsisData, getAllDiagonsisData, getOneDiagonsisData, updateOneDiagonsisData } from "../superAdminApi";
import Snackbars from "../../SnackBar";
import { MdDelete } from "react-icons/md";

function DiagnosisListTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState();
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setSingleTest({
      Name: "",
      Mrp: "",
      Description: "",
      Availability: false,
      Id: ''


    })
  }
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false)
    setSingleTest({
      Name: "",
      Mrp: "",
      Description: "",
      Availability: false,
      Id: ''


    })
  }
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false)
    setSingleTest({
      Name: "",
      Mrp: "",
      Description: "",
      Availability: false,
      Id: ''


    })
  }
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
    setSingleTest({
      Name: "",
      Mrp: "",
      Description: "",
      Availability: false,
      Id: ""

    })
  };
  const [allTest, setAllTest] = useState([])
  const [singleTest, setSingleTest] = useState({
    Name: "",
    Mrp: "",
    Description: "",
    Availability: false,
    Id: ''

  })


  const getAllDiagonsisDataHandle = async () => {
    const response = await getAllDiagonsisData()
    setAllTest(response?.data?.data)
    setFilteredData(response?.data?.data)
  }
  const getOneDiagonsisDataHandle = async (Id) => {
    const response = await getOneDiagonsisData(Id)
    setSingleTest({
      Name: response?.data?.data?.Name,
      Mrp: response?.data?.data?.Cost,
      Description: response?.data?.data?.Description,
      Availability: response?.data?.data?.Availability,
      Id: response?.data?.data?._id,
    })
  }
  const addDiagonsisDataHandle = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("Name", singleTest?.Name)
    formData.append("Availability", singleTest?.Availability)
    formData.append("Cost", singleTest?.Mrp)
    formData.append("Description", singleTest?.Description)
    formData.append("Category", "")
    const response = await addDiagonsisData(formData)
    if (response?.status === 201) {
      handleClose()
      setSingleTest({
        Name: "",
        Mrp: "",
        Description: "",
        Availability: false,
        Id: ""

      })
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      getAllDiagonsisDataHandle()
    }
    if (response?.status !== 201) {

      setOpenSnackBarWarning(true)
      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
      getAllDiagonsisDataHandle()
    }


  }
  const updateOneDiagonsisDataHandle = async (e, Id) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("Name", singleTest?.Name)
    formData.append("Availability", singleTest?.Availability)
    formData.append("Cost", singleTest?.Mrp)
    formData.append("Description", singleTest?.Description)
    formData.append("Category", "")
    const response = await updateOneDiagonsisData(Id, formData)
    if (response?.status === 200) {
      handleClose1()
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      setSingleTest({
        Name: "",
        Mrp: "",
        Description: "",
        Availability: false,
        Id: ""

      })
      getAllDiagonsisDataHandle()
    }
    if (response?.status !== 200) {
      handleClose1()
      setOpenSnackBarSuccess(false)

      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
    }


  }
  const deleteOneDiagonsisDataHandle = async (Id) => {
    const response = await deleteOneDiagonsisData(Id)
    if (response?.status === 200) {
      handleClose3()
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      setSingleTest({
        Name: "",
        Mrp: "",
        Description: "",
        Availability: false,
        Id: ""

      })
      getAllDiagonsisDataHandle()
    }
    if (response?.status !== 200) {
      handleClose3()
      setOpenSnackBarSuccess(false)

      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
    }

  }
  const searchHandle = () => {
    const filter = allTest?.filter((item) => {
      if (searchTerm != "") {
        return (
          item?.Name?.toLowerCase()?.includes(
            searchTerm?.toLowerCase()
          )

        );
      }


      return item;
    });

    setFilteredData(filter && filter);
  };
  useEffect(() => {
    getAllDiagonsisDataHandle()

  }, [])
  useEffect(() => {
    searchHandle()
  }, [searchTerm])
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Diagnosis List Table
        </h2>
        <button
          className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Diagnosis
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
          <FaSearch className="text-[#56585A]" />
          <input
            className="bg-transparent outline-none w-[27rem]"
            placeholder="Search by Diagnosis Name"
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
            <p>Diagnosis Name</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Diagnosis Fees</p>
          </th>

          <th className="border-[1px] p-1 font-semibold">
            <p>Action</p>
          </th>
        </thead>

        <tbody>
          {filteredData
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((item, index) => (
              <tr className="border-b-[1px]" key={item?._id}>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{index + 1}</td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.Name}</td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.Cost}</td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                  <div className="flex gap-[10px] justify-center">
                    <div
                      className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                      onClick={() => [handleOpen2(), getOneDiagonsisDataHandle(item?._id)]}
                    >
                      <CiViewList className="text-[20px] text-[#96999C]" />
                    </div>

                    <div
                      className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                      onClick={() => [handleOpen1(), getOneDiagonsisDataHandle(item?._id)]}
                    >
                      <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                    </div>
                    <div
                      className="p-[4px] h-fit w-fit border-[2px] border-[#000] rounded-[12px] cursor-pointer"
                      onClick={() => [handleClickOpen(), setSingleTest({ ...singleTest, Id: item?._id })]}
                    >
                      <MdDelete className="text-[20px] text-[#ooo]" />
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
            Add Diagnosis Charge
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3" onSubmit={addDiagonsisDataHandle}>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Diagnosis Name</p>
              <input
                type="text"
                placeholder="Diagnosis Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleTest({ ...singleTest, Name: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Description</p>
              <input
                type="text"
                placeholder="Description"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleTest({ ...singleTest, Description: e.target.value })}
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Mrp</p>
              <input
                type="number"
                placeholder="Mrp"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleTest({ ...singleTest, Mrp: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Availability</p>

              <select onChange={(e) => setSingleTest({ ...singleTest, Availability: e.target.value })}
                required
                className="border-2 rounded-md w-full p-1 outline-none">
                <option>select One</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md w-fit">
              Add Diagnosis Charge
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
            Update Diagnosis Charge
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3" onSubmit={(e) => updateOneDiagonsisDataHandle(e, singleTest?.Id)}>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Diagnosis Name</p>
              <input
                type="text"
                placeholder="Diagnosis Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleTest?.Name}
                onChange={(e) => setSingleTest({ ...singleTest, Name: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Description</p>
              <input
                type="text"
                placeholder="Description"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleTest?.Description}
                onChange={(e) => setSingleTest({ ...singleTest, Description: e.target.value })}
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Mrp</p>
              <input
                type="number"
                placeholder="Mrp"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleTest?.Mrp}
                onChange={(e) => setSingleTest({ ...singleTest, Mrp: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Availability</p>

              <select value={singleTest?.Availability} onChange={(e) => setSingleTest({ ...singleTest, Availability: e.target.value })}
                required
                className="border-2 rounded-md w-full p-1 outline-none">
                <option>select One</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md w-fit">
              Update Diagnosis Charge
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
            View Diagnosis Charge
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3">
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Diagnosis Name</p>
              <input
                type="text"
                placeholder="Diagnosis Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleTest?.Name}
                disabled
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Description</p>
              <input
                type="text"
                placeholder="Description"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleTest?.Description}
                disabled
                required
              />
            </div>

            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Mrp</p>
              <input
                type="number"
                placeholder="Mrp"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleTest?.Mrp}
                disabled
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Availability</p>

              <select className="border-2 rounded-md w-full p-1 outline-none" value={singleTest?.Availability} disabled>
                <option>select One</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
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
          <Button onClick={() => [deleteOneDiagonsisDataHandle(singleTest?.Id)]} autoFocus>
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

export default DiagnosisListTable;
