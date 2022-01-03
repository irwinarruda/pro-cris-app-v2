import React from 'react';
import { isPast } from 'date-fns';
import { Flex, Text, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { FormatHelpers } from 'app/utils/FormatHelpers';

import { Pressable } from 'app/components/atoms/Pressable';

import { useStudentStore } from 'app/store/Student/Student.hook';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';

type ProCrisStatusProps = {
    children?: React.ReactNode;
};

const ProCrisStatus = ({}: ProCrisStatusProps) => {
    const { appointments } = useAppointmentStore('status');
    const [classesVisible, setClassesVisible] = React.useState(false);
    const [priceVisible, setPriceVisible] = React.useState(false);

    const handleToggleClasses = () => {
        setClassesVisible((prev) => !prev);
    };

    const handleTogglePrice = () => {
        setPriceVisible((prev) => !prev);
    };

    return (
        <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            borderBottomColor="purple.100"
            borderBottomWidth="2px"
        >
            <Pressable
                flex="1"
                borderRightWidth="1px"
                borderRightColor="purple.100"
                borderLeftWidth="2px"
                borderLeftColor="purple.100"
                onPress={handleToggleClasses}
            >
                <Flex
                    accessible
                    accessibilityRole="switch"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    paddingY="8px"
                >
                    {!classesVisible ? (
                        <>
                            <Text fontWeight="400" fontSize="sm">
                                Quantidade de Aulas:
                            </Text>
                            <Icon
                                as={AntDesign}
                                name="caretdown"
                                size="16px"
                                marginLeft="3px"
                            />
                        </>
                    ) : (
                        <Text>
                            {
                                FormatHelpers.getValidNotPaiedAppointments(
                                    appointments,
                                ).length
                            }{' '}
                            aulas
                        </Text>
                    )}
                </Flex>
            </Pressable>
            <Pressable
                flex="1"
                borderRightWidth="2px"
                borderRightColor="purple.100"
                borderLeftWidth="1px"
                borderLeftColor="purple.100"
                onPress={handleTogglePrice}
            >
                <Flex
                    accessible
                    accessibilityRole="switch"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    paddingY="8px"
                >
                    {!priceVisible ? (
                        <>
                            <Text fontWeight="400" fontSize="sm">
                                Valor a receber:
                            </Text>
                            <Icon
                                as={AntDesign}
                                name="caretdown"
                                size="16px"
                                marginLeft="3px"
                            />
                        </>
                    ) : (
                        <Text>
                            R{'$ '}
                            {FormatHelpers.getValidNotPaiedAppointments(
                                appointments,
                            ).reduce((previous, current) => {
                                return (
                                    previous +
                                    FormatHelpers.formatRSStringToNumber(
                                        current.cost.price,
                                    )
                                );
                            }, 0)}
                        </Text>
                    )}
                </Flex>
            </Pressable>
        </Flex>
    );
};

export type { ProCrisStatusProps };
export { ProCrisStatus };
