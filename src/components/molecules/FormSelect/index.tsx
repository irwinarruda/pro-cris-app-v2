import React from 'react';
import {
    Flex,
    Text,
    IFlexProps,
    ITextProps,
    FormControl,
    IFormControlProps,
    IFormControlErrorMessageProps,
} from 'native-base';

import { Select, SelectProps } from 'app/components/atoms/Select';

const labelSizeStyles = {
    sm: {
        label: {
            fontSize: 'sm',
        },
        select: {
            fontSize: 'sm',
            height: '36px',
        },
        error: {
            fontSize: '2xs',
            height: '14px',
        },
    },
    md: {
        label: {
            fontSize: 'md',
        },
        select: {
            fontSize: 'sm',
            height: '40px',
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
        select: {
            fontSize: 'md',
            height: '45px',
        },
        error: {
            fontSize: 'xs',
            height: '20px',
        },
    },
};

type FormSelectProps = SelectProps & {
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
const FormSelect = ({
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
}: FormSelectProps) => {
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
                <Select
                    borderWidth={!!error ? '2px' : '1px'}
                    {...labelSizeStyles[size as keyof typeof labelSizeStyles]
                        .select}
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

export type { FormSelectProps };
export { FormSelect };
