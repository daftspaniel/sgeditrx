import React, { useState } from "react"
import { useSelector } from "react-redux"

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

const optionStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
const modeStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 50,
}

const labelStyle = { maxWidth: 100, minWidth: 100 }

export default function ClearDialog(props) {
  let [character, setCharacter] = useState(128)
  let [selection, setSelection] = useState("0")
  const screenMode = useSelector((state) => state.activeMode)
  let [mode, setMode] = useState(screenMode.id)
  let [cls, setCls] = useState(1)
  const handleChange = (e) => setSelection(e.target.value)
  const handleClsChange = (e) => setCls(e.target.value)
  const handleModeChange = (e) => setMode(e.target.value)
  
  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={true}>
        <DialogTitle id="customized-dialog-title">Clear Screen</DialogTitle>
        <DialogContent dividers>
          <div style={modeStyle}>
            <div style={labelStyle}>MODE</div>
            <div>
              <Select
                style={{ width: 180 }}
                value={mode}
                onChange={handleModeChange}
              >
                <MenuItem value={0}>SG4 32 by 16</MenuItem>
                <MenuItem value={1}>Coco VGA 64 by 32</MenuItem>
              </Select>
            </div>
          </div>
          <div style={optionStyle}>
            <Radio
              checked={selection === "0"}
              onChange={handleChange}
              value="0"
              name="cwb-test-card"
            />
            <div style={labelStyle}>CLS</div>
            <div>
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
                      &nbsp;
                    </MenuItem>
                  )
                })}
              </Select>
            </div>
          </div>
          <div style={optionStyle}>
            <Radio
              checked={selection === "1"}
              onChange={handleChange}
              value="1"
              name="cwb-test-card"
            />
            <div style={labelStyle}>Fill</div>
            <TextField
              id="standard-basic"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              style={{ maxWidth: 100 }}
            />
          </div>
          <div style={optionStyle}>
            <Radio
              checked={selection === "2"}
              onChange={handleChange}
              value="2"
              name="rb-test-card"
            />
            <div style={{ minWidth: 100 }}>Test Card</div>
            <div style={{ minWidth: 100 }}>&nbsp;</div>
          </div>
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
              const options = {
                method: selection,
                character,
                modeId: mode,
              }
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
