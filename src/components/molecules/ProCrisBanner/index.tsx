import React from 'react';
import { Box, IBoxProps } from 'native-base';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { ProCrisLogo } from 'app/components/atoms/ProCrisLogo';

type ProCrisBannerProps = IBoxProps;
const ProCrisBanner = ({ ...props }: ProCrisBannerProps) => {
    return (
        <Box
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
            height="150px"
            paddingTop={`${getStatusBarHeight() + 15}px`}
            bgColor="purple.500"
            {...props}
        >
            <ProCrisLogo width="235px" />
        </Box>
    );
};
export { ProCrisBanner };
