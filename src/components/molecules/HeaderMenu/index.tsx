import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Icon, Menu } from 'native-base';

import { useError } from 'app/hooks/Error';
import { useUserStore } from 'app/store/User/User.hook';

import { PressableIcon } from 'app/components/atoms/PressableIcon';

type HeaderMenuProps = NativeStackHeaderProps;

const HeaderMenu = ({}: HeaderMenuProps) => {
    const navigation = useNavigation();
    const { showError } = useError();
    const { signOut } = useUserStore();

    const handleSignOutPress = async () => {
        try {
            await signOut();
            navigation.navigate('SignIn');
        } catch (err) {
            showError(err, { title: 'Erro ao fazer Logout' });
        }
    };

    return (
        <Menu
            width="190"
            placement="left"
            marginTop="20px"
            borderWidth="2px"
            borderColor="gold.500"
            trigger={(triggerProps) => {
                return (
                    <PressableIcon
                        {...triggerProps}
                        marginRight="-10px"
                        marginBottom="-6px"
                        size="34px"
                        rippleColor="rgba(255, 255, 255, 0.1)"
                        icon={
                            <Icon
                                as={Entypo}
                                name="dots-three-vertical"
                                size="24px"
                                color="white"
                            />
                        }
                    />
                );
            }}
        >
            <Menu.Item
                _pressed={{ bgColor: 'rgba(154, 141, 214, 0.3)' }}
                onPress={handleSignOutPress}
            >
                Saír
            </Menu.Item>
        </Menu>
    );
};

export type { HeaderMenuProps };
export { HeaderMenu };
