import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';
import { FlatList, Flex, Icon } from 'native-base';

import { FAB } from 'app/components/atoms/FAB';
import { ProCrisStudentCard } from 'app/components/molecules/ProCrisStudentCard';
import { ProCrisStatus } from 'app/components/organisms/ProCrisStatus';

import { useError } from 'app/hooks/Error';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

type StudentsProps = {
    children?: React.ReactNode;
};

const Students = ({}: StudentsProps) => {
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const { loading, students, listStudents, listStudent } =
        useStudentStore('list');
    const navigation = useNavigation();

    const handleCreateStudentPress = () => {
        navigation.navigate('ManageStudent', {
            title: 'Criar Aluno',
            type: 'create',
        });
    };

    const handleEditStudentPress = async (studentId: string) => {
        try {
            setLoading(true);
            await listStudent(studentId);
            navigation.navigate('ManageStudent', {
                title: 'Editar Aluno',
                type: 'edit',
            });
        } catch (err) {
            showError(err, { title: 'Erro ao deletar Aluno' });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        listStudents();
    }, []);

    return (
        <Flex flex="1" bgColor="#ffffff">
            <FAB
                icon={<Icon as={AntDesign} name="plus" color="white" />}
                onPress={handleCreateStudentPress}
            />
            <ProCrisStatus />
            <FlatList
                flex="1"
                marginTop="20px"
                paddingX="10px"
                marginBottom="10px"
                data={students.filter((student) => !student.is_deleted)}
                refreshControl={
                    <RefreshControl
                        tintColor="#B0A766"
                        colors={['#B0A766']}
                        refreshing={loading}
                        onRefresh={() => {
                            listStudents();
                        }}
                    />
                }
                renderItem={({ item: student, index }) => (
                    <ProCrisStudentCard
                        marginTop={index > 0 ? '10px' : '0px'}
                        name={student.name}
                        name_caregiver={student.name_caregiver}
                        avatar={student.avatar}
                        color={student.color}
                        onIconPress={() => handleEditStudentPress(student.id)}
                    />
                )}
                contentContainerStyle={{
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                }}
                keyExtractor={(item) => item.id}
            />
        </Flex>
    );
};
export { Students };
