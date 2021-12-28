enum WeekDays {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday',
}

const WeekDaysLabels = {
    [`${WeekDays.Monday}`]: 'Segunda-Feira',
    [`${WeekDays.Tuesday}`]: 'Terça-Feira',
    [`${WeekDays.Wednesday}`]: 'Quarta-Feira',
    [`${WeekDays.Thursday}`]: 'Quinta-Feira',
    [`${WeekDays.Friday}`]: 'Sexta-Feira',
    [`${WeekDays.Saturday}`]: 'Sábado-Feira',
    [`${WeekDays.Sunday}`]: 'Domingo-Feira',
};

export { WeekDays, WeekDaysLabels };
