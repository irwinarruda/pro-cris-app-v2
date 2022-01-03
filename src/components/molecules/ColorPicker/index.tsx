import React from 'react';
import {
    Flex,
    HStack,
    Popover,
    IPopoverProps,
    Text,
    ScrollView,
    Button,
    VStack,
} from 'native-base';

import { Colors } from 'app/entities/Colors';

import { Pressable } from 'app/components/atoms/Pressable';

type ColorPickerProps = Omit<IPopoverProps, 'trigger' | 'children'> & {
    value?: string;
    error?: string;
    onColorChange?(color: string): void;
};

const ColorPicker = ({
    placement = 'top',
    value,
    error,
    onColorChange,
    ...props
}: ColorPickerProps) => {
    return (
        <Popover
            {...props}
            placement={placement}
            trigger={(triggerProps) => (
                <VStack>
                    <HStack alignItems="center">
                        <Text fontSize="md" fontWeight="600" lineHeight="sm">
                            Escolher Cor
                        </Text>
                        <Pressable
                            marginLeft="6px"
                            bgColor={value}
                            borderRadius="1000px"
                            rippleColor="rgba(0, 0, 0, 0.2)"
                            {...triggerProps}
                        >
                            <Flex width="32px" height="32px"></Flex>
                        </Pressable>
                    </HStack>
                    {error && (
                        <Text fontSize="2xs" height="12px">
                            {error}
                        </Text>
                    )}
                </VStack>
            )}
        >
            <Popover.Content
                accessibilityLabel="Adicionar Cor"
                width="290px"
                bgColor="white"
                borderColor="gold.500"
                borderWidth="2px"
            >
                <Popover.Arrow borderColor="gold.500" />
                <Popover.Body
                    paddingX="10px"
                    paddingTop="15px"
                    paddingBottom="8px"
                >
                    <ScrollView horizontal paddingBottom="7px">
                        <HStack space="2px" margin="0px">
                            {Object.values(Colors).map((color) => (
                                <Button
                                    width="36px"
                                    height="36px"
                                    paddingX="0px"
                                    paddingY="0px"
                                    marginLeft="6px"
                                    bgColor={color}
                                    borderRadius="1000px"
                                    onPress={() => {
                                        if (onColorChange) {
                                            onColorChange(color);
                                        }
                                    }}
                                    _pressed={{
                                        opacity: '0.5',
                                    }}
                                    key={color}
                                />
                            ))}
                        </HStack>
                    </ScrollView>
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};

export type { ColorPickerProps };
export { ColorPicker };
