import React from 'react';
import { FormikHelpers, useFormik, useFormikContext } from 'formik';
import { Divider, Flex, HStack, Text, VStack } from 'native-base';

import {
    initialValues,
    validationSchema,
    FormValues,
} from 'app/forms/manageStudentCost';
import { FormValues as MainFormValues } from 'app/forms/manageStudent';

import { KeyboardAvoidingScrollView } from 'app/components/atoms/KeyboardAvoidingScrollView';
import { Button } from 'app/components/atoms/Button';
import { BasicViewCard } from 'app/components/molecules/BasicViewCard';
import { ProCrisModal } from 'app/components/molecules/ProCrisModal';
import { FKFormFormatM } from 'app/components/molecules/FKFormFormat';
import { FKCheckboxM } from 'app/components/molecules/FKCheckbox';

type ManageCostsProps = {
    isOpen?: boolean;
    setIsOpen?(value: boolean): void;
};

const ManageCosts = ({ isOpen, setIsOpen }: ManageCostsProps) => {
    const { values, setFieldValue } = useFormikContext<MainFormValues>();

    const handleCostsSubmit = (
        data: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
    ) => {
        setFieldValue('cost', [...values.cost, data]);
        formikHelpers.resetForm();
    };

    const instance = useFormik({
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
            <KeyboardAvoidingScrollView
                flex="1"
                bgColor="white"
                contentContainerStyle={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    paddingBottom: 20,
                    minHeight: '100%',
                }}
            >
                <Text
                    paddingX="20px"
                    fontSize="xl"
                    fontWeight="600"
                    textAlign="left"
                >
                    Gerenciar Preços
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
                        placeholder="Responsável"
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
                        placeholder="Telefone"
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
                    {values.cost.map((cost) => (
                        <BasicViewCard
                            topText={`Hora Aula: ${cost.time}`}
                            bottomText={`Preço ${cost.price}`}
                            checkboxText={'É padrão?'}
                            isChecked={cost.is_default}
                            key={cost.price}
                        />
                    ))}
                </VStack>
            </KeyboardAvoidingScrollView>
        </ProCrisModal>
    );
};

export type { ManageCostsProps };
export { ManageCosts };
