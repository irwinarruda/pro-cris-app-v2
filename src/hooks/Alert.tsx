import React from 'react';

import { Completer } from 'app/utils/Completer';

type UseAlertReturn = {
    isOpen: boolean;
    showAlert(): void;
    showAlertAsync(): Promise<boolean>;
    closeModal(to?: boolean): void;
};

const useAlert = (): UseAlertReturn => {
    const cancelRef = React.useRef(null);
    const completerRef = React.useRef<Completer<boolean> | null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const showAlert = React.useCallback(() => {
        setIsOpen(true);
    }, []);

    const showAlertAsync = React.useCallback(async () => {
        setIsOpen(true);
        if (completerRef.current) {
            completerRef.current.complete(false);
        }
        completerRef.current = new Completer<boolean>();
        return completerRef.current.promise;
    }, [completerRef]);

    const closeModal = React.useCallback(
        (to?: boolean) => {
            setIsOpen(false);
            if (completerRef.current) {
                completerRef.current.complete(!!to);
            }
        },
        [completerRef],
    );

    return {
        isOpen,
        showAlert,
        showAlertAsync,
        closeModal,
    };
};

export type { UseAlertReturn };
export { useAlert };
