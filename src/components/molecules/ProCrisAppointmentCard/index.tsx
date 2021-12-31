import React from 'react';
import { format, isAfter } from 'date-fns';
import { Flex, IFlexProps, Image, Icon, Text } from 'native-base';

import { DateHelpers } from 'app/utils/DateHelpers';

import { Pressable } from 'app/components/atoms/Pressable';
import { AntDesign } from '@expo/vector-icons';

import EmojiPlaceholder from 'app/assets/emoji-placeholder.png';

const appointmentStatus = {
    ongoing: { name: 'minuscircle', text: 'Andamento' },
    finished: { name: 'checkcircle', text: 'Finalizada' },
    undone: { name: 'closesquare', text: 'Faltantes' },
};

type ProCrisAppointmentCardProps = IFlexProps & {
    name?: string;
    observation?: string;
    avatar?: string;
    color?: string;
    date?: Date;
    cost?: {
        id: string;
        time: string;
        price: string;
    };
    onPress?(pointerInside: boolean): void;
    disabled?: boolean;
};

const ProCrisAppointmentCard = ({
    name,
    observation,
    avatar,
    color,
    date,
    cost,
    disabled,
    onPress,
    ...props
}: ProCrisAppointmentCardProps) => {
    const dateBegin = React.useMemo(() => date || new Date(), []);
    const dateEnd = React.useMemo(
        () =>
            DateHelpers.getEndDateByTime(date || new Date(), cost?.time || ''),
        [],
    );
    const checkDateStatus = (date: Date): keyof typeof appointmentStatus => {
        if (
            DateHelpers.isBetweenTwoDates(date, {
                start: dateBegin,
                end: dateEnd,
            })
        ) {
            return 'ongoing';
        } else if (isAfter(date, dateBegin)) {
            return 'finished';
        } else {
            return 'undone';
        }
    };
    return (
        <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            opacity={disabled ? 0.7 : 1}
            {...props}
        >
            <Flex width="14%" alignItems="center">
                <Text textAlign="center" fontSize="md" fontWeight="700">
                    {format(dateBegin, 'HH:mm')}
                </Text>
                <Flex
                    width="6px"
                    height="1px"
                    borderRadius="10000px"
                    bgColor="black"
                ></Flex>
                <Text lineHeight="16px" textAlign="center" fontSize="xs">
                    {format(dateEnd, 'HH:mm')}
                </Text>
            </Flex>
            <Pressable
                flex="1"
                width="100%"
                marginLeft="10px"
                shadow="1"
                borderRadius="5px"
                bgColor={color || 'purple.100'}
                onPress={onPress}
                enabled={!disabled}
                opacity={disabled ? 0.3 : 1}
            >
                <Flex
                    width="100%"
                    paddingX="10px"
                    paddingY="10px"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Flex
                        flex="0.65"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="flex-start"
                    >
                        <Image
                            marginTop="5px"
                            width="35px"
                            height="35px"
                            borderRadius="1000px"
                            source={
                                avatar
                                    ? { uri: avatar }
                                    : (EmojiPlaceholder as any)
                            }
                            alt={`Aluno ${name}`}
                        />
                        <Flex marginLeft="8px">
                            <Text isTruncated>
                                Aluno: <Text fontWeight="700">{name}</Text>
                            </Text>
                            <Text fontSize="xs" lineHeight="14px" isTruncated>
                                Obs:{' '}
                                <Text fontWeight="700" fontSize="xs">
                                    {observation}
                                </Text>
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        justifyContent="flex-end"
                        alignItems="center"
                        flex="0.22"
                    >
                        <Flex
                            width="100%"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Icon
                                as={AntDesign}
                                size="20px"
                                name={
                                    appointmentStatus[
                                        checkDateStatus(new Date())
                                    ].name
                                }
                            />
                            <Text fontSize="2xs">
                                {
                                    appointmentStatus[
                                        checkDateStatus(new Date())
                                    ].text
                                }
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Pressable>
        </Flex>
    );
};

export type { ProCrisAppointmentCardProps };
export { ProCrisAppointmentCard };
