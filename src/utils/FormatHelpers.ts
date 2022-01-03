import { Appointment } from 'app/entities/Appointment';
import { isPast } from 'date-fns';

class FormatHelpers {
    public static formatRSStringToNumber(rsString: string): number {
        return Number(rsString.replace('R$', ''));
    }
    public static getValidNotPaiedAppointments(
        appointments: Appointment[],
    ): Appointment[] {
        return appointments.filter(
            (appointment) =>
                !appointment.is_cancelled &&
                !appointment.is_paid &&
                isPast(appointment.date),
        );
    }
}

export { FormatHelpers };
