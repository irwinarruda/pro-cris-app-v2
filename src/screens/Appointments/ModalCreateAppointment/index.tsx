import React from 'react';
import { Flex, Modal, HStack } from 'native-base';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';

import {
    FormValues,
    initialValues,
    validationSchema,
} from 'app/forms/createAppointment';

import { Button } from 'app/components/atoms/Button';
import { ProCrisModal } from 'app/components/organisms/ProCrisModal';
import { RHFormFormat } from 'app/components/molecules/RHFormFormat';
import { RHCheckbox } from 'app/components/molecules/RHCheckbox';

import { useError } from 'app/hooks/Error';
import { useSuccess } from 'app/hooks/Success';
import { useAppointments } from 'app/hooks/Appointments';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';

import { SelectSudentValueFields } from './SelectSudentValueFields';

type ModalCreateAppointmentProps = {
    children?: React.ReactNode;
};

const ModalCreateAppointmentComponent = ({}: ModalCreateAppointmentProps) => {
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    const { setLoading } = useLoadingStore();
    const { createAppointment } = useAppointmentStore();
    const { isModalAppointmentOpen, onModalAppointmentClose } =
        useAppointments('modal');
    const { handleSubmit } = useFormContext<FormValues>();

    const handleFormSubmit = async (values: FormValues) => {
        try {
            setLoading(true);
            await createAppointment(values);
            showSuccess({ title: 'Aula criada com sucesso' });
            onModalAppointmentClose();
        } catch (err) {
            showError(err, { title: 'Erro ao criar Aula' });
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        onModalAppointmentClose();
    };

    return (
        <ProCrisModal
            title="Criar Aula"
            isOpen={isModalAppointmentOpen}
            onClose={onModalAppointmentClose}
        >
            <Modal.Body bgColor="white">
                <Flex flex="1">
                    <SelectSudentValueFields />
                    <RHFormFormat
                        type="datetime"
                        options={{
                            format: 'DD/MM/YYYY HH:mm:ss',
                        }}
                        size="sm"
                        name="date"
                        label="Escolha uma data"
                    />
                    <RHCheckbox name="is_extra">É aula extra?</RHCheckbox>
                    <RHCheckbox name="is_paid" marginTop="10px">
                        Aula paga antecipadamente?
                    </RHCheckbox>
                </Flex>
            </Modal.Body>
            <Modal.Footer paddingTop="8px" paddingBottom="8px">
                <HStack space={2}>
                    <Button
                        colorScheme="gray.500"
                        onPress={handleModalClose}
                        size="sm"
                    >
                        Fechar
                    </Button>
                    <Button
                        colorScheme="purple.500"
                        onPress={handleSubmit(handleFormSubmit) as any}
                        size="sm"
                    >
                        Salvar
                    </Button>
                </HStack>
            </Modal.Footer>
        </ProCrisModal>
    );
};

const ModalCreateAppointment = ({ ...props }: ModalCreateAppointmentProps) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    return (
        <FormProvider {...methods}>
            <ModalCreateAppointmentComponent {...props} />
        </FormProvider>
    );
};

export type { ModalCreateAppointmentProps };
export { ModalCreateAppointment };
