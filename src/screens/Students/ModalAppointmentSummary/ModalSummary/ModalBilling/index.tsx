import React from 'react';
import * as Sharing from 'expo-sharing';
import { Flex, HStack, Text } from 'native-base';
import { captureRef } from 'react-native-view-shot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Student } from 'app/entities/Student';
import { Appointment } from 'app/entities/Appointment';

import { Button } from 'app/components/atoms/Button';
import { ProCrisActionsheet } from 'app/components/molecules/ProCrisActionsheet';
import { ProCrisBillingTemplate } from 'app/templates/ProCrisBillingTemplate';

type ModalBillingProps = {
    isOpen?: boolean;
    setIsOpen?(value: boolean): void;
    student: Student;
    appointments: Appointment[];
};

const ModalBilling = ({
    isOpen,
    appointments,
    student,
    setIsOpen,
}: ModalBillingProps) => {
    const pictureRef = React.useRef<any>(null);

    const onSharePress = async () => {
        const result = await captureRef(pictureRef, {
            result: 'tmpfile',
            quality: 1,
            format: 'png',
        });
        await Sharing.shareAsync(result);
    };

    return (
        <ProCrisActionsheet
            visible={isOpen}
            onRequestClose={() => setIsOpen?.(false)}
            onClose={() => setIsOpen?.(false)}
            distanceFromTop={150}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Flex flex="1" alignItems="center">
                    <Text
                        width="100%"
                        marginTop="10px"
                        paddingX="20px"
                        fontSize="lg"
                        textAlign="left"
                        fontWeight="600"
                    >
                        Recibo de Cobrança
                    </Text>
                    <Flex marginTop="10px">
                        <ProCrisBillingTemplate
                            ref={pictureRef}
                            student={student}
                            appointments={appointments}
                        />
                    </Flex>
                    <Text fontSize="sm" fontWeight="500">
                        Confira os dados e clique em {'"Compartilhar"'}.
                    </Text>
                    <HStack marginTop="10px">
                        <Button onPress={onSharePress}>Compartilhar</Button>
                    </HStack>
                </Flex>
            </GestureHandlerRootView>
        </ProCrisActionsheet>
    );
};

export type { ModalBillingProps };
export { ModalBilling };
