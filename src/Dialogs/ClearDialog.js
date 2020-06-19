import React, { useState } from "react"

import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import Radio from "@material-ui/core/Radio"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"

const colours = [
  { value: 0, colour: "#111111", chr: 128 },
  { value: 1, colour: "#09ff08", chr: 143 },
  { value: 2, colour: "#fdff41", chr: 159 },
  { value: 3, colour: "#2110b6", chr: 175 },
  { value: 4, colour: "#b50421", chr: 191 },
  { value: 5, colour: "#ffffff", chr: 207 },
  { value: 6, colour: "#09d773", chr: 223 },
  { value: 7, colour: "#ff1cff", chr: 239 },
  { value: 8, colour: "#ff4107", chr: 255 },
]

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
  option: {
    display: "flex",
    flexDirection: "row",
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

export default function ClearDialog(props) {
  let [character, setCharacter] = useState(128)
  let [selection, setSelection] = useState("0")
  let [cls, setCls] = useState(0)
  const handleChange = (e) => setSelection(e.target.value)
  const handleClsChange = (e) => {
    setCls(e.target.value)
  }
  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={true}>
        <DialogTitle id="customized-dialog-title">Clear Screen</DialogTitle>
        <DialogContent dividers>
          <FormControl component="fieldset">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Radio
                checked={selection === "0"}
                onChange={handleChange}
                value="0"
                name="cwb-test-card"
              />
              CLS
              <div className={""}>
                <Select
                  value={cls}
                  onChange={handleClsChange}
                  style={{ width: 100, backgroundColor: colours[cls].colour }}
                >
                  {colours.map((colour) => {
                    return (
                      <MenuItem
                        key={colour.value}
                        value={colour.value}
                        style={{ width: 100, backgroundColor: colour.colour }}
                      >
                        &nbsp;{"CLS"}
                      </MenuItem>
                    )
                  })}
                </Select>
              </div>
            </div>
            <div>
              <Radio
                checked={selection === "1"}
                onChange={handleChange}
                value="1"
                name="cwb-test-card"
              />
              Clear with Byte
              <TextField
                id="standard-basic"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
              />
            </div>
            <div>
              <Radio
                checked={selection === "2"}
                onChange={handleChange}
                value="2"
                name="rb-test-card"
              />
              Test Card
            </div>
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
              const options = { method: selection, character }
              if (selection === "0") options.character = colours[cls].chr
              props.actionHandler(options)
            }}
          >
            CLEAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
