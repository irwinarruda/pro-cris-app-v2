import React from 'react';
import { Flex, Text, IFlexProps } from 'native-base';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

const sizeStyle = (size?: string) =>
    size ? { width: size, height: size } : undefined;

type PressableIconProps = IFlexProps &
    RectButtonProps & {
        children?: React.ReactNode;
        size?: string;
        colorScheme?: string;
        icon: React.ReactNode;
    };
const PressableIcon = React.forwardRef<any, PressableIconProps>(
    function PressableIconComponent(
        {
            icon,
            size,
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
                borderRadius="1000px"
                overflow="hidden"
                {...sizeStyle(size)}
                {...props}
                ref={ref}
            >
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
                    <Flex
                        accessible
                        accessibilityRole="button"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        borderRadius="1000px"
                    >
                        {icon}
                    </Flex>
                </RectButton>
            </Flex>
        );
    },
);

export type { PressableIconProps };
export { PressableIcon };
