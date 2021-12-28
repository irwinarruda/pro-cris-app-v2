import React from 'react';
import {
    Select as NBSelect,
    ISelectProps as NBISelectProps,
} from 'native-base';

type SelectOption = {
    label: string;
    value: string;
};

type SelectProps = NBISelectProps & {
    options?: SelectOption[];
};

const Select = ({ size, options = [], ...props }: SelectProps) => {
    return (
        <NBSelect
            flex="1"
            marginTop="-1px"
            _item={{
                height: '50px',
                _pressed: { bgColor: 'rgba(0, 0, 0, 0.08)' },
            }}
            _selectedItem={{
                bgColor: 'purple.100',
                fontWeight: '600',
            }}
            {...props}
        >
            {options.map((option) => (
                <NBSelect.Item
                    label={option.label}
                    value={option.value}
                    key={option.value}
                />
            ))}
        </NBSelect>
    );
};

export type { SelectProps, SelectOption };
export { Select };
