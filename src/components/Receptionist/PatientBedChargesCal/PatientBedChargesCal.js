import { useEffect, useState } from "react";
import {
  useIpdPatientFinalBalanceCalGetByIdMutation,
  useIpdPatientFinalDischargeByIdMutation,
} from "../../../Store/Services/IPDPatientService";

function PatientBedChargesCal({
  currentPatientBed,
  ipdPatientData,
  setCurrentPatientBedCharges,
}) {
  //   console.log("currentPatientBed in billsumm:", currentPatientBed);
  //   console.log("ipdPatientData in bill sum:", ipdPatientData);

  const [
    ipdPatientFinalBalanceCalGetById,
    responseIpdPatientFinalBalanceCalGetById,
  ] = useIpdPatientFinalBalanceCalGetByIdMutation();

  const [ipdPatientFinalBedCal, setIpdPatientFinalBedCal] = useState(null);

  useEffect(() => {
    ipdPatientFinalBalanceCalGetById(ipdPatientData?.data?.mainId);
  }, [ipdPatientData?.data?.mainId]);

  useEffect(() => {
    console.log(
      "responseIpdPatientFinalBalanceCalGetById",
      responseIpdPatientFinalBalanceCalGetById
    );

    const finalBedCal =
      responseIpdPatientFinalBalanceCalGetById?.data?.autoCharges[0];
    setIpdPatientFinalBedCal(finalBedCal);
  }, [responseIpdPatientFinalBalanceCalGetById.isSuccess]);

  console.log("ipdPatientFinalBedCal:", ipdPatientFinalBedCal);

  // const [patientInDays, setPatientInDays] = useState(null);

  // const [totalAmount, setTotalAmount] = useState(0);

  const [totalCharges, setTotalCharges] = useState(null);

  // const calculatePatientDays = () => {
  //   const admittedDate = new Date(ipdPatientData?.data?.createdAt);
  //   const currentDate = new Date();

  //   admittedDate.setHours(0, 0, 0, 0);
  //   currentDate.setHours(0, 0, 0, 0);

  //   const timeDifference = currentDate - admittedDate;

  //   const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  //   setPatientInDays(Math.ceil(daysDifference) + 1);
  // };

  useEffect(() => {
    calculateTotalCharges();
  }, [ipdPatientFinalBedCal]);

  const calculateTotalCharges = () => {
    if (ipdPatientFinalBedCal) {
      const totalCharges =
        ipdPatientFinalBedCal?.bedTotalCharges +
        ipdPatientFinalBedCal?.nursingTotalCharges +
        ipdPatientFinalBedCal?.EMOTotalCharges +
        ipdPatientFinalBedCal?.bioWasteTotalCharges +
        ipdPatientFinalBedCal?.sanitizationTotalCharges;

      setTotalCharges(Number(totalCharges));
      if (setCurrentPatientBedCharges) {
        setCurrentPatientBedCharges(totalCharges);
      }
    }
  };

  // useEffect(() => {
  //   calculatePatientDays();
  //   calculateTotalCharges();
  // }, [currentPatientBed, ipdPatientData.patientData]);

  // useEffect(() => {
  //   calculatePatientDays();
  //   calculateTotalCharges();
  // });
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
              <th className="text-center px-[4px] border-b-[1px] p-[10px] text-blue-500">
                Total Charges
              </th>
            </tr>
          </thead>
          <tbody className=" text-gray-500 font-semibold">
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              Rs.&nbsp;{ipdPatientFinalBedCal?.bedTotalCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              Rs.&nbsp;{ipdPatientFinalBedCal?.nursingTotalCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              Rs.&nbsp;{ipdPatientFinalBedCal?.EMOTotalCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              Rs.&nbsp;{ipdPatientFinalBedCal?.bioWasteTotalCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              Rs.&nbsp;{ipdPatientFinalBedCal?.sanitizationTotalCharges}
            </td>
            <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
              {ipdPatientFinalBedCal?.days}
            </td>
            <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-blue-500 font-bold">
              Rs.&nbsp;{totalCharges}
            </td>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientBedChargesCal;
