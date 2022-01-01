import React from 'react';
import { useToast, IToastProps } from 'native-base';

type UseError = {
    showError(err: any, options?: IToastProps): void;
};

const useError = (): UseError => {
    const toast = useToast();

    const showError = React.useCallback((err: any, options?: IToastProps) => {
        toast.closeAll();
        let errorMessage = '';
        if (err.message && !Array.isArray(err.message)) {
            errorMessage = err.message;
        } else {
            errorMessage = err.message.join('\n');
        }
        toast.show({
            ...options,
            status: 'warning',
            placement: 'top',
            description: errorMessage,
        });
    }, []);

    return { showError };
};

export { useError };
