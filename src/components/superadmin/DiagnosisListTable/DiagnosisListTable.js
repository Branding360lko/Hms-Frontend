import React from "react";

function DiagnosisListTable() {
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
            placeholder="Search by Diagnosis Name
"
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
          <tr className="border-b-[1px]">
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r"></td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r"></td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-r"></td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center  flex-row border-r">
              <div className="flex gap-[10px] justify-center">
                <div
                  className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                  onClick={handleOpen2}
                >
                  <CiViewList className="text-[20px] text-[#96999C]" />
                </div>

                <div
                  className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                  onClick={handleOpen1}
                >
                  <RiEdit2Fill className="text-[20px] text-[#3497F9]" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <PaginationComponent
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        data={1}
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
          <form className="w-full flex flex-col gap-3 pt-3">
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Medicine Name</p>
              <input
                type="text"
                placeholder="Medicine Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Batch</p>
              <input
                type="text"
                placeholder="Batch"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Price</p>
              <input
                type="number"
                placeholder="Price"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Mrp</p>
              <input
                type="number"
                placeholder="Mrp"
                className="border-2 rounded-md w-full p-1 outline-none"
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
          <form className="w-full flex flex-col gap-3 pt-3">
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Medicine Name</p>
              <input
                type="text"
                placeholder="Medicine Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Batch</p>
              <input
                type="text"
                placeholder="Batch"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Price</p>
              <input
                type="number"
                placeholder="Price"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Mrp</p>
              <input
                type="number"
                placeholder="Mrp"
                className="border-2 rounded-md w-full p-1 outline-none"
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
              <p>Medicine Name</p>
              <input
                type="text"
                placeholder="Medicine Name"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Batch</p>
              <input
                type="text"
                placeholder="Batch"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Price</p>
              <input
                type="number"
                placeholder="Price"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <p>Mrp</p>
              <input
                type="number"
                placeholder="Mrp"
                className="border-2 rounded-md w-full p-1 outline-none"
                required
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default DiagnosisListTable;
