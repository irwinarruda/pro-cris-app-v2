import React from 'react';
import { Flex, Checkbox, Text } from 'native-base';
import { format } from 'date-fns';

import { Student } from 'app/entities/Student';
import { Appointment } from 'app/entities/Appointment';

import { Pressable } from 'app/components/atoms/Pressable';
import { CardIcon } from 'app/components/atoms/CardIcon';

import { SummaryType } from 'app/hooks/Summary';

type ProCrisAppointmentTableItemProps = {
    appointment: Appointment & {
        student: Omit<Student, 'appointments' | 'costs' | 'schedules'>;
    };
    onPress: (
        appointment: Appointment & {
            student: Omit<Student, 'appointments' | 'costs' | 'schedules'>;
        },
    ) => void;
    onPayPress?: (
        appointment: Appointment & {
            student: Omit<Student, 'appointments' | 'costs' | 'schedules'>;
        },
    ) => void;
    summaryType: SummaryType;
};

const ProCrisAppointmentTableItem = ({
    appointment,
    onPress,
    onPayPress,
    summaryType,
}: ProCrisAppointmentTableItemProps) => {
    return (
        <Pressable
            width="100%"
            bgColor="white"
            borderColor="gray.100"
            borderWidth="1px"
            borderRadius="5px"
            onPress={() => onPress(appointment)}
            key={appointment.id}
        >
            <Flex flexDirection="row" justifyContent="space-between">
                <Flex width="34%" paddingY="8px" paddingLeft="8px">
                    <Text fontWeight="600">
                        {format(appointment.date, 'dd/MM/yyyy')}
                    </Text>
                </Flex>
                <Flex width="21%" paddingY="8px">
                    <Text fontWeight="600">{appointment.cost.price}</Text>
                </Flex>
                <Flex
                    width="12%"
                    paddingY="8px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Checkbox
                        value=""
                        accessibilityLabel="É aula extra?"
                        colorScheme="purple"
                        isChecked={appointment.is_extra}
                        isDisabled
                        size="sm"
                    />
                </Flex>
                {summaryType === 'notpaid' && (
                    <Pressable
                        width="16%"
                        onPress={() => onPayPress?.(appointment)}
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            paddingY="8px"
                        >
                            <CardIcon size="23px" />
                        </Flex>
                    </Pressable>
                )}
            </Flex>
        </Pressable>
    );
};

export type { ProCrisAppointmentTableItemProps };
export { ProCrisAppointmentTableItem };
