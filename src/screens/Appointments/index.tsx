import React from 'react';
import { Box, HStack } from 'native-base';

import { Button } from 'app/components/atoms/Button';

import { useError } from 'app/hooks/Error';
import { useUserStore } from 'app/store/User/User.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';

type AppointmentsProps = {
    children?: React.ReactNode;
};
const Appointments = ({}: AppointmentsProps) => {
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const { signOut } = useUserStore();

    const onButtonPress = async () => {
        setLoading(true);
        setLoading(false);
        try {
            setLoading(true);
            await signOut();
        } catch (err) {
            showError(err, { title: 'Erro ao fazer Logout' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <HStack justifyContent="center">
                <Button size="lg" marginTop="20px" onPress={onButtonPress}>
                    Logout
                </Button>
            </HStack>
        </Box>
    );
};
export { Appointments };
