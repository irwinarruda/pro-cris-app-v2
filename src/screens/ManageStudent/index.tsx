import React from 'react';
import { Image as RNImage } from 'react-native';
import { Flex, HStack, VStack } from 'native-base';
import { Formik, FormikHelpers, useFormikContext } from 'formik';
import { useNavigation } from '@react-navigation/native';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/manageStudent';

import { Button } from 'app/components/atoms/Button';
import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { FKColorPicker } from 'app/components/molecules/FKColorPicker';
import { FKFormFile } from 'app/components/molecules/FKFormFile';
import { FKFormText } from 'app/components/molecules/FKFormText';
import { FKFormFormat } from 'app/components/molecules/FKFormFormat';

import { useError } from 'app/hooks/Error';
import { useSuccess } from 'app/hooks/Success';
import { useAlert } from 'app/store/Alert/Alert.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

import { ManageCosts } from './ManageCosts';
import { ManageSchedules } from './ManageSchedules';

type ManageStudentProps = {
    route: { params: { title: string; type: 'create' | 'edit' | 'view' } };
};

const ManageStudentComponent = ({ route: { params } }: ManageStudentProps) => {
    const navigation = useNavigation();
    const { showAlertAsync } = useAlert();
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const { selectedStudent, deleteStudent } = useStudentStore('manage');

    const [pricesIsOpen, setPricesIsOpen] = React.useState<boolean>(false);
    const [schedulesIsOpen, setSchedulesIsOpen] =
        React.useState<boolean>(false);
    const { values, handleSubmit, setValues } = useFormikContext<FormValues>();

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
            setValues(body, true);
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
                    <FKFormFile
                        name="avatar"
                        label="Avatar"
                        bgColor="white"
                        borderWidth="1px"
                        borderColor="gray.100"
                        borderRadius="1000px"
                        formFieldProps={{
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                        fileLabel={
                            !values.avatar.cancelled
                                ? 'Imagem Adicionada'
                                : 'Adicionar Imagem'
                        }
                        formControlProps={{ flex: '1', marginTop: '6px' }}
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            width="100px"
                            height="100px"
                        >
                            {!values.avatar.cancelled && (
                                <RNImage
                                    source={{ uri: values.avatar.uri }}
                                    style={{ width: '100%', height: '100%' }}
                                    accessibilityLabel="Imagem do aluno"
                                />
                            )}
                        </Flex>
                    </FKFormFile>
                    <Flex flex="1.3" flexDirection="column" marginLeft="5px">
                        <FKFormText
                            label="Nome Completo"
                            placeholder="Nome do Aluno"
                            autoCapitalize="words"
                            name="name"
                            size="sm"
                        />
                        <FKFormFormat
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
                    <FKFormText
                        label="Nome do Responsável"
                        placeholder="Responsável"
                        name="name_caregiver"
                        autoCapitalize="words"
                        size="sm"
                        formControlProps={{ flex: '1' }}
                    />
                    <FKFormFormat
                        label="Telefone"
                        placeholder="Telefone"
                        name="phone"
                        type="cel-phone"
                        size="sm"
                        formControlProps={{ flex: '1' }}
                    />
                </HStack>
                <VStack width="100%" paddingX="20px">
                    <FKFormText
                        label="Endereço"
                        placeholder="Endereço da casa"
                        name="address"
                        autoCapitalize="sentences"
                        size="sm"
                    />
                    <FKFormText
                        label="Google Maps Link"
                        placeholder="Link da Localização"
                        name="map_location"
                        autoCapitalize="sentences"
                        size="sm"
                    />
                    <FKFormText
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
                    <FKColorPicker name="color" />
                </VStack>
                <HStack space="12px" marginTop="12px" paddingX="20px">
                    <Button
                        size="sm"
                        colorScheme="gray.400"
                        flex="1"
                        onPress={() => setPricesIsOpen(true)}
                    >
                        Gerenciar Preços
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="gray.400"
                        flex="1"
                        onPress={() => setSchedulesIsOpen(true)}
                    >
                        Gerenciar Horários
                    </Button>
                </HStack>
                <HStack
                    width="100%"
                    marginTop="20px"
                    paddingX="20px"
                    justifyContent={
                        (params as any).type === 'edit'
                            ? 'space-between'
                            : 'center'
                    }
                >
                    {(params as any).type === 'edit' && (
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
                    <Button size="lg" onPress={handleSubmit as any}>
                        Salvar Aluno
                    </Button>
                </HStack>
            </KeyboardAvoidingScrollView>
            <ManageCosts isOpen={pricesIsOpen} setIsOpen={setPricesIsOpen} />
            <ManageSchedules
                isOpen={schedulesIsOpen}
                setIsOpen={setSchedulesIsOpen}
            />
        </>
    );
};

const ManageStudent = ({ ...props }: ManageStudentProps) => {
    const navigation = useNavigation();
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    const { setLoading } = useLoadingStore();
    const { createStudent, editStudent } = useStudentStore();

    const handleFormSubmit = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        try {
            setLoading(true);
            let successTitle = '';
            if (props.route.params.type === 'create') {
                await createStudent(values);
                successTitle = 'Aluno criado com sucesso';
            } else {
                await editStudent(values);
                successTitle = 'Aluno editado com sucesso';
            }
            navigation.navigate('TabRoute');
            showSuccess({ title: successTitle });
        } catch (err) {
            showError(err, { title: 'Erro ao criar Aluno' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
        >
            <ManageStudentComponent {...props} />
        </Formik>
    );
};

export { ManageStudent };
