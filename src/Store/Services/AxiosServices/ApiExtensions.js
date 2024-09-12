export const apiExt = {
  nurses: {
    getAllNursesData: "DropdownData-Nurse",
  },
  patients: {
    getAllPatientsData: "DropdownData-Patient",
    changeIpdBed: "IPDPatient-PUT-ChangeBed",
  },
  doctors: {
    getAllDoctors: "DropdownData-Doctor",
  },
  emergencyPatients: {
    getAllEmergencyPatients: "EmergencyPatient-GET-ALL",
    changeEmergencyBed: "EmergencyPatient-PUT-ChangeBed",
    getEmergencyPatientById: "EmergencyPatient-GET-ONE",
    getEmergencyPatientBalanceById: "EmergencyPatient-Balance-GET",
    getAllEmergencyPatientBalance: "EmergencyPatient-Balance-GET-ALL",
    getEmergencyPatientMedDocLabDetailsById: "get-one-emergency-patients-data",
    getEmergencyPatientMedDocLabTotalById:
      "get-one-emergency-patients-data-total",
    emergencyPatientDischargeReceiptGetById:
      "EmergencyPatientDischargeReciept-GET-ONE",
  },
};
