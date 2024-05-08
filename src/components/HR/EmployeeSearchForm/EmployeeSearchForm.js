import React from "react";
import { useNavigate } from "react-router-dom";

function EmployeeSearchForm() {
  const history = useNavigate();
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Candidate Search</h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md"
          onClick={() => history("/HR/EmployeeCreation")}
        >
          + Add User
        </button>
      </div>
      <div className="w-full flex align-start justify-start flex-col">
        <h4 className="text-start">Candidate :</h4>
        <form className="grid grid-cols-3 gap-[20px] mt-[10px]">
          <span className=" border-[2px] border-[#C8C8C8] rounded">
            <input
              type="date"
              placeholder="Expected Date of Joining"
              className="h-[40px] w-full pl-[5px] outline-none border-none"
            />
          </span>
          <span className=" border-[2px] border-[#C8C8C8] rounded">
            <input
              type="text"
              placeholder="Email ID"
              className="h-[40px] w-full pl-[5px] outline-none border-none"
            />
          </span>
          <span className=" border-[2px] border-[#C8C8C8] rounded">
            <input
              type="text"
              placeholder="Link Valid Till"
              className="h-[40px] w-full pl-[5px] outline-none border-none"
            />
          </span>
          <span className=" border-[2px] border-[#C8C8C8] rounded">
            <input
              type="text"
              placeholder="Authentication Details"
              className="h-[40px] w-full pl-[5px] outline-none border-none"
            />
          </span>
          <span className=" border-[2px] border-[#C8C8C8] rounded">
            <input
              type="text"
              placeholder="PAN Number"
              className="h-[40px] w-full pl-[5px] outline-none border-none"
            />
          </span>
          <button className="bg-[#3497F9] text-white p-[10px] rounded-md">
            Search Candidate
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeSearchForm;
