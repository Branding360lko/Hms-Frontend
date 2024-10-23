import React, { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Snackbars from "../../SnackBar";
import PaginationComponent from "../../Pagination";
import {
  addHospitalInventoryData,
  deleteHospitalInventoryData,
  getAllHospitalInventoryData,
  getHospitalInventoryData,
  updateHospitalInventoryData,
} from "../superAdminApi";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import style from "../../../styling/styling";
function HospitalInventryTable() {
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
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setHospitalInventory({
      HospitalInventoryName: "",
      Modal: "",
      NameOfManufacturer: "",
      DateOfInstallation: "",
      CalibrationStatus: "",
      WhetherAmc: false,
      hospitalInventoryId: "",
    });
  };
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
    setHospitalInventory({
      HospitalInventoryName: "",
      Modal: "",
      NameOfManufacturer: "",
      DateOfInstallation: "",
      CalibrationStatus: "",
      WhetherAmc: false,
      hospitalInventoryId: "",
    });
  };
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => {
    setOpen3(false);
    setHospitalInventory({
      HospitalInventoryName: "",
      Modal: "",
      NameOfManufacturer: "",
      DateOfInstallation: "",
      CalibrationStatus: "",
      WhetherAmc: false,
      hospitalInventoryId: "",
    });
  };
  const [allInventory, setAllInventory] = useState([]);
  const [hospitalInventory, setHospitalInventory] = useState({
    HospitalInventoryName: "",
    Modal: "",
    NameOfManufacturer: "",
    DateOfInstallation: "",
    CalibrationStatus: "",
    WhetherAmc: false,
    hospitalInventoryId: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  const getAllHospitalInventoryDataHandle = async () => {
    const response = await getAllHospitalInventoryData();
    setAllInventory(response?.data?.data);
    setFilteredData(response?.data?.data);
  };
  const addHospitalInventoryDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("NameOfEquiment", hospitalInventory?.HospitalInventoryName);
    formData.append("Modal", hospitalInventory?.Modal);
    formData.append(
      "NameOfManufacturer",
      hospitalInventory?.NameOfManufacturer
    );
    formData.append(
      "DateOfInstallation",
      hospitalInventory?.DateOfInstallation
    );
    formData.append("CalibrationStatus", hospitalInventory?.CalibrationStatus);
    formData.append("WhetherAmc", hospitalInventory?.WhetherAmc);
    const response = await addHospitalInventoryData(formData);
    if (response.status === 201) {
      handleClose();
      setHospitalInventory({
        HospitalInventoryName: "",
        Modal: "",
        NameOfManufacturer: "",
        DateOfInstallation: "",
        CalibrationStatus: "",
        WhetherAmc: false,
        hospitalInventoryId: "",
      });
      setOpenSnackBarSuccess(true);
      setSnackBarSuccessMessage(response?.data?.message);
      getAllHospitalInventoryDataHandle();
    }
    if (response.status !== 201) {
      handleClose();
      setHospitalInventory({
        HospitalInventoryName: "",
        Modal: "",
        NameOfManufacturer: "",
        DateOfInstallation: "",
        CalibrationStatus: "",
        WhetherAmc: false,
        hospitalInventoryId: "",
      });
      setOpenSnackBarWarning(true);
      setSnackBarSuccessWarning("Something Went Wrong Please Try Later!");
    }
  };

  const getHospitalInventoryDataHandle = async (Id) => {
    const response = await getHospitalInventoryData(Id);
    setHospitalInventory({
      ...hospitalInventory,
      HospitalInventoryName: response?.data?.data?.NameOfEquiment,
      Modal: response?.data?.data?.Modal,
      NameOfManufacturer: response?.data?.data?.NameOfManufacturer,
      DateOfInstallation: response?.data?.data?.DateOfInstallation,
      CalibrationStatus: response?.data?.data?.CalibrationStatus,
      WhetherAmc: response?.data?.data?.WhetherAmc,
      hospitalInventoryId: response?.data?.data?.InventryId,
    });
    console.log(response);
  };
  const updateHospitalInventoryDataHandle = async (e, Id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("NameOfEquiment", hospitalInventory?.HospitalInventoryName);
    formData.append("Modal", hospitalInventory?.Modal);
    formData.append(
      "NameOfManufacturer",
      hospitalInventory?.NameOfManufacturer
    );
    formData.append(
      "DateOfInstallation",
      hospitalInventory?.DateOfInstallation
    );
    formData.append("CalibrationStatus", hospitalInventory?.CalibrationStatus);
    formData.append("WhetherAmc", Boolean(hospitalInventory?.WhetherAmc));
    const response = await updateHospitalInventoryData(Id, formData);
    if (response.status === 200) {
      handleClose2();
      setHospitalInventory({
        HospitalInventoryName: "",
        Modal: "",
        NameOfManufacturer: "",
        DateOfInstallation: "",
        CalibrationStatus: "",
        WhetherAmc: false,
        hospitalInventoryId: "",
      });
      setOpenSnackBarSuccess(true);
      setSnackBarSuccessMessage(response?.data?.message);
      getAllHospitalInventoryDataHandle();
    }
    if (response.status !== 200) {
      handleClose2();
      setHospitalInventory({
        HospitalInventoryName: "",
        Modal: "",
        NameOfManufacturer: "",
        DateOfInstallation: "",
        CalibrationStatus: "",
        WhetherAmc: false,
        hospitalInventoryId: "",
      });
      setOpenSnackBarWarning(true);
      setSnackBarSuccessWarning("Something Went Wrong Please Try Later!");
    }
  };
  const deleteHospitalInventoryDataHandle = async (Id) => {
    const response = await deleteHospitalInventoryData(Id);
    if (response.status === 200) {
      handleClose2();
      setHospitalInventory({
        HospitalInventoryName: "",
        Modal: "",
        NameOfManufacturer: "",
        DateOfInstallation: "",
        CalibrationStatus: "",
        WhetherAmc: false,
        hospitalInventoryId: "",
      });
      setOpenSnackBarSuccess(true);
      setSnackBarSuccessMessage(response?.data?.message);
      getAllHospitalInventoryDataHandle();
    }
    if (response.status !== 200) {
      handleClose2();
      setHospitalInventory({
        HospitalInventoryName: "",
        Modal: "",
        NameOfManufacturer: "",
        DateOfInstallation: "",
        CalibrationStatus: "",
        WhetherAmc: false,
        hospitalInventoryId: "",
      });
      setOpenSnackBarWarning(true);
      setSnackBarSuccessWarning("Something Went Wrong Please Try Later!");
    }
  };
  const searchHandle = () => {
    const filter = allInventory?.filter((item) => {
      if (searchTerm != "") {
        return item?.NameOfEquiment?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      }

      return item;
    });

    setFilteredData(filter && filter);
    setPage(filter && 0);
  };
  useEffect(() => {
    searchHandle();
  }, [searchTerm]);
  useEffect(() => {
    getAllHospitalInventoryDataHandle();
  }, []);
  console.log(hospitalInventory);

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Hospital Inventory</h2>
        <button
          className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Hospital Inventory
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
          <FaSearch className="text-[#56585A]" />
          <input
            className="bg-transparent outline-none w-[27rem]"
            placeholder="Search by Hospital Inventory"
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
            <p>Inventory Name</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Modal</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p>Manufacturer</p>
          </th>
          <th className="border-[1px] p-1 font-semibold">
            <p> Date Of Installation </p>
          </th>

          <th className="border-[1px] p-1 font-semibold">
            <p>Action</p>
          </th>
        </thead>

        <tbody>
          {filteredData
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((item, index) => (
              <tr className="border-b-[1px]" key={item?.InventryId}>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {index + 1}
                </td>{" "}
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {item?.NameOfEquiment}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {item?.Modal}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {item?.NameOfManufacturer}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r">
                  {item?.DateOfInstallation}
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
                  <div className="flex gap-[10px] justify-center">
                    <div
                      className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                      onClick={() => [
                        handleOpen1(),
                        getHospitalInventoryDataHandle(item?.InventryId),
                      ]}
                    >
                      <CiViewList className="text-[20px] text-[#96999C]" />
                    </div>

                    <div
                      className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                      onClick={() => [
                        handleOpen2(),
                        getHospitalInventoryDataHandle(item?.InventryId),
                      ]}
                    >
                      <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                    </div>
                    <div
                      className="p-[4px] h-fit w-fit border-[2px] border-[#000] rounded-[12px] cursor-pointer"
                      onClick={() => [
                        handleOpen3(),
                        setHospitalInventory({
                          ...hospitalInventory,
                          hospitalInventoryId: item?.InventryId,
                        }),
                      ]}
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
              Add Hospital Inventory
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form
                className="w-full flex items-start justify-start flex-col gap-2"
                onSubmit={addHospitalInventoryDataHandle}
              >
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Hospital Inventory Name</p>
                  <input
                    type="text"
                    placeholder="Hospital Inventory Name"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        HospitalInventoryName: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Modal</p>
                  <input
                    type="text"
                    placeholder="Modal"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        Modal: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Name Of Manufacturer</p>
                  <input
                    type="text"
                    placeholder="Name Of Manufacturer"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        NameOfManufacturer: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Date Of Installation</p>
                  <input
                    type="date"
                    placeholder="Date Of Installation"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        DateOfInstallation: e.target.value,
                      })
                    }
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Calibration Status</p>
                  <input
                    type="text"
                    placeholder="Calibration Status"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        CalibrationStatus: e.target.value,
                      })
                    }
                    required
                  />
                </span>{" "}
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Whether Amc</p>

                  <select
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        WhetherAmc: Boolean(e.target.value),
                      })
                    }
                    required
                  >
                    <option>Select One</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </span>
                <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md ">
                  Add Hospital Inventory
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
              Add Hospital Inventory
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form
                className="w-full flex items-start justify-start flex-col gap-2"
                onSubmit={addHospitalInventoryDataHandle}
              >
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Hospital Inventory Name</p>
                  <input
                    type="text"
                    placeholder="Hospital Inventory Name"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        HospitalInventoryName: e.target.value,
                      })
                    }
                    value={hospitalInventory?.HospitalInventoryName}
                    disabled
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Modal</p>
                  <input
                    type="text"
                    placeholder="Modal"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        Modal: e.target.value,
                      })
                    }
                    value={hospitalInventory?.Modal}
                    disabled
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Name Of Manufacturer</p>
                  <input
                    type="text"
                    placeholder="Name Of Manufacturer"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        NameOfManufacturer: e.target.value,
                      })
                    }
                    value={hospitalInventory?.NameOfManufacturer}
                    disabled
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Date Of Installation</p>
                  <input
                    type="date"
                    placeholder="Date Of Installation"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        DateOfInstallation: e.target.value,
                      })
                    }
                    value={hospitalInventory?.DateOfInstallation}
                    disabled
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Calibration Status</p>
                  <input
                    type="text"
                    placeholder="Calibration Status"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        CalibrationStatus: e.target.value,
                      })
                    }
                    value={hospitalInventory?.CalibrationStatus}
                    disabled
                    required
                  />
                </span>{" "}
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Whether Amc</p>

                  <select
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        WhetherAmc: Boolean(e.target.value),
                      })
                    }
                    value={hospitalInventory?.WhetherAmc}
                    disabled
                    required
                  >
                    <option>Select One</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </span>
              </form>
            </Typography>
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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Update Hospital Inventory
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form
                className="w-full flex items-start justify-start flex-col gap-2"
                onSubmit={(e) =>
                  updateHospitalInventoryDataHandle(
                    e,
                    hospitalInventory?.hospitalInventoryId
                  )
                }
              >
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Hospital Inventory Name</p>
                  <input
                    type="text"
                    placeholder="Hospital Inventory Name"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        HospitalInventoryName: e.target.value,
                      })
                    }
                    value={hospitalInventory?.HospitalInventoryName}
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Modal</p>
                  <input
                    type="text"
                    placeholder="Modal"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        Modal: e.target.value,
                      })
                    }
                    value={hospitalInventory?.Modal}
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Name Of Manufacturer</p>
                  <input
                    type="text"
                    placeholder="Name Of Manufacturer"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        NameOfManufacturer: e.target.value,
                      })
                    }
                    value={hospitalInventory?.NameOfManufacturer}
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Date Of Installation</p>
                  <input
                    type="date"
                    placeholder="Date Of Installation"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        DateOfInstallation: e.target.value,
                      })
                    }
                    value={hospitalInventory?.DateOfInstallation}
                    required
                  />
                </span>
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Calibration Status</p>
                  <input
                    type="text"
                    placeholder="Calibration Status"
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    onChange={(e) =>
                      setHospitalInventory({
                        ...hospitalInventory,
                        CalibrationStatus: e.target.value,
                      })
                    }
                    value={hospitalInventory?.CalibrationStatus}
                    required
                  />
                </span>{" "}
                <span className="w-full flex items-start justify-start flex-col gap-1">
                  <p>Whether Amc</p>

                  <select
                    className="w-full border-2 pl-1 py-1 rounded-md outline-none"
                    value={hospitalInventory?.WhetherAmc}
                    onChange={(e) => [
                      setHospitalInventory({
                        ...hospitalInventory,
                        WhetherAmc: e.target.value === "true",
                      }),
                    ]}
                    required
                  >
                    <option value="">Select One</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </span>
                <button className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md ">
                  Update Hospital Inventory
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <Dialog
        open={open3}
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To Delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Disagree</Button>
          <Button
            onClick={() => [
              handleClose3(),
              deleteHospitalInventoryDataHandle(
                hospitalInventory?.hospitalInventoryId
              ),
            ]}
            autoFocus
          >
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

export default HospitalInventryTable;
