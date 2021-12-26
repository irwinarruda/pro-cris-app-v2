import React from 'react';
import { Flex, Text, Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { ProCrisLogo } from 'app/components/atoms/ProCrisLogo';

type ProCrisHeaderProps = NativeStackHeaderProps;

const ProCrisHeader = ({
    navigation,
    options,
    route,
    back,
}: ProCrisHeaderProps) => {
    return (
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
                <Icon
                    as={Entypo}
                    name="dots-three-vertical"
                    size="20px"
                    color="white"
                    marginRight="-10px"
                />
            </Flex>
        </Flex>
    );
};
export { ProCrisHeader };
