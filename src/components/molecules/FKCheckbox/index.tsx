import React from 'react';
import { useFormikContext } from 'formik';
import { Checkbox, ICheckboxProps } from 'native-base';

type FKCheckboxProps = Omit<ICheckboxProps, 'value' | 'onChange'> & {
    name: string;
};

const FKCheckbox = ({ name, ...props }: FKCheckboxProps) => {
    const { handleChange, values } = useFormikContext<any>();
    return (
        <Checkbox
            value={values[name]}
            colorScheme="purple"
            borderWidth="1px"
            _checked={{ borderWidth: '1px', borderColor: 'gold.500' } as any}
            onChange={(isSelected) =>
                handleChange(name)({ target: { value: isSelected } } as any)
            }
            {...props}
        />
    );
};
type FKCheckboxMProps = Omit<ICheckboxProps, 'value' | 'onChange'> & {
    name: string;
    formInstance: any;
};

const FKCheckboxM = ({ name, formInstance, ...props }: FKCheckboxMProps) => {
    const { handleChange, values } = formInstance;
    return (
        <Checkbox
            value={values[name]}
            colorScheme="purple"
            borderWidth="1px"
            _checked={{ borderWidth: '1px', borderColor: 'gold.500' } as any}
            onChange={(isSelected) =>
                handleChange(name)({ target: { value: isSelected } } as any)
            }
            {...props}
        />
    );
};

export type { FKCheckboxProps, FKCheckboxMProps };
export { FKCheckbox, FKCheckboxM };
