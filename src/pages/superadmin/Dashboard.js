import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { lazy, Suspense } from "react";

import { FaUser } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";

import axios from "axios";

import browserLinks from "../../browserlinks";

const SideNav = lazy(() => import("../../components/superadmin/SideNav"));
const UpperNav = lazy(() =>
  import("../../components/superadmin/UpperNav/UpperNav")
);
const AppointmentDashboardTable = lazy(() =>
  import(
    "../../components/superadmin/Dashboard/NewPatientsDashboardTable/NewPatientsDashboardTable"
  )
);

const NewOPDPatientsDashboardTable = lazy(() =>
  import("../../components/superadmin/Dashboard/NewOPDPatients/NewOPDPatients")
);
const NewIPDPatientsDashboardTable = lazy(() =>
  import("../../components/superadmin/Dashboard/NewIPDPatients/NewIPDPatients")
);
const ChartMedicineSold = lazy(() =>
  import("../../components/superadmin/ChartMedicineSold/ChartMedicineSold")
);

export default function Dashboard() {
  const [dashBoardCardData, setDashBoardCardData] = useState({
    Patient: 0,
    Doctors: 0,
    Nurses: 0,
    Beds: 0,
    Admins: 0,
    OPDPatients: 0,
    IPDPatients: 0,
    EmergencyPatients: 0,
    DischargedIPDPatients: 0,
    DischargedEmergencyPatients: 0,
  });
  const fetchDashboardData = async () => {
    await axios
      .get(`${process.env.React_App_Base_url}/DashboardData`)
      .then((data) => setDashBoardCardData(data?.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // console.log(dashBoardCardData);
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.dashboard}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard flex flex-col w-full p-[1rem] overflow-y-scroll gap-[2rem]">
          <div className="superadmin-main-right_dashboard_firstSection w-full flex flex-col gap-[1rem] pb-[2rem] border-b-[1px] border-b-solid">
            <h1 className="text-start">DashBoard Overview</h1>
            <div className="superadmin-main-right_dashboard_firstSection_cards w-full grid grid-cols-5 gap-[1rem] items-center justify-center">
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#A4D2FF66] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]">
                <FaUser className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.Patient}</p>
                  <p className="text-[14px]">Patients</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#A4FFBD66] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]">
                <FaUserMd className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.Doctors}</p>
                  <p className="text-[14px]">Doctors</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#FFF59878] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]">
                <FaUserPlus className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.Nurses}</p>
                  <p className="text-[14px]">Nurses</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#CCA4FF6B] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]">
                <FaBed className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.Beds}</p>
                  <p className="text-[14px]">Beds</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#FFF59878] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]">
                <RiAdminFill className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.Admins}</p>
                  <p className="text-[14px]">Admins</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#A4D2FF66] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]">
                <FaFileMedicalAlt className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.OPDPatients}</p>
                  <p className="text-[14px]">OPD Patients</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#A4FFBD66] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]">
                <FaFileMedicalAlt className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.IPDPatients}</p>
                  <p className="text-[14px]">IPD Patients</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#FFF59878] rounded-[15px] py-[2rem] gap-[10px] w-full text-[#374858]">
                <FaFileMedicalAlt className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.EmergencyPatients}</p>
                  <p className="text-[14px]">Emergency Patients</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#CCA4FF6B] rounded-[15px] py-[2rem] gap-[10px] w-full text-[#374858]">
                <FaNotesMedical className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.DischargedIPDPatients}</p>
                  <p className="text-[14px]">Discharged IPD Patient</p>
                </div>
              </div>
              <div className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#FFF59878] rounded-[15px] py-[2rem] gap-[10px] w-full text-[#374858]">
                <FaNotesMedical className="text-[35px]" />
                <div className="flex flex-col">
                  <p>{dashBoardCardData?.DischargedEmergencyPatients}</p>
                  <p className="text-[14px]">Discharged Emergency Patient</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full items-start gap-[10px]">
            <div className="w-[50%]">
              <NewOPDPatientsDashboardTable />
            </div>
            <div className="w-[50%]">
              <NewIPDPatientsDashboardTable />
            </div>
          </div>
          {/* <NewOPDPatientsDashboardTable /> */}

          {/* Appointment Table */}
          <div className="flex flex-row w-full items-start gap-[10px]">
            <div className="w-[60%]">
              <AppointmentDashboardTable />
            </div>
            <div className="w-[40%]">
              <ChartMedicineSold />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
