import React from 'react';
import { Flex, HStack, Text } from 'native-base';

type AppointmentsProps = {
    children?: React.ReactNode;
};
const Appointments = ({}: AppointmentsProps) => {
    return (
        <Flex>
            <HStack justifyContent="center">
                <Text>Aulas</Text>
            </HStack>
        </Flex>
    );
};
export { Appointments };
