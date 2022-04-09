import React from 'react';
import { FlatList } from 'native-base';
import { RefreshControl } from 'react-native';
import { format, isAfter, isSameDay } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import { DateHelpers } from 'app/utils/DateHelpers';
import { Appointment } from 'app/entities/Appointment';

import { ProCrisAppointmentCard } from 'app/components/molecules/ProCrisAppointmentCard';

import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

type GhostAppointments = Appointment & { isGhost: true };

type ListAppointmentsProps = {};

const ListAppointments = ({}: ListAppointmentsProps) => {
    const navigation = useNavigation();
    const { students } = useStudentStore('list');
    const {
        appointments,
        selectedDate,
        loading,
        listAppointments,
        getAppointmentsByRoutineDate,
    } = useAppointmentStore('all');

    const [ghostAppointments, setGhostAppointments] = React.useState<
        GhostAppointments[]
    >([]);

    const filteredAppointments = React.useMemo(
        () =>
            appointments
                .concat(ghostAppointments)
                .map((appointment) => ({
                    ...appointment,
                    student: students.find(
                        (student) => student.id === appointment.id_student,
                    ),
                }))
                .filter(
                    (appointment) =>
                        isSameDay(appointment.date, selectedDate) &&
                        appointment.student,
                )
                .sort((a, b) => a.date.getTime() - b.date.getTime()),
        [appointments, selectedDate, ghostAppointments, students],
    );

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

    React.useEffect(() => {
        handleGhostAppointments(selectedDate);
    }, [selectedDate]);

    return (
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
    );
};

export type { ListAppointmentsProps };
export { ListAppointments };
