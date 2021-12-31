import React from 'react';
import { useFormikContext, getIn } from 'formik';
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
            value={getIn(values, name)}
            onBlur={handleBlur(name)}
            error={getIn(errors, name) as any}
            {...props}
        />
    );
};

type FKFormFormatMProps = FormFormatProps & {
    name: string;
    formInstance?: any;
};

const FKFormFormatM = ({
    name,
    formInstance,
    ...props
}: FKFormFormatMProps) => {
    const { handleChange, handleBlur, values, errors } = formInstance;

    return (
        <FormFormat
            onChangeText={(value) =>
                handleChange(name)({ target: { value: value } } as any)
            }
            value={getIn(values, name)}
            onBlur={handleBlur(name)}
            error={getIn(errors, name) as any}
            {...props}
        />
    );
};

export type { FKFormFormatProps, FKFormFormatMProps };
export { FKFormFormat, FKFormFormatM };
