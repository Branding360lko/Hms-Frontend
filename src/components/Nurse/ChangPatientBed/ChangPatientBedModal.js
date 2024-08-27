import { Box, Modal, Typography } from "@mui/material";
import BedSelector from "../AddBedSelector/AddBedSelector";
import { useEffect, useState } from "react";
import { useIpdPatientChangeBedByIdMutation } from "../../../Store/Services/IPDPatientService";
import { changeIpdBed } from "../../../Store/Services/AxiosServices/IpdPatientServices";

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
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    overflowY: "scroll",
    boxShadow: 24,
    p: 4,
  };

  console.log("logs from change bed modal:", bedModalOpen);

  const [responseBedChangeApi, setResponseBedChangeApi] = useState({
    success: null,
    message: null,
  });
  const [updatedBed, setUpdatedBed] = useState(null);
  const handleUpdatedBedSelect = (bed) => {
    setUpdatedBed(bed);
  };

  const [updateFeedback, setUpdateFeedback] = useState(null);

  const handleBedChange = async (e) => {
    e.preventDefault();
    // console.log("Handle Bed Change Called with patient id:", ipdPatientId);
    // console.log("updatedBed:", updatedBed);

    const data = {
      id: ipdPatientId,
      newBedId: updatedBed?.bedId,
    };
    // console.log("data for bed change:", data);
    try {
      const responseApiCall = await changeIpdBed(data);
      if (responseApiCall) {
        // console.log("responseApiCall:", responseApiCall);

        setResponseBedChangeApi({
          success: true,
          message: responseApiCall.message,
        });
      }
    } catch (error) {
      setResponseBedChangeApi({
        success: false,
        message: error.message,
      });
      console.log("error in bed change Api call:", error);
    } finally {
      setTimeout(() => {
        handleModalClose();
        setResponseBedChangeApi({
          success: null,
          message: null,
        });
        setUpdateFeedback(null);
        setUpdatedBed(null);
      }, 5000);
    }
  };

  useEffect(() => {
    // console.log("responseBedChangeApi:", responseBedChangeApi);
    if (responseBedChangeApi?.success) {
      setUpdateFeedback(responseBedChangeApi?.message);
    } else if (!responseBedChangeApi?.success) {
      setUpdateFeedback(responseBedChangeApi.message);
    }
  }, [responseBedChangeApi]);

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
            Update IPD Patient Bed
          </h1>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {!updateFeedback && (
            <>
              {" "}
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
            </>
          )}
          {updateFeedback && (
            <h2
              className={` text-3xl ${
                !responseBedChangeApi.success
                  ? " text-red-600"
                  : "text-green-600"
              }`}
            >
              {updateFeedback}
            </h2>
          )}
        </Typography>
      </Box>
    </Modal>
  );
}
