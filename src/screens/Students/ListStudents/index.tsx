import React from 'react';
import { FlatList } from 'native-base';
import { RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ProCrisStudentCard } from 'app/components/molecules/ProCrisStudentCard';

import { useError } from 'app/hooks/Error';
import { useStudentStore } from 'app/store/Student/Student.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useSummary } from 'app/hooks/Summary';

type ListStudentsProps = {
    children?: React.ReactNode;
};

const ListStudents = React.memo(({}: ListStudentsProps) => {
    const navigation = useNavigation();
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const {
        loading,
        students,
        listStudents,
        listStudent,
        listStudentWithAppointments,
    } = useStudentStore('list');
    const { onOpenModalOptionsSummary } = useSummary();

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

    const handleSudentSummaryPress = async (studentId: string) => {
        try {
            setLoading(true);
            await listStudentWithAppointments(studentId);
            onOpenModalOptionsSummary();
        } catch (err) {
            showError(err, { title: 'Erro ao buscar relatórios' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <FlatList
            flex="1"
            marginTop="20px"
            paddingX="10px"
            marginBottom="0px"
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
                    onPress={() => handleSudentSummaryPress(student.id)}
                />
            )}
            contentContainerStyle={{
                paddingBottom: 110,
                paddingHorizontal: 10,
            }}
            keyExtractor={(item) => item.id}
        />
    );
});

export type { ListStudentsProps };
export { ListStudents };
