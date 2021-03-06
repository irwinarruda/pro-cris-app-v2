import React from 'react';
import { Flex, Text, IFlexProps } from 'native-base';
import {
    RectButton,
    RectButtonProps,
    BaseButton,
    BaseButtonProps,
} from 'react-native-gesture-handler';

const buttonSizesStyles = {
    sm: {
        rect: {
            height: '34px',
        },
        text: {
            fontSize: 'xs',
            lineHeight: 'xs',
        },
    },
    md: {
        rect: {
            height: '40px',
        },
        text: {
            fontSize: 'sm',
            lineHeight: 'xs',
        },
    },
    lg: {
        rect: {
            height: '45px',
        },
        text: {
            fontSize: 'md',
            lineHeight: 'sm',
        },
    },
};

type ButtonProps = IFlexProps &
    BaseButtonProps & {
        children?: React.ReactNode;
        size?: keyof typeof buttonSizesStyles;
        colorScheme?: string;
        leftIcon?: React.ReactNode;
    };
const Button = React.forwardRef<any, ButtonProps>(function ButtonComponent(
    {
        children,
        size = 'md',
        leftIcon,
        colorScheme,
        onPress,
        onActiveStateChange,
        style,
        testID,
        exclusive,
        rippleColor,
        shouldActivateOnStart,
        disallowInterruption,
        id,
        enabled,
        minPointers,
        waitFor,
        simultaneousHandlers,
        shouldCancelWhenOutside,
        hitSlop,
        onBegan,
        onFailed,
        onCancelled,
        onActivated,
        onEnded,
        onGestureEvent,
        onHandlerStateChange,
        ...props
    },
    ref,
) {
    return (
        <Flex
            bgColor={colorScheme ? colorScheme : 'purple.500'}
            borderRadius="5px"
            borderColor="gold.300"
            borderWidth="1"
            borderStyle="solid"
            overflow="hidden"
            {...buttonSizesStyles[size as keyof typeof buttonSizesStyles].rect}
            {...props}
        >
            <BaseButton
                ref={ref}
                onPress={onPress}
                onActiveStateChange={onActiveStateChange}
                testID={testID}
                exclusive={exclusive}
                rippleColor={rippleColor}
                shouldActivateOnStart={shouldActivateOnStart}
                disallowInterruption={disallowInterruption}
                id={id}
                style={{ width: '100%', height: 'auto', ...(style as any) }}
                enabled={enabled}
                minPointers={minPointers}
                waitFor={waitFor}
                simultaneousHandlers={simultaneousHandlers}
                shouldCancelWhenOutside={shouldCancelWhenOutside}
                hitSlop={hitSlop}
                onBegan={onBegan}
                onFailed={onFailed}
                onCancelled={onCancelled}
                onActivated={onActivated}
                onEnded={onEnded}
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
            >
                <Flex
                    accessible
                    accessibilityRole="button"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    paddingBottom="4px"
                    paddingTop="4px"
                    paddingX="18px"
                >
                    {leftIcon}
                    <Text
                        marginLeft={!!leftIcon ? '5px' : '0px'}
                        fontFamily="heading"
                        fontWeight="700"
                        fontStyle="normal"
                        color="white"
                        adjustsFontSizeToFit={true}
                        {...buttonSizesStyles[
                            size as keyof typeof buttonSizesStyles
                        ].text}
                    >
                        {children}
                    </Text>
                </Flex>
            </BaseButton>
        </Flex>
    );
});

export type { ButtonProps };
export { Button };
