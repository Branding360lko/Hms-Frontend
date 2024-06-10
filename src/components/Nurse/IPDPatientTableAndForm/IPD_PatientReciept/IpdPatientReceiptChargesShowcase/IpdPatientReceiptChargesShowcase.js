import React from "react";

function IpdPatientReciptChargesShowcase({
  responseIpdPatientMedDocLabDetailCall,
  medDocLabChargesTotal,
}) {
  console.log(
    "responseIpdPatientMedDocLabDetailCall in reciept:",
    responseIpdPatientMedDocLabDetailCall
  );
  console.log("medDocLabChargesTotal in reciept:", medDocLabChargesTotal);
  const calculateSubtotal = (items) => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.Quantity * item.Price,
      0
    );
    return subtotal.toFixed(2);
  };

  const date = (dateTime) => {
    const newDate = new Date(dateTime);
    return newDate.toLocaleDateString("en-IN"); // specifying 'en-IN' locale for the date format
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);
    return newDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata", // specifying the time zone for Indian time
    });
  };

  return (
    <div>
      {/* Medicine Charges Table */}
      <div className="flex flex-col justify-start items-start mb-8">
        <h3 className="text-base font-semibold">Medicine Charges</h3>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <tr className="border-b-[1px]">
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                SNO
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Date & Time
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Item Name
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Quantity
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Price
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500 font-semibold">
            {responseIpdPatientMedDocLabDetailCall.map((entry, entryIndex) =>
              entry.medicine.map((med, medIndex) => (
                <tr key={med._id}>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {entryIndex + 1}.{medIndex + 1}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {/* {entry.VisitDateTime} */}
                    {`${date(entry.VisitDateTime)} - ${time(
                      entry.VisitDateTime
                    )}`}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {med.Name}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {med.Quantity}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    Rs. {med.Price}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    Rs. {(med.Quantity * med.Price).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td
                colSpan="4"
                className="text-center text-[16px] py-4 px-[4px] border-b-[1px] text-blue-500"
              >
                Sub Total
              </td>
              <td
                colSpan="2"
                className="text-center text-[16px] py-4 px-[4px] border-b-[1px] text-blue-500"
              >
                Rs.{" "}
                {medDocLabChargesTotal?.overallTotalMedicinePrice?.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Lab Test Charges Table */}
      <div className="flex flex-col justify-start items-start mb-8">
        <h3 className="text-base font-semibold">Lab Test Charges</h3>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <tr className="border-b-[1px]">
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                SNO
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Date & Time
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Test Name
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Quantity
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Price
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500 font-semibold">
            {responseIpdPatientMedDocLabDetailCall.map((entry, entryIndex) =>
              entry.test.map((test, testIndex) => (
                <tr key={test._id}>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {entryIndex + 1}.{testIndex + 1}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {/* {entry.VisitDateTime} */}
                    {`${date(entry.VisitDateTime)} - ${time(
                      entry.VisitDateTime
                    )}`}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {test.Name}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    {test.Quantity}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    Rs. {test.Price}
                  </td>
                  <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                    Rs. {(test.Quantity * test.Price).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td
                colSpan="4"
                className="text-center text-[16px] py-4 px-[4px] border-b-[1px] text-blue-500"
              >
                Sub Total
              </td>
              <td
                colSpan="2"
                className="text-center text-[16px] py-4 px-[4px] border-b-[1px] text-blue-500"
              >
                Rs. {medDocLabChargesTotal?.overallTotalTestPrice?.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Doctor Visit Charges Table */}
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-base font-semibold">Doctor Visit Charges</h3>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <tr className="border-b-[1px]">
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                SNO
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Date & Time
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Doctor's Name
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Referred/Assigned
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Visiting Fees
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500 font-semibold">
            {responseIpdPatientMedDocLabDetailCall?.map((entry, entryIndex) => {
              const docEntry = medDocLabChargesTotal?.overAllData?.find(
                (doc) => doc.visitDate === entry.VisitDateTime
              );

              if (!docEntry) return null;
              console.log("entry:", entry);

              return (
                <React.Fragment key={entry._id}>
                  {docEntry.RefereddoctorFeesDatails.length > 0 ? (
                    <tr>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {entryIndex + 1}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {/* {entry.VisitDateTime} */}
                        {`${date(entry.VisitDateTime)} - ${time(
                          entry.VisitDateTime
                        )}`}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {entry?.ReferedDoctor[0]
                          ? entry?.ReferedDoctor[0].doctorName
                          : "Error"}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        Referred
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        Rs. {docEntry.RefereddoctorFeesDatails[0].toFixed(2)}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {entryIndex + 1}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {/* {entry.VisitDateTime} */}
                        {`${date(entry.VisitDateTime)} - ${time(
                          entry.VisitDateTime
                        )}`}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        {entry?.doctorData[0]?.doctorName}
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        Assigned
                      </td>
                      <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                        Rs. {docEntry.doctorFeesDatails[0].toFixed(2)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            <tr>
              <td
                colSpan="3"
                className="text-center text-[16px] py-4 px-[4px] border-b-[1px] text-blue-500"
              >
                Sub Total
              </td>
              <td
                colSpan="2"
                className="text-center text-[16px] py-4 px-[4px] border-b-[1px] text-blue-500"
              >
                Rs.{" "}
                {medDocLabChargesTotal?.overallDoctorVisitCharge?.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IpdPatientReciptChargesShowcase;
