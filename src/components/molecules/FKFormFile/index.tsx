import React from 'react';
import { useFormikContext } from 'formik';

import { FormFile, FormFileProps } from 'app/components/molecules/FormFile';

type FKFormFileProps = Omit<FormFileProps, 'onPress'> & {
    name: string;
};

const FKFormFile = ({ children, name, ...props }: FKFormFileProps) => {
    const { handleChange, errors } = useFormikContext<any>();

    return (
        <FormFile
            onPress={(file) =>
                handleChange(name)({ target: { value: { ...file } } } as any)
            }
            error={errors[name] as any}
            {...props}
        >
            {children}
        </FormFile>
    );
};

export type { FKFormFileProps };
export { FKFormFile };
