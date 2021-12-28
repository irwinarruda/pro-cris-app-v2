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
import { useUserStore } from 'app/store/User/User.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';

import { ManageCosts } from './ManageCosts';
import { ManageSchedules } from './ManageSchedules';

type ManageStudentProps = {
    children?: React.ReactNode;
};

const ManageStudentComponent = ({}: ManageStudentProps) => {
    const [pricesIsOpen, setPricesIsOpen] = React.useState<boolean>(false);
    const [schedulesIsOpen, setSchedulesIsOpen] =
        React.useState<boolean>(false);

    const navigation = useNavigation();
    const { values, handleSubmit } = useFormikContext<FormValues>();

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
                            values.avatar.cancelled
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
                        size="sm"
                    />
                    <FKFormText
                        label="Google Maps Link"
                        placeholder="Link da Localização"
                        name="map_location"
                        size="sm"
                    />
                    <FKFormText
                        label="Observação Adicional"
                        placeholder="Apartamento, Número, etc"
                        name="observation"
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
                <HStack marginTop="20px" paddingX="20px">
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

const ManageStudent = () => {
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const { signIn } = useUserStore();

    const handleFormSubmit = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        try {
            setLoading(true);
            console.log('values', values);
        } catch (err) {
            showError(err, { title: 'Erro ao Logar' });
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
            <ManageStudentComponent />
        </Formik>
    );
};

export { ManageStudent };
