import React from 'react';
import { RefreshControl } from 'react-native';
import { FlatList, Flex, Icon, Hidden } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { Button } from 'app/components/atoms/Button';
import { FAB } from 'app/components/atoms/FAB';
import { ProCrisStudentCard } from 'app/components/molecules/ProCrisStudentCard';
import { ProCrisStatus } from 'app/components/organisms/ProCrisStatus';
import { ProCrisBillintTemplate } from 'app/templates/ProCrisBillintTemplate';

import { useSummary } from 'app/hooks/Summary';
import { useError } from 'app/hooks/Error';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

import { ModalAppointmentSummary } from './ModalAppointmentSummary';

type StudentsProps = NativeStackHeaderProps;

const Students = (props: StudentsProps) => {
    const navigation = useNavigation();
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const {
        isOpenModalOptionsSummary,
        onCloseModalOptionsSummary,
        onOpenModalOptionsSummary,
        handleHydrateModalState,
    } = useSummary();
    const {
        loading,
        students,
        listStudents,
        listStudent,
        listStudentWithAppointments,
    } = useStudentStore('list');
    const [screenFocus, setScreenFocus] = React.useState<boolean>(false);

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

    const fetchData = async () => {
        await listStudents();
    };

    React.useEffect(() => {
        handleHydrateModalState();
    }, [screenFocus]);

    React.useEffect(() => {
        fetchData();
        const unsubscribe = props.navigation.addListener('focus', () => {
            setScreenFocus((prev) => !prev);
        });
        return unsubscribe;
    }, []);

    const pictureRef = React.useRef<any>(null);

    const onButtonPress = async () => {
        const result = await captureRef(pictureRef, {
            result: 'tmpfile',
            quality: 1,
            format: 'png',
        });
        await Sharing.shareAsync(result);
        console.log(result);
    };
    return (
        <>
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
                            onIconPress={() =>
                                handleEditStudentPress(student.id)
                            }
                            onPress={() => handleSudentSummaryPress(student.id)}
                        />
                    )}
                    contentContainerStyle={{
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                    }}
                    keyExtractor={(item) => item.id}
                />
            </Flex>
            <ProCrisBillintTemplate ref={pictureRef} />
            <Button marginY="20px" onPress={onButtonPress}>
                Printar
            </Button>
            <ModalAppointmentSummary
                isOpen={isOpenModalOptionsSummary}
                onClose={onCloseModalOptionsSummary}
            />
        </>
    );
};
export { Students };
