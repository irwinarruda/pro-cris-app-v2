import { extendTheme, Theme } from 'native-base';
import { InputStyles } from './InputStyles';
import { ButtonStyles } from './ButtonStyles';

const proCrisTheme = {
    colors: {
        white: '#FDFCFF',
        black: '#46454D',
        purple: {
            '100': '#D6CEFE',
            '200': '#C2B7F8',
            '300': '#B0A4ED',
            '400': '#9D90E0',
            '500': '#8C7ECF',
            '600': '#8175BD',
        },
        gold: {
            '100': '#F2E9A2',
            '200': '#E5DC95',
            '300': '#DBD28A',
            '400': '#CFC57F',
            '500': '#BFB673',
            '600': '#B0A766',
        },
        gray: {
            '50': '#EBEBF0',
            '100': '#DCDCE0',
            '200': '#D0CFD4',
            '300': '#C3C3C7',
            '400': '#B4B4B8',
            '500': '#9999A1',
        },
        red: {
            '400': '#FD7067',
            '500': '#EE584F',
        },
        green: {
            '400': '#61F599',
            '500': '#52EA8B',
        },
    },
    fontConfig: {
        Quicksand: {
            300: {
                normal: 'Quicksand_300Light',
            },
            400: {
                normal: 'Quicksand_400Regular',
            },
            500: {
                normal: 'Quicksand_500Medium',
            },
            600: {
                normal: 'Quicksand_600SemiBold',
            },
            700: {
                normal: 'Quicksand_700Bold',
            },
        },
    },
    fonts: {
        heading: 'Quicksand',
        body: 'Quicksand',
        mono: 'Quicksand',
    },
    components: {
        Input: InputStyles,
        Button: ButtonStyles,
    },
    config: {
        useSystemColorMode: false,
        accessibleColors: false,
        initialColorMode: 'light',
    },
} as Theme | (Record<string, any> & {});

const theme = extendTheme(proCrisTheme);

export { theme };
