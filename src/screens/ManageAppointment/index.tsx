import React from 'react';
import { Linking } from 'react-native';
import { HStack, VStack, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Formik, FormikHelpers, useFormikContext } from 'formik';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/manageAppointment';
import { Appointment } from 'app/entities/Appointment';
import { StudentCover } from 'app/entities/Student';

import { Button } from 'app/components/atoms/Button';
import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { ProCrisStudentsOverview } from 'app/components/molecules/ProCrisStudentsOverview';
import { FKFormText } from 'app/components/molecules/FKFormText';
import { FKCheckbox } from 'app/components/molecules/FKCheckbox';

import { useError } from 'app/hooks/Error';
import { useSuccess } from 'app/hooks/Success';
import { useSummary } from 'app/hooks/Summary';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

type ManageAppointmentProps = {
    route: {
        params: {
            title: string;
            appointment?: Appointment & { student: StudentCover };
            persistModal?: boolean;
        };
    };
};

const ManageAppointmentComponent = ({
    route: {
        params: { appointment },
    },
}: ManageAppointmentProps) => {
    const navigation = useNavigation();
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const { listStudent } = useStudentStore();
    const { handleSubmit, setValues } = useFormikContext();
    const [expanded, setExpanded] = React.useState<boolean>(false);

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

    const handleOpenMapsPress = () => {
        if (appointment?.student.map_location) {
            Linking.openURL(appointment?.student.map_location);
        }
    };

    const handleSendMessagePress = () => {
        Linking.openURL(
            `http://api.whatsapp.com/send?phone=+55${appointment?.student.phone}`,
        );
    };

    React.useEffect(() => {
        if (!appointment) {
            showError(
                { message: 'Você foi redirecionado para a tela anterior' },
                { title: 'Nenhuma Aula foi encontrada' },
            );
            navigation.goBack();
        } else {
            const body = {
                id: appointment.id,
                is_paid: appointment.is_paid,
                is_cancelled: appointment.is_cancelled,
                is_extra: appointment.is_extra,
                observation: appointment.observation,
            };
            setValues(body);
        }
    }, []);

    return (
        <KeyboardAvoidingScrollView
            flex="1"
            bgColor="#ffffff"
            contentContainerStyle={{
                justifyContent: 'flex-start',
                paddingBottom: 100,
                minHeight: '100%',
            }}
        >
            <ProCrisStudentsOverview
                isExpanded={expanded}
                setIsExpanded={setExpanded}
                avatar={appointment?.student.avatar}
                date_of_birth={appointment?.student.date_of_birth}
                name={appointment?.student.name}
                name_caregiver={appointment?.student.name_caregiver}
                onPress={() =>
                    handleEditStudentPress(appointment?.id_student || '')
                }
            />
            <HStack
                justifyContent="space-between"
                marginTop="22px"
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
                    onPress={handleOpenMapsPress}
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
                    onPress={handleSendMessagePress}
                >
                    Mensagem
                </Button>
            </HStack>
            <VStack space="7px" marginTop="20px" paddingX="20px">
                <FKCheckbox name="is_paid" size="sm" fontWeight="600">
                    Aula Paga
                </FKCheckbox>
                <FKCheckbox name="is_cancelled" size="sm" fontWeight="600">
                    Aula Cancelada
                </FKCheckbox>
                <FKCheckbox name="is_extra" size="sm" fontWeight="600">
                    Aula Extra
                </FKCheckbox>
                <FKFormText
                    name="observation"
                    label="Observação"
                    height="80px"
                    paddingTop="10px"
                    fontSize="md"
                    textAlignVertical="top"
                    autoCapitalize="sentences"
                    numberOfLines={4}
                    multiline
                />
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
    const { summaryStudentId } = useSummary('mAppointments');
    const { selectedStudent, updateSelectedUserAppointmentOptions } =
        useStudentStore('manage');
    const { setLoading } = useLoadingStore();
    const { updateAppointmentOptions } = useAppointmentStore();

    const handleFormSubmit = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        try {
            setLoading(true);
            let successTitle = '';
            await updateAppointmentOptions(values);
            successTitle = 'Aula editada com sucesso!';
            if (summaryStudentId && !!selectedStudent) {
                updateSelectedUserAppointmentOptions(selectedStudent, values);
            }
            navigation.goBack();
            showSuccess({ title: successTitle });
        } catch (err) {
            showError(err, { title: 'Erro ao editar Aula' });
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
