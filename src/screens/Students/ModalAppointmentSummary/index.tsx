import React from 'react';
import { Text, Modal, HStack, VStack } from 'native-base';

import { Button } from 'app/components/atoms/Button';
import { Pressable } from 'app/components/atoms/Pressable';
import { ProCrisModal } from 'app/components/organisms/ProCrisModal';

import { SummaryType, useSummary } from 'app/hooks/Summary';
import { useStudentStore } from 'app/store/Student/Student.hook';

type ModalAppointmentSummaryProps = {
    children?: React.ReactNode;
};

const ModalAppointmentSummary = React.memo(
    ({}: ModalAppointmentSummaryProps) => {
        const { selectedStudent } = useStudentStore('manage');
        const {
            isOpenModalOptionsSummary,
            onCloseModalOptionsSummary,
            onOpenModalSummary,
            setSummaryType,
        } = useSummary('modOpt');

        const handleOpenSummary = (type: SummaryType) => {
            setSummaryType(type);
            onOpenModalSummary();
        };

        return (
            <>
                <ProCrisModal
                    title={`Relatórios: ${selectedStudent?.name}`}
                    isOpen={isOpenModalOptionsSummary}
                    onClose={onCloseModalOptionsSummary}
                >
                    <Modal.Body bgColor="white">
                        <VStack flex="1" space="10px" paddingY="10px">
                            <Pressable
                                bgColor="white"
                                borderWidth="1px"
                                borderColor="gray.200"
                                borderRadius="5px"
                                onPress={() => handleOpenSummary('notpaid')}
                            >
                                <Text
                                    paddingX="12px"
                                    paddingY="5px"
                                    fontWeight="600"
                                    color="gray.500"
                                >
                                    Aulas Não Pagas
                                </Text>
                            </Pressable>
                            <Pressable
                                bgColor="white"
                                borderWidth="1px"
                                borderColor="gray.200"
                                borderRadius="5px"
                                onPress={() => handleOpenSummary('all')}
                            >
                                <Text
                                    paddingX="12px"
                                    paddingY="5px"
                                    fontWeight="600"
                                    color="gray.500"
                                >
                                    Todas as Aulas
                                </Text>
                            </Pressable>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer paddingTop="8px" paddingBottom="8px">
                        <HStack space={2}>
                            <Button
                                colorScheme="gray.500"
                                size="sm"
                                onPress={onCloseModalOptionsSummary}
                            >
                                Fechar
                            </Button>
                        </HStack>
                    </Modal.Footer>
                </ProCrisModal>
            </>
        );
    },
);

export type { ModalAppointmentSummaryProps };
export { ModalAppointmentSummary };
