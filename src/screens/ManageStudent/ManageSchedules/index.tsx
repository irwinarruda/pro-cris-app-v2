import React from 'react';
import { FormikHelpers, useFormik, useFormikContext } from 'formik';
import { Divider, HStack, Text, VStack } from 'native-base';
import { v4 as uuid } from 'uuid';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/manageStudentSchedules';
import { FormValues as MainFormValues } from 'app/forms/manageStudent';
import { WeekDays, WeekDaysLabels } from 'app/entities/WeekDays';

import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { Button } from 'app/components/atoms/Button';
import { BasicViewCard } from 'app/components/molecules/BasicViewCard';
import { ProCrisModal } from 'app/components/molecules/ProCrisModal';
import { FKFormFormatM } from 'app/components/molecules/FKFormFormat';
import { FKCheckboxM } from 'app/components/molecules/FKCheckbox';
import { FKFormSelectM } from 'app/components/molecules/FKFormSelect';

import { useAlert } from 'app/store/Alert/Alert.hook';

type ManageSchedulesProps = {
    isOpen?: boolean;
    setIsOpen?(value: boolean): void;
};

const ManageSchedules = ({ isOpen, setIsOpen }: ManageSchedulesProps) => {
    const { showAlertAsync } = useAlert();
    const { values, setFieldValue } = useFormikContext<MainFormValues>();

    const handleScheduleSubmit = (
        data: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        const body = { ...data, id: uuid() };
        setFieldValue('schedules', [...values.schedules, body]);
        formikHelpers.resetForm({
            values: { ...initialValues, day_time: data.day_time },
        } as any);
    };

    const handleDeleteSchedule = async (schedule: any) => {
        const { isConfirmed } = await showAlertAsync({
            title: 'Deseja remover esse Horário?',
            description: 'Essa ação removerá o horário e é irreversível',
            cancelButtonText: 'Cancelar',
            confirmButtomText: 'Remover',
            confirmButtomProps: { colorScheme: 'red.500' },
        });
        if (!isConfirmed) {
            return;
        }
        setFieldValue(
            'schedules',
            values.schedules.map((formSchedule) => {
                if (formSchedule.id === schedule.id) {
                    return {
                        ...formSchedule,
                        is_deleted: true,
                    };
                }
                return formSchedule;
            }),
        );
    };

    const instance = useFormik<FormValues>({
        initialValues: initialValues,
        onSubmit: handleScheduleSubmit,
        validationSchema: validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
    });

    return (
        <ProCrisModal
            visible={isOpen}
            onRequestClose={() => setIsOpen?.(false)}
            onClose={() => setIsOpen?.(false)}
        >
            <KeyboardAvoidingScrollView
                bgColor="white"
                flex="1"
                contentContainerStyle={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    paddingBottom: 120,
                }}
            >
                <Text
                    paddingX="20px"
                    fontSize="xl"
                    fontWeight="600"
                    textAlign="left"
                >
                    Gerenciar Horários
                </Text>
                <HStack
                    space="16px"
                    width="100%"
                    paddingX="20px"
                    marginTop="16px"
                >
                    <FKFormSelectM
                        label="Dia da semana"
                        placeholder="Segunda"
                        name="week_day"
                        size="sm"
                        options={Object.values(WeekDays).map((value) => ({
                            value: value,
                            label: WeekDaysLabels[value],
                        }))}
                        formControlProps={{ flex: '1' }}
                        formInstance={instance}
                    />
                    <FKFormFormatM
                        type="datetime"
                        options={{
                            format: 'HH:mm',
                        }}
                        label="Hora do dia"
                        placeholder="10:00"
                        name="day_time"
                        autoCapitalize="words"
                        size="sm"
                        formControlProps={{ flex: '1' }}
                        formInstance={instance}
                    />
                </HStack>
                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    paddingX="20px"
                    marginTop="5px"
                >
                    <FKCheckboxM
                        name="is_default"
                        size="sm"
                        formInstance={instance}
                    >
                        <Text marginLeft="5px" fontWeight="600">
                            É padrão?
                        </Text>
                    </FKCheckboxM>
                    <Button size="sm" onPress={instance.handleSubmit as any}>
                        Adicionar
                    </Button>
                </HStack>
                <Divider height="2px" marginTop="20px" bgColor="gold.300" />
                <VStack
                    space="15px"
                    width="100%"
                    paddingX="20px"
                    marginTop="25px"
                >
                    {values.schedules
                        .filter((schedule) => !schedule.is_deleted)
                        .map((schedule) => (
                            <BasicViewCard
                                topText={`Dia da semana: ${
                                    WeekDaysLabels[schedule.week_day]
                                }`}
                                bottomText={`Hora do dia ${schedule.day_time}`}
                                checkboxText={'É padrão?'}
                                isChecked={schedule.is_default}
                                onPress={() => handleDeleteSchedule(schedule)}
                                key={schedule.id}
                            />
                        ))}
                </VStack>
            </KeyboardAvoidingScrollView>
        </ProCrisModal>
    );
};

export type { ManageSchedulesProps };
export { ManageSchedules };
