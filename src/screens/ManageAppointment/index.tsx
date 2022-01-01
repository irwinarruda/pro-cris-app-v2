import React from 'react';
import { Animated, LayoutChangeEvent, View } from 'react-native';
import { Flex, HStack, VStack, Icon } from 'native-base';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Formik, FormikHelpers, useFormikContext } from 'formik';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/manageAppointment';

import { Button } from 'app/components/atoms/Button';
import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { ProCrisStudentsOverview } from 'app/components/molecules/ProCrisStudentsOverview';
import { FKFormText } from 'app/components/molecules/FKFormText';
import { FKFormFormat } from 'app/components/molecules/FKFormFormat';
import { FKCheckbox } from 'app/components/molecules/FKCheckbox';

import { useError } from 'app/hooks/Error';
import { useSuccess } from 'app/hooks/Success';
import { useAlert } from 'app/store/Alert/Alert.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';

type ManageAppointmentProps = {
    route: { params: { title: string } };
};

const ManageAppointmentComponent = ({}: ManageAppointmentProps) => {
    const { handleSubmit } = useFormikContext();
    const [expanded, setExpanded] = React.useState<boolean>(false);

    return (
        <KeyboardAvoidingScrollView
            flex="1"
            bgColor="#ffffff"
            contentContainerStyle={{
                justifyContent: 'flex-start',
                paddingBottom: 20,
                minHeight: '100%',
            }}
        >
            <ProCrisStudentsOverview
                isExpanded={expanded}
                setIsExpanded={setExpanded}
            />
            <HStack
                justifyContent="space-between"
                marginTop="18px"
                paddingX="20px"
            >
                <Button
                    size="md"
                    bgColor="#996074"
                    leftIcon={
                        <Icon
                            as={Ionicons}
                            name="md-map-outline"
                            size="20px"
                            color="white"
                        />
                    }
                >
                    Ver Caminho
                </Button>
                <Button
                    size="md"
                    bgColor="#60A672"
                    leftIcon={
                        <Icon
                            as={FontAwesome}
                            name="phone"
                            size="20px"
                            color="white"
                        />
                    }
                >
                    Mensagem
                </Button>
            </HStack>
            <VStack space="7px" marginTop="20px" paddingX="20px">
                <FKCheckbox name="is_paid" size="md" fontWeight="600">
                    Aula Paga
                </FKCheckbox>
                <FKCheckbox name="is_cancelled" size="md" fontWeight="600">
                    Aula Cancelada
                </FKCheckbox>
                <FKCheckbox name="is_extra" size="md" fontWeight="600">
                    Aula Extra
                </FKCheckbox>
                <FKFormText name="observation" label="Observação" multiline />
            </VStack>
            <HStack
                width="100%"
                marginTop="2px"
                paddingX="20px"
                justifyContent="center"
            >
                <Button size="lg" onPress={handleSubmit as any}>
                    Salvar Aula
                </Button>
            </HStack>
        </KeyboardAvoidingScrollView>
    );
};

const ManageAppointment = ({ ...props }: ManageAppointmentProps) => {
    const navigation = useNavigation();
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    const { setLoading } = useLoadingStore();

    const handleFormSubmit = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        try {
            setLoading(true);
            let successTitle = '';
            // navigation.navigate('TabRoute');
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
            <ManageAppointmentComponent {...props} />
        </Formik>
    );
};

export { ManageAppointment };
