import React from 'react';
import { useFormikContext } from 'formik';
import {
    FormFormat,
    FormFormatProps,
} from 'app/components/molecules/FormFormat';

type FKFormFormatProps = FormFormatProps & {
    name: string;
};

const FKFormFormat = ({ name, ...props }: FKFormFormatProps) => {
    const { handleChange, handleBlur, values, errors } =
        useFormikContext<any>();

    return (
        <FormFormat
            onChangeText={(value) =>
                handleChange(name)({ target: { value: value } } as any)
            }
            value={values[name]}
            onBlur={handleBlur(name)}
            error={errors[name] as any}
            {...props}
        />
    );
};

export type { FKFormFormatProps };
export { FKFormFormat };
