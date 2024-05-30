import { useEffect, useState } from "react";

function PatientBedChargesCal({
  currentPatientBed,
  ipdPatientData,
  setCurrentPatientBedCharges,
}) {
  //   console.log("currentPatientBed in billsumm:", currentPatientBed);
  //   console.log("ipdPatientData in bill sum:", ipdPatientData);

  const [patientInDays, setPatientInDays] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0);

  const [totalCharges, setTotalCharges] = useState(0);

  const calculatePatientDays = () => {
    const admittedDate = new Date(ipdPatientData?.data?.createdAt);
    const currentDate = new Date();

    admittedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const timeDifference = currentDate - admittedDate;

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    setPatientInDays(Math.ceil(daysDifference) + 1);
  };

  const calculateTotalCharges = () => {
    const totalCharges =
      (currentPatientBed?.bedCharges +
        currentPatientBed?.nursingCharges +
        currentPatientBed?.EMOCharges +
        currentPatientBed?.bioWasteCharges +
        currentPatientBed?.sanitizationCharges) *
      patientInDays;

    setTotalCharges(totalCharges);
    setCurrentPatientBedCharges(totalCharges);
  };

  useEffect(() => {
    calculatePatientDays();
    calculateTotalCharges();
  }, [currentPatientBed, ipdPatientData.patientData]);

  useEffect(() => {
    calculatePatientDays();
    calculateTotalCharges();
  });
  return (
    <div className=" flex flex-col justify-start items-start w-full gap-10">
      <h2 className=" text-2xl font-semibold">Bill Summary</h2>
      <div className=" w-full">
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <tr className="border-b-[1px]">
              {/* <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                S.No.
              </th> */}
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Bed Charges
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Nursing Charges
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                EMO Charges
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Bio-Waste Charges
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Sanitization Charges
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                No. Of Days
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Totol Charges
              </th>
            </tr>
          </thead>
          <tbody className=" text-gray-500 font-semibold">
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              {currentPatientBed?.bedCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              {currentPatientBed?.nursingCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              {currentPatientBed?.EMOCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              {currentPatientBed?.bioWasteCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              {currentPatientBed?.sanitizationCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              {patientInDays}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              {totalCharges}
            </td>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientBedChargesCal;
