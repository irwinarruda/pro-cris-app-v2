import React from 'react';
import { Controller } from 'react-hook-form';
import {
    FormSelect,
    FormSelectProps,
} from 'app/components/molecules/FormSelect';

type RHFormSelectProps = FormSelectProps & {
    name: string;
};

const RHFormSelect = ({ name, ...props }: RHFormSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormSelect
                    onValueChange={onChange}
                    selectedValue={value}
                    error={error?.message}
                    {...props}
                />
            )}
        />
    );
};

type RHFormSelectMProps = FormSelectProps & {
    name: string;
    control?: any;
};

const RHFormSelectM = ({ name, control, ...props }: RHFormSelectMProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormSelect
                    onValueChange={onChange}
                    selectedValue={value}
                    error={error?.message}
                    {...props}
                />
            )}
        />
    );
};

export type { RHFormSelectProps, RHFormSelectMProps };
export { RHFormSelect, RHFormSelectM };
