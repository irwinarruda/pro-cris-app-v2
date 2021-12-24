import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Flex, HStack, VStack, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { initialValues, validationSchema, FormValues } from 'app/forms/signIn';

import { AuthService } from 'app/services/AuthService';

import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { Button } from 'app/components/atoms/Button';
import { Link } from 'app/components/atoms/Link';
import { ProCrisBanner } from 'app/components/molecules/ProCrisBanner';
import { FKFormText } from 'app/components/molecules/FKFormText';

import { useUserStore } from 'app/hooks/UserStore';

type SignInProps = {
    children?: React.ReactNode;
};

const SignIn = ({}: SignInProps) => {
    const numberOfInterations = React.useRef(0);
    const { user, signIn } = useUserStore('user');
    const navigation = useNavigation();
    const handleFormSubmit = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        try {
            await signIn(values);
        } catch (err) {
            console.log({ ...(err as any) });
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
                    }}
                >
                    <ProCrisBanner />
                    <Flex width="100%" paddingX="20px" marginTop="15px">
                        <Text fontSize="22px" fontWeight="700" textAlign="left">
                            Fazer Login {user.email}
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
