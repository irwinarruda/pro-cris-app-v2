import React from 'react';
import { RefreshControl } from 'react-native';
import { Flex, Text, Icon, HStack, FlatList, useDisclose } from 'native-base';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { isToday, isSameDay, format, isAfter } from 'date-fns';
import { AntDesign } from '@expo/vector-icons';

import { Appointment } from 'app/entities/Appointment';
import { DateHelpers } from 'app/utils/DateHelpers';

import { PressableIcon } from 'app/components/atoms/PressableIcon';
import {
    ProCrisStagger,
    ProCrisStaggerIcon,
} from 'app/components/molecules/ProCrisStagger';
import { ProCrisAppointmentCard } from 'app/components/molecules/ProCrisAppointmentCard';

import { useError } from 'app/hooks/Error';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useAlert } from 'app/store/Alert/Alert.hook';

import { ModalCreateAppointment } from './ModalCreateAppointment';

type GhostAppointments = Appointment & { isGhost: true };

type AppointmentsProps = {
    children?: React.ReactNode;
};
const Appointments = ({}: AppointmentsProps) => {
    const navigation = useNavigation();
    const { showError } = useError();
    const { showAlertAsync } = useAlert();
    const { setLoading } = useLoadingStore();
    const { students, listStudents } = useStudentStore('list');
    const {
        appointments,
        selectedDate,
        loading,
        listAppointments,
        updateSelectedDate,
        createTodaysRoutineAppointments,
        getAppointmentsByRoutineDate,
    } = useAppointmentStore('all');

    const {
        isOpen: isOpenModalAppointment,
        onClose: onCloseModalAppointment,
        onOpen: onOpenModalAppointment,
    } = useDisclose();
    const {
        isOpen: isOpenStagger,
        onToggle: onToggleStagger,
        onClose: onCloseStagger,
    } = useDisclose();
    const {
        isOpen: isOpenDatePicker,
        onClose: onCloseDatePicker,
        onOpen: onOpenDatePicker,
    } = useDisclose();

    const [ghostAppointments, setGhostAppointments] = React.useState<
        GhostAppointments[]
    >([]);

    const filteredAppointments = React.useMemo(
        () =>
            appointments
                .filter((appointment) =>
                    isSameDay(appointment.date, selectedDate),
                )
                .concat(ghostAppointments)
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((appointment) => ({
                    ...appointment,
                    student: students.find(
                        (student) => student.id === appointment.id_student,
                    ),
                })),
        [appointments, selectedDate, ghostAppointments, students],
    );

    const onDatePickerChange = (_: Event, newDate?: Date | undefined) => {
        const currentDate = newDate || selectedDate;
        onCloseDatePicker();
        updateSelectedDate(currentDate);
    };

    const handleCreateRoutine = async () => {
        try {
            setLoading(true);
            const { isConfirmed } = await showAlertAsync({
                title: 'Deseja iniciar a rotina?',
                description: `Essa ação iniciará a rotina do dia atual`,
                cancelButtonText: 'Cancelar',
                confirmButtomText: 'Iniciar',
            });
            if (!isConfirmed) {
                return;
            }
            await createTodaysRoutineAppointments();
        } catch (err) {
            showError(err, { title: 'Atenção!', duration: 100000 });
        } finally {
            setLoading(false);
        }
    };

    const handleGhostAppointments = async (date?: Date) => {
        if (date && isAfter(date, new Date())) {
            const appointments = await getAppointmentsByRoutineDate(date);
            setGhostAppointments(
                appointments.map((appointment) => ({
                    ...appointment,
                    isGhost: true,
                })),
            );
        } else {
            setGhostAppointments([]);
        }
    };

    const fetchData = async () => {
        await listStudents();
        await listAppointments();
    };

    React.useEffect(() => {
        handleGhostAppointments(selectedDate);
    }, [selectedDate]);

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Flex flex="1" bgColor="#ffffff">
            <Flex flex="1" onTouchStart={onCloseStagger}>
                <HStack
                    width="100%"
                    space="10px"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="12px"
                    paddingX="20px"
                >
                    <Text fontSize="lg" fontWeight="700" lineHeight="md">
                        {isToday(selectedDate) && 'Hoje: '}
                        {format(selectedDate, 'dd/MM/yyyy')}
                    </Text>
                    <PressableIcon
                        size="32px"
                        marginTop="0px"
                        marginRight="-10px"
                        bgColor="purple.300"
                        borderWidth="1px"
                        borderColor="gold.300"
                        icon={
                            <Icon
                                as={AntDesign}
                                name="filter"
                                size="22px"
                                color="white"
                            />
                        }
                        onPress={onOpenDatePicker}
                    />
                </HStack>
                <FlatList
                    flex="1"
                    marginTop="12px"
                    paddingX="10px"
                    marginBottom="0px"
                    data={filteredAppointments}
                    refreshControl={
                        <RefreshControl
                            tintColor="#B0A766"
                            colors={['#B0A766']}
                            refreshing={loading}
                            onRefresh={() => {
                                listAppointments();
                            }}
                        />
                    }
                    renderItem={({ item: appointment, index }) => (
                        <ProCrisAppointmentCard
                            marginTop={index > 0 ? '10px' : '0px'}
                            name={appointment.student?.name}
                            observation={appointment.student?.observation}
                            avatar={appointment.student?.avatar}
                            color={appointment.student?.color}
                            date={appointment.date}
                            cost={appointment.cost}
                            disabled={appointment.isGhost}
                            onPress={() => {
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
                                navigation.navigate('ManageAppointment', {
                                    title: dateString,
                                    appointment: {
                                        ...appointment,
                                        date: dateString,
                                    },
                                });
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingBottom: 110,
                    }}
                />
            </Flex>
            <ProCrisStagger isOpen={isOpenStagger} onToggle={onToggleStagger}>
                <ProCrisStaggerIcon
                    label="Iniciar Rotina"
                    bgColor="#60A672"
                    borderWidth="1px"
                    borderColor="gold.500"
                    onPress={handleCreateRoutine}
                />
                <ProCrisStaggerIcon
                    label="Criar Aula"
                    bgColor="#996074"
                    borderWidth="1px"
                    borderColor="gold.500"
                    toggleOnPressEnd
                    onPress={onOpenModalAppointment}
                />
            </ProCrisStagger>
            <ModalCreateAppointment
                isOpen={isOpenModalAppointment}
                onClose={onCloseModalAppointment}
            />
            {isOpenDatePicker && (
                <DateTimePicker
                    locale="pt-BR"
                    mode="date"
                    display="default"
                    value={selectedDate}
                    is24Hour={true}
                    onChange={onDatePickerChange}
                />
            )}
        </Flex>
    );
};

export { Appointments };
