import React from 'react';
import { Linking } from 'react-native';
import { HStack, VStack, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';

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
import { RHFormText } from 'app/components/molecules/RHFormText';
import { RHCheckbox } from 'app/components/molecules/RHCheckbox';

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
    const { showSuccess } = useSuccess();
    const { showError } = useError();
    const { setLoading } = useLoadingStore();
    const { listStudent } = useStudentStore();
    const { updateAppointmentOptions } = useAppointmentStore();
    const { summaryStudentId } = useSummary('mAppointments');
    const { selectedStudent, updateSelectedUserAppointmentOptions } =
        useStudentStore('manage');

    const { handleSubmit, setValue } = useFormContext();
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const handleFormSubmit = async (values: FormValues) => {
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
            setValue('id', body.id);
            setValue('is_paid', body.is_paid);
            setValue('is_cancelled', body.is_cancelled);
            setValue('is_extra', body.is_extra);
            setValue('observation', body.observation);
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
                <RHCheckbox name="is_paid" size="sm" fontWeight="600">
                    Aula Paga
                </RHCheckbox>
                <RHCheckbox name="is_cancelled" size="sm" fontWeight="600">
                    Aula Cancelada
                </RHCheckbox>
                <RHCheckbox name="is_extra" size="sm" fontWeight="600">
                    Aula Extra
                </RHCheckbox>
                <RHFormText
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
                <Button
                    size="lg"
                    onPress={handleSubmit(handleFormSubmit) as any}
                >
                    Salvar Aula
                </Button>
            </HStack>
        </KeyboardAvoidingScrollView>
    );
};

const ManageAppointment = ({ ...props }: ManageAppointmentProps) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    return (
        <FormProvider {...methods}>
            <ManageAppointmentComponent {...props} />
        </FormProvider>
    );
};

export { ManageAppointment };
