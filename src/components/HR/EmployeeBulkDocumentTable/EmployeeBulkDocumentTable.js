import React from "react";
import Table from "../../Table";

function EmployeeBulkDocumentTable() {
  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };
  const config = [
    {
      label: "S N",
      // render: (list) => list.tableId,
    },
    {
      label: "Uploaded Date",
      // render: (list) => list.tableId,
    },
    {
      label: "Category",
      // render: (list) => list.adminName,
    },
    {
      label: "Comments",
      // render: (list) => list.adminEmail,
    },
    {
      label: "File Name",
      // render: (list) => `${date(list.createdAt)} - ${time(list.createdAt)}`,
    },
    {
      label: "Status",
      // render: (list) => `${date(list.updatedAt)} - ${time(list.updatedAt)}`,
    },

    {
      label: "Action",
      // render: (list) => (
      //   <div className="flex gap-[10px] justify-center">
      //     <div
      //       onClick={() => handleOpenUpdateModal(list)}
      //       className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
      //     >
      //       <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
      //     </div>
      //   </div>
      // ),
    },
  ];
  return (
    <div className="flex  flex-col gap-[1rem] p-[1rem]">
      <h2 className="border-b-[4px] border-[#3497F9] w-fit">
        Document Import Details
      </h2>
      <Table config={config} />
    </div>
  );
}

export default EmployeeBulkDocumentTable;
