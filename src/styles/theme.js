// src/styles/theme.js
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Colors
export const red            = '#D32F2F'
export const darkBlue       = '#1F243D'
export const greyBlue       = '#9AACB6'
export const lightGrey      = '#EFEFEF'
export const white          = '#ffffff'
export const black          = '#000000'

// Palette
export const palette = {
 primary1Color: greyBlue,
 primary2Color: greyBlue,
 primary3Color: greyBlue,
 accent1Color: greyBlue,
 textColor: white,
 alternateTextColor: red,
 canvasColor: darkBlue,
 borderColor: lightGrey,
}

export default getMuiTheme({ palette })
