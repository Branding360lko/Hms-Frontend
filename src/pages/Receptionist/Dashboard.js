import React from "react";
import "./Dashboard.css";
import { lazy, Suspense } from "react";

import { FaFileAlt } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";

import browserLinks from "../../browserlinks";

const SideNav = lazy(() => import("../../components/Receptionist/SideNav"));
const UpperNav = lazy(() =>
  import("../../components/Receptionist/UpperNav/UpperNav")
);

export default function Dashboard() {
  return (
    <div className='superadmin-main flex flex-row w-full h-screen'>
      <div className='superadmin-main-left w-[20%] shadow-lg'>
        <SideNav
          activePage={`${browserLinks.receptionist.category}/${browserLinks.receptionist.internalPages.dashboard}`}
        />
      </div>
      <div className='superadmin-main-right flex flex-col w-[80%]'>
        <UpperNav />
      </div>
    </div>
  );
}
