/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useContextSelector, createContext } from 'use-context-selector';

type ManageStudentContextProps = {
    isManageCostsOpen: boolean;
    onManageCostsOpen: () => void;
    onManageCostsClose: () => void;
    isManageSchedulesOpen: boolean;
    onManageSchedulesOpen: () => void;
    onManageSchedulesClose: () => void;
};
type ManageStudentProviderProps = {
    children: React.ReactNode;
};

const ManageStudentContext = createContext({} as ManageStudentContextProps);

const ManageStudentProvider = ({ children }: ManageStudentProviderProps) => {
    const [isManageCostsOpen, setIsManageCostsOpen] =
        React.useState<boolean>(false);
    const onManageCostsOpen = React.useCallback(() => {
        setIsManageCostsOpen(true);
    }, []);
    const onManageCostsClose = React.useCallback(() => {
        setIsManageCostsOpen(false);
    }, []);

    const [isManageSchedulesOpen, setIsManageSchedulesOpen] =
        React.useState<boolean>(false);
    const onManageSchedulesOpen = React.useCallback(() => {
        setIsManageSchedulesOpen(true);
    }, []);
    const onManageSchedulesClose = React.useCallback(() => {
        setIsManageSchedulesOpen(false);
    }, []);

    return (
        <ManageStudentContext.Provider
            value={{
                isManageCostsOpen,
                onManageCostsOpen,
                onManageCostsClose,
                isManageSchedulesOpen,
                onManageSchedulesOpen,
                onManageSchedulesClose,
            }}
        >
            {children}
        </ManageStudentContext.Provider>
    );
};

const neededFunctions = [
    'onManageCostsOpen',
    'onManageCostsClose',
    'onManageSchedulesOpen',
    'onManageSchedulesClose',
] as const;

const neededStates = {
    none: [],
    costs: ['isManageCostsOpen'],
    schedules: ['isManageSchedulesOpen'],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

const useManageStudent = <T extends NeededStatesKeys = 'none'>(
    key = 'none' as T,
) => {
    let hooks = {} as Pick<
        ManageStudentContextProps,
        typeof neededStates[T][number]
    >;
    let fncs = {} as Pick<
        ManageStudentContextProps,
        typeof neededFunctions[number]
    >;
    neededFunctions.forEach((keyValue) => {
        fncs[keyValue] = useContextSelector(
            ManageStudentContext,
            (ctx) => ctx[keyValue],
        );
    });

    neededStates[key].forEach((keyValue) => {
        hooks[keyValue as typeof neededStates[T][number]] = useContextSelector(
            ManageStudentContext,
            (ctx) => ctx[keyValue as typeof neededStates[T][number]],
        );
    });

    return { ...hooks, ...fncs };
};

// const useManageStudent = <T extends NeededStatesKeys = 'none'>(
//     key = 'none' as T,
// ) => {
//     let hooks = {} as Pick<
//         ManageStudentContextProps,
//         typeof neededStates[T][number]
//     >;
//     let fncs = {} as Pick<
//         ManageStudentContextProps,
//         typeof neededFunctions[number]
//     >;
//     fncs = useContextSelector(ManageStudentContext, (ctx) => {
//         return neededFunctions.map((keyValue) => ctx[keyValue]) as any;
//     }) as Pick<ManageStudentContextProps, typeof neededFunctions[number]>;

//     hooks = useContextSelector(ManageStudentContext, (ctx) => {
//         return neededStates[key].map((keyValue) => ctx[keyValue]) as any;
//     }) as Pick<ManageStudentContextProps, typeof neededStates[T][number]>;

//     return { ...hooks, ...fncs };
// };

// const useManageStudent = <T extends NeededStatesKeys = 'none'>(
//     key = 'none' as T,
// ) => {
//     let hooks = {} as Pick<
//         ManageStudentContextProps,
//         typeof neededStates[T][number]
//     >;
//     let fncs = {} as Pick<
//         ManageStudentContextProps,
//         typeof neededFunctions[number]
//     >;
//     fncs = useContextSelector(ManageStudentContext, (ctx) => {
//         let values = {} as Pick<
//             ManageStudentContextProps,
//             typeof neededFunctions[number]
//         >;
//         neededFunctions.forEach((keyValue) => {
//             values[keyValue] = ctx[keyValue];
//         });
//         return values;
//     });

//     hooks = useContextSelector(ManageStudentContext, (ctx) => {
//         let values = {} as Pick<
//             ManageStudentContextProps,
//             typeof neededStates[T][number]
//         >;
//         if (key === 'none') {
//             return values;
//         }
//         neededStates[key].forEach((keyValue) => {
//             values[keyValue as typeof neededStates[T][number]] =
//                 ctx[keyValue as typeof neededStates[T][number]];
//         });
//         return values;
//     });

//     return { ...hooks, ...fncs };
// };

export { ManageStudentContext, ManageStudentProvider, useManageStudent };
