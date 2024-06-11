import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import browserLinks from "./browserlinks";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";

// Services
// import { useGetAllPatientsQuery } from "./Store/Services/PatientService";
// import {
//   useGetAllDoctorsQuery,
//   useGetAllDoctorProfessionalDetailsQuery,
// } from "./Store/Services/DoctorService";
// import { useGetAllOPDPatientQuery } from "./Store/Services/OPDPatientService";
// import { useGetAllIPDPatientsQuery } from "./Store/Services/IPDPatientService";
// import { useGetAllBillingsQuery } from "./Store/Services/BillingService";
import {
  useGetAllAdminsQuery,
  useAdminProfileQuery,
} from "./Store/Services/AdminService";

// Slices
// import { getAllPatients } from "./Store/Slices/PatientSlice";
// import {
//   getAllDoctors,
//   getAllDoctorsProfessionalDetails,
// } from "./Store/Slices/DoctorSlice";
// import { getAllOPDPatients } from "./Store/Slices/OPDPatientSlice";
// import { getAllIPDPatients } from "./Store/Slices/IPDPatientSlice";
import { getAllBillings } from "./Store/Slices/BillingSlice";
import {
  getAllAdmins,
  getAdminLoggedIn,
  getAdminLoggedInData,
  getAdminRole,
} from "./Store/Slices/AdminSlice";

import Cookies from "js-cookie";
import { getEmployeeDataHandle } from "./Store/Slices/HrSlice";
import PatientsList from "./pages/Pharmacist/PatientsList/PatientsList";
import OPDConsultationCharges from "./pages/Accountent/OPDConsultationCharges/OPDConsultationCharges";
import AccommodationCharges from "./pages/Accountent/Accommodation Charges/AccommodationCharges";
import DoctorVisitCharges from "./pages/Accountent/DoctorVisitCharges/DoctorVisitCharges";
import OTChargesSuperSpecialtyoperation from "./pages/Accountent/O.T Charges  Super Specialty operation/OTChargesSuperSpecialtyoperation";
import OTCharges from "./pages/Accountent/OT charges/OTCharges";
import PhysiotheraphyOPD from "./pages/Accountent/PhysiotheraphyOPD/PhysiotheraphyOPD";
import BedsidePhysiotherapy from "./pages/Accountent/BedsidePhysiotherapy(IPD)/BedsidePhysiotherapy(IPD)";
import Tariffsofminorprocedures from "./pages/Accountent/Tariffsofminorprocedures/Tariffsofminorprocedures ";
import IpdPatientsDoctorTable from "./pages/Doctors/IpdPatientsDoctorTable/IpdPatientsDoctorTable";
import OpdPatientsDoctorTable from "./pages/Doctors/OpdPatientsDoctorTable/OpdPatientsDoctorTable";
import EmergencyPatientsDoctorTable from "./pages/Doctors/EmergencyPatientsDoctorTable/EmergencyPatientsDoctorTable";

const LoginPage = lazy(() => import("./Login"));

const UnauthorizedPage = lazy(() => import("./pages/UnauthorizedPage"));

// Super Admin
const SuperAdminDashboardPage = lazy(() =>
  import("./pages/superadmin/Dashboard")
);
const SuperAdminBillingPage = lazy(() =>
  import("./pages/superadmin/Billing/Billing")
);

const SuperAdminPatientPage = lazy(() =>
  import("./pages/superadmin/Patients/Patients")
);

const SuperAdminDoctorPage = lazy(() =>
  import("./pages/superadmin/Doctors/Doctors")
);

const SuperAdminOPDPatient = lazy(() =>
  import("./pages/superadmin/OPD_Patients/OPD_Patients")
);

const SuperAdminIPDPatient = lazy(() =>
  import("./pages/superadmin/IPD_Patients/IPD_Patients")
);

const SuperAdminAppointmentPage = lazy(() =>
  import("./pages/superadmin/Appointments/Appointment")
);

const SuperAdminAuthenticatedUserPage = lazy(() =>
  import("./pages/superadmin/AuthenticatedUsers/AuthenticatedUsers")
);
const SuperAdminNursePage = lazy(() =>
  import("./pages/superadmin/Nurses/Nurses")
);
const SuperAdminIPDPage = lazy(() => import("./pages/superadmin/IPD/IPD"));
const SuperAdminOPDPage = lazy(() => import("./pages/superadmin/OPD/OPD"));
const SuperAdminDepartmentPage = lazy(() =>
  import("./pages/superadmin/Departments/Departments")
);

const BillDownloadPage = lazy(() =>
  import("./components/superadmin/BillingTable/BillDownload/BillDownload")
);
const OPDPatientRecieptDownloadPage = lazy(() =>
  import(
    "./components/superadmin/OPD_PatientTable/OPD_PatientReciept/OPD_PatientReciept"
  )
);
// HR Panel
const HRPanelDashboard = lazy(() => import("./pages/HR/Dashboard"));
const HRPanelEmployeeManagement = lazy(() =>
  import("./pages/HR/EmployeeManagement/EmployeeManagement")
);
const HRPanelEmployeePreOnBoarding = lazy(() =>
  import("./pages/HR/EmployeePreOnBoarding/EmployeePreOnBoarding")
);
const HRPanelEmployeeCreation = lazy(() =>
  import("./pages/HR/EmployeeCreation/EmployeeCreation")
);
const HRPanelEmployeeBulkUpload = lazy(() =>
  import("./pages/HR/EmployeeBulkUpload/EmployeeBulkUpload")
);
const HRPanelEmployeeBackGroundVerification = lazy(() =>
  import(
    "./pages/HR/EmployeeBackgroundVerfication/EmployeeBackgroundVerfication"
  )
);
const HRPanelEmployeeCompensation = lazy(() =>
  import("./pages/HR/EmployeeCompensation/EmployeeCompensation")
);
const HRPanelEmployeeAppoiment = lazy(() =>
  import("./pages/HR/EmployeeAppoiment/EmployeeAppoiment")
);

// Receptionist Panel
const NursePanelDashboard = lazy(() => import("./pages/Nurse/Dashboard"));
const NursePanelAddPatient = lazy(() =>
  import("./pages/Nurse/AddPatient/AddPatient")
);
const NursePanelEditPatient = lazy(() =>
  import("./pages/Nurse/EditPatient/EditPatient")
);
const NursePanelIPDPatientList = lazy(() =>
  import("./pages/Nurse/IPDPatientList/IPDPatientList")
);
const NursePanelOPDPatientList = lazy(() =>
  import("./pages/Nurse/OPDPatientList/OPDPatientList")
);

const PatientViewPageToPrint = lazy(() =>
  import(
    "./components/Nurse/EditPatientTableAndForm/PatientViewPage/PatientViewPage"
  )
);

const EmergencyPatientReciept = lazy(() =>
  import(
    "./components/Nurse/EmergencyPatientTable/EmergencyPatientReciept/EmergencyPatientReciept"
  )
);
const IPDPatientReciept = lazy(() =>
  import(
    "./components/Nurse/IPDPatientTableAndForm/IPD_PatientReciept/IPD_PatientReciept"
  )
);
const TestPatientReceipt = lazy(() =>
  import(
    "./components/Nurse/TestPatientTable/TestPatientReceipt/TestPatientReceipt"
  )
);
const NursePanelEmergencyPatientList = lazy(() =>
  import("./pages/Nurse/EmergencyPatientList/EmergencyPatientLIst")
);
const NursePanelTestPatient = lazy(() =>
  import("./pages/Nurse/TestPatient/TestPatient")
);
// Nurse Panel
const ReceptionistPanelDashboard = lazy(() =>
  import("./pages/Receptionist/Dashboard")
);
const ReceptionistPanelIPDPatientList = lazy(() =>
  import("./pages/Receptionist/IPDPatientList/IPDPatientList")
);
const ReceptionistPanelIPDPrescriptionAdd = lazy(() =>
  import("./pages/Receptionist/IPDPrescriptionAdd/IPDPrescriptionAdd")
);
const ReceptionistPanelIPDDoctorVisitList = lazy(() =>
  import("./pages/Receptionist/IPDDoctorVisitList/IPDDoctorVisitList")
);
const ReceptionistPanelIPDPatientViewPage = lazy(() =>
  import(
    "./components/Receptionist/IPDPatientListTable/IPDPatientViewPage/IPDPatientViewPage"
  )
);

const ReferPatientsNurse = lazy(() =>
  import("./pages/Receptionist/ReferPatients/ReferPatients")
);
const DischargePatientsNurse = lazy(() =>
  import("./pages/Receptionist/DischargePatients/DischargePatients")
);
const EmergencyPatientsNurse = lazy(() =>
  import("./pages/Receptionist/EmergencyPatients/EmergencyPatients")
);
const ReferPatientsDailyVisitNurse = lazy(() =>
  import(
    "./pages/Receptionist/ReferPatientsDoctorVisit/ReferPatientsDoctorVisit"
  )
);

// AdmissionAndCharges

const AccountantAdmissionAndCharges = lazy(() =>
  import("./pages/Accountent/AdmissionAndCharges/AdmissionAndCharges")
);
const AccountantDayCareProcedure = lazy(() =>
  import("./pages/Accountent/DayCareProcedure/DayCareProcedure")
);
const AccountantPackage = lazy(() =>
  import("./pages/Accountent/Package/Package")
);
const AccountantOtherPackage = lazy(() =>
  import("./pages/Accountent/Other Package/OtherPackage")
);
const AccountantTraumaCases = lazy(() =>
  import("./pages/Accountent/TraumaCases/TraumaCases")
);
const AccountantDepartment = lazy(() =>
  import("./pages/Accountent/Department/Department")
);
const AccountantBilling = lazy(() =>
  import("./pages/Accountent/Billing/Billing")
);

// Emergency Panel
const EmergencyPanelDashboard = lazy(() =>
  import("./pages/Emergency/Dashboard")
);
const EmergencyPanelEmergencyPrescription = lazy(() =>
  import(
    "./pages/Emergency/EmergencyPatientPrescription/EmergencyPatientPrescription"
  )
);

// Doctors

const Doctors = lazy(() => import("./pages/Doctors/DoctorDashboard/Doctors"));
const DoctorsDischarge = lazy(() =>
  import("./pages/Doctors/DoctorDischargePatients/DoctorDischargePatients")
);
const DoctorsRefer = lazy(() =>
  import("./pages/Doctors/DoctorReferPatients/DoctorReferPatients")
);

function App() {
  const dispatch = useDispatch();

  // -------------------------------------------------------------------
  // const responseGetAllPatients = useGetAllPatientsQuery();
  // const responseGetAllDoctors = useGetAllDoctorsQuery();
  // const responseGetAllDoctorProfessionalDetails =
  //   useGetAllDoctorProfessionalDetailsQuery();
  // const responseGetAllOPDPatients = useGetAllOPDPatientQuery();
  // const responseGetAllIPDPatients = useGetAllIPDPatientsQuery();
  // const responseGetAllBillings = useGetAllBillingsQuery();
  // const responseGetAllAdmins = useGetAllAdminsQuery();

  const { adminRole, updateAdmin } = useSelector((state) => state.AdminState);
  const responseGetProfile = useAdminProfileQuery(
    localStorage.getItem("AdminToken")
  );

  React.useEffect(() => {
    responseGetProfile.refetch();
  }, [updateAdmin]);
  // -------------------------------------------------------------------

  // -------------------------------------------------------------------
  // const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
  //   (state) => state.PatientState
  // );
  // const {
  //   doctors,
  //   doctorProfessionalDetails,
  //   createDoctor,
  //   updateDoctor,
  //   deleteDoctor,
  // } = useSelector((state) => state.DoctorState);
  // const { OPDPatients, createOPDPatient, updateOPDPatient, deleteOPDPatient } =
  //   useSelector((state) => state.OPDPatientState);

  // const { ipdPatients, createIpdPatient, updateIpdPatient, deleteIpdPatient } =
  //   useSelector((state) => state.IPDPatientState);

  // const { billings, createBilling, updateBilling, deleteBilling } = useSelector(
  //   (state) => state.BillingState
  // );

  React.useEffect(() => {
    if (
      (responseGetProfile.isSuccess, responseGetProfile.status === "fulfilled")
    ) {
      dispatch(getAdminLoggedInData(responseGetProfile?.currentData?.data));
      dispatch(getAdminRole(responseGetProfile?.currentData?.data?.adminRole));
    }
  }, [responseGetProfile.isSuccess, responseGetProfile.status]);
  // console.log(responseGetProfile);

  React.useEffect(() => {
    if (responseGetProfile.isError) {
      dispatch(getAdminLoggedIn(null));
      dispatch(getAdminLoggedInData(null));
      dispatch(getAdminRole(null));
    }
  }, [responseGetProfile.isError]);
  // ------------------------------------------------------------------

  // Super Admin Link
  const opdPatientlink = browserLinks?.superadmin?.internalPages?.opdPatients
    ?.split(" ")
    .join("");

  const ipdPatientlink = browserLinks?.superadmin?.internalPages?.ipdPatients
    ?.split(" ")
    .join("");

  const authenticatedUsersLink =
    browserLinks?.superadmin?.internalPages?.authenticatedUsers
      ?.split(" ")
      .join("");

  // -----------------------

  // HR Panel Link
  const hrPanelEmployeeManagement =
    browserLinks?.hr?.internalPages?.employeeManagement?.split(" ").join("");
  const hrPanelEmployeePreOnBoarding =
    browserLinks?.hr?.internalPages?.preOnboardingCandidate
      ?.split(" ")
      .join("");
  const hrPanelEmployeeCreation =
    browserLinks?.hr?.internalPages?.employeeCreation?.split(" ").join("");
  const hrPanelEmployeeBulkUpload =
    browserLinks?.hr?.internalPages?.employeeBulkUpdate?.split(" ").join("");
  const hrPanelEmployeeBackgroundVerification =
    browserLinks?.hr?.internalPages?.employeeBackgroundVerification
      ?.split(" ")
      .join("");
  const hrPanelEmployeeCompensation =
    browserLinks?.hr?.internalPages?.employeeCompensation?.split(" ").join("");
  const hrPanelEmployeeAppoiment =
    browserLinks?.hr?.internalPages?.employeeAppointments?.split(" ").join("");

  // -----------------------
  // Medicine Wise Details
  const medicineWiseDetails =
    browserLinks?.Pharmacist?.internalPages?.Patientlist.split("").join("");
  // ------
  // Nurse Panel Link
  const nursePanelAddPatientLink =
    browserLinks?.nurse?.internalPages?.addPatient?.split(" ").join("");

  const nursePanelEditPatientLink =
    browserLinks?.nurse?.internalPages?.editPatient?.split(" ").join("");
  // -----------------------

  // Accountant Link

  const accountentAdmissionAndCharges =
    browserLinks?.Accountant?.internalPages?.AdmissionandCharges?.split(
      ""
    )?.join("");

  console.log(adminRole);

  return (
    <>
      {responseGetProfile.isLoading && responseGetProfile.isSuccess ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="App flex flex-col justify-center items-center">
          <BrowserRouter>
            <Routes>
              {/* Login Page */}

              <Route
                path={browserLinks.login}
                element={
                  <Suspense
                    fallback={
                      <>
                        <Box sx={{ width: "100%" }}>
                          <LinearProgress />
                        </Box>
                      </>
                    }
                  >
                    <LoginPage />
                  </Suspense>
                }
              />

              {/* Super Admin Routes */}
              {adminRole === "Super Admin" ? (
                <Route path={browserLinks.superadmin.category}>
                  <Route
                    path={browserLinks.superadmin.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminDashboardPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.superadmin.category}/${authenticatedUsersLink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminAuthenticatedUserPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.billing}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminBillingPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.billing}/:billId`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <BillDownloadPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.patients}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminPatientPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.doctors}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminDoctorPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.nurses
                      .split(" ")
                      .join("")}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminNursePage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.appointments}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminAppointmentPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.department}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminDepartmentPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.opd}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminOPDPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.ipd}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminIPDPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.superadmin.category}/${opdPatientlink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminOPDPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.superadmin.category}/${ipdPatientlink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <SuperAdminIPDPatient />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}

              {/* HR Panel */}
              {adminRole === "HR" ? (
                <Route path={browserLinks.hr.category}>
                  <Route
                    path={browserLinks.hr.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <HRPanelDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.hr.category}/${hrPanelEmployeeManagement}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <HRPanelEmployeeManagement />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.hr.category}/${hrPanelEmployeePreOnBoarding}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <HRPanelEmployeePreOnBoarding />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.hr.category}/${hrPanelEmployeeCreation}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <HRPanelEmployeeCreation />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.hr.category}/${hrPanelEmployeeBulkUpload}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <HRPanelEmployeeBulkUpload />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.hr.category}/${hrPanelEmployeeBackgroundVerification}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <HRPanelEmployeeBackGroundVerification />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.hr.category}/${hrPanelEmployeeCompensation}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <HRPanelEmployeeCompensation />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.hr.category}/${hrPanelEmployeeAppoiment}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <HRPanelEmployeeAppoiment />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
              {adminRole === "Receptionist" ? (
                <Route path={browserLinks.nurse.category}>
                  <Route
                    path={browserLinks.nurse.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.addPatient
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelAddPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.editPatient
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelEditPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks.nurse.internalPages.editPatient
                      .split(" ")
                      .join("")}/:patientId`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <PatientViewPageToPrint />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.emergencyPatientList
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelEmergencyPatientList />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks.nurse.internalPages.emergencyPatientList
                      .split(" ")
                      .join("")}/:emergencyPatientId`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <EmergencyPatientReciept />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.ipdPatientList
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelIPDPatientList />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks.nurse.internalPages.ipdPatientList
                      .split(" ")
                      .join("")}/:ipdPatientId`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <IPDPatientReciept />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.opdPatientList
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelOPDPatientList />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks.nurse.internalPages.opdPatientList
                      .split(" ")
                      .join("")}/:opdPatientId`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <OPDPatientRecieptDownloadPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.testPatient
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelTestPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.testPatient
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelTestPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks.nurse.internalPages.testPatient
                      .split(" ")
                      .join("")}/:testPatientId`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <TestPatientReceipt />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
              {/* Nurse Panel */}
              {adminRole === "Receptionist" ? (
                <Route path={browserLinks.nurse.category}>
                  <Route
                    path={browserLinks.nurse.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.nurse.category}/${nursePanelAddPatientLink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelAddPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.nurse.category}/${nursePanelEditPatientLink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelEditPatient />
                      </Suspense>
                    }
                  />
                  {/* <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.addEmergencyPatient
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelAddEmergencyPatient />
                      </Suspense>
                    }
                  /> */}
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.editEmergencyPatient
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <NursePanelEmergencyPatientList />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
              {/* Pharmacist Panel */}
              {adminRole === "Pharmacist" ? (
                <Route path={browserLinks.Pharmacist.category}>
                  <Route
                    path={`${
                      browserLinks.Pharmacist.category
                    }/${browserLinks?.Pharmacist?.internalPages?.Patientlist?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <PatientsList />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
              {/* Accountent Panel */}
              {adminRole === "Accountant" ? (
                <Route path={browserLinks.Accountant.category}>
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.AdmissionandCharges?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <AccountantAdmissionAndCharges />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.OPDConsultationCharges?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <OPDConsultationCharges />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.AccommodationCharges?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <AccommodationCharges />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.DoctorvisitCharges?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <DoctorVisitCharges />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.OTChargesSuperSpecialtyOperation?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <OTChargesSuperSpecialtyoperation />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.OTCharges?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <OTCharges />
                      </Suspense>
                    }
                  />

                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.PhysiotheraphyOPD?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <PhysiotheraphyOPD />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.BedsidePhysiotherapyIPD?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <BedsidePhysiotherapy />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.TariffsofMinorProcedures?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <Tariffsofminorprocedures />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.DayCareProcedure?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <AccountantDayCareProcedure />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.Package?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <AccountantPackage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.otherpackage
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <AccountantOtherPackage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.TraumaCases?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <AccountantTraumaCases />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.Department?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <AccountantDepartment />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Accountant.category
                    }/${browserLinks?.Accountant?.internalPages?.Billing?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <AccountantBilling />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
              {/* Doctor Panel */}
              {adminRole === "Doctor" ? (
                <Route path={browserLinks.Doctor.category}>
                  <Route
                    path={`${
                      browserLinks.Doctor.category
                    }/${browserLinks?.Doctor?.internalPages?.DashBoard?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <Doctors />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Doctor.category
                    }/${browserLinks?.Doctor?.internalPages?.IpdPatients?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <IpdPatientsDoctorTable />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Doctor.category
                    }/${browserLinks?.Doctor?.internalPages?.OpdPatients?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <OpdPatientsDoctorTable />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Doctor.category
                    }/${browserLinks?.Doctor?.internalPages?.EmergencyPatients?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <EmergencyPatientsDoctorTable />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Doctor.category
                    }/${browserLinks?.Doctor?.internalPages?.ReferralPatients?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <DoctorsRefer />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.Doctor.category
                    }/${browserLinks?.Doctor?.internalPages?.DischargePatients?.split(
                      " "
                    ).join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <DoctorsDischarge />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
              {adminRole === "Emergency" ? (
                <Route path={browserLinks.emergency.category}>
                  <Route
                    path={browserLinks.emergency.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <EmergencyPanelDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks?.emergency?.internalPages?.addEmergencyPatientPrescription
                      ?.split(" ")
                      .join("")}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <EmergencyPanelEmergencyPrescription />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
              {adminRole === "Nurse" ? (
                <Route path={browserLinks.receptionist.category}>
                  <Route
                    path={browserLinks.receptionist.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <ReceptionistPanelDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.receptionist.category
                    }/${browserLinks?.receptionist?.internalPages?.ipdPatientList
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <ReceptionistPanelIPDPatientList />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.receptionist.category
                    }/${browserLinks?.receptionist?.internalPages?.ipdPatientViewPage
                      ?.split(" ")
                      .join("")}/:ipdPatientViewPageID`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <ReceptionistPanelIPDPatientViewPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.receptionist.category
                    }/${browserLinks?.receptionist?.internalPages?.addIPDPatientPrescription
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <ReceptionistPanelIPDPrescriptionAdd />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.receptionist.category
                    }/${browserLinks?.receptionist?.internalPages?.doctorVisitListIPD
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <ReceptionistPanelIPDDoctorVisitList />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.receptionist.category
                    }/${browserLinks?.receptionist?.internalPages?.referPatients
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <ReferPatientsNurse />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.receptionist.category
                    }/${browserLinks?.receptionist?.internalPages?.dischargePatients
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <DischargePatientsNurse />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.receptionist.category
                    }/${browserLinks?.receptionist?.internalPages?.emergency
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <EmergencyPatientsNurse />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.receptionist.category
                    }/${browserLinks?.receptionist?.internalPages?.referPatientsDoctorVisit
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }
                      >
                        <ReferPatientsDailyVisitNurse />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }
                    >
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
