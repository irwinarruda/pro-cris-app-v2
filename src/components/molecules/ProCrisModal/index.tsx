import React from 'react';
import { Modal, ModalProps, TouchableWithoutFeedback } from 'react-native';
import { Flex, IFlexProps, useStyledSystemPropsResolver } from 'native-base';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

type ProCrisModalProps = ModalProps &
    IFlexProps & {
        onClose?(): void;
    };

const ProCrisModal = ({
    children,
    transparent,
    visible,
    onClose,
    onRequestClose,
    onShow,
    presentationStyle,
    supportedOrientations,
    onDismiss,
    onOrientationChange,
    hardwareAccelerated,
    statusBarTranslucent,
    ...props
}: ProCrisModalProps) => {
    const [style, rest] = useStyledSystemPropsResolver(props);

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onClose={onClose}
            onRequestClose={onRequestClose}
            onShow={onShow}
            presentationStyle={presentationStyle}
            supportedOrientations={supportedOrientations}
            onDismiss={onDismiss}
            onOrientationChange={onOrientationChange}
            hardwareAccelerated={hardwareAccelerated}
            statusBarTranslucent
            transparent
            style={{ ...style }}
            {...rest}
        >
            <TouchableWithoutFeedback
                onPress={onClose}
                style={{
                    position: 'absolute',
                }}
            >
                <Flex flex="1" bgColor="rgba(0, 0, 0, 0.3)"></Flex>
            </TouchableWithoutFeedback>
            <Flex
                flex="1"
                position="absolute"
                width="100%"
                height="100%"
                paddingBottom="20px"
                marginTop={`${getStatusBarHeight() + 80}px`}
                borderTopRadius="15px"
                borderWidth="2px"
                borderColor="gold.500"
                bgColor="white"
            >
                <Flex
                    width="70px"
                    height="6px"
                    marginTop="14px"
                    marginBottom="20px"
                    borderRadius="2px"
                    bgColor="purple.500"
                    alignSelf="center"
                    accessibilityRole="button"
                    onTouchEnd={onClose}
                />
                {children}
            </Flex>
        </Modal>
    );
};

export type { ProCrisModalProps };
export { ProCrisModal };
