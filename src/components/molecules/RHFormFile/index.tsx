import React from 'react';
import { Controller } from 'react-hook-form';
import { FormFile, FormFileProps } from 'app/components/molecules/FormFile';

type RHFormFileProps = Omit<FormFileProps, 'onPress'> & {
    name: string;
};

const RHFormFile = ({ children, name, ...props }: RHFormFileProps) => {
    return (
        <Controller
            name={name}
            render={({ field: { onChange }, fieldState: { error } }) => (
                <FormFile
                    onPress={(file) => onChange(file)}
                    error={error?.message}
                    {...props}
                >
                    {children}
                </FormFile>
            )}
        />
    );
};

export type { RHFormFileProps };
export { RHFormFile };
