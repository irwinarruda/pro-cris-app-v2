import React from 'react';
import { Flex, HStack, VStack } from 'native-base';
import { Formik, FormikHelpers, useFormikContext } from 'formik';
import { useNavigation } from '@react-navigation/native';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/manageAppointment';

import { Button } from 'app/components/atoms/Button';
import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { FKFormText } from 'app/components/molecules/FKFormText';
import { FKFormFormat } from 'app/components/molecules/FKFormFormat';

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
    return (
        <Flex>
            <Button onPress={handleSubmit as any}>Salvar</Button>
        </Flex>
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
