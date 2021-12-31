import React from 'react';
import { Modal, IBoxProps, HStack, Icon, Text, StatusBar } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import { Button } from 'app/components/atoms/Button';
import { PressableIcon } from 'app/components/atoms/PressableIcon';

import { useAlert } from 'app/store/Alert/Alert.hook';

interface IModalProps extends IBoxProps {
    title?: React.ReactNode;
    isOpen: boolean;
    onClose(): void;
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

type ProCrisModalProps = IModalProps;

const ProCrisModal = ({ title, children, ...props }: ProCrisModalProps) => {
    return (
        <Modal size="xl" avoidKeyboard {...props}>
            {props.isOpen && <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" />}
            <Modal.Content borderColor="gold.500" borderWidth="2px">
                <GestureHandlerRootView style={{ position: 'relative' }}>
                    <PressableIcon
                        onPress={props.onClose}
                        size="33px"
                        position="absolute"
                        top="9px"
                        right="6px"
                        zIndex="1"
                        icon={
                            <Icon
                                as={AntDesign}
                                size="22px"
                                name="close"
                                color="white"
                            />
                        }
                    />
                    <Modal.Header
                        bgColor="purple.500"
                        paddingTop="10px"
                        paddingBottom="10px"
                    >
                        <Text fontSize="lg" fontWeight="700" color="white">
                            {title || ''}
                        </Text>
                    </Modal.Header>
                    {children}
                </GestureHandlerRootView>
            </Modal.Content>
        </Modal>
    );
};

export type { ProCrisModalProps };
export { ProCrisModal };
