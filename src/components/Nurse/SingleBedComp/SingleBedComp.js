import { FaBed } from "react-icons/fa";

const BedComponent = ({ bed, onSelectBed, isSelected }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (bed.bedAvailableOrNot) {
      onSelectBed(bed);
    }
  };

  // console.log("bed in bed Comp:", bed);

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`text-3xl justify-center items-center p-2 rounded-md ${
        bed.bedAvailableOrNot ? "text-green-500" : "text-red-500"
      } ${isSelected ? " bg-blue-950" : ""}`}
      disabled={!bed.bedAvailableOrNot}
    >
      <FaBed />
      <span className="text-xl">{bed.bedNumber}</span>
    </button>
  );
};

export default BedComponent;
