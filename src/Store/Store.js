import { configureStore } from "@reduxjs/toolkit";

// Slices
import PatientSlice from "./Slices/PatientSlice";
import DoctorSlice from "./Slices/DoctorSlice";
import OPDPatientSlice from "./Slices/OPDPatientSlice";
import IPDPatientSlice from "./Slices/IPDPatientSlice";
import BillingSlice from "./Slices/BillingSlice";
import AdminSlice from "./Slices/AdminSlice";
import BedSlice from "./Slices/BedSlice";
import DepartmentSlice from "./Slices/DepartmentSlice";
import WardSlice from "./Slices/WardSlice";
import FloorDepartmentSlice from "./Slices/FloorDepartmentSlice";
import EmergencyPatientSlice from "./Slices/EmergencyPatientSlice";
import IPDPatientBalanceSlice from "./Slices/IPDPatientBalanceSlice";
import NurseSlice from "./Slices/NurseSlice";
// Services
import { patientService } from "./Services/PatientService";
import { doctorService } from "./Services/DoctorService";
import { OPDPatientService } from "./Services/OPDPatientService";
import { IPDPatientService } from "./Services/IPDPatientService";
import { billingService } from "./Services/BillingService";
import { AdminService } from "./Services/AdminService";
import Employee from "./Slices/HrSlice";
import Medicine from "./Slices/Medicine";
import Test from "./Slices/Test";
import { BedService } from "./Services/BedService";
import { departmentService } from "./Services/DepartmentService";
import { WardService } from "./Services/WardService";
import { floorDepartmentServices } from "./Services/FloorDepartmentService";
import { emergencyPatientService } from "./Services/EmergencyPatientService";
import { IPDPatientBalanceService } from "./Services/IPDPatientBalanceService";
import { NurseService } from "./Services/NurseService";
export const store = configureStore({
  reducer: {
    PatientState: PatientSlice,
    [patientService.reducerPath]: patientService.reducer,
    DoctorState: DoctorSlice,
    [doctorService.reducerPath]: doctorService.reducer,
    OPDPatientState: OPDPatientSlice,
    [OPDPatientService.reducerPath]: OPDPatientService.reducer,
    IPDPatientState: IPDPatientSlice,
    [IPDPatientService.reducerPath]: IPDPatientService.reducer,
    BillingState: BillingSlice,
    [billingService.reducerPath]: billingService.reducer,
    AdminState: AdminSlice,
    [AdminService.reducerPath]: AdminService.reducer,
    EmployeeTableData: Employee,
    MedicineData: Medicine,
    TestData: Test,
    NurseState: NurseSlice,
    BedState: BedSlice,
    [BedService.reducerPath]: BedService.reducer,
    DepartmentState: DepartmentSlice,
    [departmentService.reducerPath]: departmentService.reducer,
    WardState: WardSlice,
    [WardService.reducerPath]: WardService.reducer,
    FloorDepartmentState: FloorDepartmentSlice,
    [floorDepartmentServices.reducerPath]: floorDepartmentServices.reducer,
    EmergencyPatientState: EmergencyPatientSlice,
    [emergencyPatientService.reducerPath]: emergencyPatientService.reducer,
    IPDPatientBalanceState: IPDPatientBalanceSlice,
    [IPDPatientBalanceService.reducerPath]: IPDPatientBalanceService.reducer,
    NurseState: NurseSlice,
    [NurseService.reducerPath]: NurseService.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      patientService.middleware,
      doctorService.middleware,
      OPDPatientService.middleware,
      IPDPatientService.middleware,
      billingService.middleware,
      AdminService.middleware,
      BedService.middleware,
      departmentService.middleware,
      WardService.middleware,
      floorDepartmentServices.middleware,
      emergencyPatientService.middleware,
      IPDPatientBalanceService.middleware,
      NurseService.middleware,
    ]),
});
