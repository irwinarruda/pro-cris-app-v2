import React from 'react';
import { RefreshControl } from 'react-native';
import { FlatList, Flex, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';

import { FAB } from 'app/components/atoms/FAB';
import { ProCrisStudentCard } from 'app/components/molecules/ProCrisStudentCard';
import { ProCrisStatus } from 'app/components/organisms/ProCrisStatus';

import { useSummary } from 'app/hooks/Summary';
import { useError } from 'app/hooks/Error';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

import { ModalAppointmentSummary } from './ModalAppointmentSummary';
import { ListStudents } from './ListStudents';

type StudentsProps = NativeStackHeaderProps;

const Students = ({}: StudentsProps) => {
    const navigation = useNavigation();
    const { handleHydrateModalState } = useSummary();
    const { listStudents } = useStudentStore();

    const [screenFocus, setScreenFocus] = React.useState<boolean>(false);

    const handleCreateStudentPress = () => {
        navigation.navigate('ManageStudent', {
            title: 'Criar Aluno',
            type: 'create',
        });
    };

    React.useEffect(() => {
        handleHydrateModalState();
    }, [screenFocus]);

    React.useEffect(() => {
        listStudents();
        const unsubscribe = navigation.addListener('focus', () => {
            setScreenFocus((prev) => !prev);
        });
        return unsubscribe;
    }, []);

    return (
        <>
            <Flex flex="1" bgColor="#ffffff">
                <FAB
                    icon={<Icon as={AntDesign} name="plus" color="white" />}
                    onPress={handleCreateStudentPress}
                />
                <ProCrisStatus />
                <ListStudents />
            </Flex>
            <ModalAppointmentSummary />
        </>
    );
};

export { Students };
