import React from 'react';
import { Box, Flex, Text } from 'native-base';

type StudentsProps = {
    children?: React.ReactNode;
};
const Students = ({}: StudentsProps) => {
    return (
        <Box>
            <Text>Hello world</Text>
        </Box>
    );
};
export { Students };
