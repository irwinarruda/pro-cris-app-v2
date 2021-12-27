import React from 'react';
import { Flex, Text } from 'native-base';
import { Formik, FormikHelpers } from 'formik';
import { useNavigation } from '@react-navigation/native';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/createStudent';

import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';

import { useError } from 'app/hooks/Error';
import { useUserStore } from 'app/store/User/User.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';

type CreateStudentProps = {
    children?: React.ReactNode;
};
const CreateStudent = ({}: CreateStudentProps) => {
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const { signIn } = useUserStore();
    const navigation = useNavigation();

    const handleFormSubmit = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        try {
            setLoading(true);
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
            {({ handleSubmit }) => (
                <KeyboardAvoidingScrollView
                    flex="1"
                    bgColor="#ffffff"
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingBottom: 20,
                    }}
                >
                    <Flex></Flex>
                </KeyboardAvoidingScrollView>
            )}
        </Formik>
    );
};
export { CreateStudent };
