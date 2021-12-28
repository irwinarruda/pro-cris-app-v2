import React from 'react';
import { Modal, IBoxProps, HStack, Text } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Button } from 'app/components/atoms/Button';

import { UseAlertReturn } from 'app/hooks/Alert';

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

type ManageStudentAlertProps = IModalProps & {
    messages: {
        title: string;
        description: string;
    };
    instance: UseAlertReturn;
};

const ManageStudentAlert = ({
    messages,
    instance,
    ...props
}: ManageStudentAlertProps) => {
    const { isOpen, closeModal } = instance;
    return (
        <Modal isOpen={isOpen} onClose={closeModal} {...props}>
            <Modal.Content borderColor="gold.500" borderWidth="2px">
                <GestureHandlerRootView>
                    <Modal.CloseButton height="30px" />
                    <Modal.Header>
                        <Text fontSize="lg" fontWeight="600">
                            {messages.title}
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text fontSize="md">{messages.description}</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <HStack space={2}>
                            <Button
                                colorScheme="gray.500"
                                onPress={() => closeModal()}
                                size="sm"
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="red.500"
                                onPress={() => closeModal(true)}
                                size="sm"
                            >
                                Remover
                            </Button>
                        </HStack>
                    </Modal.Footer>
                </GestureHandlerRootView>
            </Modal.Content>
        </Modal>
    );
};

export type { ManageStudentAlertProps };
export { ManageStudentAlert };
