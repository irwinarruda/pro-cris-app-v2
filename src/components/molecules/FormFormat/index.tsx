import React from 'react';
import {
    Flex,
    Text,
    IFlexProps,
    ITextProps,
    IInputProps,
    FormControl,
    IFormControlProps,
    IFormControlErrorMessageProps,
} from 'native-base';

import {
    NumberFormat,
    NumberFormatProps,
} from 'app/components/atoms/NumberFormat';

const labelSizeStyles = {
    sm: {
        label: {
            fontSize: 'sm',
        },
        error: {
            fontSize: '2xs',
            height: '12px',
        },
    },
    md: {
        label: {
            fontSize: 'md',
        },
        error: {
            fontSize: 'xs',
            height: '20px',
        },
    },
    lg: {
        label: {
            fontSize: 'lg',
        },
        error: {
            fontSize: 'xs',
            height: '20px',
        },
    },
};

type FormFormatProps = NumberFormatProps & {
    label?: string;
    error?: string;
    nativeID?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    formLabelProps?: ITextProps;
    formControlProps?: IFormControlProps;
    formErrorMessageProps?: IFormControlErrorMessageProps;
    formFieldProps?: IFlexProps;
};

const FormFormat = ({
    autoCapitalize = 'none',
    label,
    size = 'md',
    nativeID,
    isRequired,
    isDisabled,
    isReadOnly,
    error,
    formControlProps,
    formLabelProps,
    formErrorMessageProps,
    formFieldProps,
    ...props
}: FormFormatProps) => {
    return (
        <FormControl
            isInvalid={!!error}
            nativeID={nativeID}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            {...formControlProps}
        >
            {label && (
                <Text
                    fontFamily="heading"
                    fontWeight="600"
                    fontStyle="normal"
                    marginBottom="2px"
                    {...labelSizeStyles[size as keyof typeof labelSizeStyles]
                        .label}
                    {...formLabelProps}
                >
                    {label}
                </Text>
            )}
            <Flex {...formFieldProps}>
                <NumberFormat
                    size={size}
                    borderWidth={!!error ? '2px' : '1px'}
                    autoCapitalize={autoCapitalize}
                    {...props}
                />
                <Text
                    marginTop="0px"
                    color="red.500"
                    {...labelSizeStyles[size as keyof typeof labelSizeStyles]
                        .error}
                >
                    {error}
                </Text>
            </Flex>
        </FormControl>
    );
};

export type { FormFormatProps };
export { FormFormat };
