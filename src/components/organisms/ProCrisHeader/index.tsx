import React from 'react';
import { Flex, Icon, Text } from 'native-base';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { PressableIcon } from 'app/components/atoms/PressableIcon';
import { ProCrisLogo } from 'app/components/atoms/ProCrisLogo';
import { HeaderMenu } from 'app/components/molecules/HeaderMenu';

type ProCrisHeaderProps = NativeStackHeaderProps;

const ProCrisHeader = (props: ProCrisHeaderProps) => {
    const { navigation, route } = props;
    return route.name === 'TabRoute' ? (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
            bgColor="purple.500"
            paddingTop={`${getStatusBarHeight() + 14}px`}
            paddingBottom="8px"
            paddingX="20px"
        >
            <ProCrisLogo width="122px" height="44px" />
            <Flex>
                <HeaderMenu {...props} />
            </Flex>
        </Flex>
    ) : (
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            bgColor="purple.500"
            paddingTop={`${getStatusBarHeight() + 14}px`}
            paddingBottom="8px"
            paddingX="20px"
        >
            <PressableIcon
                position="absolute"
                left="5px"
                top={`${getStatusBarHeight() + 18}px`}
                size="40px"
                icon={
                    <Icon
                        as={AntDesign}
                        size="25px"
                        name="left"
                        color="white"
                    />
                }
                rippleColor="rgba(255, 255, 255, 0.1)"
                onPress={() => navigation.goBack()}
            />
            <Flex height="44px" justifyContent="center">
                <Text color="white" fontSize="lg" fontWeight="700">
                    {(route.params as any)?.title}
                </Text>
            </Flex>
        </Flex>
    );
};

export type { ProCrisHeaderProps };
export { ProCrisHeader };
