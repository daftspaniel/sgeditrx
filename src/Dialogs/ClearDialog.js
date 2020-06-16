import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"

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

const handleChange = () => {
  console.log("Popo")
}

export default function ClearDialog(props) {
  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={true}>
        <DialogTitle id="customized-dialog-title">Clear Screen</DialogTitle>
        <DialogContent dividers>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="method"
              name="clearMethod"
              value={2}
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label="CLS" />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Clear with Byte"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Test Card"
              />
            </RadioGroup>
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
          <Button autoFocus color="primary" onClick={()=>props.actionHandler()}>
            CLEAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
