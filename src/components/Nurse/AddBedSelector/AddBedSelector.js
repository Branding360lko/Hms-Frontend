import { useEffect, useState } from "react";
import BedComponent from "../SingleBedComp/SingleBedComp";

const BedSelector = ({ beds, handleBedSelect }) => {
  const [selectedBed, setSelectedBed] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(1);

  const handleSelectBed = (bed) => {
    setSelectedBed(bed);
    handleBedSelect(bed);
  };

  // console.log("beds in bed selector", beds);

  const bedTypes = [...new Set(beds.map((bed) => bed.bedType))];
  const bedSubTypes = [...new Set(beds.map((bed) => bed.bedSubType))];
  const floors = [...new Set(beds.map((bed) => bed.bedFloor))];

  const bedTypeGroups = bedTypes.map((type) => ({
    type,
    subTypes: bedSubTypes.filter((subType) =>
      beds.some((bed) => bed.bedType === type && bed.bedSubType === subType)
    ),
  }));

  const filteredBeds = selectedFloor
    ? beds.filter((bed) => bed.bedFloor === selectedFloor)
    : beds;
  // console.log("bedTypes:", bedTypes);
  // console.log("filteredBeds:", filteredBeds);
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
      {bedTypeGroups.map((group) => (
        <div
          key={group.type}
          className="flex flex-col justify-center items-start gap-3 px-5 py-2 mb-5 mt-2 rounded-md border border-b-gray-700"
        >
          <h2 className=" px-2 py-[1px] border border-gray-400 rounded-md">
            {group.type}
          </h2>
          {group.subTypes.map((subType) => (
            <div key={subType}>
              <h3 className="border-b-2 border-gray-400 ">{subType}</h3>
              <div className="flex justify-start items-start gap-5">
                {filteredBeds
                  .filter(
                    (bed) =>
                      bed.bedType === group.type && bed.bedSubType === subType
                  )
                  .map((bed) => (
                    <BedComponent
                      key={bed.bedId}
                      bed={bed}
                      onSelectBed={handleSelectBed}
                      isSelected={
                        selectedBed && selectedBed.bedId === bed.bedId
                      }
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* {bedSubTypes.map((subType) => (
        <div>
          <h2>{}</h2>
          <h3>{subType}</h3>
          <div className="flex justify-start items-start gap-5">
            {filteredBeds
              .filter((bed) => bed.bedSubType === subType)
              .map((bed) => (
                <BedComponent
                  key={bed.bedId}
                  bed={bed}
                  onSelectBed={handleSelectBed}
                  isSelected={selectedBed && selectedBed.bedId === bed.bedId}
                />
              ))}
          </div>
        </div>
      ))} */}
      {/* {bedTypes.map((type) => (
        <div
          key={type}
          className="flex flex-col justify-center items-start px-5 py-2 mb-5 mt-2 rounded-md border border-b-gray-700"
        >
          <h2>{type}</h2>
        </div>
      ))} */}
      {selectedBed && (
        <div className="selected-bed-details">
          <h3>You have selected the bed:</h3>
          <p>Bed Id: {selectedBed.bedNumber}</p>
          <p>Floor No: {selectedBed.bedFloor}</p>
          <p>Bed Type: {selectedBed.bedType}</p>
        </div>
      )}
    </div>
  );
};

export default BedSelector;
