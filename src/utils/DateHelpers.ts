import { addHours, addMinutes } from 'date-fns';

class DateHelpers {
    public static getEndDateByTime(dateStart: Date, time: string): Date {
        const [hour, minute] = time.split(':').map((value) => Number(value));
        const dateEnd = addMinutes(addHours(dateStart, hour), minute);
        return dateEnd;
    }

    public static getDateByDDMMYYYYHHSSString(formatedString: string): Date {
        const [day, month, year, hours, seconds] = formatedString
            .split(/[\/:\s]/)
            .map((value) => Number(value));
        return new Date(year, month - 1, day, hours, seconds);
    }

    public static isBetweenTwoDates(
        date: Date,
        { start, end }: { start: Date; end: Date },
    ): boolean {
        if (date >= start && date <= end) {
            return true;
        }
        return false;
    }
}

export { DateHelpers };
