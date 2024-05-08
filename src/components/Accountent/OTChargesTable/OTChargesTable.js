import { Backdrop, Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { CiViewList } from "react-icons/ci";

function OTChargesTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 600,
    bgcolor: "#fff",
    border: "2px solid transaparent",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
    outline: "transaparent",
    overflowY: "scroll",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">OT Charges</h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Update Charges
        </button>
      </div>
      <div className="w-full">
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px]">
              <p></p>
            </th>
            <th className="border-b-[1px]">
              <p>Super Speciality Sugars</p>
            </th>
            <th className="border-b-[1px]">
              <p>Speciality Major Surgery</p>
            </th>
            <th className="border-b-[1px]">
              <p> Major Surgery</p>
            </th>
            <th className="border-b-[1px]">
              <p> Less Major</p>
            </th>
            <th className="border-b-[1px]">
              <p> Minor</p>
            </th>
          </thead>
          <tbody>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                Surgeon charges
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                20.000 - 25.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                15.000 - 20.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                12.000 - 15.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                6000 - 10.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                4000- 6000
              </td>
            </tr>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                Assistant surgeon
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                20.000 - 25.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                15.000 - 20.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                12.000 - 15.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                6000 - 10.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                4000- 6000
              </td>
            </tr>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                Anaesthetist
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                20.000 - 25.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                15.000 - 20.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                12.000 - 15.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                6000 - 10.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                4000- 6000
              </td>
            </tr>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                First Assistant
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                20.000 - 25.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                15.000 - 20.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                12.000 - 15.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                6000 - 10.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                4000- 6000
              </td>
            </tr>
            <tr>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                2nd Assistant
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                20.000 - 25.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                15.000 - 20.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                12.000 - 15.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                6000 - 10.000
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                4000- 6000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form>
                <div className="w-full">
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p></p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Super Speciality Sugars</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Speciality Major Surgery</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p> Major Surgery</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p> Less Major</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p> Minor</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          Surgeon charges
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          20.000 - 25.000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          15.000 - 20.000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          12.000 - 15.000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          6000 - 10.000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          4000- 6000
                        </td>
                      </tr>
                      <tr>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          Assistant surgeon
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          20000 - 25000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          15000 - 20000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          12000 - 15000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          6000 - 10000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          4000- 6000
                        </td>
                      </tr>
                      <tr>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          Anaesthetist
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          20000 - 25000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          15000 - 20000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          12000 - 15000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          6000 - 10000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          4000- 6000
                        </td>
                      </tr>
                      <tr>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          First Assistant
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          20000 - 25000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          15000 - 20000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          12000 - 15000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          6000 - 10000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          4000- 6000
                        </td>
                      </tr>
                      <tr>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          2nd Assistant
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          20000 - 25000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          15000 - 20000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          12000 - 15000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          6000 - 10000
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          4000- 6000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default OTChargesTable;
