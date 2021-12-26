import React from 'react';
import { useToast, IToastProps } from 'native-base';

type UseSuccess = {
    showSuccess(options?: IToastProps): void;
};

const useSuccess = (): UseSuccess => {
    const toast = useToast();

    const showSuccess = React.useCallback((options?: IToastProps) => {
        toast.closeAll();
        toast.show({ status: 'success', placement: 'top', ...options });
    }, []);

    return { showSuccess };
};

export { useSuccess };
