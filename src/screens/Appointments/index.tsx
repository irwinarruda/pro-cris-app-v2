import React from 'react';
import { RefreshControl } from 'react-native';
import { Flex, Text, Icon, HStack, FlatList, useDisclose } from 'native-base';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isToday, isSameDay, format } from 'date-fns';
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';

import { PressableIcon } from 'app/components/atoms/PressableIcon';
import {
    ProCrisStagger,
    ProCrisStaggerIcon,
} from 'app/components/molecules/ProCrisStagger';
import { ProCrisAppointmentCard } from 'app/components/molecules/ProCrisAppointmentCard';

import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

import { ModalCreateAppointment } from './ModalCreateAppointment';

type AppointmentsProps = {
    children?: React.ReactNode;
};
const Appointments = ({}: AppointmentsProps) => {
    const { students } = useStudentStore('list');
    const {
        appointments,
        selectedDate,
        loading,
        listAppointments,
        updateSelectedDate,
    } = useAppointmentStore('all');

    const filteredAppointments = React.useMemo(
        () =>
            appointments
                .filter((appointment) =>
                    isSameDay(appointment.date, selectedDate),
                )
                .map((appointment) => ({
                    ...appointment,
                    student: students.find(
                        (student) => student.id === appointment.id_student,
                    ),
                })),
        [appointments, selectedDate, students],
    );

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

    const onDatePickerChange = (_: Event, date?: Date | undefined) => {
        const currentDate = date || selectedDate;
        onCloseDatePicker();
        updateSelectedDate(currentDate);
    };

    React.useEffect(() => {
        listAppointments();
    }, []);

    return (
        <Flex flex="1" bgColor="#ffffff">
            <Flex flex="1" onTouchStart={onCloseStagger}>
                <HStack
                    width="100%"
                    space="10px"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="10px"
                    paddingX="20px"
                >
                    <Flex>
                        <Text fontSize="lg" fontWeight="700" lineHeight="22px">
                            {isToday(selectedDate) && 'Hoje: '}
                            {format(selectedDate, 'dd/MM/yyyy')}
                        </Text>
                    </Flex>
                    <Flex flexDirection="row">
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
                    </Flex>
                </HStack>
                <FlatList
                    flex="1"
                    marginTop="12px"
                    paddingX="10px"
                    marginBottom="10px"
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
                            name={appointment.student.name}
                            observation={appointment.student.observation}
                            avatar={appointment.student.avatar}
                            color={appointment.student.color}
                            date={appointment.date}
                            cost={appointment.cost}
                        />
                    )}
                    contentContainerStyle={{
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                    }}
                    keyExtractor={(item) => item.id}
                />
            </Flex>
            <ProCrisStagger isOpen={isOpenStagger} onToggle={onToggleStagger}>
                <ProCrisStaggerIcon
                    label="Iniciar Dia"
                    bgColor="indigo.500"
                    icon={
                        <Icon
                            as={MaterialIcons}
                            size="6"
                            name="location-pin"
                            color="warmGray.50"
                        />
                    }
                />
                <ProCrisStaggerIcon
                    label="Criar Aula"
                    bgColor="yellow.400"
                    icon={
                        <Icon
                            as={MaterialCommunityIcons}
                            size="6"
                            name="microphone"
                            color="warmGray.50"
                        />
                    }
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
