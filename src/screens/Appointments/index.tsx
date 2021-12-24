import React from 'react';
import { Box, HStack } from 'native-base';

import { Button } from 'app/components/atoms/Button';
import { ProCrisBanner } from 'app/components/molecules/ProCrisBanner';

import { useUserStore } from 'app/hooks/UserStore';

type AppointmentsProps = {
    children?: React.ReactNode;
};
const Appointments = ({}: AppointmentsProps) => {
    const { signOut } = useUserStore();
    const onButtonPress = async () => {
        await signOut();
    };

    return (
        <Box>
            <ProCrisBanner />
            <HStack justifyContent="center">
                <Button size="lg" marginTop="20px" onPress={onButtonPress}>
                    Logout
                </Button>
            </HStack>
        </Box>
    );
};
export { Appointments };
