import React from 'react';
import { useWatch, useFormContext, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { ProCrisActionsheet } from 'app/components/molecules/ProCrisActionsheet';
import { RHFormFormatM } from 'app/components/molecules/RHFormFormat';
import { RHCheckboxM } from 'app/components/molecules/RHCheckbox';
import { RHFormSelectM } from 'app/components/molecules/RHFormSelect';

import { useManageStudent } from 'app/hooks/ManageStudent';
import { useAlert } from 'app/store/Alert/Alert.hook';

type ManageSchedulesProps = {};

const ManageSchedules = ({}: ManageSchedulesProps) => {
    const { showAlertAsync } = useAlert();
    const { isManageSchedulesOpen, onManageSchedulesClose } =
        useManageStudent('schedules');

    const schedules = useWatch<MainFormValues, 'schedules'>({
        name: 'schedules',
    });
    const { setValue, getValues } = useFormContext<MainFormValues>();
    const {
        handleSubmit,
        setValue: setScheduleValue,
        control,
    } = useForm<FormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const handleScheduleSubmit = React.useCallback((data: FormValues) => {
        const body = { ...data, id: uuid() };
        const formCosts = getValues('schedules');
        setValue('schedules', [...formCosts, body]);
        setScheduleValue('id', initialValues.id);
        setScheduleValue('week_day', initialValues.week_day);
        setScheduleValue('is_default', initialValues.is_default);
        setScheduleValue('is_deleted', initialValues.is_deleted);
    }, []);

    const handleDeleteSchedule = React.useCallback(async (schedule: any) => {
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
        const formCosts = getValues('schedules');
        setValue(
            'schedules',
            formCosts.map((formSchedule) => {
                if (formSchedule.id === schedule.id) {
                    return {
                        ...formSchedule,
                        is_deleted: true,
                    };
                }
                return formSchedule;
            }),
        );
    }, []);

    return (
        <ProCrisActionsheet
            visible={isManageSchedulesOpen}
            onRequestClose={onManageSchedulesClose}
            onClose={onManageSchedulesClose}
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
                    <RHFormSelectM
                        label="Dia da semana"
                        placeholder="Segunda"
                        name="week_day"
                        size="sm"
                        options={Object.values(WeekDays).map((value) => ({
                            value: value,
                            label: WeekDaysLabels[value],
                        }))}
                        formControlProps={{ flex: '1' }}
                        control={control}
                    />
                    <RHFormFormatM
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
                        control={control}
                    />
                </HStack>
                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    paddingX="20px"
                    marginTop="5px"
                >
                    <RHCheckboxM name="is_default" size="sm" control={control}>
                        <Text marginLeft="5px" fontWeight="600">
                            É padrão?
                        </Text>
                    </RHCheckboxM>
                    <Button
                        size="sm"
                        onPress={handleSubmit(handleScheduleSubmit) as any}
                    >
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
                    {schedules
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
        </ProCrisActionsheet>
    );
};

export type { ManageSchedulesProps };
export { ManageSchedules };
