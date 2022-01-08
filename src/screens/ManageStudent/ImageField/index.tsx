import React from 'react';
import { Flex, Text } from 'native-base';
import { useWatch } from 'react-hook-form';
import { Image as RNImage } from 'react-native';
import { RHFormFile } from 'app/components/molecules/RHFormFile';

type ImageFieldProps = {
    children?: React.ReactNode;
};

const ImageField = ({}: ImageFieldProps) => {
    const avatar = useWatch({ name: 'avatar' });
    return (
        <RHFormFile
            name="avatar"
            label="Avatar"
            bgColor="white"
            borderWidth="1px"
            borderColor="gray.100"
            borderRadius="1000px"
            formFieldProps={{
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
            fileLabel={
                !avatar.cancelled ? 'Imagem Adicionada' : 'Adicionar Imagem'
            }
            formControlProps={{ flex: '1', marginTop: '6px' }}
        >
            <Flex
                alignItems="center"
                justifyContent="center"
                width="100px"
                height="100px"
            >
                {!avatar.cancelled && (
                    <RNImage
                        source={{ uri: avatar.uri }}
                        style={{ width: '100%', height: '100%' }}
                        accessibilityLabel="Imagem do aluno"
                    />
                )}
            </Flex>
        </RHFormFile>
    );
};

export type { ImageFieldProps };
export { ImageField };
