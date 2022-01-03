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
    name?: string;
    date_of_birth?: string;
    name_caregiver?: string;
    avatar?: string;
    isExpanded: boolean;
    setIsExpanded(isExpanded: boolean): void;
    onPress?(pointerInside: boolean): void;
};

const ProCrisStudentsOverview = ({
    isExpanded,
    name,
    date_of_birth,
    name_caregiver,
    avatar,
    setIsExpanded,
    onPress,
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
                                avatar
                                    ? { uri: avatar }
                                    : (EmojiPlaceholder as any)
                            }
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10000,
                            }}
                            accessibilityLabel="Aluno"
                        />
                        <Flex marginLeft="15px">
                            <Text lineHeight="md" fontSize="md" isTruncated>
                                Aluno:{' '}
                                <Text fontWeight="600" fontSize="md">
                                    {name}
                                </Text>
                            </Text>
                            <Text lineHeight="xs" isTruncated>
                                Nascimento:{' '}
                                <Text fontWeight="600">{date_of_birth}</Text>
                            </Text>
                            <Text lineHeight="2xs" isTruncated>
                                Responsável:{' '}
                                <Text fontWeight="600">{name_caregiver}</Text>
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
                            onPress={onPress}
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
