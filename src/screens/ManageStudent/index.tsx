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
import { FKFormFile } from 'app/components/molecules/FKFormFile';
import { FKFormText } from 'app/components/molecules/FKFormText';
import { FKFormFormat } from 'app/components/molecules/FKFormFormat';

import { useError } from 'app/hooks/Error';
import { useUserStore } from 'app/store/User/User.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';

type ManageStudentProps = {
    children?: React.ReactNode;
};

const ManageStudentComponent = ({}: ManageStudentProps) => {
    const navigation = useNavigation();
    const { values, handleSubmit } = useFormikContext<FormValues>();

    return (
        <KeyboardAvoidingScrollView
            flex="1"
            bgColor="#ffffff"
            height="100%"
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingBottom: 20,
            }}
        >
            <HStack alignItems="flex-start" marginTop="20px" paddingX="20px">
                <FKFormFile
                    name="avatar"
                    label="Avatar"
                    width="100px"
                    height="100px"
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
                    <Flex alignItems="center" justifyContent="center">
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
            <HStack>
                <Button size="lg" onPress={handleSubmit as any}>
                    Submit
                </Button>
            </HStack>
        </KeyboardAvoidingScrollView>
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
