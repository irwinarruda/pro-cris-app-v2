import React from 'react';
import { Flex, IFlexProps } from 'native-base';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { ProCrisLogo } from 'app/components/atoms/ProCrisLogo';

type ProCrisBannerProps = IFlexProps;

const ProCrisBanner = ({ ...props }: ProCrisBannerProps) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="150px"
            paddingTop={`${getStatusBarHeight() + 15}px`}
            bgColor="purple.500"
            {...props}
        >
            <ProCrisLogo width="235px" />
        </Flex>
    );
};

export type { ProCrisBannerProps };
export { ProCrisBanner };
