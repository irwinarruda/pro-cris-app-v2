import React from 'react';
import { Flex, FlatList } from 'native-base';
import { RefreshControl } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import { DateHelpers } from 'app/utils/DateHelpers';

import { ProCrisAppointmentCard } from 'app/components/molecules/ProCrisAppointmentCard';

import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';

type ListAppointmentsProps = {
    filteredAppointments: any;
};

const ListAppointments = React.memo(function ListAppointmentsMemo({
    filteredAppointments,
}: ListAppointmentsProps) {
    const navigation = useNavigation();
    const { loading, listAppointments } = useAppointmentStore('loading');
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
});

export type { ListAppointmentsProps };
export { ListAppointments };
