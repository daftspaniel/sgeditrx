import React, { useState } from "react"
import { useSelector } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

import { generateCSV } from "../Lib/generateCSV"
import { generateBASIC } from "../Lib/GenerateBasic"
import { generateASM } from "../Lib/GenerateASM"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

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
  const classes = useStyles()

  let [exportType, setExportType] = useState(1)
  let [exportFilename, setExportFilename] = useState("screendata.txt")

  const sourceCode = generateCSV(screenData, 32, 16)
  const sourceBASIC = generateBASIC(screenData, 32, 16)
  const sourceASM = generateASM(screenData, 32, 16)

  const changeExportType = (event) => {
    setExportType(event.target.value)
  }

  const getExportCode = () => {
    if (exportType === 1) return sourceBASIC
    if (exportType === 2) return sourceCode
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
                <Button className={classes.importButton}>Import</Button>
              )}
            </div>
            <textarea
              cols="150"
              rows="40"
              style={{ fontSize: 11, marginTop: 8 }}
              value={getExportCode()}
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
