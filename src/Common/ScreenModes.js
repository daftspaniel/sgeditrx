export const SG4 = {
  id: 0,
  pixelWidth: 16,
  pixelHeight: 24,
  columns: 32,
  rows: 16,
  modeName: "sg4",
  modeDescription: "SG4 - 32 by 16",
  defaultCharacter: 143,
}

export const COCOVGA = {
  id: 1,
  pixelWidth: 16,
  pixelHeight: 24,
  columns: 64,
  rows: 32,
  modeName: "CocoVGA",
  modeDescription: "CocoVGA - 64 by 32",
  defaultCharacter: 143,
}

export const getScreenModeById = (modeId) => {
  switch (modeId) {
    case 0:
      return Object.assign({}, SG4)
    case 1:
      return Object.assign({}, COCOVGA)
  }
}
