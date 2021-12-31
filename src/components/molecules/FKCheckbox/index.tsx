import React from 'react';
import { getIn, useFormikContext } from 'formik';
import { Checkbox, ICheckboxProps } from 'native-base';

type FKCheckboxProps = Omit<ICheckboxProps, 'value' | 'onChange'> & {
    name: string;
    value?: string;
};

const FKCheckbox = ({ name, value, ...props }: FKCheckboxProps) => {
    const { handleChange, values } = useFormikContext<any>();
    return (
        <Checkbox
            value={value || ''}
            isChecked={getIn(values, name)}
            colorScheme="purple"
            borderWidth="1px"
            borderColor="gray.400"
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
    value?: string;
    formInstance: any;
};

const FKCheckboxM = ({
    name,
    value,
    formInstance,
    ...props
}: FKCheckboxMProps) => {
    const { handleChange, values } = formInstance;
    return (
        <Checkbox
            value={value || ''}
            isChecked={getIn(values, name)}
            colorScheme="purple"
            borderWidth="1px"
            borderColor="gray.400"
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
