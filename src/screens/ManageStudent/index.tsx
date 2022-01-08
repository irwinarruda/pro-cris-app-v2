import React from 'react';
import { Flex, HStack, VStack } from 'native-base';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/manageStudent';

import { Button } from 'app/components/atoms/Button';
import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { RHColorPicker } from 'app/components/molecules/RHColorPicker';
import { RHFormText } from 'app/components/molecules/RHFormText';
import { RHFormFormat } from 'app/components/molecules/RHFormFormat';

import {
    ManageStudentProvider,
    useManageStudent,
} from 'app/hooks/ManageStudent';
import { useError } from 'app/hooks/Error';
import { useSuccess } from 'app/hooks/Success';
import { useAlert } from 'app/store/Alert/Alert.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

import { ManageCosts } from './ManageCosts';
import { ManageSchedules } from './ManageSchedules';
import { ImageField } from './ImageField';

type ManageStudentProps = {
    route: { params: { title: string; type: 'create' | 'edit' | 'view' } };
};

const ManageStudentComponent = ({ route: { params } }: ManageStudentProps) => {
    const navigation = useNavigation();
    const { onManageCostsOpen, onManageSchedulesOpen } =
        useManageStudent('none');
    const { showSuccess } = useSuccess();
    const { showError } = useError();
    const { showAlertAsync } = useAlert();
    const { setLoading } = useLoadingStore();
    const { createStudent, editStudent } = useStudentStore();
    const { selectedStudent, deleteStudent } = useStudentStore('manage');

    const { handleSubmit, setValue } = useFormContext<FormValues>();

    const handleFormSubmit = async (values: FormValues) => {
        try {
            setLoading(true);
            let successTitle = '';
            if (params.type === 'create') {
                await createStudent(values);
                successTitle = 'Aluno criado com sucesso';
            } else {
                await editStudent(values);
                successTitle = 'Aluno editado com sucesso';
            }
            navigation.goBack();
            showSuccess({ title: successTitle });
        } catch (err) {
            showError(err, { title: 'Erro ao criar Aluno' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteStudentPress = async (studentId: string) => {
        try {
            const { isConfirmed } = await showAlertAsync({
                title: 'Deseja remover esse Aluno?',
                description: `Essa ação removerá o aluno: ${selectedStudent?.name} permanentemente`,
                cancelButtonText: 'Cancelar',
                confirmButtomText: 'Remover',
                confirmButtomProps: { colorScheme: 'red.500' },
            });
            if (!isConfirmed) {
                return;
            }
            setLoading(true);
            await deleteStudent(studentId);
            navigation.navigate('TabRoute');
        } catch (err) {
            showError(err, { title: 'Erro ao deletar Aluno' });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (params.type === 'edit' && selectedStudent) {
            const body = {
                ...selectedStudent,
                avatar: {
                    type: 'firebase',
                    uri: selectedStudent.avatar,
                    cancelled: false,
                },
            } as unknown as FormValues;
            setValue('id', body.id);
            setValue('name', body.name);
            setValue('name_caregiver', body.name_caregiver);
            setValue('phone', body.phone);
            setValue('avatar', body.avatar);
            setValue('date_of_birth', body.date_of_birth);
            setValue('address', body.address);
            setValue('map_location', body.map_location);
            setValue('observation', body.observation);
            setValue('color', body.color);
            setValue('is_deleted', body.is_deleted);
            setValue('schedules', [...body.schedules]);
            setValue('costs', [...body.costs]);
        }
    }, [selectedStudent]);

    return (
        <>
            <KeyboardAvoidingScrollView
                flex="1"
                bgColor="#ffffff"
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingBottom: 20,
                    minHeight: '100%',
                }}
            >
                <HStack
                    alignItems="flex-start"
                    marginTop="20px"
                    paddingX="20px"
                >
                    <ImageField />
                    <Flex flex="1.3" flexDirection="column" marginLeft="5px">
                        <RHFormText
                            label="Nome Completo"
                            placeholder="Nome do Aluno"
                            autoCapitalize="words"
                            name="name"
                            size="sm"
                        />
                        <RHFormFormat
                            label="Data de Nascimento"
                            placeholder="Nascimento do Aluno"
                            name="date_of_birth"
                            type="datetime"
                            options={{
                                format: 'DD/MM/YYYY',
                            }}
                            size="sm"
                        />
                    </Flex>
                </HStack>
                <HStack space="16px" width="100%" paddingX="20px">
                    <RHFormText
                        label="Nome do Responsável"
                        placeholder="Responsável"
                        name="name_caregiver"
                        autoCapitalize="words"
                        size="sm"
                        formControlProps={{ flex: '1' }}
                    />
                    <RHFormFormat
                        label="Telefone"
                        placeholder="Telefone"
                        name="phone"
                        type="cel-phone"
                        size="sm"
                        formControlProps={{ flex: '1' }}
                    />
                </HStack>
                <VStack width="100%" paddingX="20px">
                    <RHFormText
                        label="Endereço"
                        placeholder="Endereço da casa"
                        name="address"
                        autoCapitalize="sentences"
                        size="sm"
                    />
                    <RHFormText
                        label="Google Maps Link"
                        placeholder="Link da Localização"
                        name="map_location"
                        autoCapitalize="sentences"
                        size="sm"
                    />
                    <RHFormText
                        label="Observação Adicional"
                        placeholder="Apartamento, Número, etc"
                        name="observation"
                        autoCapitalize="sentences"
                        size="sm"
                    />
                </VStack>
                <VStack
                    justifyContent="flex-start"
                    width="100%"
                    paddingX="20px"
                >
                    <RHColorPicker name="color" />
                </VStack>
                <HStack space="12px" marginTop="12px" paddingX="20px">
                    <Button
                        size="sm"
                        colorScheme="gray.400"
                        flex="1"
                        onPress={onManageCostsOpen}
                    >
                        Gerenciar Preços
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="gray.400"
                        flex="1"
                        onPress={onManageSchedulesOpen}
                    >
                        Gerenciar Horários
                    </Button>
                </HStack>
                <HStack
                    width="100%"
                    marginTop="20px"
                    paddingX="20px"
                    justifyContent={
                        params.type === 'edit' ? 'space-between' : 'center'
                    }
                >
                    {params.type === 'edit' && (
                        <Button
                            size="lg"
                            colorScheme="red.500"
                            onPress={() =>
                                handleDeleteStudentPress(
                                    selectedStudent?.id as string,
                                )
                            }
                        >
                            Remover Aluno
                        </Button>
                    )}
                    <Button
                        size="lg"
                        onPress={handleSubmit(handleFormSubmit) as any}
                    >
                        Salvar Aluno
                    </Button>
                </HStack>
            </KeyboardAvoidingScrollView>
            <ManageCosts />
            <ManageSchedules />
        </>
    );
};

const ManageStudent = ({ ...props }: ManageStudentProps) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    return (
        <ManageStudentProvider>
            <FormProvider {...methods}>
                <ManageStudentComponent {...props} />
            </FormProvider>
        </ManageStudentProvider>
    );
};

export { ManageStudent };
