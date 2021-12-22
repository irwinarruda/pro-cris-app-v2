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
            fontSize: 'xs',
            height: '34px',
        },
        md: {
            fontSize: 'sm',
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
            borderColor: 'gray.100',
            _focus: {
                borderColor: 'purple.300',
                borderWidth: 2,
            },
        },
    },
} as ComponentTheme;

export { InputStyles };
