import React from 'react';
import { Flex, Spinner, Modal, StatusBar } from 'native-base';

import { useLoadingStore } from 'app/store/Loading/Loading.hook';

type LoadingProps = {
    children?: React.ReactNode;
};

const Loading = ({}: LoadingProps) => {
    const { loading } = useLoadingStore('all');
    return (
        <>
            {loading && (
                <Modal isOpen={loading}>
                    {loading && (
                        <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" />
                    )}
                    <Flex alignItems="center" justifyContent="center">
                        <Spinner
                            accessibilityLabel="Carregando Aplicação"
                            size={90 as any}
                            color="gold.600"
                        />
                    </Flex>
                </Modal>
            )}
        </>
    );
};

export type { LoadingProps };
export { Loading };
