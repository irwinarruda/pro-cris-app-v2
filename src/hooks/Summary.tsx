import React from 'react';
import { useDisclose } from 'native-base';

type SummaryType = 'all' | 'notpaid';

type SummaryContextProps = {
    isOpenModalSummary: boolean;
    onCloseModalSummary: () => void;
    onOpenModalSummary: () => void;

    isOpenModalOptionsSummary: boolean;
    onCloseModalOptionsSummary: () => void;
    onOpenModalOptionsSummary: () => void;

    summaryStudentId: string | 'updated';
    setSummaryStudentId: React.Dispatch<
        React.SetStateAction<string | 'updated'>
    >;

    summaryType: SummaryType;
    setSummaryType: React.Dispatch<React.SetStateAction<SummaryType>>;
};
type SummaryProviderProps = {
    children: React.ReactNode;
};

const SummaryContext = React.createContext({} as SummaryContextProps);

const SummaryProvider = ({ children }: SummaryProviderProps) => {
    const {
        isOpen: isOpenModalSummary,
        onClose: onCloseModalSummary,
        onOpen: onOpenModalSummary,
    } = useDisclose();
    const {
        isOpen: isOpenModalOptionsSummary,
        onClose: onCloseModalOptionsSummary,
        onOpen: onOpenModalOptionsSummary,
    } = useDisclose();
    const [summaryStudentId, setSummaryStudentId] = React.useState('');
    const [summaryType, setSummaryType] =
        React.useState<SummaryType>('notpaid');

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
            }}
        >
            {children}
        </SummaryContext.Provider>
    );
};

const useSummary = () => {
    const context = React.useContext(SummaryContext);
    return context;
};

export type { SummaryType, SummaryContextProps, SummaryProviderProps };
export { SummaryContext, SummaryProvider, useSummary };
