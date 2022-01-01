import React from 'react';
import { Flex, IFlexProps, Stagger, Icon, Text, ITextProps } from 'native-base';
import { Entypo } from '@expo/vector-icons';

import { FAB, FABProps } from 'app/components/atoms/FAB';
import { Pressable, PressableProps } from 'app/components/atoms/Pressable';

type ProCrisStaggerIconProps = Omit<PressableProps, 'size'> & {
    icon: React.ReactNode;
    label?: string;
    containerProps?: IFlexProps;
    labelProps?: ITextProps;
    onToggle?: () => void;
    toggleOnPressEnd?: boolean;
};

const ProCrisStaggerIcon = ({
    icon,
    label,
    containerProps,
    labelProps,
    onPress,
    onToggle,
    toggleOnPressEnd,
    ...props
}: ProCrisStaggerIconProps) => {
    const handleButtonPress = (pointerInside: boolean) => {
        if (onPress) {
            onPress(pointerInside);
        }
        if (toggleOnPressEnd && onToggle) {
            onToggle();
        }
    };

    return (
        <Pressable
            borderRadius="10000px"
            onPress={handleButtonPress}
            shadow="1"
            {...props}
        >
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                paddingX="10px"
                paddingY={label ? '8px' : '10px'}
                {...containerProps}
            >
                {label && (
                    <Flex marginRight="5px">
                        <Text
                            color="white"
                            lineHeight="20px"
                            fontSize="md"
                            fontWeight="700"
                            {...labelProps}
                        >
                            {label}
                        </Text>
                    </Flex>
                )}
                <Flex>{icon}</Flex>
            </Flex>
        </Pressable>
    );
};

type ProCrisStaggerProps = IFlexProps & {
    children?: React.ReactNode;
    fabProps?: FABProps;
    itemSpace?: string;
    isOpen: boolean;
    onToggle: () => void;
};

const ProCrisStagger = ({
    children,
    isOpen,
    fabProps,
    itemSpace = '10px',
    onToggle,
    ...props
}: ProCrisStaggerProps) => {
    const childArr = React.Children.toArray(
        children,
    ) as React.ReactElement<ProCrisStaggerIconProps>[];
    return (
        <>
            <Flex
                alignItems="flex-end"
                position="absolute"
                right="28px"
                bottom="90px"
                {...props}
            >
                <Stagger
                    visible={isOpen}
                    initial={{
                        opacity: 0,
                        scale: 0,
                        translateY: 34,
                    }}
                    animate={{
                        translateY: 0,
                        scale: 1,
                        opacity: 1,
                        transition: {
                            type: 'spring',
                            mass: 0.8,
                            stagger: {
                                offset: 30,
                                reverse: true,
                            },
                        },
                    }}
                    exit={{
                        translateY: 34,
                        scale: 0.5,
                        opacity: 0,
                        transition: {
                            duration: 100,
                            stagger: {
                                offset: 30,
                                reverse: true,
                            },
                        },
                    }}
                >
                    {childArr.map((child) => {
                        return React.cloneElement(child, {
                            onToggle,
                            marginBottom: itemSpace,
                        });
                    })}
                </Stagger>
            </Flex>
            <FAB
                icon={
                    <Icon
                        as={Entypo}
                        name="dots-three-horizontal"
                        color="white"
                    />
                }
                onPress={onToggle}
                {...fabProps}
            />
        </>
    );
};

export type { ProCrisStaggerProps, ProCrisStaggerIconProps };
export { ProCrisStagger, ProCrisStaggerIcon };
