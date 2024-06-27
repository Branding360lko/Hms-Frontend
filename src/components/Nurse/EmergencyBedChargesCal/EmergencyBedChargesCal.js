import { useEffect, useState } from "react";
import {
  useGetAllEmergencyPatientBalanceQuery,
  useGetEmergencyPatientBalanceByIdQuery,
} from "../../../Store/Services/EmergencyPatientService";

function EmergencyBedChargesCal({ currentPatientFinalBalance }) {
  const [bedTotalCharges, setBedTotalCharges] = useState(null);

  const currentEmergencyPatientTotalInDays = currentPatientFinalBalance?.days;

  useEffect(() => {
    setBedTotalCharges(currentPatientFinalBalance?.autoChargesTotal);
  }, currentPatientFinalBalance?.emergencyPatientRegId);

  return (
    <div className=" flex flex-col justify-start items-start w-full gap-5 my-5">
      <h3 className=" text-xl font-semibold">Bed Charges</h3>
      {currentPatientFinalBalance && bedTotalCharges ? (
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
                Rs.&nbsp;{currentPatientFinalBalance?.bedCharges}
              </td>
              <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
                Rs.&nbsp;{currentPatientFinalBalance?.nursingCharges}
              </td>
              <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
                Rs.&nbsp;{currentPatientFinalBalance?.EMOCharges}
              </td>
              <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
                Rs.&nbsp;{currentPatientFinalBalance?.bioWasteCharges}
              </td>
              <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
                Rs.&nbsp;{currentPatientFinalBalance?.sanitizationCharges}
              </td>
              <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
                {currentEmergencyPatientTotalInDays}
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] text-blue-500 font-bold">
                Rs.&nbsp;{bedTotalCharges ? bedTotalCharges : "Not Found"}
              </td>
            </tbody>
          </table>
        </div>
      ) : (
        <div>Data Not Found</div>
      )}
    </div>
  );
}

export default EmergencyBedChargesCal;
