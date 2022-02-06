/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useContextSelector, createContext } from 'use-context-selector';

type SummaryType = 'all' | 'notpaid' | 'updated';

type SummaryContextProps = {
    isOpenModalSummary: boolean;
    onCloseModalSummary: () => void;
    onOpenModalSummary: () => void;
    isOpenModalOptionsSummary: boolean;
    onCloseModalOptionsSummary: () => void;
    onOpenModalOptionsSummary: () => void;
    summaryStudentId: string;
    setSummaryStudentId: React.Dispatch<React.SetStateAction<string>>;
    summaryType: SummaryType;
    setSummaryType: React.Dispatch<React.SetStateAction<SummaryType>>;
    handleHydrateModalState: () => void;
    handleEditAppointmentPress: (studentId: string) => void;
};

type SummaryProviderProps = {
    children: React.ReactNode;
};

const SummaryContext = createContext({} as SummaryContextProps);

const SummaryProvider = ({ children }: SummaryProviderProps) => {
    const [isOpenModalSummary, setIsOpenModalSummary] =
        React.useState<boolean>(false);
    const onOpenModalSummary = React.useCallback(() => {
        setIsOpenModalSummary(true);
    }, []);
    const onCloseModalSummary = React.useCallback(() => {
        setIsOpenModalSummary(false);
    }, []);

    const [isOpenModalOptionsSummary, setIsOpenModalOptionsSummary] =
        React.useState<boolean>(false);
    const onOpenModalOptionsSummary = React.useCallback(() => {
        setIsOpenModalOptionsSummary(true);
    }, []);
    const onCloseModalOptionsSummary = React.useCallback(() => {
        setIsOpenModalOptionsSummary(false);
    }, []);

    const [summaryStudentId, setSummaryStudentId] = React.useState<string>('');
    const [summaryType, setSummaryType] =
        React.useState<SummaryType>('notpaid');

    const handleHydrateModalState = React.useCallback(() => {
        if (summaryStudentId) {
            onOpenModalOptionsSummary();
            onOpenModalSummary();
            setSummaryStudentId('');
        }
    }, [summaryStudentId]);

    const handleEditAppointmentPress = React.useCallback(
        (studentId: string) => {
            onCloseModalOptionsSummary();
            onCloseModalSummary();
            setSummaryStudentId(studentId);
        },
        [],
    );

    return (
        <SummaryContext.Provider
            value={{
                isOpenModalSummary,
                onCloseModalSummary,
                onOpenModalSummary,
                isOpenModalOptionsSummary,
                onCloseModalOptionsSummary,
                onOpenModalOptionsSummary,
                summaryStudentId,
                setSummaryStudentId,
                summaryType,
                setSummaryType,
                handleHydrateModalState,
                handleEditAppointmentPress,
            }}
        >
            {children}
        </SummaryContext.Provider>
    );
};

const neededFunctions = [
    'onCloseModalSummary',
    'onOpenModalSummary',
    'onCloseModalOptionsSummary',
    'onOpenModalOptionsSummary',
    'setSummaryStudentId',
    'setSummaryType',
    'handleHydrateModalState',
    'handleEditAppointmentPress',
] as const;

const neededStates = {
    mAppointments: ['summaryStudentId'],
    modOpt: ['isOpenModalOptionsSummary'],
    begin: ['isOpenModalOptionsSummary', 'isOpenModalSummary'],
    modSum: ['isOpenModalSummary', 'summaryType'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

const useSummary = <T extends NeededStatesKeys = 'none'>(key = 'none' as T) => {
    let hooks = {} as Pick<SummaryContextProps, typeof neededStates[T][number]>;
    let fncs = {} as Pick<SummaryContextProps, typeof neededFunctions[number]>;

    neededFunctions.forEach((keyValue) => {
        (fncs as any)[keyValue] = useContextSelector(
            SummaryContext,
            (ctx) => ctx[keyValue],
        );
    });

    neededStates[key].forEach((keyValue) => {
        hooks[keyValue as typeof neededStates[T][number]] = useContextSelector(
            SummaryContext,
            (ctx) => ctx[keyValue as typeof neededStates[T][number]],
        );
    });

    return { ...hooks, ...fncs };
};

export type { SummaryType, SummaryContextProps, SummaryProviderProps };
export { SummaryContext, SummaryProvider, useSummary };
