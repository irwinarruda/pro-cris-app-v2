import React from 'react';
import { Image } from 'react-native';
import { Flex, Text, Icon } from 'native-base';
import { default as Collapsible } from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { PressableIcon } from 'app/components/atoms/PressableIcon';
import { AdjustmentsIcon } from 'app/components/atoms/AdjustmentsIcon';
import { Pressable } from 'app/components/atoms/Pressable';

import EmojiPlaceholder from 'app/assets/emoji-placeholder.png';

type ProCrisStudentsOverviewProps = {
    children?: React.ReactNode;
    isExpanded: boolean;
    setIsExpanded(isExpanded: boolean): void;
};

const ProCrisStudentsOverview = ({
    isExpanded,
    setIsExpanded,
}: ProCrisStudentsOverviewProps) => {
    const navigation = useNavigation();

    return (
        <>
            <Collapsible collapsed={isExpanded}>
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingX="20px"
                    paddingTop="16px"
                >
                    <Flex flex="1" flexDirection="row">
                        <Image
                            source={
                                false
                                    ? { uri: 'avatar' }
                                    : (EmojiPlaceholder as any)
                            }
                            style={{ width: 60, height: 60 }}
                            accessibilityLabel="Aluno"
                        />
                        <Flex marginLeft="15px">
                            <Text lineHeight="21px" fontSize="md" isTruncated>
                                Aluno:{' '}
                                <Text fontWeight="600">Irwin Arruda</Text>
                            </Text>
                            <Text lineHeight="16px" isTruncated>
                                Nascimento:{' '}
                                <Text fontWeight="600">07/01/2000</Text>
                            </Text>
                            <Text lineHeight="13px" isTruncated>
                                Responsável:{' '}
                                <Text fontWeight="600">
                                    Cristiani Arruda Cristiani Arruda Cristiani
                                    Arruda Cristiani Arruda Cristiani Arruda
                                </Text>
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        flex="0.46"
                        justifyContent="center"
                        alignItems="flex-end"
                    >
                        <PressableIcon
                            size="50px"
                            icon={<AdjustmentsIcon size="22px" />}
                            marginRight="-13px"
                            onPress={() =>
                                navigation.navigate('ManageStudent', {
                                    title: 'Editar Aluno',
                                    type: 'edit',
                                })
                            }
                        />
                    </Flex>
                </Flex>
            </Collapsible>
            <Pressable
                width="100%"
                borderBottomWidth="1px"
                borderBottomColor="gray.400"
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <Flex
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    paddingY="4px"
                >
                    <Text color="gray.400" fontWeight="500">
                        {!isExpanded
                            ? 'Parar de Visualizar'
                            : 'Visualizar Aluno'}
                    </Text>
                    <Icon
                        as={MaterialCommunityIcons}
                        name={
                            !isExpanded
                                ? 'arrow-expand-up'
                                : 'arrow-expand-down'
                        }
                        size="16px"
                        marginLeft="6px"
                        marginTop="2px"
                        color="gray.400"
                    />
                </Flex>
            </Pressable>
        </>
    );
};

export type { ProCrisStudentsOverviewProps };
export { ProCrisStudentsOverview };
