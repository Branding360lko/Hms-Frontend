import React from "react";

function EmployeeBulkDocumentUploadFrom() {
  return (
    <div className="flex  flex-col gap-[1rem] p-[1rem]">
      <h2 className="border-b-[4px] border-[#3497F9] w-fit">
        Bulk Document Import
      </h2>
      <form className="w-full flex flex-col align-start justify-start gap-[20px]">
        <p className="w-fit">Document Import</p>
        <div class="grid grid-cols-2 gap-4 w-full">
          <span className="border-[2px] rounded border-[#C8C8C8]">
            <select className="outline-none h-[40px] w-full" required>
              <option>Select Category</option>
            </select>
          </span>

          <span className="border-[2px] rounded border-[#C8C8C8]">
            <input
              type="text"
              placeholder="Enter Folder Path"
              className="outline-none h-[40px] w-full pl-[5px]"
            />
          </span>
        </div>
        <p className="w-fit">Upload File *</p>
        <span className="w-fit">
          <input type="file" required />
        </span>
        <p className="w-fit">Comments</p>
        <span className="w-full rounded border-[2px] border-[#C8C8C8]">
          <textarea
            rows="5"
            className="outline-none border-none w-full pl-[5px] pt-[5px]"
            placeholder="commets"
          />
        </span>
        <button className="bg-[#3497F9] text-white p-[10px] rounded-md w-[150px]">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EmployeeBulkDocumentUploadFrom;
