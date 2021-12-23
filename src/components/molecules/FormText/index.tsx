import React from 'react';
import {
    Flex,
    Input,
    Text,
    IFlexProps,
    ITextProps,
    IInputProps,
    FormControl,
    IFormControlProps,
    IFormControlErrorMessageProps,
} from 'native-base';

const labelSizeStyles = {
    sm: {
        fontSize: '14px',
    },
    md: {
        fontSize: '16px',
    },
    lg: {
        fontSize: '18px',
    },
};

type FormTextProps = IInputProps & {
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
const FormText = ({
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
}: FormTextProps) => {
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
                    {...labelSizeStyles[size as keyof typeof labelSizeStyles]}
                    {...formLabelProps}
                >
                    {label}
                </Text>
            )}
            <Flex {...formFieldProps}>
                <Input
                    size={size}
                    borderWidth={!!error ? '2px' : '1px'}
                    autoCapitalize={autoCapitalize}
                    {...props}
                />
                <Text
                    marginTop="0px"
                    height="20px"
                    fontSize="xs"
                    color="red.500"
                >
                    {error}
                </Text>
            </Flex>
        </FormControl>
    );
};

export type { FormTextProps };
export { FormText };
