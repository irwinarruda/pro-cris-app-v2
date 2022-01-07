import React from 'react';
import { useWatch, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, HStack, Text, VStack } from 'native-base';
import { v4 as uuid } from 'uuid';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/manageStudentCosts';
import { FormValues as MainFormValues } from 'app/forms/manageStudent';

import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { Button } from 'app/components/atoms/Button';
import { BasicViewCard } from 'app/components/molecules/BasicViewCard';
import { ProCrisActionsheet } from 'app/components/molecules/ProCrisActionsheet';
import { RHFormFormatM } from 'app/components/molecules/RHFormFormat';
import { RHCheckboxM } from 'app/components/molecules/RHCheckbox';

import { useManageStudent } from 'app/hooks/ManageStudent';
import { useAlert } from 'app/store/Alert/Alert.hook';

type ManageCostsProps = {};

const ManageCosts = ({}: ManageCostsProps) => {
    const { showAlertAsync } = useAlert();
    const { isManageCostsOpen, onManageCostsClose } = useManageStudent('costs');

    const costs = useWatch<MainFormValues, 'costs'>({ name: 'costs' });
    const { setValue, getValues } = useFormContext<MainFormValues>();
    const { handleSubmit, reset, control } = useForm<FormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const handleCostsSubmit = React.useCallback((data: FormValues) => {
        const formCosts = getValues('costs');
        const body = { ...data, id: uuid() };
        setValue('costs', [...formCosts, body]);
        reset();
    }, []);

    const handleDeleteCost = React.useCallback(async (cost: any) => {
        const { isConfirmed } = await showAlertAsync({
            title: 'Deseja remover esse Valor?',
            description: 'Essa ação removerá o custo e é irreversível',
            cancelButtonText: 'Cancelar',
            confirmButtomText: 'Remover',
            confirmButtomProps: { colorScheme: 'red.500' },
        });
        if (!isConfirmed) {
            return;
        }
        const formCosts = getValues('costs');
        setValue(
            'costs',
            formCosts.map((formCost: any) => {
                if (formCost.id === cost.id) {
                    return {
                        ...formCost,
                        is_deleted: true,
                    };
                }
                return formCost;
            }),
        );
    }, []);

    return (
        <ProCrisActionsheet
            visible={isManageCostsOpen}
            onRequestClose={onManageCostsClose}
            onClose={onManageCostsClose}
        >
            <KeyboardAvoidingScrollView
                flex="1"
                bgColor="white"
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
                    Gerenciar Valores
                </Text>
                <HStack
                    space="16px"
                    width="100%"
                    paddingX="20px"
                    marginTop="16px"
                >
                    <RHFormFormatM
                        type="datetime"
                        options={{
                            format: 'HH:mm',
                        }}
                        label="Hora aula"
                        placeholder="01:00"
                        name="time"
                        autoCapitalize="words"
                        size="sm"
                        formControlProps={{ flex: '1' }}
                        control={control}
                    />
                    <RHFormFormatM
                        type="money"
                        options={{
                            separator: '.',
                            delimiter: ',',
                        }}
                        label="Preço"
                        placeholder="R$0.00"
                        name="price"
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
                        onPress={handleSubmit(handleCostsSubmit) as any}
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
                    {costs
                        .filter((cost) => !cost.is_deleted)
                        .map((cost) => (
                            <BasicViewCard
                                topText={`Hora Aula: ${cost.time}`}
                                bottomText={`Preço ${cost.price}`}
                                checkboxText={'É padrão?'}
                                isChecked={cost.is_default}
                                onPress={() => handleDeleteCost(cost)}
                                key={cost.id}
                            />
                        ))}
                </VStack>
            </KeyboardAvoidingScrollView>
        </ProCrisActionsheet>
    );
};

export type { ManageCostsProps };
export { ManageCosts };
