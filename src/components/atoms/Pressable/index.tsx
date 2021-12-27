import React from 'react';
import { Flex, Text, IFlexProps } from 'native-base';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

export type PressableProps = IFlexProps &
    RectButtonProps & {
        children?: React.ReactNode;
        size?: string;
        colorScheme?: string;
    };

const Pressable = React.forwardRef<any, PressableProps>(
    function PressableComponent(
        {
            children,
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
            <Flex overflow="hidden" {...props} ref={ref}>
                <RectButton
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
                    style={style}
                >
                    {children}
                </RectButton>
            </Flex>
        );
    },
);
export { Pressable };
