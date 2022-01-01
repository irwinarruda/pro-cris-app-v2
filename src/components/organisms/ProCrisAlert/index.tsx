import React from 'react';
import { Modal, IBoxProps, HStack, Text } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Button } from 'app/components/atoms/Button';

import { useAlert } from 'app/store/Alert/Alert.hook';

interface IModalProps extends IBoxProps {
    defaultIsOpen?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | number | string;
    initialFocusRef?: React.RefObject<any> | any;
    finalFocusRef?: React.RefObject<any> | any;
    avoidKeyboard?: boolean;
    closeOnOverlayClick?: boolean;
    isKeyboardDismissable?: boolean;
    overlayVisible?: boolean;
    backdropVisible?: boolean;
    _backdrop?: any;
}

type ProCrisAlertProps = IModalProps;

const ProCrisAlert = ({ ...props }: ProCrisAlertProps) => {
    const {
        isOpen,
        texts: {
            title,
            description,
            cancelButtonProps,
            cancelButtonText,
            confirmButtomProps,
            confirmButtomText,
        },
        closeModal,
    } = useAlert('all');

    return (
        <Modal
            isOpen={isOpen}
            onClose={() =>
                closeModal({
                    isDenied: false,
                    isConfirmed: false,
                    isDismissed: true,
                })
            }
            size="xl"
            {...props}
        >
            <Modal.Content borderColor="gold.500" borderWidth="2px">
                <GestureHandlerRootView>
                    <Modal.CloseButton height="30px" />
                    <Modal.Header>
                        <Text fontSize="lg" fontWeight="600">
                            {title || ''}
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text fontSize="md">{description || ''}</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <HStack space={2}>
                            <Button
                                colorScheme="gray.500"
                                onPress={() =>
                                    closeModal({
                                        isDenied: true,
                                        isConfirmed: false,
                                        isDismissed: true,
                                    })
                                }
                                size="sm"
                                {...cancelButtonProps}
                            >
                                {cancelButtonText || 'Cancelar'}
                            </Button>
                            <Button
                                colorScheme="purple.500"
                                onPress={() =>
                                    closeModal({
                                        isConfirmed: true,
                                        isDenied: false,
                                        isDismissed: false,
                                    })
                                }
                                size="sm"
                                {...confirmButtomProps}
                            >
                                {confirmButtomText || 'Ok'}
                            </Button>
                        </HStack>
                    </Modal.Footer>
                </GestureHandlerRootView>
            </Modal.Content>
        </Modal>
    );
};

export type { ProCrisAlertProps };
export { ProCrisAlert };
