import React from 'react';
import { getIn, useFormikContext } from 'formik';

import {
    ColorPicker,
    ColorPickerProps,
} from 'app/components/molecules/ColorPicker';

type FKColorPickerProps = Omit<ColorPickerProps, 'value'> & {
    name: string;
};

const FKColorPicker = ({ name, ...props }: FKColorPickerProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const { handleChange, values } = useFormikContext<any>();

    return (
        <ColorPicker
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            onColorChange={(color) => {
                handleChange(name)({ target: { value: color } } as any);
                setIsOpen(false);
            }}
            value={getIn(values, name)}
            {...props}
        />
    );
};

export type { FKColorPickerProps };
export { FKColorPicker };
