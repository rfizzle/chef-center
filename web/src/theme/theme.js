import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  typography: {},
});

export const theme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
      background: '#f2f3f8',
    },
    background: {
      light: '#f2f3f8',
      dark: '#d6d5d5',
      primary: '#2d3446',
    },
    common: {
      black: '#000000',
      white: '#ffffff',
      normal: {
        red: '#f44336',
        pink: '#e91e63',
        purple: '#9c27b0',
        deepPurple: '#673ab7',
        indigo: '#3f51b5',
        blue: '#2196f3',
        lightBlue: '#03a9f4',
        cyan: '#00bcd4',
        teal: '#009688',
        green: '#4caf50',
        lightGreen: '#8bc34a',
        lime: '#cddc39',
        yellow: '#ffeb3b',
        amber: '#ffc107',
        orange: '#ff9800',
        deepOrange: '#ff5722',
        brown: '#795548',
        grey: '#9e9e9e',
        blueGray: '#607d8b',
      },
      light: {
        red: '#ffcdd2',
        pink: '#f8bbd0',
        purple: '#e1bee7',
        deepPurple: '#d1c4e9',
        indigo: '#c5cae9',
        blue: '#bbdefb',
        lightBlue: '#b3e5fc',
        cyan: '#b2ebf2',
        teal: '#b2dfdb',
        green: '#c8e6c9',
        lightGreen: '#dcedc8',
        lime: '#f0f4c3',
        yellow: '#fff9c4',
        amber: '#ffecb3',
        orange: '#ffe0b2',
        deepOrange: '#ffccbc',
        brown: '#d7ccc8',
        grey: '#f5f5f5',
        blueGray: '#cfd8dc',
      },

    }
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiTableRow: {
      root: {
        '&$selected': {
          backgroundColor: 'rgba(3, 155, 229, 0.25)',
        }
      },
    },
    MuiTableCell: {
      root: {
        padding: '7px 20px 7px 8px'
      }
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'initial',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: defaultTheme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: defaultTheme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'initial',
        margin: '0 16px',
        minWidth: 0,
        [defaultTheme.breakpoints.up('md')]: {
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: defaultTheme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: defaultTheme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    ...defaultTheme.mixins,
    toolbar: {
      minHeight: 48,
    },
  },
});