import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Flex, HStack, VStack, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { initialValues, validationSchema, FormValues } from 'app/forms/signIn';

import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { Button } from 'app/components/atoms/Button';
import { Link } from 'app/components/atoms/Link';
import { ProCrisBanner } from 'app/components/molecules/ProCrisBanner';
import { FKFormText } from 'app/components/molecules/FKFormText';

import { useError } from 'app/hooks/Error';
import { useUserStore } from 'app/store/User/User.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';

type SignInProps = {
    children?: React.ReactNode;
};

const SignIn = ({}: SignInProps) => {
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
            await signIn(values);
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
                    <ProCrisBanner />
                    <Flex width="100%" paddingX="20px" marginTop="15px">
                        <Text fontSize="22px" fontWeight="700" textAlign="left">
                            Fazer Login
                        </Text>
                    </Flex>
                    <VStack
                        width="100%"
                        space="0"
                        paddingX="20px"
                        marginTop="18px"
                    >
                        <FKFormText name="email" label="Email" size="lg" />
                        <FKFormText
                            name="password"
                            label="Senha"
                            size="lg"
                            secureTextEntry
                        />
                    </VStack>
                    <HStack justifyContent="center" marginTop="20px">
                        <Button size="lg" onPress={handleSubmit as any}>
                            Fazer Login
                        </Button>
                    </HStack>
                    <HStack justifyContent="center" marginTop="6px">
                        <Link onPress={() => navigation.navigate('SignUp')}>
                            Criar conta
                        </Link>
                    </HStack>
                </KeyboardAvoidingScrollView>
            )}
        </Formik>
    );
};

export { SignIn };
