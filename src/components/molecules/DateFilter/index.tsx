import React from 'react';
import { format } from 'date-fns';
import { Flex, Text, useDisclose } from 'native-base';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { Pressable } from 'app/components/atoms/Pressable';

type DateFilterProps = {
    children?: React.ReactNode;
    date: Date;
    setDate(date: Date): void;
};

const DateFilter = ({ date, setDate }: DateFilterProps) => {
    const {
        isOpen: isOpenDatePicker,
        onClose: onCloseDatePicker,
        onOpen: onOpenDatePicker,
    } = useDisclose();

    const onDatePickerChange = (_: Event, newDate?: Date | undefined) => {
        const currentDate = newDate || date;
        onCloseDatePicker();
        setDate(currentDate);
    };

    return (
        <>
            <Pressable
                borderWidth="1px"
                borderColor="#AEADB5"
                borderRadius="5px"
            >
                <Flex paddingX="6px" paddingY="4px">
                    <Text lineHeight="15px" fontWeight="500">
                        {format(date, 'dd/MM/yy')}
                    </Text>
                </Flex>
            </Pressable>
            {isOpenDatePicker && (
                <DateTimePicker
                    locale="pt-BR"
                    mode="date"
                    display="default"
                    value={date}
                    is24Hour={true}
                    onChange={onDatePickerChange}
                />
            )}
        </>
    );
};

export type { DateFilterProps };
export { DateFilter };
