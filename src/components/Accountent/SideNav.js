import React from "react";
import "./SideNav.css";
import logoImage from "../../assets/logo.png";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

import browserLinks from "../../browserlinks";
import { MdOutlineAssignment } from "react-icons/md";

export default function SideNav({ activePage }) {
  const navigate = useNavigate();

  const [active, setActive] = useState(activePage);

  // console.log(active);

  // const iconStyle =
  //   active ===
  //   `${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.dashboard}`
  //     ? "text-[30px] text-[#3497F9]"
  //     : "text-[30px] text-[#7F8F98]";

  const sideNavLinksData = [
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.AdmissionandCharges,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.Billing,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.Department,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.OPDConsultationCharges,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.AccommodationCharges,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.DoctorvisitCharges,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages
        .OTChargesSuperSpecialtyOperation,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.OTCharges,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.PhysiotheraphyOPD,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.BedsidePhysiotherapyIPD,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.TariffsofMinorProcedures,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.DayCareProcedure,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.Package,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.otherpackage,
    },
    {
      icon: <MdOutlineAssignment />,
      name: browserLinks.Accountant.internalPages.TraumaCases,
    },
  ];

  const renderedSideNavLinks = sideNavLinksData?.map((data, index) => {
    return (
      <div
        key={`${index}-${data?.name}`}
        onClick={() => {
          setActive(`${browserLinks?.Accountant?.category}/${data?.name}`);
          const link = data?.name?.split(" ").join("");
          navigate(`${browserLinks?.Accountant?.category}/${link}`);
        }}
        className={
          active === `${browserLinks?.Accountant?.category}/${data?.name}`
            ? "flex flex-col  items-start justify-start gap-[1rem] py-[10px] px-[1rem] border-l-[6px] border-l-solid border-[#3497F9] bg-[#E7F3FE] w-full cursor-pointer"
            : "flex flex-col  items-start justify-start border-l-[6px] border-l-solid border-transparent gap-[1rem] py-[10px] px-[1rem] w-full cursor-pointer"
        }
      >
        <div className="flex items-center justify-start gap-[1rem]">
          <div
            className={
              active === `${browserLinks?.Accountant?.category}/${data?.name}`
                ? "text-[30px] text-[#3497F9]"
                : "text-[30px] text-[#7F8F98]"
            }
          >
            {data?.icon}
          </div>
          <p
            className={
              active === `${browserLinks?.Accountant?.category}/${data?.name}`
                ? "text-[#3497F9] font-[400] text-start"
                : "text-[#7F8F98] font-[400] text-start"
            }
          >
            {data?.name}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <Suspense fallback={<>...</>}>
        <div className="SideNav flex flex-col items-center">
          <img
            src={logoImage}
            alt="logoImage"
            className="w-[200px] h-auto py-[2rem]"
          />

          <div className="sideNavLinks flex flex-col gap-[1rem] w-full items-start overflow-y-scroll">
            {renderedSideNavLinks}
          </div>
        </div>
      </Suspense>
    </>
  );
}
