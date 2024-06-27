import { useGetAllEmergencyPatientBalanceQuery } from "../../../Store/Services/EmergencyPatientService";
import EmergencyBedChargesCal from "../EmergencyBedChargesCal/EmergencyBedChargesCal";
import EmergencyMedDocLabChargesShowcase from "../EmergencyMedDocLabChargesShowcase/EmergencyMedDocLabChargesShowcase";

function EmergencyChargesShowcase({
  currentPatientFinalBalance,
  currentPatientMedDocLabTotal,
  currentPatientExtraCharges,
  currentPatientExtraChargesTotal,
}) {
  console.log(
    "currentPatientExtraCharges in showcase:",
    currentPatientExtraCharges
  );

  console.log(
    "currentPatientExtraChargesTotal in showcase:",
    currentPatientExtraChargesTotal
  );
  return (
    <div>
      <h2 className=" text-2xl font-semibold">Bill Summary</h2>
      <br></br>
      <EmergencyBedChargesCal
        currentPatientFinalBalance={currentPatientFinalBalance}
      />
      <EmergencyMedDocLabChargesShowcase
        currentPatientMedDocLabTotal={currentPatientMedDocLabTotal}
      />
      {currentPatientExtraCharges && currentPatientExtraChargesTotal ? (
        <div className="w-full">
          <h3 className="text-xl font-semibold">Extra Charges</h3>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
            <thead>
              <tr className="border-b-[1px]">
                <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                  Item
                </th>
                <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                  Quantity
                </th>
                <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                  Price
                </th>
                <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-500 font-semibold">
              {currentPatientExtraCharges.map((charge, index) => (
                <>
                  {charge.items.map((item) => (
                    <tr key={item._id}>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {item.itemName}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {item.quantity}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        Rs. {item.price}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
          <div className="mt-4 font-bold">
            Total Extra Charges: {currentPatientExtraChargesTotal}
          </div>
        </div>
      ) : (
        <div>Data Not Found</div>
      )}
    </div>
  );
}

export default EmergencyChargesShowcase;
