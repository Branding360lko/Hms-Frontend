import { Box, Modal, Typography } from "@mui/material";
import BedSelector from "../AddBedSelector/AddBedSelector";
import { useState } from "react";

export default function ChangPatientBedModal({
  beds,
  ipdPtientEdit,
  bedModalOpen,
  handleModalClose,
  ipdPatientId,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    bgcolor: "background.paper",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

  const [updatedBed, setUpdatedBed] = useState(null);
  const handleUpdatedBedSelect = (bed) => {
    setUpdatedBed(bed);
  };

  const handleBedChange = (e) => {
    e.preventDefault();
    console.log("Handle Bed Change Called with patient id:", ipdPatientId);
  };

  return (
    <Modal
      open={bedModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <h1 className="headingBottomUnderline w-fit pb-[10px]">
            Update IPD Patient
          </h1>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <BedSelector
            beds={beds}
            handleBedSelect={handleUpdatedBedSelect}
            ipdPtientEdit={true}
          />
          <button
            type="submit"
            className="buttonFilled"
            onClick={handleBedChange}
          >{`Save >`}</button>
        </Typography>
      </Box>
    </Modal>
  );
}
