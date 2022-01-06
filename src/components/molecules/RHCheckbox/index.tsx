import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, ICheckboxProps } from 'native-base';

type RHCheckboxProps = Omit<ICheckboxProps, 'value' | 'onChange'> & {
    name: string;
    value?: string;
};

const RHCheckbox = ({ name, value, ...props }: RHCheckboxProps) => {
    return (
        <Controller
            name={name}
            render={({
                field: { onChange, value: formValue },
                fieldState: { error },
            }) => (
                <Checkbox
                    value={value || ''}
                    isChecked={formValue}
                    colorScheme="purple"
                    borderWidth="1px"
                    borderColor="gray.400"
                    _checked={
                        { borderWidth: '1px', borderColor: 'gold.500' } as any
                    }
                    onChange={onChange}
                    {...props}
                />
            )}
        />
    );
};
type RHCheckboxMProps = Omit<ICheckboxProps, 'value' | 'onChange'> & {
    name: string;
    value?: string;
    control: any;
};

const RHCheckboxM = ({ name, value, control, ...props }: RHCheckboxMProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value: formValue },
                fieldState: { error },
            }) => (
                <Checkbox
                    value={value || ''}
                    isChecked={formValue}
                    colorScheme="purple"
                    borderWidth="1px"
                    borderColor="gray.400"
                    _checked={
                        { borderWidth: '1px', borderColor: 'gold.500' } as any
                    }
                    onChange={onChange}
                    {...props}
                />
            )}
        />
    );
};

export type { RHCheckboxProps, RHCheckboxMProps };
export { RHCheckbox, RHCheckboxM };
