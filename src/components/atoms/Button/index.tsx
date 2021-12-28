import React from 'react';
import { Flex, Text, IFlexProps } from 'native-base';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

const buttonSizesStyles = {
    sm: {
        rect: {
            height: '34px',
        },
        text: {
            fontSize: 'xs',
            lineHeight: '14px',
        },
    },
    md: {
        rect: {
            height: '40px',
        },
        text: {
            fontSize: 'sm',
            lineHeight: '17px',
        },
    },
    lg: {
        rect: {
            height: '45px',
        },
        text: {
            fontSize: 'md',
            lineHeight: '18px',
        },
    },
};

type ButtonProps = IFlexProps &
    RectButtonProps & {
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
        underlayColor,
        activeOpacity,
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
            <RectButton
                ref={ref}
                underlayColor={underlayColor}
                activeOpacity={activeOpacity}
                onPress={onPress}
                onActiveStateChange={onActiveStateChange}
                testID={testID}
                exclusive={exclusive}
                rippleColor={rippleColor}
                shouldActivateOnStart={shouldActivateOnStart}
                disallowInterruption={disallowInterruption}
                id={id}
                style={style}
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
            </RectButton>
        </Flex>
    );
});

export type { ButtonProps };
export { Button };
