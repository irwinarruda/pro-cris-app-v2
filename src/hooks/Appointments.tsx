/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useContextSelector, createContext } from 'use-context-selector';

type AppointmentsContextProps = {
    isModalAppointmentOpen: boolean;
    onModalAppointmentOpen: () => void;
    onModalAppointmentClose: () => void;

    isStaggerOpen: boolean;
    onStaggerOpen: () => void;
    onStaggerClose: () => void;
};

type AppointmentsProviderProps = {
    children: React.ReactNode;
};

const AppointmentsContext = createContext({} as AppointmentsContextProps);

const AppointmentsProvider = ({ children }: AppointmentsProviderProps) => {
    const [isModalAppointmentOpen, setIsModalAppointmentOpen] =
        React.useState<boolean>(false);
    const onModalAppointmentOpen = React.useCallback(() => {
        setIsModalAppointmentOpen(true);
    }, []);
    const onModalAppointmentClose = React.useCallback(() => {
        setIsModalAppointmentOpen(false);
    }, []);

    const [isStaggerOpen, setIsStaggerOpen] = React.useState<boolean>(false);
    const onStaggerOpen = React.useCallback(() => {
        setIsStaggerOpen(true);
    }, []);
    const onStaggerClose = React.useCallback(() => {
        setIsStaggerOpen(false);
    }, []);

    return (
        <AppointmentsContext.Provider
            value={{
                isModalAppointmentOpen,
                onModalAppointmentOpen,
                onModalAppointmentClose,
                isStaggerOpen,
                onStaggerOpen,
                onStaggerClose,
            }}
        >
            {children}
        </AppointmentsContext.Provider>
    );
};

const neededFunctions = [
    'onModalAppointmentOpen',
    'onModalAppointmentClose',
    'onStaggerOpen',
    'onStaggerClose',
] as const;

const neededStates = {
    modal: ['isModalAppointmentOpen'],
    stagger: ['isStaggerOpen'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

const useAppointments = <T extends NeededStatesKeys = 'none'>(
    key = 'none' as T,
) => {
    let hooks = {} as Pick<
        AppointmentsContextProps,
        typeof neededStates[T][number]
    >;
    let fncs = {} as Pick<
        AppointmentsContextProps,
        typeof neededFunctions[number]
    >;
    neededFunctions.forEach((keyValue) => {
        fncs[keyValue] = useContextSelector(
            AppointmentsContext,
            (ctx) => ctx[keyValue],
        );
    });

    neededStates[key].forEach((keyValue) => {
        hooks[keyValue as typeof neededStates[T][number]] = useContextSelector(
            AppointmentsContext,
            (ctx) => ctx[keyValue as typeof neededStates[T][number]],
        );
    });

    return { ...hooks, ...fncs };
};

export { AppointmentsContext, AppointmentsProvider, useAppointments };
