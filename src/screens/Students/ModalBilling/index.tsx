import React from 'react';
import * as Sharing from 'expo-sharing';
import { Flex, HStack, Text } from 'native-base';
import { captureRef } from 'react-native-view-shot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSummary } from 'app/hooks/Summary';
import { useStudentStore } from 'app/store/Student/Student.hook';

import { Button } from 'app/components/atoms/Button';
import { ProCrisActionsheet } from 'app/components/molecules/ProCrisActionsheet';
import { ProCrisBillingTemplate } from 'app/templates/ProCrisBillingTemplate';
import { FormatHelpers } from 'app/utils/FormatHelpers';

type ModalBillingProps = {};

const ModalBilling = ({}: ModalBillingProps) => {
    const pictureRef = React.useRef<any>(null);
    const { isOpenModalBilling, onCloseModalBilling } = useSummary('modBill');
    const { selectedStudent } = useStudentStore('manage');

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
            visible={isOpenModalBilling}
            onRequestClose={onCloseModalBilling}
            onClose={onCloseModalBilling}
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
                            student={selectedStudent!}
                            appointments={FormatHelpers.getValidNotPaiedAppointments(
                                selectedStudent?.appointments || [],
                            )}
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
