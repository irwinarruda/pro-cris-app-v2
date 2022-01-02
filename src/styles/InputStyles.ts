import { ComponentTheme } from 'native-base';

const InputStyles = {
    baseStyle: {
        paddingBottom: '4px',
        paddingTop: '4px',
        paddingLeft: '18px',
        paddingRight: '18px',
        bgColor: '#FDFCFF',
    },
    sizes: {
        sm: {
            fontSize: 'sm',
            height: '36px',
            paddingLeft: '14px',
            paddingRight: '14px',
        },
        md: {
            fontSize: 'md',
            height: '40px',
        },
        lg: {
            fontSize: 'md',
            height: '45px',
        },
    },
    defaultProps: {
        sizes: 'md',
    },
    variants: {
        outline: {
            borderColor: 'gray.400',
            _focus: {
                borderColor: 'gold.500',
                borderWidth: 2,
            },
        },
    },
} as ComponentTheme;

export { InputStyles };
