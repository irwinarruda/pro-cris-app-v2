import React from 'react';
import {
    Flex,
    FormControl,
    IFlexProps,
    IFormControlProps,
    ITextProps,
    Text,
} from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import { Pressable, PressableProps } from 'app/components/atoms/Pressable';

import { useError } from 'app/hooks/Error';

type FormFileProps = Omit<PressableProps, 'onPress'> & {
    label?: string;
    fileLabel?: string;
    error?: string;
    nativeID?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    formLabelProps?: ITextProps;
    formFileLabelProps?: ITextProps;
    formControlProps?: IFormControlProps;
    formErrorMessageProps?: ITextProps;
    formFieldProps?: IFlexProps;
    onPress(result: ImagePicker.ImagePickerResult): void;
};
const FormFile = ({
    children,
    label,
    fileLabel,
    nativeID,
    isRequired,
    isDisabled,
    isReadOnly,
    error,
    formControlProps,
    formFileLabelProps,
    formLabelProps,
    formErrorMessageProps,
    formFieldProps,
    onPress,
    ...props
}: FormFileProps) => {
    const { showError } = useError();
    const handleFilePress = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.cancelled) {
                if (onPress) {
                    onPress(result);
                }
            }
        } catch (err) {
            showError(err, { title: 'Erro ao selecionar Imagem' });
        }
    };

    return (
        <FormControl
            isInvalid={!!error}
            nativeID={nativeID}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            {...formControlProps}
        >
            <Flex {...formFieldProps}>
                <Pressable {...props} onPress={handleFilePress}>
                    {children}
                </Pressable>
                <Text {...formFileLabelProps}>{fileLabel}</Text>
                <Text
                    marginTop="0px"
                    height="20px"
                    fontSize="xs"
                    color="red.500"
                    {...formErrorMessageProps}
                >
                    {error}
                </Text>
            </Flex>
        </FormControl>
    );
};

export type { FormFileProps };
export { FormFile };
