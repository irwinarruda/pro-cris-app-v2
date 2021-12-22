import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { ProCrisLogo } from 'app/components/atoms/ProCrisLogo';
import { DismissKeyboard } from 'app/components/atoms/DismissKeyboard';
import { Button } from 'app/components/atoms/Button';
import { FormText } from 'app/components/molecules/FormText';

type SignInProps = {
    children?: React.ReactNode;
};

const SignIn = ({}: SignInProps) => {
    return (
        <DismissKeyboard>
            <Box flex="1" alignItems="center" justifyContent="flex-start">
                <Box
                    alignItems="center"
                    justifyContent="flex-end"
                    width="100%"
                    height="150px"
                    paddingTop={`${getStatusBarHeight() + 15}px`}
                    bgColor="purple.500"
                >
                    <ProCrisLogo width="235px" />
                </Box>
                <Box width="100%" paddingX="20px" marginTop="15px">
                    <Text fontSize="22px" fontWeight="700" textAlign="left">
                        Fazer Login
                    </Text>
                </Box>
                <VStack width="100%" space="4" paddingX="20px" marginTop="18px">
                    <FormText label="Email" size="lg" />
                    <FormText label="Senha" size="lg" />
                </VStack>
                <HStack marginTop="20px" justifyContent="center">
                    <Button size="md">Fazer Login</Button>
                </HStack>
                <HStack justifyContent="center">
                    <Text
                        color="gold.600"
                        fontWeight="600"
                        fontSize="md"
                        textDecoration="underline"
                        textDecorationLine="underline"
                    >
                        Criar conta
                    </Text>
                </HStack>
            </Box>
        </DismissKeyboard>
    );
};

export { SignIn };
