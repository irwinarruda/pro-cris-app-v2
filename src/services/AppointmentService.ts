import { v4 as uuid } from 'uuid';
import { addHours, addMinutes } from 'date-fns';
import { AppService } from './AppService';
import { firestore, auth } from './firebaseClient';
import { DateHelpers } from 'app/utils/DateHelpers';
import { FormValues } from 'app/forms/createAppointment';
import { Appointment } from 'app/entities/Appointment';

type CreateAppointmentRequestBody = FormValues;

class AppointmentService extends AppService {
    public async createAppointment(appointment: CreateAppointmentRequestBody) {
        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }

        const appointmentId = uuid();
        const appointmentColl = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('appointments');

        const dbAppointments = (
            await this.getCollectionData<any>(appointmentColl)
        ).map((item) => ({
            ...item,
            date: item.date.toDate(),
        })) as Appointment[];

        const body = {
            id_student: appointment.id_student,
            is_extra: appointment.is_extra,
            date: DateHelpers.getDateByDDMMYYYYHHSSString(appointment.date),
            cost: appointment.cost,
            is_cancelled: false,
            is_paid: false,
            observation: '',
        } as Appointment;

        const isValidAppointment = this.isValidAppointment(
            body,
            dbAppointments,
        );

        if (!isValidAppointment) {
            throw { message: 'Data coincide com Aulas já cadastradas' };
        }

        await appointmentColl.doc(appointmentId).set(body);
    }

    public async listAppointments(): Promise<Appointment[]> {
        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }

        const appointmentColl = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('appointments')
            .orderBy('date');

        const appointments = (
            await this.getCollectionData<any>(appointmentColl as any)
        ).map((item) => ({
            ...item,
            date: item.date.toDate(),
        })) as Appointment[];

        return appointments;
    }

    public isValidAppointment(
        appointment: Appointment,
        dbAppointments: Appointment[],
    ): boolean {
        const dates = {
            start: appointment.date,
            end: DateHelpers.getEndDateByTime(
                appointment.date,
                appointment.cost.time,
            ),
        };

        const validDbAppointments = dbAppointments.filter((app) => {
            return !app.is_cancelled && !app.is_paid;
        });

        const isValidDate = validDbAppointments.every((app) => {
            const dbDateStart = app.date;
            const dbDateEnd = DateHelpers.getEndDateByTime(
                dbDateStart,
                app.cost.time,
            );
            return (
                !DateHelpers.isBetweenTwoDates(dbDateStart, dates) &&
                !DateHelpers.isBetweenTwoDates(dbDateEnd, dates)
            );
        });

        return isValidDate;
    }
}

export { AppointmentService };
