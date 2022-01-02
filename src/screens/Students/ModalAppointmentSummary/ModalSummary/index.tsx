import React from 'react';
import {
    Flex,
    Modal,
    HStack,
    Text,
    ScrollView,
    VStack,
    Spinner,
} from 'native-base';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import { Appointment } from 'app/entities/Appointment';
import { Student } from 'app/entities/Student';
import { DateHelpers } from 'app/utils/DateHelpers';

import { Button } from 'app/components/atoms/Button';
import { ProCrisModal } from 'app/components/organisms/ProCrisModal';
import { ProCrisAppointmentTableItem } from 'app/components/molecules/ProCrisAppointmentTableItem';

import { useSummary } from 'app/hooks/Summary';
import { useError } from 'app/hooks/Error';
import { useSuccess } from 'app/hooks/Success';
import { useAlert } from 'app/store/Alert/Alert.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';

type AppointmentWithStudent = Appointment & {
    student: Omit<Student, 'appointments' | 'costs' | 'schedules'>;
};

type ModalSummaryProps = {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const ModalSummary = ({ isOpen, onClose }: ModalSummaryProps) => {
    const navigation = useNavigation();
    const { selectedStudent, loading, setSelectedStudent } =
        useStudentStore('manage');
    const { updateAppointmentOptions, payAllAppointments, payAppointment } =
        useAppointmentStore();
    const { showAlertAsync } = useAlert();
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    const { setLoading } = useLoadingStore();

    const {
        summaryType,
        onCloseModalOptionsSummary,
        onCloseModalSummary,
        setSummaryStudentId,
    } = useSummary();

    const filteredAppointments = React.useMemo(() => {
        if (summaryType === 'notpaid') {
            return (
                selectedStudent?.appointments?.filter(
                    (appointment) =>
                        !appointment.is_cancelled && !appointment.is_paid,
                ) || []
            );
        } else {
            return selectedStudent?.appointments || [];
        }
    }, [summaryType, selectedStudent]);

    const handleItemPress = (appointment: AppointmentWithStudent) => {
        const dateString = `${format(
            appointment.date,
            'dd/MM/yyyy HH:mm',
        )} - ${format(
            DateHelpers.getEndDateByTime(
                appointment.date,
                appointment.cost.time,
            ),
            'HH:mm',
        )}`;
        onCloseModalOptionsSummary();
        onCloseModalSummary();
        setSummaryStudentId(appointment.student.id);
        navigation.navigate('ManageAppointment', {
            title: dateString,
            persistModal: true,
            appointment: {
                ...appointment,
                student: appointment.student,
                date: dateString,
            },
        });
    };

    const handlePaidPress = async (appointment: AppointmentWithStudent) => {
        try {
            const { isConfirmed } = await showAlertAsync({
                title: 'Deseja pagar essa aula?',
                description:
                    'Essa ação atualizará o status da aula para "Pago"!',
                cancelButtonText: 'Cancelar',
                confirmButtomText: 'Confirmar',
            });
            if (!isConfirmed) {
                return;
            }
            if (!selectedStudent) {
                return;
            }

            setLoading(true);
            await payAppointment(appointment);

            const newAppointments = selectedStudent.appointments.filter(
                (student) => student.id !== appointment.id,
            );
            newAppointments.push({ ...appointment, is_paid: true });

            setSelectedStudent({
                ...selectedStudent,
                appointments: newAppointments,
            });

            showSuccess({
                title: 'Sucesso!',
                description: 'Aula paga com sucesso',
            });
        } catch (err) {
            showError(err, { title: 'Erro ao pagar Aula' });
        } finally {
            setLoading(false);
        }
    };

    const handlePayAllPress = async () => {
        try {
            const { isConfirmed } = await showAlertAsync({
                title: 'Deseja pagar TODAS as Aulas?',
                description: 'Essa ação marcará TODAS as Aluas como pagas!',
                cancelButtonText: 'Cancelar',
                confirmButtomText: 'Confirmar',
            });
            if (!isConfirmed) {
                return;
            }
            if (!selectedStudent) {
                return;
            }
            setLoading(true);
            await payAllAppointments(filteredAppointments);

            let newAppointments = [...filteredAppointments] as Appointment[];
            let newFilteredAppointments = selectedStudent.appointments.map(
                (app) => {
                    let hasFiltered = false;
                    newAppointments = newAppointments.filter((newApp) => {
                        if (newApp.id === app.id) {
                            hasFiltered = true;
                        }
                        return newApp.id !== app.id;
                    });
                    return {
                        ...app,
                        is_paid: hasFiltered || app.is_paid,
                    };
                },
            );

            setSelectedStudent({
                ...selectedStudent,
                appointments: [...newFilteredAppointments],
            });
        } catch (err) {
            showError(err, { title: 'Erro ao pagar todas Aulas' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProCrisModal
            size="xl"
            title={`${
                summaryType === 'notpaid' ? 'Aulas não pagas' : 'Todas as Aulas'
            }:\n${selectedStudent?.name}`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Modal.Body bgColor="white">
                <Flex flex="1">
                    <HStack justifyContent="space-between" marginBottom="8px">
                        <Text width="34%" textAlign="center">
                            Data
                        </Text>
                        <Text width="21%" textAlign="center">
                            Valor
                        </Text>
                        <Text width="12%" textAlign="center">
                            Extra
                        </Text>
                        {summaryType === 'notpaid' && (
                            <Text width="16%" textAlign="center">
                                Ações
                            </Text>
                        )}
                    </HStack>
                    <ScrollView flex="1" maxHeight="250px">
                        <VStack space="6px">
                            {selectedStudent && !loading ? (
                                filteredAppointments.map((appointment) => (
                                    <ProCrisAppointmentTableItem
                                        appointment={{
                                            ...appointment,
                                            student: {
                                                ...selectedStudent,
                                                appointments: [] as any[],
                                            },
                                        }}
                                        summaryType={summaryType}
                                        onPress={handleItemPress}
                                        onPayPress={handlePaidPress}
                                        key={appointment.id}
                                    />
                                ))
                            ) : (
                                <Spinner color="gold.500" size="lg" />
                            )}
                        </VStack>
                    </ScrollView>
                </Flex>
            </Modal.Body>
            <Modal.Footer paddingTop="8px" paddingBottom="8px">
                <HStack space={2}>
                    <Button colorScheme="gray.500" size="sm" onPress={onClose}>
                        Fechar
                    </Button>
                    {summaryType === 'notpaid' && (
                        <Button
                            colorScheme="#60A672"
                            size="sm"
                            onPress={handlePayAllPress}
                        >
                            Pagar Todas
                        </Button>
                    )}
                </HStack>
            </Modal.Footer>
        </ProCrisModal>
    );
};

export type { ModalSummaryProps };
export { ModalSummary };
