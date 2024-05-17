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

// Services
import { patientService } from "./Services/PatientService";
import { doctorService } from "./Services/DoctorService";
import { OPDPatientService } from "./Services/OPDPatientService";
import { IPDPatientService } from "./Services/IPDPatientService";
import { billingService } from "./Services/BillingService";
import { AdminService } from "./Services/AdminService";
import { BedService } from "./Services/BedService";
import { departmentService } from "./Services/DepartmentService";
import { WardService } from "./Services/WardService";
import { floorDepartmentServices } from "./Services/FloorDepartmentService";
import { emergencyPatientService } from "./Services/EmergencyPatientService";

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
    ]),
});
