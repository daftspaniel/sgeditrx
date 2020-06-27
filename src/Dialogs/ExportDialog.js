import React from "react"
import { useSelector } from "react-redux"

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
import { generateCSV } from "../Lib/generateCSV"

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

export default function ExportDialog(props) {
  const screenData = useSelector((state) => state.screenData)

  const sourceCode = generateCSV(screenData, 32, 16)

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
            <textarea cols="150" rows="40" style={{ fontSize: 11 }}>
              {sourceCode}
            </textarea>
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
                filename: "screen.csv",
                content: sourceCode,
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
