import React from 'react';
import { Flex, Modal, HStack } from 'native-base';
import { Formik, FormikHelpers, useFormikContext } from 'formik';

import {
    FormValues,
    initialValues,
    validationSchema,
} from 'app/forms/createAppointment';
import { Cost } from 'app/entities/Cost';

import { Button } from 'app/components/atoms/Button';
import { FKFormSelect } from 'app/components/molecules/FKFormSelect';
import { ProCrisModal } from 'app/components/organisms/ProCrisModal';
import { FKFormFormat } from 'app/components/molecules/FKFormFormat';
import { FKCheckbox } from 'app/components/molecules/FKCheckbox';

import { useError } from 'app/hooks/Error';
import { useSuccess } from 'app/hooks/Success';
import { useStudentStore } from 'app/store/Student/Student.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';

type ModalCreateAppointmentProps = {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const ModalCreateAppointmentComponent = ({
    isOpen,
    onClose,
}: ModalCreateAppointmentProps) => {
    const { students, listStudentCosts } = useStudentStore('list');
    const { values, handleSubmit, setFieldValue, resetForm } =
        useFormikContext<FormValues>();
    const [costs, setCosts] = React.useState<Cost[]>([]);

    const handleModalClose = () => {
        resetForm();
        onClose();
    };

    const fetchCostData = async (studentId: string) => {
        const studentCosts = await listStudentCosts(studentId);
        setCosts(studentCosts);
    };

    React.useEffect(() => {
        if (values.id_student) {
            fetchCostData(values.id_student);
            setFieldValue('cost.id', '');
        }
    }, [values.id_student]);

    React.useEffect(() => {
        if (values.cost.id) {
            const selectedCost = costs.find(
                (item) => item.id === values.cost.id,
            );
            if (selectedCost) {
                setFieldValue('cost.price', selectedCost.price);
                setFieldValue('cost.time', selectedCost.time);
            }
        }
    }, [values.cost]);

    return (
        <ProCrisModal
            title="Criar Aula"
            isOpen={isOpen}
            onClose={handleModalClose}
        >
            <Modal.Body bgColor="white">
                <Flex flex="1">
                    <FKFormSelect
                        size="sm"
                        label="Escolha um Aluno"
                        name="id_student"
                        options={students.map((student) => ({
                            label: student.name,
                            value: student.id,
                        }))}
                    />
                    <FKFormSelect
                        size="sm"
                        label="Escolha uma Valor/Hora"
                        name="cost.id"
                        options={costs.map((cost) => ({
                            label: `Valor: ${cost.price}/Hora: ${cost.time}`,
                            value: cost.id,
                        }))}
                    />
                    <FKFormFormat
                        type="datetime"
                        options={{
                            format: 'DD/MM/YYYY HH:mm:ss',
                        }}
                        size="sm"
                        name="date"
                        label="Escolha uma data"
                    />
                    <FKCheckbox name="is_extra">É aula extra?</FKCheckbox>
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
                        onPress={handleSubmit as any}
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
    const { showError } = useError();
    const { showSuccess } = useSuccess();
    const { setLoading } = useLoadingStore();
    const { createAppointment } = useAppointmentStore();

    const handleSubmit = async (
        values: FormValues,
        formHelpers: FormikHelpers<FormValues>,
    ) => {
        try {
            setLoading(true);
            await createAppointment(values);
            showSuccess({ title: 'Aula criada com sucesso' });
            formHelpers.resetForm();
        } catch (err) {
            showError(err, { title: 'Erro ao criar Aula' });
        } finally {
            props.onClose();
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
        >
            <ModalCreateAppointmentComponent {...props} />
        </Formik>
    );
};

export type { ModalCreateAppointmentProps };
export { ModalCreateAppointment };
