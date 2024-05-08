import { useState } from "react";
import BedComponent from "../SingleBedComp/SingleBedComp";

const BedSelector = ({ beds, handleBedSelect }) => {
  const [selectedBed, setSelectedBed] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(1);

  const handleSelectBed = (bed) => {
    setSelectedBed(bed);
    handleBedSelect(bed);
  };

  const bedTypes = [...new Set(beds.map((bed) => bed.bedType))];
  const floors = [...new Set(beds.map((bed) => bed.floorNo))];

  const filteredBeds = selectedFloor
    ? beds.filter((bed) => bed.floorNo === selectedFloor)
    : beds;

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {floors.map((floor) => (
          <button
            key={floor}
            type="button"
            className={`${
              selectedFloor === floor
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } rounded-full px-4 py-2`}
            onClick={() => setSelectedFloor(floor)}
          >
            Floor {floor}
          </button>
        ))}
      </div>
      {bedTypes.map((type) => (
        <div
          key={type}
          className="flex flex-col justify-center items-start px-5 py-2 mb-5 mt-2 rounded-md border border-b-gray-700"
        >
          <h2>
            {type === "pvt"
              ? "Private"
              : type === "sem"
              ? "Semi Private"
              : type === "gen"
              ? "General"
              : type === "dlx"
              ? "Deluxe"
              : ""}
          </h2>
          <div className="flex justify-start items-start gap-5">
            {filteredBeds
              .filter((bed) => bed.bedType === type)
              .map((bed) => (
                <BedComponent
                  key={bed.bdId}
                  bed={bed}
                  onSelectBed={handleSelectBed}
                  isSelected={selectedBed && selectedBed.bdId === bed.bdId}
                />
              ))}
          </div>
        </div>
      ))}
      {selectedBed && (
        <div className="selected-bed-details">
          <h3>You have selected the bed:</h3>
          <p>Bed Id: {selectedBed.bdId}</p>
          <p>Floor No: {selectedBed.floorNo}</p>
          <p>Bed Type: {selectedBed.bedType}</p>
        </div>
      )}
    </div>
  );
};

export default BedSelector;
