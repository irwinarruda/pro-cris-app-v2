import React from 'react';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import { Input, IInputProps } from 'native-base';

type NumberFormatProps = TextInputMaskProps &
    Pick<IInputProps, Exclude<keyof IInputProps, 'onChangeText'>> & {};

const NumberFormat = ({
    type,
    value,
    options,
    checkText,
    onChangeText,
    refInput,
    customTextInput,
    customTextInputProps,
    includeRawValueInChangeText,
    ...props
}: NumberFormatProps) => {
    return (
        <TextInputMask
            type={type}
            value={value}
            options={options}
            checkText={checkText}
            onChangeText={onChangeText}
            refInput={refInput}
            includeRawValueInChangeText={includeRawValueInChangeText}
            customTextInput={Input}
            customTextInputProps={props}
        />
    );
};

export type { NumberFormatProps };
export { NumberFormat };
