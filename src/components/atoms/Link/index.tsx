import React from 'react';
import { Flex, Text, IFlexProps } from 'native-base';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

const buttonSizesStyles = {
    sm: {
        rect: {
            height: '22px',
        },
        text: {
            fontSize: 'sm',
            lineHeight: '14px',
        },
    },
    md: {
        rect: {
            height: '22px',
        },
        text: {
            fontSize: 'md',
            lineHeight: '17px',
        },
    },
    lg: {
        rect: {
            height: '28px',
        },
        text: {
            fontSize: 'lg',
            lineHeight: '18px',
        },
    },
};

type LinkProps = IFlexProps &
    RectButtonProps & {
        children?: React.ReactNode;
        size?: keyof typeof buttonSizesStyles;
        colorScheme?: string;
        leftIcon?: React.ReactNode;
    };
const Link = React.forwardRef<any, LinkProps>(function LinkComponent(
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
            borderRadius="5px"
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
                    paddingBottom="2px"
                    paddingTop="2px"
                    paddingX="5px"
                >
                    {leftIcon}
                    <Text
                        adjustsFontSizeToFit={true}
                        marginLeft={!!leftIcon ? '5px' : '0px'}
                        fontFamily="heading"
                        fontWeight="700"
                        fontStyle="normal"
                        color="gold.600"
                        textDecoration="underline"
                        textDecorationLine="underline"
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

export type { LinkProps };
export { Link };
