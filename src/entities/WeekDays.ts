enum WeekDays {
    Monday = '1',
    Tuesday = '2',
    Wednesday = '3',
    Thursday = '4',
    Friday = '5',
    Saturday = '6',
    Sunday = '0',
}

const WeekDaysLabels = {
    [`${WeekDays.Monday}`]: 'Segunda',
    [`${WeekDays.Tuesday}`]: 'Terça',
    [`${WeekDays.Wednesday}`]: 'Quarta',
    [`${WeekDays.Thursday}`]: 'Quinta',
    [`${WeekDays.Friday}`]: 'Sexta',
    [`${WeekDays.Saturday}`]: 'Sábado',
    [`${WeekDays.Sunday}`]: 'Domingo',
};

export { WeekDays, WeekDaysLabels };
