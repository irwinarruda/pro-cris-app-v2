import React from 'react';
import { useFormikContext, FormikContextType } from 'formik';
import { FormText, FormTextProps } from 'app/components/molecules/FormText';

type FKFormTextProps = FormTextProps & {
    name: string;
};

const FKFormText = ({ name, ...props }: FKFormTextProps) => {
    const { handleChange, handleBlur, values, errors } =
        useFormikContext<any>();

    return (
        <FormText
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name)}
            value={values[name]}
            error={errors[name] as any}
            {...props}
        />
    );
};

type FKFormTextMProps = FormTextProps & {
    name: string;
    formInstance?: any;
};

const FKFormTextM = ({ name, formInstance, ...props }: FKFormTextMProps) => {
    const { handleChange, handleBlur, values, errors } = formInstance;
    return (
        <FormText
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name)}
            value={values[name]}
            error={errors[name] as any}
            {...props}
        />
    );
};

export type { FKFormTextProps, FKFormTextMProps };
export { FKFormText, FKFormTextM };
