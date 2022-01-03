import React from 'react';
import { Flex, Image, Text } from 'native-base';

import { Pressable, PressableProps } from 'app/components/atoms/Pressable';
import { PressableIcon } from 'app/components/atoms/PressableIcon';
import { AdjustmentsIcon } from 'app/components/atoms/AdjustmentsIcon';

import EmojiPlaceholder from 'app/assets/emoji-placeholder.png';

type ProCrisStudentCardProps = PressableProps & {
    name?: string;
    name_caregiver?: string;
    avatar?: string;
    color?: string;
    onIconPress?(pointerInside: boolean): void;
};

const ProCrisStudentCard = ({
    name,
    name_caregiver,
    avatar,
    color,
    onIconPress,
    ...props
}: ProCrisStudentCardProps) => {
    return (
        <Pressable
            width="100%"
            borderRadius="5px"
            bgColor={color || 'purple.100'}
            shadow="1"
            {...props}
        >
            <Flex
                width="100%"
                paddingX="16px"
                paddingY="5px"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Flex
                    flex="1.5"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Image
                        marginTop="5px"
                        width="35px"
                        height="35px"
                        borderRadius="1000px"
                        source={
                            avatar ? { uri: avatar } : (EmojiPlaceholder as any)
                        }
                        alt={`Aluno ${name}`}
                    />
                    <Flex marginLeft="8px">
                        <Text fontSize="md" isTruncated>
                            Aluno:{' '}
                            <Text fontWeight="700" fontSize="md">
                                {name}
                            </Text>
                        </Text>
                        <Text fontSize="sm" lineHeight="xs" isTruncated>
                            Responsável:{' '}
                            <Text fontWeight="700" fontSize="sm">
                                {name_caregiver}
                            </Text>
                        </Text>
                    </Flex>
                </Flex>
                <PressableIcon
                    size="50px"
                    icon={<AdjustmentsIcon size="22px" />}
                    marginRight="-13px"
                    onPress={onIconPress}
                />
            </Flex>
        </Pressable>
    );
};

export type { ProCrisStudentCardProps };
export { ProCrisStudentCard };
