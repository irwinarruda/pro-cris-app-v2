import React from 'react';
import { Controller } from 'react-hook-form';

import {
    ColorPicker,
    ColorPickerProps,
} from 'app/components/molecules/ColorPicker';

type RHColorPickerProps = Omit<ColorPickerProps, 'value'> & {
    name: string;
};

const RHColorPicker = ({ name, ...props }: RHColorPickerProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <Controller
            name={name}
            render={({ field: { value, onChange } }) => (
                <ColorPicker
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onOpen={() => setIsOpen(true)}
                    onColorChange={(color) => {
                        onChange(color);
                        setIsOpen(false);
                    }}
                    value={value}
                    {...props}
                />
            )}
        />
    );
};

export type { RHColorPickerProps };
export { RHColorPicker };
