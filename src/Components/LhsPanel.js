import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../App.css'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import { CardHeader } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack'
import FlipIcon from '@material-ui/icons/Flip'
import Switch from '@material-ui/core/Switch'

import FormControlLabel from '@material-ui/core/FormControlLabel'

import ClearDialogContainer from '../Dialogs/ClearDialogContainer'
import ExportDialogContainer from '../Dialogs/ExportDialogContainer'
import {
  mirrorScreen,
  showClearDialog,
  showExportDialog,
  scrollScreen,
  showGrid,
} from '../State/ScreenActions'

const LhsPanel = () => {
  const dispatch = useDispatch()

  const displayClearDialog = useSelector(
    (state) => state.transient.showingClearDialog
  )
  const displayExportDialog = useSelector(
    (state) => state.transient.showingExportDialog
  )
  const showingGrid = useSelector((state) => state.showingGrid)

  const handleGridChange = (event, value) => {
    dispatch(showGrid(value))
  }

  return (
    <Card className="LHSPanelContainer" elevation={12}>
      <CardHeader title="SGEDIT v4" subheader="Retro Screen Designer" />
      <div className="LHSPanel">
        <div className="ButtonColumn">
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(showClearDialog())}
          >
            Clear...
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(showExportDialog())}
          >
            Export...
          </Button>
          <br />
          <FormControlLabel
            control={
              <Switch
                checked={showingGrid}
                onChange={handleGridChange}
              />
            }
            label={'Grid'}
          />
          <br />
          <div className="ScrollPanel">
            <div style={{ width: 65 }}>Scroll</div>
            <ArrowUpwardIcon
              className="Clickable"
              onClick={() => dispatch(scrollScreen('u'))}
            />
            <ArrowDownwardIcon
              className="Clickable"
              onClick={() => dispatch(scrollScreen('d'))}
            />
            <ArrowBackwardIcon
              className="Clickable"
              onClick={() => dispatch(scrollScreen('l'))}
            />
            <ArrowForwardIcon
              className="Clickable"
              onClick={() => dispatch(scrollScreen('r'))}
            />
          </div>
          <div className="MirrorPanel">
            <div style={{ width: 65 }}>Mirror</div>
            <FlipIcon
              style={{ transform: 'rotate(90deg)' }}
              onClick={() => dispatch(mirrorScreen('TtoB'))}
            />
            <FlipIcon
              style={{ transform: 'rotate(180deg)' }}
              onClick={() => dispatch(mirrorScreen('RtoL'))}
            />
            <FlipIcon
              style={{ transform: 'rotate(270deg)' }}
              onClick={() => dispatch(mirrorScreen('BtoT'))}
            />
            <FlipIcon onClick={() => dispatch(mirrorScreen('LtoR'))} />
          </div>
        </div>
        {displayClearDialog && <ClearDialogContainer />}
        {displayExportDialog && <ExportDialogContainer />}
      </div>
    </Card>
  )
}

export default LhsPanel
