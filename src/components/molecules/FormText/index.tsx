import React from 'react';
import {
    Box,
    Input,
    Text,
    IBoxProps,
    ITextProps,
    IInputProps,
    FormControl,
    IFormControlProps,
    IFormControlErrorMessageProps,
    IFormControlLabelProps,
    KeyboardAvoidingView,
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
    formFieldProps?: IBoxProps;
};
const FormText = ({
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
                    fontWeight="700"
                    fontStyle="normal"
                    marginBottom="2px"
                    {...labelSizeStyles[size as keyof typeof labelSizeStyles]}
                    {...formLabelProps}
                >
                    {label}
                </Text>
            )}
            <Box {...formFieldProps}>
                <KeyboardAvoidingView behavior="padding">
                    <Input
                        size={size}
                        borderWidth={!!error ? '2px' : '1px'}
                        {...props}
                    />
                </KeyboardAvoidingView>
                <FormControl.ErrorMessage
                    marginTop="0px"
                    {...formErrorMessageProps}
                >
                    {error}
                </FormControl.ErrorMessage>
            </Box>
        </FormControl>
    );
};
export { FormText };
