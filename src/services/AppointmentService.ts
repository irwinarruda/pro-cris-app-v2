import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import { firestore, auth } from './firebaseClient';
import { DateHelpers } from 'app/utils/DateHelpers';
import { FormValues as CreateFormValues } from 'app/forms/createAppointment';
import { FormValues as UpdateFormValues } from 'app/forms/manageAppointment';
import { Appointment } from 'app/entities/Appointment';

import { AppService } from './AppService';
import { StudentService } from './StudentService';

type CreateAppointmentRequestBody = CreateFormValues;
type UpdateAppointmentOptions = UpdateFormValues;

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
            is_paid: appointment.is_paid,
            is_cancelled: false,
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

    public async updateAppointment(
        appointment: UpdateAppointmentOptions,
    ): Promise<void> {
        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }
        const appointmentDoc = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('appointments')
            .doc(appointment.id);

        const updatedAppointment = {
            is_paid: appointment.is_paid,
            is_cancelled: appointment.is_cancelled,
            is_extra: appointment.is_extra,
            observation: appointment.observation,
        };
        await appointmentDoc.update(updatedAppointment);
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
        )
            .map((item) => ({
                ...item,
                date: item.date.toDate(),
            }))
            .filter((item) => !item.is_cancelled) as Appointment[];

        return appointments;
    }

    public async listAppointmentsByStudent(
        sudentId: string,
    ): Promise<Appointment[]> {
        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }

        const appointmentColl = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('appointments')
            .orderBy('date')
            .where('id_student', '==', sudentId);

        const appointments = (
            await this.getCollectionData<any>(appointmentColl as any)
        ).map((item) => ({
            ...item,
            date: item.date.toDate(),
        })) as Appointment[];

        return appointments;
    }

    public async listRoutineByDate(date: Date): Promise<Appointment[]> {
        const studentsService = new StudentService();
        const students = await studentsService.listStudentsByRoutineDate(date);
        const appointments = [] as Appointment[];
        students.forEach((student) =>
            student.schedules.forEach((schedule) => {
                appointments.push({
                    id: uuid(),
                    id_student: student.id,
                    is_extra: false,
                    date: DateHelpers.getDateByHHssString(
                        date,
                        schedule.day_time,
                    ),
                    cost: student.cost,
                    is_cancelled: false,
                    is_paid: false,
                    observation: '',
                });
            }),
        );

        return appointments;
    }

    public async createRoutineByDate(date: Date): Promise<void> {
        const studentsService = new StudentService();
        const treatedStudents = await studentsService.listStudentsByRoutineDate(
            date,
        );

        let errors = [] as string[];

        for (let student of treatedStudents) {
            for (let schedule of student.schedules) {
                try {
                    await this.createAppointment({
                        id: '',
                        id_student: student.id,
                        id_cost: student.cost!.id,
                        cost: {
                            id: student.cost!.id,
                            price: student.cost!.price,
                            time: student.cost!.time,
                        },
                        date: format(
                            DateHelpers.getDateByHHssString(
                                date,
                                schedule.day_time,
                            ),
                            'dd/MM/yyyy HH:mm',
                        ),
                        is_extra: false,
                        is_paid: false,
                    });
                } catch (err) {
                    errors.push(
                        `- Aula de ${format(
                            DateHelpers.getDateByHHssString(
                                date,
                                schedule.day_time,
                            ),
                            'HH:mm',
                        )} para ${student.name} não foi cadastrada;`,
                    );
                }
            }
        }

        if (errors.length > 0) {
            throw { message: errors };
        }
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
            return !app.is_cancelled;
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
