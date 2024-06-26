import React, { useRef, useState } from "react";
import { CiSearch, CiViewList } from "react-icons/ci";
import PaginationComponent from "../../Pagination";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import defaultImage from "../../../assets/20180125_001_1_.jpg";
import { FaDownload } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import { useReactToPrint } from "react-to-print";

function BillingTable() {
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1100,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "transparent",
    borderRadius: "5px",
    overflowY: "scroll",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const billPrint = (
    <div className="print-hide">
      <div className="print-show w-full" ref={componentRef}>
        <div className="flex justify-between items-center pl-[15px] pr-[15px]">
          <span className="flex items-center gap-[18px]">
            <img
              src={logo}
              alt="logo"
              className="w-[150px] h-[120px] object-contain"
            />
            <span>
              <h4 className="text-start text-[18px] font-bold">
                City Hospital and Trauma Centre
              </h4>
              <p className="text-start text-[14px]">
                Contact No. 9119900861,9119900862
              </p>
            </span>
          </span>
          <p className="text-start w-[20rem] text-[14px]">
            C1-C2 cinder dump complex ,near Alambagh bus stand ,Kanpur road,
            Lucknow 226005{" "}
          </p>
        </div>
        <hr />
        <div className="flex items-center pt-[20px] pb-[20px] gap-[10%]">
          <div class="grid grid-cols-3 gap-4 w-full pl-[20px] pr-[20px]">
            <div className="flex gap-[10px]">
              <span>Patients Reg ID</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Admission Date / Time</span>:<p>19/02/24 10:30pm</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Name</span>:<p>Arman Ali</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Discharge Date / Time</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Gender</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Patient Categ</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Age</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Tarilt Catrg</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>IPD NO</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>MR and IP No</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Bill Bed Catrg</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Admitting Doctor</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>OCC bed categ</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Room and bed NO</span>:<p>19</p>
            </div>
            <div className="flex gap-[10px]">
              <span>Bill Date and Time</span>:<p>19</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">ITEM Charges</p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">
              Basic Hospital Charges
            </p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">BED Charges</p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">BED Charges</p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">
              BED SIDE procedures
            </p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">
              Doctor Visit Charges
            </p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">
              Laboratory investigations
            </p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">Medicines</p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">
              Other misc Charges
            </p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">Procedures</p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />
        <div className="w-full pl-[15px] pr-[15px]">
          <div className="flex justify-start pt-[10px] pb-[10px]">
            <p className="border-b-[2px] border-[#444444]">
              Other Service Charges
            </p>
          </div>
          <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300] overflow-x-scroll">
            <thead>
              <tr>
                <th className="border-b-[1px]">
                  <p>S N</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Date</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Item Name</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Qty</p>
                </th>
                <th className="border-b-[1px]">
                  <p>Rate</p>
                </th>

                <th className="border-b-[1px]">
                  <p>Amount</p>
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              <tr>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>1</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>12/02/2024</p>
                </td>
                <td className="flex align-center justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>Ghjj</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] outline-none">
                  <p>vgfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>grfg</p>
                </td>
                <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                  <p>fdgf</p>
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
        </div>
        <hr />

        <div className="flex flex-col justify-end w-full items-end mt-4 pr-[2rem]">
          <h6> Amount Summary</h6>
          <span className="w-[25rem] flex  items-center justify-between  border-b-[2px] pb-1 my-1">
            <p className="text-[16px] font-semibold">Grand Total </p>
            <strong>₹ 28.55</strong>
          </span>
          <span className="w-[25rem] flex items-center justify-between  border-b-[2px] pb-1 my-1">
            <p className="text-[16px] font-semibold">Amount Paid</p>
            <strong>₹ 28.55</strong>
          </span>
          <span className="w-[25rem] flex items-center justify-between  border-b-[2px] pb-1 my-1">
            <p className="text-[16px] font-semibold">Refund Amount</p>
            <strong>₹ 28.55</strong>
          </span>
          <span className="w-[25rem] flex items-center justify-between  border-b-[2px] pb-1 my-1">
            <p className="text-[16px] font-semibold">Balance Amount</p>
            <strong>₹ 28.55</strong>
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-start gap-3">
        <h2 className={"border-b-[4px] border-[#3497F9] "}>Billing</h2>
      </div>
      <div className="flex justify-between">
        <span className="w-[20rem] bg-[#F4F6F6] flex items-center p-2 gap-1 rounded-md h-[2.2rem]">
          <CiSearch />
          <input
            type="text"
            placeholder="Search By Patient Id."
            className="w-[90%] h-full bg-[transparent] outline-none border-none "
          />
        </span>
      </div>
      <div>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            <th className="border-b-[1px]">
              <p>S_N</p>
            </th>
            <th className="border-b-[1px]">
              <p>Patient Name</p>
            </th>
            <th className="border-b-[1px]">
              <p>Doctor</p>
            </th>
            <th className="border-b-[1px]">
              <p> Date</p>
            </th>
            <th className="border-b-[1px]">
              <p>Charges</p>
            </th>
            <th className="border-b-[1px]">
              <p>Tax</p>
            </th>
            <th className="border-b-[1px]">
              <p>Discount</p>
            </th>
            <th className="border-b-[1px]">
              <p>Total</p>
            </th>

            <th className="border-b-[1px]">
              <p>Action</p>
            </th>
          </thead>
          <tbody>
            <tr key={1}>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                1
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                Albuterol (salbutamol)
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                Inhaler
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                01 Jun 2024
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 28.55
              </td>{" "}
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                ₹ 28.55
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                50%
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                100 pcs
              </td>
              <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] flex-row">
                <div className="flex gap-[10px] justify-center">
                  <div
                    className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                    onClick={handleOpen}
                  >
                    <CiViewList className="text-[25px] text-[#96999C]" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationComponent
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          data={""}
        />
      </div>
      {billPrint}
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
          <Box sx={style1}>
            <div className="w-full flex items-center justify-between">
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                className="border-b-[3px] border-[#3497F9] w-fit"
              >
                Billing Details
              </Typography>
              <button
                className="flex items-center gap-1 bg-[#3497F9] text-white p-[5px] rounded-md "
                onClick={handlePrint}
              >
                <FaDownload /> Download
              </button>
            </div>

            <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="grid grid-cols-3 gap-2 ">
                <img
                  src={defaultImage}
                  alt="defaultImage"
                  className="w-[15rem] h-[15rem]"
                />
                <div className="col-span-2 grid grid-cols-2 gap-2">
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Patients Reg ID:</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Admission Date / Time:</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Name:</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Discharge Date / Time:</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Gender:</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Patient Gender:</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Age:</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Tarilt Catrg:</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">IPD NO:</h6>
                    <p>19</p>
                  </span>
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">MR and IP No:</h6>
                    <p>19</p>
                  </span>
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">OPD NO :</h6>
                    <p>19</p>
                  </span>{" "}
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Admitting Doctor:</h6>
                    <p>19</p>
                  </span>
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">OCC bed categ:</h6>
                    <p>19</p>
                  </span>
                  <span className="flex items-center gap-2 h-fit">
                    <h6 className="font-semibold">Bill Date and Time:</h6>
                    <p>19</p>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-start w-full mt-2">
                <h6 className="text-[1.2rem] font-medium">
                  Patients Bill Summary Information
                </h6>
                <span className="flex my-2 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">Item Charges</h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">
                  Basic Hospital Charges
                </h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">BED Charges</h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">
                  BED SIDE Procedures
                </h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">
                  Doctor Visit Charges{" "}
                </h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">
                  Laboratory investigations
                </h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">Medicines</h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">
                  Other misc Charges
                </h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">Procedures</h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <h6 className="text-[1rem] font-semibold">
                  Other Service Charges
                </h6>
                <div>
                  <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
                    <thead>
                      <th className="border-b-[1px]">
                        <p>S_N</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>Date</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>ITEM NAME</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>QTY</p>
                      </th>
                      <th className="border-b-[1px]">
                        <p>PRICE</p>
                      </th>

                      <th className="border-b-[1px]">
                        <p>AMOUNT</p>
                      </th>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          1
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          01/04/2024
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          dsf
                        </td>

                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          10
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 500.00
                        </td>
                        <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                          ₹ 5000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span className="w-full flex items-center justify-end gap-4 my-2 text-[#0495F5]">
                    <h6 className="text-[1.2rem] font-semibold">Sub Total</h6>
                    <strong className="text-[1.2rem]">₹ 4545.00</strong>
                  </span>
                </div>
                <span className="flex my-4 w-full h-[0.1px] border-b-[2px]"></span>
                <div className="flex flex-col justify-end w-full items-end">
                  <h6> Amount Summary</h6>
                  <span className="w-[25rem] flex  items-center justify-between  border-b-[2px] pb-1 my-1">
                    <p className="text-[16px] font-semibold">Grand Total </p>
                    <strong>₹ 28.55</strong>
                  </span>
                  <span className="w-[25rem] flex items-center justify-between  border-b-[2px] pb-1 my-1">
                    <p className="text-[16px] font-semibold">Amount Paid</p>
                    <strong>₹ 28.55</strong>
                  </span>
                  <span className="w-[25rem] flex items-center justify-between  border-b-[2px] pb-1 my-1">
                    <p className="text-[16px] font-semibold">Refund Amount</p>
                    <strong>₹ 28.55</strong>
                  </span>
                  <span className="w-[25rem] flex items-center justify-between  border-b-[2px] pb-1 my-1">
                    <p className="text-[16px] font-semibold">Balance Amount</p>
                    <strong>₹ 28.55</strong>
                  </span>
                </div>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default BillingTable;
