const browserLinks = {
  login: "/",
  superadmin: {
    category: "/Superadmin",
    internalPages: {
      dashboard: "Dashboard",
      authenticatedUsers: "Authenticated Users",
      billing: "Billing",
      patients: "Patients",
      appointments: "Appointments",
      doctors: "Doctors",
      nurses: "Nurses",
      messages: "Messages",
      educationContent: "Education Content",
      emergencyPatientList: "Emergency Patient List",
      emergencyPatientPaymentReceipt: "Emergency Patient Payment Receipt",
      // medicineInventory: "Medicine Inventory",
      settings: "Settings",
      opd: "OPD",
      ipd: "IPD",
      opdPatients: "OPD Patients",
      ipdPatients: "IPD Patients",
      testPatient: "Test Patients",
      emergencyPatient: "Emergency Patients",
      department: "Department",
      hospitalInventry: "Hospital Inventory",
      medicineInventory: "Medicine Inventory",
      diagnosisList: "Diagnosis List",
      admissionCharges: "Admission Charges",
      vitalServices: "Vital Services",
    },
  },
  hr: {
    category: "/HR",
    internalPages: {
      dashboard: "Dashboard",
      employeeManagement: "Employee Management",
      preOnboardingCandidate: "Pre Onboarding Candidate",
      employeeCreation: "Employee Creation",
      searchEmployee: "Search Employee",
      employeeBulkUpdate: "Employee Bulk Update",
      employeeBackgroundVerification: "Background Verification",
      employeeCompensation: "Compensation",
      employeeAppointments: "Appointments",
    },
  },
  nurse: {
    category: "/Receptionist",
    pageCategories: {
      patientRegistration: "Patients",
      opdPatients: "OPD Patients",
      ipdPatients: "IPD Patients",
      emergency: "Emergency",
      tests: "Tests",
    },
    internalPages: {
      dashboard: "Dashboard",
      addPatient: "Add Patient",
      editPatient: "Patient List",
      opdPatientList: "OPD Patient List",
      ipdPatientList: "IPD Patient List",
      ipdPatientPaymentReceipt: "IPDPatient Payment Receipt",
      emergencyPatientList: "Emergency Patient List",
      emergencyPatientPaymentReceipt: "Emergency Patient Payment Receipt",
      testPatient: "Patient Tests",
    },
  },
  receptionist: {
    category: "/Nurse",
    pageCategories: {
      opdPatient: "OPD Patient",
      ipdPatient: "IPD Patient",
    },
    internalPages: {
      dashboard: "Dashboard",
      addOPDPatientPrescription: "Add Prescription OPD",
      opdPatientList: "Patient List OPD",
      addIPDPatientPrescription: "Add Prescription IPD",
      ipdPatientList: "Patient List IPD",
      ipdPatientViewPage: "View Patient IPD",
      doctorVisitListIPD: "Doctor Visit List IPD",
      referPatients: "Refer Patients",
      dischargePatients: "Discharge Patients",
      emergency: "Emergency Patients",
      emergencyPatienDischarge: "Emergency Discharge",
      referPatientsDoctorVisit: "Refer Patients Doctor Visit",
    },
  },
  Doctor: {
    category: "/Doctor",
    internalPages: {
      Doctors: "Doctor",
      DashBoard: "DashBoard",
      IpdPatients: "IpdPatients",
      OpdPatients: "OpdPatients",
      EmergencyPatients: "Emergenc Patients",
      DischargePatients: "Discharge Patients",
      EmergencyDischargePatients: "Emergency Discharge Patients",
      ReferralPatients: "Referral Patients",
    },
  },
  Accountant: {
    category: "/Accountant",
    internalPages: {
      Billing: "Billing",
      Department: "Department",
      AdmissionandCharges: "Admission Charges",
      OPDConsultationCharges: "OPD Consultation Charges",
      AccommodationCharges: "Accommodation Charges",
      DoctorvisitCharges: "Doctor visit Charges",
      OTChargesSuperSpecialtyOperation:
        "O.T Charges / Super Specialty operation",
      OTCharges: "OT charges",
      PhysiotheraphyOPD: "Physiotheraphy OPD",
      BedsidePhysiotherapyIPD: "Bedside  Physiotherapy  IPD",
      TariffsofMinorProcedures: "Tariffs of  minor procedures",
      DayCareProcedure: "Day Care Procedure",
      Package: "Package",
      otherpackage: "Other Package",
      TraumaCases: "Trauma Cases",
    },
  },
  emergency: {
    category: "/Emergency",
    internalPages: {
      dashboard: "Dashboard",
      addEmergencyPatientPrescription: "Emergency Prescription",
    },
  },
};

// 1 = "Super Admin"
// 2 = "Doctor"
// 3 = "HR"
// 4 = "Receptionist"
// 5 = "Pharmacist"
// 6 = "Accountant"
// 7 = "Nurse"
// 8 = "Radiologist"
// 9 = "Laboratory Assistant"

// nurse = receptionist (nurse section is named as receptionist)
// receptionist = nurse (receptionist is named as nurse)

export default browserLinks;
