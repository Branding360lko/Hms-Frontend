import { useEffect, useState } from "react";
import PatientBedChargesCal from "../PatientBedChargesCal/PatientBedChargesCal";
import { useGetIPDPatientBalanceByIdQuery } from "../../../Store/Services/IPDPatientBalanceService";
import IpdPatientMedDocLabChargesShowcase from "../IpdPatientMedDocLabChargesShowcase/IpdPatientMedDocLabChargesShowcase";

function IpdChargesShowcase({
  currentPatientBed,
  ipdPatientData,
  setIpdPatientCurrentBalance,
  setCurrentPatientBedCharges,
  openViewModal,
}) {
  // Extract the mainId from ipdPatientData
  const IpdPatientMainId = ipdPatientData?.data?.mainId;

  // Call the hook directly in the component body
  const {
    data: ipdPatientBalance,
    error,
    isLoading,
    refetch,
  } = useGetIPDPatientBalanceByIdQuery(IpdPatientMainId);

  console.log("balance data:", ipdPatientBalance);

  // Update the balance state when the balance data changes
  useEffect(() => {
    if (ipdPatientBalance && setIpdPatientCurrentBalance) {
      setIpdPatientCurrentBalance(ipdPatientBalance);
    }
  }, [ipdPatientBalance, setIpdPatientCurrentBalance, openViewModal]);

  useEffect(() => {
    console.log("refetch initiated...");
    refetch();
  }, [openViewModal]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading IPD Patient Balance</div>;
  }

  const medicalCharges = ipdPatientBalance?.data?.charges || [];
  const labTestCharges = ipdPatientBalance?.data?.labTestCharges || [];

  const totalMedicalCharges = ipdPatientBalance?.totalMedicalCharges;
  const totalLabTestCharges = ipdPatientBalance?.totalLabTestCharges;

  const totalAllCharges = ipdPatientBalance?.total;

  //   console.log("medicalCharges:", medicalCharges);

  return (
    <div className="flex flex-col justify-start items-start w-full gap-10">
      <PatientBedChargesCal
        currentPatientBed={currentPatientBed}
        ipdPatientData={ipdPatientData}
        setCurrentPatientBedCharges={setCurrentPatientBedCharges}
      />

      <IpdPatientMedDocLabChargesShowcase ipdPatientData={ipdPatientData} />

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
            {medicalCharges.map((charge, index) => (
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
                {/* <tr key={charge._id}>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {charge.items.map((item) => item.itemName).join(", ")}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {charge.price}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {new Date(charge.createdAt).toLocaleDateString()}
                  </td>
                </tr> */}
              </>
            ))}
          </tbody>
        </table>
        <div className="mt-4 font-bold">
          Total Extra Charges: {totalMedicalCharges}
        </div>
      </div>

      {/* <div className="w-full">
        <h3 className="text-xl font-semibold">Lab Test Charges</h3>
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
            {labTestCharges.map((charge, index) => (
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
                <tr key={charge._id}>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {charge.items.map((item) => item.itemName).join(", ")}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {charge.price}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {new Date(charge.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className="mt-4 font-bold">
          Total Lab Test Charges: {totalLabTestCharges}
        </div>
      </div> */}

      {/* <div>
        <h2 className="text-2xl font-semibold">
          Medical + Lab Charges: Rs. {totalAllCharges}
        </h2>
      </div> */}
    </div>
  );
}

export default IpdChargesShowcase;
