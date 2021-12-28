import React from 'react';
import { FormikHelpers, useFormik, useFormikContext } from 'formik';
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
import { ProCrisModal } from 'app/components/molecules/ProCrisModal';
import { FKFormFormatM } from 'app/components/molecules/FKFormFormat';
import { FKCheckboxM } from 'app/components/molecules/FKCheckbox';

import { useAlert } from 'app/hooks/Alert';

import { ManageStudentAlert } from '../ManageStudentAlert';

type ManageCostsProps = {
    isOpen?: boolean;
    setIsOpen?(value: boolean): void;
};

const ManageCosts = ({ isOpen, setIsOpen }: ManageCostsProps) => {
    const alertInstance = useAlert();
    const { values, setFieldValue } = useFormikContext<MainFormValues>();

    const handleCostsSubmit = (
        data: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        const body = { ...data, id: uuid() };
        setFieldValue('costs', [...values.costs, body]);
        formikHelpers.resetForm();
    };

    const handleDeleteCost = async (cost: any) => {
        const response = await alertInstance.showAlertAsync();
        if (!response) {
            return;
        }
        setFieldValue(
            'costs',
            values.costs.map((formCost) => {
                if (formCost.id === cost.id) {
                    return {
                        ...formCost,
                        is_deleted: true,
                    };
                }
                return formCost;
            }),
        );
    };

    const instance = useFormik<FormValues>({
        initialValues: initialValues,
        onSubmit: handleCostsSubmit,
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
            <ManageStudentAlert
                size="xl"
                instance={alertInstance}
                messages={{
                    title: 'Deseja remover esse Valor?',
                    description: 'Essa ação removerá o custo e é irreversível',
                }}
            />
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
                    <FKFormFormatM
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
                        formInstance={instance}
                    />
                    <FKFormFormatM
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
                <Divider marginTop="20px" bgColor="gold.300" />
                <VStack
                    space="15px"
                    width="100%"
                    paddingX="20px"
                    marginTop="25px"
                >
                    {values.costs
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
        </ProCrisModal>
    );
};

export type { ManageCostsProps };
export { ManageCosts };
