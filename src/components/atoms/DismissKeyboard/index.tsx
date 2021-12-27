import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type DismissKeyboardProps = {
    children?: React.ReactNode;
};
const DismissKeyboard = ({ children }: DismissKeyboardProps) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
};

export type { DismissKeyboardProps };
export { DismissKeyboard };
