import React from 'react';
import { Flex } from 'native-base';

import { Pressable, PressableProps } from 'app/components/atoms/Pressable';

const fabSizesStyles = {
    sm: {
        container: {
            width: '52px',
            height: '52px',
        },
    },
    md: {
        container: {
            width: '60px',
            height: '60px',
        },
    },
    lg: {
        container: {
            width: '80px',
            height: '80px',
        },
    },
};

type FABProps = PressableProps & {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    size?: keyof typeof fabSizesStyles;
};

const FAB = ({ icon, size = 'md', ...props }: FABProps) => {
    return (
        <Pressable
            position="absolute"
            right="20px"
            bottom="30px"
            zIndex="10000"
            borderRadius="1000px"
            bgColor="gold.300"
            shadow="fab"
            {...fabSizesStyles[size as keyof typeof fabSizesStyles].container}
            {...props}
        >
            <Flex
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
            >
                {icon}
            </Flex>
        </Pressable>
    );
};

export type { FABProps };
export { FAB };
