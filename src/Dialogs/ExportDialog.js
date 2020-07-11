import React, { useState } from "react"
import { useSelector } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

import { generateCSV } from "../Lib/generateCSV"
import { generateBASIC } from "../Lib/GenerateBasic"
import { generateASM } from "../Lib/GenerateASM"
import { DialogTitle, DialogContent, DialogActions } from "./DialogCommon"

const useStyles = makeStyles((theme) => ({
  exportType: {
    width: "30%",
  },
  downloadName: {
    width: "30%",
  },
  importButton: {
    width: "30%",
  },
  controlRow: { display: "flex", justifyContent: "space-between" },
}))

export default function ExportDialog(props) {
  const screenData = useSelector((state) => state.screenData)
  const screenMode = useSelector((state) => state.activeMode)
  const classes = useStyles()

  let [exportType, setExportType] = useState(1)
  let [exportFilename, setExportFilename] = useState("screendata.txt")
  let [csvData, setCsvData] = useState(generateCSV(screenData, screenMode.columns, screenMode.rows))

  const sourceCSV = csvData
  const sourceBASIC = generateBASIC(screenData, screenMode.columns, screenMode.rows)
  const sourceASM = generateASM(screenData, screenMode.columns, screenMode.rows)

  const changeExportType = (event) => 
    setExportType(event.target.value)

  const getExportCode = () => {
    if (exportType === 1) return sourceBASIC
    if (exportType === 2) return sourceCSV
    if (exportType === 3) return sourceASM
  }

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={true}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="customized-dialog-title">Export Screen</DialogTitle>
        <DialogContent dividers>
          <FormControl component="fieldset">
            <div className={classes.controlRow}>
              <Select
                onChange={changeExportType}
                value={exportType}
                className={classes.exportType}
              >
                <MenuItem value={1}>BASIC</MenuItem>
                <MenuItem value={2}>CSV</MenuItem>
                <MenuItem value={3}>ASM</MenuItem>
              </Select>
              <TextField
                className={classes.downloadName}
                value={exportFilename}
                onChange={(e) => setExportFilename(e.target.value)}
              ></TextField>
              {exportType === 2 && (
                <Button
                  className={classes.importButton}
                  onClick={() => props.importHandler(csvData)}
                >
                  Import
                </Button>
              )}
            </div>
            <textarea
              cols="150"
              rows="40"
              style={{ fontSize: 11, marginTop: 8 }}
              value={getExportCode()}
              onChange={(e) => setCsvData(e.target.value)}
            ></textarea>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            onClick={() => props.closeHandler()}
          >
            CANCEL
          </Button>
          <Button
            autoFocus
            color="primary"
            onClick={() => {
              props.actionHandler({
                filename: exportFilename,
                content: getExportCode(),
              })
            }}
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
