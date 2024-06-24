import React from "react";
import "./SideNav.css";
import logoImage from "../../assets/logo.png";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import browserLinks from "../../browserlinks";
import { FaUserDoctor } from "react-icons/fa6";
import { GiBed, GiMedicines } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";
import { VscReferences } from "react-icons/vsc";
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
      icon: <FaUserDoctor />,
      name: browserLinks.Doctor.internalPages.DashBoard,
    },
    {
      icon: <GiMedicines />,
      name: browserLinks.Doctor.internalPages.OpdPatients,
    },
    {
      icon: <FaBed />,
      name: browserLinks.Doctor.internalPages.IpdPatients,
    },

    {
      icon: <MdEmergency />,
      name: browserLinks.Doctor.internalPages.EmergencyPatients,
    },
    {
      icon: <GiBed />,
      name: browserLinks.Doctor.internalPages.DischargePatients,
    },
    {
      icon: <VscReferences />,
      name: browserLinks.Doctor.internalPages.ReferralPatients,
    },
  ];

  const renderedSideNavLinks = sideNavLinksData?.map((data, index) => {
    return (
      <div
        key={`${index}-${data?.name}`}
        onClick={() => {
          setActive(`${browserLinks?.Doctor?.category}/${data?.name}`);
          const link = data?.name?.split(" ").join("");
          navigate(`${browserLinks?.Doctor?.category}/${link}`);
        }}
        className={
          active === `${browserLinks?.Doctor?.category}/${data?.name}`
            ? "flex flex-row items-center justify-start gap-[1rem] py-[10px] px-[1rem] border-l-[6px] border-l-solid border-[#3497F9] bg-[#E7F3FE] w-full cursor-pointer"
            : "flex flex-row items-center justify-start border-l-[6px] border-l-solid border-transparent gap-[1rem] py-[10px] px-[1rem] w-full cursor-pointer"
        }
      >
        <div
          className={
            active === `${browserLinks?.Doctor?.category}/${data?.name}`
              ? "text-[30px] text-[#3497F9]"
              : "text-[30px] text-[#7F8F98]"
          }
        >
          {data?.icon}
        </div>
        <p
          className={
            active === `${browserLinks?.Doctor?.category}/${data?.name}`
              ? "text-[#3497F9] font-[400] text-start"
              : "text-[#7F8F98] font-[400] text-start"
          }
        >
          {data?.name}
        </p>
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
