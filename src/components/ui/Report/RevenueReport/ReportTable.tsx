import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import { TotalTip } from "@/utils/functions";
import LongMenu from "../../LongMenu/LongMenu";

function Row(props: {
  row: any;
  handleOptions: any;
  options: any;
  isAction: boolean;
}) {
  const { row, options, handleOptions, isAction } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell size="small" component="th" scope="row">
          {moment(row.date).format("DD MMM YYYY ")} 
        </TableCell>
        <TableCell size="small">${TotalTip(row.entries)}</TableCell>
        <TableCell size="small"></TableCell>
        <TableCell size="small">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>DATE</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>AMOUNT</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>DESCRIPTION</TableCell>
                    {isAction && (
                      <TableCell style={{ fontWeight: "bold" }}>ACTION</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.entries.map((entry: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "gray" }} component="th" scope="row">
                          {moment(row.date).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell sx={{ color: "gray" }}>{`${entry.amount.toString()}$`}</TableCell>
                        <TableCell sx={{ color: "gray" }}>{entry.description}</TableCell>
                        {isAction && (
                          <TableCell sx={{ color: "gray" }}>
                            <LongMenu
                              options={options}
                              handleOptions={(prev: any) => handleOptions(prev, row, entry)}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ReportTable = ({ rows, handleOptions, options, isAction }: any) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className="bg-[--brand-pastel-color] uppercase text-[13px]">
          <TableRow>
          <TableCell size="small" sx={{ color: 'var(--brand-color)' }}>DATE</TableCell>
            <TableCell size="small" sx={{ color: 'var(--brand-color)' }} >AMOUNT</TableCell>
            <TableCell size="small" sx={{ color: 'var(--brand-color)' }}>DESCRIPTION</TableCell>
            <TableCell size="small" sx={{ color: 'var(--brand-color)' }} >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.flatMap((item: any, index: number) => {
            return (
              <Row
                key={index}
                row={item}
                handleOptions={handleOptions}
                options={options}
                isAction={isAction}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
