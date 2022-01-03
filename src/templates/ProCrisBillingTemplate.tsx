import React from 'react';
import { format } from 'date-fns';
import { Flex, VStack, Text } from 'native-base';

import { Student } from 'app/entities/Student';
import { FormatHelpers } from 'app/utils/FormatHelpers';

import { ProCrisLogo } from 'app/components/atoms/ProCrisLogo';
import { Appointment } from 'app/entities/Appointment';

type ProCrisBillingTemplateProps = {
    student: Student;
    appointments: Appointment[];
};

const ProCrisBillingTemplate = React.forwardRef<
    any,
    ProCrisBillingTemplateProps
>(function ProCrisBillingTemplateComponent({ student, appointments }, ref) {
    return (
        <Flex
            flexDirection="column"
            maxWidth="354px"
            margin="0px"
            padding="0px"
            borderWidth="2px"
            borderColor="gold.500"
            borderRadius="0px"
            overflow="hidden"
            ref={ref}
        >
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                paddingY="8px"
                paddingX="16px"
                bgColor="purple.500"
            >
                <ProCrisLogo width="110px" height="30px" />
                <Flex>
                    <Text fontSize="xs" fontWeight="600" color="white">
                        Aluno(a): {student.name}
                    </Text>
                    <Text fontSize="xs" fontWeight="600" color="white">
                        Obrigada pela confiança!
                    </Text>
                </Flex>
            </Flex>
            <Flex paddingY="16px" paddingX="24px" bgColor="white">
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    flexWrap="wrap"
                    margin="-4px"
                >
                    {appointments.map((appointment) => (
                        <Flex
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                            width="54px"
                            height="22px"
                            margin="4px"
                            bgColor={
                                !appointment.is_extra
                                    ? 'purple.500'
                                    : 'gray.500'
                            }
                            borderColor="gold.500"
                            borderWidth="1px"
                            borderRadius="3px"
                            key={appointment.id}
                        >
                            <Text
                                lineHeight="sm"
                                color="white"
                                fontWeight="500"
                                fontSize="sm"
                            >
                                {format(appointment.date, 'dd/MM')}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop="25px"
                >
                    <VStack space="4px">
                        <Flex
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Flex
                                width="17px"
                                height="17px"
                                marginRight="4px"
                                bgColor="purple.500"
                                borderColor="gold.500"
                                borderWidth="1px"
                                borderRadius="10000px"
                            ></Flex>
                            <Text
                                lineHeight="2xs"
                                fontSize="2xs"
                                fontWeight="500"
                                color="black"
                            >
                                Aulas Normais
                            </Text>
                        </Flex>
                        <Flex
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Flex
                                width="17px"
                                height="17px"
                                marginRight="4px"
                                bgColor="gray.500"
                                borderColor="gold.500"
                                borderWidth="1px"
                                borderRadius="10000px"
                            ></Flex>
                            <Text
                                lineHeight="2xs"
                                fontSize="2xs"
                                fontWeight="500"
                                color="black"
                            >
                                Aulas Extras
                            </Text>
                        </Flex>
                    </VStack>
                    <Flex>
                        <Text
                            lineHeight="md"
                            fontSize="md"
                            fontWeight="600"
                            color="black"
                        >
                            Quantidade de Aulas: {appointments.length}
                        </Text>
                        <Text
                            lineHeight="md"
                            fontSize="md"
                            fontWeight="600"
                            color="black"
                        >
                            Total a Pagar: R${' '}
                            {appointments.reduce((previous, current) => {
                                return (
                                    previous +
                                    FormatHelpers.formatRSStringToNumber(
                                        current.cost.price,
                                    )
                                );
                            }, 0)}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
});

export type { ProCrisBillingTemplateProps };
export { ProCrisBillingTemplate };
