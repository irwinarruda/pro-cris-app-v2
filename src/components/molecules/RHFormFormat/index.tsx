import React from 'react';
import { Controller } from 'react-hook-form';
import {
    FormFormat,
    FormFormatProps,
} from 'app/components/molecules/FormFormat';

type RHFormFormatProps = FormFormatProps & {
    name: string;
};

const RHFormFormat = ({ name, ...props }: RHFormFormatProps) => {
    return (
        <Controller
            name={name}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
            }) => (
                <FormFormat
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    error={error?.message}
                    {...props}
                />
            )}
        />
    );
};

type RHFormFormatMProps = FormFormatProps & {
    name: string;
    control?: any;
};

const RHFormFormatM = ({ name, control, ...props }: RHFormFormatMProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
            }) => (
                <FormFormat
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    error={error?.message}
                    {...props}
                />
            )}
        />
    );
};

export type { RHFormFormatProps, RHFormFormatMProps };
export { RHFormFormat, RHFormFormatM };
