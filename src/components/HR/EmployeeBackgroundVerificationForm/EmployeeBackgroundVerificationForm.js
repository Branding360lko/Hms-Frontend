import React, { useEffect, useState } from "react";
import {
  addBackGroundVerification,
  getAllBackGroundVericationData,
  getOneBackgroundVerificationData,
} from "../HrApiCollection";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdPrint } from "react-icons/io";
import Snackbars from "../../SnackBar";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import PaginationComponent from "../../Pagination";

function EmployeeBackgroundVerificationForm() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: "600px",
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "transparent",
    overflowY: "scroll",
  };
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [
    getSingleBackgroundVerificationData,
    setGetSingleBackgroundVerificationData,
  ] = useState({
    verificationType: "",
    PreviewsOrganization: "",
    VerifingPerson: "",
    employeeId: "",
    ValidDate: "",
    comment: "",
    isVerified: false,
  });
  const [snackBarData, setSnackBarData] = useState({
    open: false,
    message: "",
  });
  const getValueHandle = (e) => {
    setGetSingleBackgroundVerificationData({
      ...getSingleBackgroundVerificationData,
      [e.target.name]: e.target.value,
    });
  };
  const [allBackgroundVerification, setAllBackgroundVerification] = useState(
    []
  );
  const getAllBackGroundVericationDataHandle = async () => {
    const result = await getAllBackGroundVericationData();
    setAllBackgroundVerification(result && result?.data);
    console.log(result);
  };
  const addBackGroundVerificationHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "EmployeeId",
      getSingleBackgroundVerificationData?.employeeId
    );
    formData.append(
      "validdate",
      getSingleBackgroundVerificationData?.ValidDate
    );
    formData.append("comments", getSingleBackgroundVerificationData?.comment);
    formData.append(
      "isVarified",
      getSingleBackgroundVerificationData?.isVerified
    );
    const result = await addBackGroundVerification(formData);
    if (result) {
      setSnackBarData({ open: true, message: result?.data?.message });
      setGetSingleBackgroundVerificationData({
        employeeId: "",
        ValidDate: "",
        comment: "",
        isVerified: false,
      });
      getAllBackGroundVericationDataHandle();
    }
    if (!result) {
      console.log("error", result);
      setSnackBarData({
        open: true,
        message: "Something Went Wrong Try Later",
      });
    }
    console.log(result);
  };
  const getOneBackgroundVerificationDataHandle = async (id) => {
    const result = await getOneBackgroundVerificationData(id);
    setGetSingleBackgroundVerificationData({
      ...getSingleBackgroundVerificationData,
      employeeId: result?.data?.data?.EmployeeId,
      comment: result?.data?.data?.comments,
      ValidDate: result?.data?.data?.validdate,
      isVerified: result?.data?.data?.isVarified,
    });
    console.log(result);
  };

  useEffect(() => {
    getAllBackGroundVericationDataHandle();
  }, []);
  useEffect(() => {
    console.log(getSingleBackgroundVerificationData);
  }, [getSingleBackgroundVerificationData]);

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-start">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Background Verification
        </h2>
      </div>
      <form
        className="w-full flex flex-col align-start justify-start gap-[10px]"
        onSubmit={addBackGroundVerificationHandle}
      >
        <span className="flex flex-col align-start justify-start gap-[5px]">
          <p className="w-fit">Previews Organization</p>

          <input
            type="text"
            placeholder="Enter Name Of Organization"
            name="PreviewsOrganization"
            className="border-[2px] border-[#C8C8C8] w-[22rem] h-[2.5rem] rounded outline-none pl-[5px]"
            onChange={getValueHandle}
            required
          />
        </span>
        <div className="w-[25rem] flex justify-between">
          <span className="flex gap-[5px]">
            <input
              type="radio"
              name="verificationType"
              value="0"
              onChange={getValueHandle}
              required
            />
            <p className="text-[12px]">Pre-Employment Verification</p>
          </span>
          <span className="flex gap-[5px]">
            <input
              type="radio"
              name="verificationType"
              value="1"
              onChange={getValueHandle}
              required
            />
            <p className="text-[12px]">On Boarded Employee</p>
          </span>
        </div>
        <span className="flex flex-col align-start justify-start gap-[5px]">
          <p className="w-fit">Verifing Person</p>

          <input
            type="text"
            placeholder="Enter Name Of Verifing Person"
            name="VerifingPerson"
            className="border-[2px] border-[#C8C8C8] w-[22rem] h-[2.5rem] rounded outline-none pl-[5px]"
            onChange={getValueHandle}
            required
          />
        </span>
        <div className="grid grid-cols-2 gap-4">
          <span className="flex flex-col align-start justify-start gap-[5px]">
            <p className="w-fit">Employee Id</p>

            <input
              className="border-[2px] border-[#C8C8C8]  h-[2.5rem] rounded outline-none pl-[5px]"
              type="text"
              name="employeeId"
              placeholder="Employee Id"
              value={getSingleBackgroundVerificationData?.employeeId}
              onChange={getValueHandle}
              required
            />
          </span>
          <span className="flex flex-col align-start justify-start gap-[5px]">
            <p className="w-fit">Valid Date </p>

            <input
              className="border-[2px] border-[#C8C8C8]  h-[2.5rem] rounded outline-none pl-[5px]"
              type="date"
              name="ValidDate"
              placeholder="Valid Date"
              value={getSingleBackgroundVerificationData?.ValidDate}
              onChange={getValueHandle}
              required
            />
          </span>
          <span className="flex flex-col align-start justify-start gap-[5px]">
            <p className="w-fit">Comments</p>

            <textarea
              className="border-[2px] border-[#C8C8C8]  h-[2.5rem] rounded outline-none pl-[5px]"
              type="text"
              name="comment"
              placeholder="Enter  Comments"
              value={getSingleBackgroundVerificationData?.comment}
              onChange={getValueHandle}
              required
            />
          </span>
        </div>

        <button className="bg-[#3497F9] text-white p-[10px] rounded-md w-[150px]">
          Submit
        </button>
      </form>
      <div className="w-[23rem] flex items-center justify-center gap-1">
        <input
          type="text"
          placeholder="Search By Appoiment Id"
          value={searchValue}
          className="w-11/12 border-[2px] h-[2rem] pl-[5px] outline-none rounded bg-[#F4F6F6]"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
          onClick={() => [setSearchResult([]), setSearchValue("")]}
          disabled={searchValue != "" ? false : true}
        >
          Reset
        </button>
      </div>
      <div>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <tr>
              <th className="border-b-[1px]">
                <p>S N</p>
              </th>
              <th className="border-b-[1px]">
                <p>Employee Id</p>
              </th>
              <th className="border-b-[1px]">
                <p>Employee Verified</p>
              </th>
              <th className="border-b-[1px]">
                <p>Comment</p>
              </th>
              <th className="border-b-[1px]">
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResult && searchValue != ""
              ? searchResult
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <tr key={index}>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {index + 1}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.EmployeeId}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        <p>
                          {" "}
                          {item.isVarified === true ? "Completed" : "InProcess"}
                        </p>
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.comments}
                      </td>

                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] flex-row">
                        <div className="flex gap-[10px] justify-center">
                          <div
                            onClick={() => [
                              handleOpen(),
                              getOneBackgroundVerificationDataHandle(
                                item?.EmployeeId
                              ),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                          >
                            <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
              : allBackgroundVerification
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <tr key={index}>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {index + 1}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.EmployeeId}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        <p>
                          {" "}
                          {item.isVarified === true ? "Completed" : "InProcess"}
                        </p>
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.comments}
                      </td>

                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] flex-row">
                        <div className="flex gap-[10px] justify-center">
                          <div
                            onClick={() => [
                              handleOpen(),
                              getOneBackgroundVerificationDataHandle(
                                item?.EmployeeId
                              ),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                          >
                            <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
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
          data={allBackgroundVerification}
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
              Employee Background Verification
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form
                className="w-full flex flex-col align-start justify-start gap-[10px]"
                onSubmit={addBackGroundVerificationHandle}
              >
                <div className="grid grid-cols-2 gap-4">
                  <span className="flex flex-col align-start justify-start gap-[5px]">
                    <p className="w-fit">Employee Id</p>

                    <input
                      className="border-[2px] border-[#C8C8C8]  h-[2.5rem] rounded outline-none pl-[5px]"
                      type="text"
                      name="employeeId"
                      placeholder="Employee Id"
                      value={getSingleBackgroundVerificationData?.employeeId}
                      onChange={getValueHandle}
                      required
                    />
                  </span>
                  <span className="flex flex-col align-start justify-start gap-[5px]">
                    <p className="w-fit">Valid Date </p>

                    <input
                      className="border-[2px] border-[#C8C8C8]  h-[2.5rem] rounded outline-none pl-[5px]"
                      type="date"
                      name="ValidDate"
                      placeholder="Valid Date"
                      value={getSingleBackgroundVerificationData?.ValidDate}
                      onChange={getValueHandle}
                      required
                    />
                  </span>
                  <span className="flex flex-col align-start justify-start gap-[5px]">
                    <p className="w-fit">Comments</p>

                    <textarea
                      className="border-[2px] border-[#C8C8C8]  h-[2.5rem] rounded outline-none pl-[5px]"
                      type="text"
                      name="comment"
                      placeholder="Enter  Comments"
                      value={getSingleBackgroundVerificationData?.comment}
                      onChange={getValueHandle}
                      required
                    />
                  </span>
                  <span className="flex flex-col align-start justify-start gap-[5px]">
                    <p className="w-fit">Status</p>
                    <select
                      value={getSingleBackgroundVerificationData?.isVerified}
                      className="border-[2px] border-[#C8C8C8]  h-[2.5rem] rounded outline-none pl-[5px]"
                    >
                      <option value="">Select Status</option>
                      <option value={true}>Active</option>
                      <option value={false}>InActive</option>
                    </select>
                  </span>
                </div>

                <button className="bg-[#3497F9] text-white p-[10px] rounded-md w-[150px]">
                  Update
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Snackbars
        open={snackBarData?.open}
        message={snackBarData?.message}
        setOpen={setSnackBarData}
      />
    </div>
  );
}

export default EmployeeBackgroundVerificationForm;
