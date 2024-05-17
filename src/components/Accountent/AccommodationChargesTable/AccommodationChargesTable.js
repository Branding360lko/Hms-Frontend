import React from "react";

function AccommodationChargesTable() {
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Accommodation Charges
        </h2>
        <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
          Add Charges
        </button>
      </div>
      <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
        <thead className="border-b-[1px] text-[13px] flex items-start gap-3 h-[4.5rem]">
          <th className="h-full pr-1 border-r-[1px]">S N</th>
          <th className="">Category</th>
          <th className="h-full border-l-[1px] border-r-[1px] flex flex-col">
            <p className="border-b-[1px]">General</p>
            <span className="grid grid-cols-2 gap-2 border-b-[1px]">
              <p>GW</p>
              <p>JW</p>
            </span>
            <span className="grid grid-cols-2 gap-4">
              <p>High</p>
              <p>Janata</p>
            </span>
          </th>
          <th className="">SEMI-private (SPW)</th>
          <th className="h-full border-l-[1px] border-r-[1px] flex flex-col">
            <p className="border-b-[1px]">Private</p>
            <span className="grid grid-cols-3 gap-2 ">
              <p>AC (PVT)</p>
              <p>AC DLX (PVT DLX)</p>
              <p>SUITE (PVT DX)</p>
            </span>
          </th>

          <th className="">HDW</th>
          <th className="h-full border-l-[1px] border-r-[1px] flex flex-col">
            <p className="border-b-[1px]">ICU / NICU</p>
            <span className="grid grid-cols-2 gap-2 ">
              <p>ICU</p>
              <p>NICU</p>
            </span>
          </th>
          <th className="h-full border-r-[1px] pr-1">DAYCARE</th>
          <th className="h-full border-r-[1px] pr-1">Emergency</th>
          <th className="">User Action</th>
        </thead>
        <tbody>
          <tr key={1} className="border-b-[1px]">
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>{" "}
            <td className="justify-center text-[16px] py-4 px-[4px] text-center ">
              212
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AccommodationChargesTable;
