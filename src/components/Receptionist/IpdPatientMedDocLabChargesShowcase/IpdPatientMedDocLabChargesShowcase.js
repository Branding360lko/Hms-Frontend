import { useEffect, useState } from "react";
import { useIpdPatientMedDocLabChargesGetByIdMutation } from "../../../Store/Services/IPDPatientService";

function IpdPatientMedDocLabChargesShowcase({ ipdPatientData }) {
  const [medDocLabChargesGet, responseMedDocLabChargesGet] =
    useIpdPatientMedDocLabChargesGetByIdMutation();

  const [medDocLabCharges, setMedDocLabCharges] = useState(null);

  useEffect(() => {
    medDocLabChargesGet(ipdPatientData.data.mainId);
  }, [medDocLabChargesGet, ipdPatientData.data.mainId]);

  useEffect(() => {
    if (responseMedDocLabChargesGet.isSuccess) {
      setMedDocLabCharges(responseMedDocLabChargesGet.data);
    }
  }, [responseMedDocLabChargesGet]);

  console.log("medDocLabCharges state:", medDocLabCharges);

  return (
    <div className=" w-full">
      {responseMedDocLabChargesGet.isSuccess && medDocLabCharges ? (
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead className="w-full">
            <tr className=" w-full border-b-[1px]">
              <th className="text-left px-[4px] border-b-[1px] p-[10px]">
                Date/ Time
              </th>
              <th className="text-left px-[4px] border-b-[1px] p-[10px]">
                Medicine Cost
              </th>
              <th className="text-left px-[4px] border-b-[1px] p-[10px]">
                Lab Test Cost
              </th>
              <th className="text-left px-[4px] border-b-[1px] p-[10px]">
                Referred Doctor Fees
              </th>
              <th className="text-left px-[4px] border-b-[1px] p-[10px]">
                Doctor Fees
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500 font-semibold">
            {medDocLabCharges[0]?.overAllData?.map((charge, index) => (
              <tr key={charge._id}>
                <td className="text-left text-[12px] py-4 px-[4px] border-b-[1px]">
                  {new Date(charge.visitDate).toLocaleString()}
                </td>
                <td className="text-left text-[12px] py-4 px-[4px] border-b-[1px]">
                  Rs. {charge.DailyMedicinePriceTotal}
                </td>
                <td className="text-left text-[12px] py-4 px-[4px] border-b-[1px]">
                  Rs. {charge.DailyTestPriceTotal}
                </td>
                <td className="text-left text-[12px] py-4 px-[4px] border-b-[1px]">
                  {charge.RefereddoctorFeesDatails.length > 0
                    ? `Rs. ${charge.RefereddoctorFeesDatails[0]}`
                    : "N/A"}
                </td>
                <td className="text-left text-[12px] py-4 px-[4px] border-b-[1px]">
                  {charge.RefereddoctorFeesDatails.length === 0
                    ? `Rs. ${charge.doctorFeesDatails[0]}`
                    : "N/A"}
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-left text-[12px] py-4 px-[4px] border-b-[3px] border-t-[3px] text-base">
                Total
              </td>
              <td className="text-left text-[12px] py-4 px-[4px] border-b-[3px] border-t-[3px] text-base">
                Rs. {medDocLabCharges[0]?.overallTotalMedicinePrice}
              </td>
              <td className="text-left text-[12px] py-4 px-[4px] border-b-[3px] border-t-[3px] text-base">
                Rs. {medDocLabCharges[0]?.overallTotalTestPrice}
              </td>
              <td className="text-left text-[12px] py-4 px-[4px] border-b-[3px] border-t-[3px] text-base">
                -
              </td>
              <td className="text-left text-[12px] py-4 px-[4px] border-b-[3px] border-t-[3px] text-base">
                Rs. {medDocLabCharges[0]?.overallDoctorVisitCharge}
              </td>
            </tr>
          </tbody>
        </table>
      ) : responseMedDocLabChargesGet.isError ? (
        <p>Data Not Found</p>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

export default IpdPatientMedDocLabChargesShowcase;
