import { useState } from "react";
import axios from "axios";

function AddOtherCharges({ handleAddMedicalCharges, mainId }) {
  const [items, setItems] = useState([
    { itemName: "", quantity: 0, price: 0, date: "" },
  ]);
  const [formError, setFormError] = useState("");

  const handleAddRow = () => {
    // Validate the last row before adding a new one
    const lastItem = items[items.length - 1];
    if (
      lastItem.itemName &&
      lastItem.quantity > 0 &&
      lastItem.price > 0 &&
      lastItem.date
    ) {
      setItems([...items, { itemName: "", quantity: 0, price: 0, date: "" }]);
      setFormError("");
    } else {
      setFormError("Please complete the current row before adding a new one.");
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = items.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]:
              field === "quantity" || field === "price" ? Number(value) : value,
          }
        : item
    );
    setItems(updatedItems);
  };

  const handleDeleteRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all rows before submitting
    for (const item of items) {
      if (
        !item.itemName ||
        item.quantity <= 0 ||
        item.price <= 0 ||
        !item.date
      ) {
        setFormError("Please complete all fields in all rows.");
        return;
      }
    }
    setFormError("");

    const updateData = {
      id: mainId,
      data: { items: items },
    };

    handleAddMedicalCharges(updateData);

    console.log("items:", items);
  };

  return (
    <div className="w-full">
      <h3>Items</h3>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col justify-start items-start gap-5"
      >
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <tr className="border-b-[1px]">
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
                Date
              </th>
              <th className="text-center px-[4px] border-b-[1px] p-[10px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500 font-semibold">
            {items.map((item, index) => (
              <tr key={index}>
                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                  <input
                    required
                    type="text"
                    className="text-center border py-1 rounded-md"
                    value={item.itemName}
                    onChange={(e) =>
                      handleInputChange(index, "itemName", e.target.value)
                    }
                  />
                </td>
                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                  <input
                    required
                    type="number"
                    min={1}
                    className="text-center border py-1 rounded-md"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                  <input
                    required
                    type="number"
                    min={0.01}
                    step={0.01}
                    className="text-center border py-1 rounded-md"
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                  />
                </td>
                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                  <input
                    required
                    type="date"
                    className="text-center"
                    value={item.date}
                    onChange={(e) =>
                      handleInputChange(index, "date", e.target.value)
                    }
                  />
                </td>
                <td className="text-center text-[12px] py-4 px-[4px] border-b-[1px]">
                  <button
                    type="button"
                    className="text-red-500 px-2 py-1 bg-red-100 rounded-md hover:bg-red-200"
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-between items-center">
          <button
            type="button"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddRow}
          >
            +
          </button>
          <div className="mt-4">
            <h3>
              Total Items Value:{" "}
              {items
                .reduce((sum, item) => sum + item.quantity * item.price, 0)
                .toFixed(2)}
            </h3>
          </div>
        </div>
        {formError && <p className="text-red-500 mt-2">{formError}</p>}
        <button type="submit" className=" buttonFilled hover:bg-blue-600">
          Save Charges
        </button>
      </form>
    </div>
  );
}

export default AddOtherCharges;
