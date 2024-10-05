import React, { useEffect, useState } from "react";
import PaginationComponent from "../../Pagination";
import { FaSearch } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import { style } from "../Style";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from "@mui/material";
import { addMedicineData, deleteOneMedicineData, getAllMedicineData, getOneMedicineData, updateOneMedicineData } from "../superAdminApi";
import Snackbars from "../../SnackBar";
import { MdDelete } from "react-icons/md";

function MedicineInventoryTable() {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setSingleMedicine({
      Name: "",
      BATCH: "",
      Price: "",
      Mrp: "",
    })
  }
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setSingleMedicine({
      Name: "",
      BATCH: "",
      Price: "",
      Mrp: "",
    })
  }
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false)
    setSingleMedicine({
      Name: "",
      BATCH: "",
      Price: "",
      Mrp: "",
    })
  }
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
    setSingleMedicine({
      Name: "",
      BATCH: "",
      Price: "",
      Mrp: "",
    })
  };
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState();
  const [allMedicine, setAllMedicine] = useState([])
  const [singleMedicine, setSingleMedicine] = useState({
    Name: "",
    BATCH: "",
    Price: "",
    Mrp: "",
    Id: ""
  })

  const getAllMedicineDataHandle = async () => {
    const response = await getAllMedicineData()
    setAllMedicine(response?.data?.data)
    setFilteredData(response?.data?.data)

  }
  const getOneMedicineDataHandle = async (Id) => {
    const response = await getOneMedicineData(Id)
    setSingleMedicine({
      Name: response?.data?.data?.Name,
      BATCH: response?.data?.data?.BATCH,
      Price: response?.data?.data?.RATE,
      Mrp: response?.data?.data?.Mrp,
      Id: response?.data?.data?._id,
    })

  }
  const addMedicineDataHandle = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("Name", singleMedicine?.Name)
    formData.append("BATCH", singleMedicine?.BATCH)
    formData.append("EXPIRY", '')
    formData.append("QTY", "")
    formData.append("Mrp", Number(singleMedicine?.Mrp))
    formData.append("RATE", Number(singleMedicine?.Price))
    const response = await addMedicineData(formData)
    if (response?.status === 201) {
      handleClose()
      setSingleMedicine({
        Name: "",
        BATCH: "",
        Price: "",
        Mrp: "",
      })
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      getAllMedicineDataHandle()
    }
    if (response?.status !== 201) {

      setOpenSnackBarWarning(true)
      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
      getAllMedicineDataHandle()
    }


  }
  const updateOneMedicineDataHandle = async (e, Id) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("Name", singleMedicine?.Name)
    formData.append("BATCH", singleMedicine?.BATCH)
    formData.append("EXPIRY", '')
    formData.append("QTY", "")
    formData.append("Mrp", Number(singleMedicine?.Mrp))
    formData.append("RATE", Number(singleMedicine?.Price))
    const response = await updateOneMedicineData(Id, formData)
    if (response?.status === 200) {
      handleClose1()
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      setSingleMedicine({
        Name: "",
        BATCH: "",
        Price: "",
        Mrp: "",
      })
      getAllMedicineDataHandle()
    }
    if (response?.status !== 200) {
      handleClose1()
      setOpenSnackBarSuccess(false)

      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
    }


  }
  const deleteOneMedicineDataHandle = async (Id) => {
    const response = await deleteOneMedicineData(Id)
    if (response?.status === 200) {
      handleClose3()
      setOpenSnackBarSuccess(true)
      setSnackBarSuccessMessage(response?.data?.message)
      setSingleMedicine({
        Name: "",
        BATCH: "",
        Price: "",
        Mrp: "",
      })
      getAllMedicineDataHandle()
    }
    if (response?.status !== 200) {
      handleClose3()
      setOpenSnackBarSuccess(false)

      setSnackBarSuccessWarning("Something Went Wrong Please Try later!")
    }

  }
  const searchHandle = () => {
    const filter = allMedicine?.filter((item) => {
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
    setPage(filter && 0);
  };
  useEffect(() => {
    getAllMedicineDataHandle()

  }, [])
  useEffect(() => {
    searchHandle()
  }, [searchTerm])
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Medicine Inventory Table
        </h2>
        <button
          className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Medicine
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
          <FaSearch className="text-[#56585A]" />
          <input
            className="bg-transparent outline-none w-[27rem]"
            placeholder="Search by Medicine Name"
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
            <p>Medicine Name</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Batch</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Price</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p> Mrp </p>
          </th>

          <th className="border-[1px] p-1 font-semibold">
            <p>Action</p>
          </th>
        </thead>

        <tbody>
          {filteredData
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((item, index) => (<tr className="border-b-[1px]" key={item?._id}>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{index + 1}</td>{" "}
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.Name}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.BATCH}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.RATE}</td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">{item?.Mrp}</td>

              <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                <div className="flex gap-[10px] justify-center">
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                    onClick={() => [handleOpen2(), getOneMedicineDataHandle(item?._id)]}
                  >
                    <CiViewList className="text-[20px] text-[#96999C]" />
                  </div>

                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                    onClick={() => [handleOpen1(), getOneMedicineDataHandle(item?._id)]}
                  >
                    <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                  </div>
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#000] rounded-[12px] cursor-pointer"
                    onClick={() => [handleClickOpen(), setSingleMedicine({ ...singleMedicine, Id: item?._id })]}
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
            Add Medicine
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3" onSubmit={addMedicineDataHandle}>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Medicine Name</p>
              <input
                type="text"
                placeholder="Medicine Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleMedicine({ ...singleMedicine, Name: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Batch</p>
              <input
                type="text"
                placeholder="Batch"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleMedicine({ ...singleMedicine, BATCH: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Price</p>
              <input
                type="number"
                placeholder="Price"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleMedicine({ ...singleMedicine, Price: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Mrp</p>
              <input
                type="number"
                placeholder="Mrp"
                className="border-2 rounded-md w-full p-1 outline-none"
                onChange={(e) => setSingleMedicine({ ...singleMedicine, Mrp: e.target.value })}
                required
              />
            </div>
            <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md w-fit">
              Add Medicine
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
            Update Medicine
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3" onSubmit={(e) => updateOneMedicineDataHandle(e, singleMedicine?.Id)}>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Medicine Name</p>
              <input
                type="text"
                placeholder="Medicine Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleMedicine?.Name}
                onChange={(e) => setSingleMedicine({ ...singleMedicine, Name: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Batch</p>
              <input
                type="text"
                placeholder="Batch"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleMedicine?.BATCH}
                onChange={(e) => setSingleMedicine({ ...singleMedicine, BATCH: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Price</p>
              <input
                type="number"
                placeholder="Price"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleMedicine?.Price}
                onChange={(e) => setSingleMedicine({ ...singleMedicine, Price: e.target.value })}
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Mrp</p>
              <input
                type="number"
                placeholder="Mrp"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleMedicine?.Mrp}
                onChange={(e) => setSingleMedicine({ ...singleMedicine, Mrp: e.target.value })}
                required
              />
            </div>
            <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md w-fit">
              Update Medicine
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
            View Medicine
          </Typography>
          <form className="w-full flex flex-col gap-3 pt-3">
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Medicine Name</p>
              <input
                type="text"
                placeholder="Medicine Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleMedicine?.Name}
                disabled
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Batch</p>
              <input
                type="text"
                placeholder="Batch"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleMedicine?.BATCH}
                disabled
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Price</p>
              <input
                type="number"
                placeholder="Price"
                className="border-2 rounded-md w-full p-1 outline-none"
                value={singleMedicine?.RATE}
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
                value={singleMedicine?.Mrp}
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
          <Button onClick={() => [handleClose(), deleteOneMedicineDataHandle(singleMedicine?.Id)]} autoFocus>
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

export default MedicineInventoryTable;
