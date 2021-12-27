import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Flex, Icon } from 'native-base';

import { ProCrisStatus } from 'app/components/organisms/ProCrisStatus';
import { FAB } from 'app/components/atoms/FAB';

type StudentsProps = {
    children?: React.ReactNode;
};
const Students = ({}: StudentsProps) => {
    const navigation = useNavigation();
    const handleCreateStudentPress = () => {
        navigation.navigate('ManageStudent', { title: 'Criar Aluno' });
    };
    return (
        <Flex height="100%">
            <ProCrisStatus />
            <FAB
                icon={<Icon as={AntDesign} name="plus" color="white" />}
                onPress={handleCreateStudentPress}
            />
        </Flex>
    );
};
export { Students };
