import React from 'react';
import { Flex, Text, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import { Pressable } from 'app/components/atoms/Pressable';

type ProCrisStatusProps = {
    children?: React.ReactNode;
};

const ProCrisStatus = ({}: ProCrisStatusProps) => {
    const [classesVisible, setClassesVisible] = React.useState(false);
    const [priceVisible, setPriceVisible] = React.useState(false);

    const handleToggleClasses = () => {
        setClassesVisible((prev) => !prev);
    };

    const handleTogglePrice = () => {
        setPriceVisible((prev) => !prev);
    };

    return (
        <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            borderBottomColor="purple.100"
            borderBottomWidth="2px"
        >
            <Pressable
                flex="1"
                borderRightWidth="1px"
                borderRightColor="purple.100"
                borderLeftWidth="1px"
                borderLeftColor="purple.100"
                onPress={handleToggleClasses}
            >
                <Flex
                    accessible
                    accessibilityRole="switch"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    paddingY="8px"
                >
                    {!classesVisible ? (
                        <>
                            <Text fontWeight="400" fontSize="14px">
                                Quantidade de Aulas:
                            </Text>
                            <Icon
                                as={AntDesign}
                                name="caretdown"
                                size="16px"
                                marginLeft="3px"
                            />
                        </>
                    ) : (
                        <Text>300 aulas</Text>
                    )}
                </Flex>
            </Pressable>
            <Pressable
                flex="1"
                borderRightWidth="1px"
                borderRightColor="purple.100"
                borderLeftWidth="1px"
                borderLeftColor="purple.100"
                onPress={handleTogglePrice}
            >
                <Flex
                    accessible
                    accessibilityRole="switch"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    paddingY="8px"
                >
                    {!priceVisible ? (
                        <>
                            <Text fontWeight="400" fontSize="14px">
                                Valor a receber:
                            </Text>
                            <Icon
                                as={AntDesign}
                                name="caretdown"
                                size="16px"
                                marginLeft="3px"
                            />
                        </>
                    ) : (
                        <Text>2000 reais</Text>
                    )}
                </Flex>
            </Pressable>
        </Flex>
    );
};

export type { ProCrisStatusProps };
export { ProCrisStatus };
