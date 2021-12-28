import React from 'react';
import { useFormikContext } from 'formik';
import {
    FormSelect,
    FormSelectProps,
} from 'app/components/molecules/FormSelect';

type FKFormSelectProps = FormSelectProps & {
    name: string;
};

const FKFormSelect = ({ name, ...props }: FKFormSelectProps) => {
    const { handleChange, values, errors } = useFormikContext<any>();

    return (
        <FormSelect
            onValueChange={(selectedValue) =>
                handleChange(name)({ target: { value: selectedValue } } as any)
            }
            selectedValue={values[name]}
            error={errors[name] as any}
            {...props}
        />
    );
};

type FKFormSelectMProps = FormSelectProps & {
    name: string;
    formInstance?: any;
};

const FKFormSelectM = ({
    name,
    formInstance,
    ...props
}: FKFormSelectMProps) => {
    const { handleChange, values, errors } = formInstance;
    return (
        <FormSelect
            onValueChange={(selectedValue) =>
                handleChange(name)({ target: { value: selectedValue } } as any)
            }
            selectedValue={values[name]}
            error={errors[name] as any}
            {...props}
        />
    );
};

export type { FKFormSelectProps, FKFormSelectMProps };
export { FKFormSelect, FKFormSelectM };
