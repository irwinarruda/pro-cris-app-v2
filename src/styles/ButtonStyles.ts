import { ComponentTheme } from 'native-base';

const ButtonStyles = {
    baseStyle: {
        paddingBottom: 4,
        paddingTop: 4,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'body',
        fontStyle: 'normal',
        fontWeight: '600',
    },
    sizes: {
        sm: {
            fontSize: 'xs',
            height: 34,
        },
        md: {
            fontSize: 'sm',
            height: 40,
        },
        lg: {
            fontSize: 'md',
            height: 45,
        },
    },
} as ComponentTheme;

export { ButtonStyles };
