import React from 'react';
import { Controller } from 'react-hook-form';
import { FormText, FormTextProps } from 'app/components/molecules/FormText';

type RHFormTextProps = FormTextProps & {
    name: string;
};

const RHFormText = ({ name, ...props }: RHFormTextProps) => {
    return (
        <Controller
            name={name}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <FormText
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error?.message}
                    {...props}
                />
            )}
        />
    );
};

type RHFormTextMProps = FormTextProps & {
    name: string;
    control?: any;
};

const RHFormTextM = ({ name, control, ...props }: RHFormTextMProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <FormText
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error?.message}
                    {...props}
                />
            )}
        />
    );
};

export type { RHFormTextProps, RHFormTextMProps };
export { RHFormText, RHFormTextM };
