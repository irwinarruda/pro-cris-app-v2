import React from 'react';
import { HStack, Icon, Text, useDisclose } from 'native-base';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { format, isToday } from 'date-fns';

import { PressableIcon } from 'app/components/atoms/PressableIcon';

import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';

type FilterAppointmentsProps = {
    children?: React.ReactNode;
};

const FilterAppointments = ({}: FilterAppointmentsProps) => {
    const { selectedDate, updateSelectedDate } = useAppointmentStore('date');

    const {
        isOpen: isOpenDatePicker,
        onClose: onCloseDatePicker,
        onOpen: onOpenDatePicker,
    } = useDisclose();

    const onDatePickerChange = (_: Event, newDate?: Date | undefined) => {
        const currentDate = newDate || selectedDate;
        onCloseDatePicker();
        updateSelectedDate(currentDate);
    };

    return (
        <>
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
        </>
    );
};

export type { FilterAppointmentsProps };
export { FilterAppointments };
