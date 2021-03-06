import { PixelRatio } from 'react-native';
import { extendTheme, Theme } from 'native-base';
import { InputStyles } from './InputStyles';
import { ButtonStyles } from './ButtonStyles';

const phoneFontScale = PixelRatio.getFontScale();

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
    fontSizes: {
        '3xs': 9 / phoneFontScale,
        '2xs': 10 / phoneFontScale,
        xs: 12 / phoneFontScale,
        sm: 14 / phoneFontScale,
        md: 16 / phoneFontScale,
        lg: 18 / phoneFontScale,
        xl: 20 / phoneFontScale,
        '2xl': 24 / phoneFontScale,
        '3xl': 30 / phoneFontScale,
        '4xl': 36 / phoneFontScale,
        '5xl': 48 / phoneFontScale,
        '6xl': 60 / phoneFontScale,
        '7xl': 72 / phoneFontScale,
        '8xl': 96 / phoneFontScale,
        '9xl': 128 / phoneFontScale,
    },
    shadows: {
        fab: {
            shadowColor: '#000',

            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.01,
            shadowRadius: 0,
            elevation: 3,
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
