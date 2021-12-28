import React from 'react';
import { Flex, Text, Checkbox } from 'native-base';

import { Pressable, PressableProps } from 'app/components/atoms/Pressable';

type BasicViewCardProps = PressableProps & {
    topText?: React.ReactNode;
    bottomText?: React.ReactNode;
    checkboxText?: React.ReactNode;
    isChecked?: boolean;
};

const BasicViewCard = ({
    topText,
    bottomText,
    checkboxText,
    isChecked,
    ...props
}: BasicViewCardProps) => {
    return (
        <Pressable
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="5px"
            bgColor="white"
            shadow="0"
            {...props}
        >
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                paddingX="10px"
                paddingY="8px"
            >
                <Flex>
                    <Text fontWeight="600">{topText}</Text>
                    <Text fontWeight="600" fontSize="sm">
                        {bottomText}
                    </Text>
                </Flex>
                <Checkbox
                    value=""
                    colorScheme="purple"
                    isChecked={isChecked}
                    isDisabled
                    size="sm"
                >
                    <Text marginLeft="5px" fontWeight="600">
                        {checkboxText}
                    </Text>
                </Checkbox>
            </Flex>
        </Pressable>
    );
};

export type { BasicViewCardProps };
export { BasicViewCard };
