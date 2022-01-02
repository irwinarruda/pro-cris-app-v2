import React from 'react';
import { Flex, VStack, Text } from 'native-base';

import { ProCrisLogo } from 'app/components/atoms/ProCrisLogo';

type ProCrisBillintTemplateProps = {
    children?: React.ReactNode;
};

const ProCrisBillintTemplate = React.forwardRef<
    any,
    ProCrisBillintTemplateProps
>(function ProCrisBillintTemplateComponent({}, ref) {
    return (
        <Flex
            flexDirection="column"
            maxWidth="354px"
            margin="0px"
            padding="0px"
            borderWidth="2px"
            borderColor="gold.500"
            borderRadius="5px"
            overflow="hidden"
            ref={ref}
        >
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                paddingY="12px"
                paddingX="16px"
                bgColor="purple.500"
            >
                <ProCrisLogo width="110px" height="30px" />
                <Flex>
                    <Text fontSize="13px" fontWeight="600" color="white">
                        Aluno: Irwin Arruda
                    </Text>
                    <Text fontSize="13px" fontWeight="600" color="white">
                        Obrigada pela confiança!
                    </Text>
                </Flex>
            </Flex>
            <Flex paddingY="16px" paddingX="24px" bgColor="white">
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    flexWrap="wrap"
                    margin="-4px"
                >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <Flex
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                            width="54px"
                            height="22px"
                            margin="4px"
                            bgColor="purple.500"
                            borderColor="gold.500"
                            borderWidth="1px"
                            borderRadius="3px"
                            key={item}
                        >
                            <Text
                                lineHeight="17px"
                                color="white"
                                fontWeight="500"
                                fontSize="14px"
                            >
                                12/12
                            </Text>
                        </Flex>
                    ))}
                </Flex>
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop="10px"
                >
                    <VStack space="4px">
                        <Flex
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Flex
                                width="17px"
                                height="17px"
                                marginRight="4px"
                                bgColor="purple.500"
                                borderColor="gold.500"
                                borderWidth="1px"
                                borderRadius="10000px"
                            ></Flex>
                            <Text
                                lineHeight="12px"
                                fontSize="11px"
                                fontWeight="500"
                                color="black"
                            >
                                Aulas Normais
                            </Text>
                        </Flex>
                        <Flex
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Flex
                                width="17px"
                                height="17px"
                                marginRight="4px"
                                bgColor="gray.500"
                                borderColor="gold.500"
                                borderWidth="1px"
                                borderRadius="10000px"
                            ></Flex>
                            <Text
                                lineHeight="12px"
                                fontSize="11px"
                                fontWeight="500"
                                color="black"
                            >
                                Aulas Extras
                            </Text>
                        </Flex>
                    </VStack>
                    <Flex>
                        <Text
                            lineHeight="17px"
                            fontSize="16px"
                            fontWeight="600"
                            color="black"
                        >
                            Quantidade de Aulas: 10
                        </Text>
                        <Text
                            lineHeight="21px"
                            fontSize="16px"
                            fontWeight="600"
                            color="black"
                        >
                            Total a Pagar: R$ 230.00
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
});

export type { ProCrisBillintTemplateProps };
export { ProCrisBillintTemplate };
