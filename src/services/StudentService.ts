import { v4 as uuid } from 'uuid';
import { auth, firestore } from './firebaseClient';

import { FormValues } from 'app/forms/manageStudent';

import { Student, StudentCover } from 'app/entities/Student';
import { Cost } from 'app/entities/Cost';
import { Schedule } from 'app/entities/Schedule';
import { Appointment } from 'app/entities/Appointment';

import { AppService } from './AppService';
import { AppointmentService } from './AppointmentService';

type CreateStudentRequestBody = FormValues;
type UpdateStudentRequestBody = FormValues;
type ListStudentsQueryParams = {
    costs?: boolean;
    schedules?: boolean;
    appointments?: boolean;
};
type ListStudentQueryParams = {
    costs?: boolean;
    schedules?: boolean;
    appointments?: boolean;
};
type ListStudentByRoutineDateResponse = (Omit<
    Student,
    'costs' | 'appointments'
> & {
    cost: Cost;
})[];

class StudentService extends AppService {
    public async createStudent(
        body: CreateStudentRequestBody,
    ): Promise<Student> {
        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }

        const studentId = uuid();
        const studentCollection = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students')
            .doc(studentId);

        const costsCollection = studentCollection.collection('costs');
        const schedulesCollection = studentCollection.collection('schedules');

        const student = {
            name: body.name,
            name_caregiver: body.name_caregiver,
            phone: body.phone,
            date_of_birth: body.date_of_birth,
            address: body.address,
            map_location: body.map_location,
            observation: body.observation,
            color: body.color,
            is_deleted: body.is_deleted,
        } as Student;

        if (!body.avatar.cancelled) {
            student.avatar = await this.uploadImage(body.avatar.uri);
        }

        const costs = [] as Cost[];
        const schedules = [] as Schedule[];
        await studentCollection.set(student);
        for (let cost of body.costs) {
            const { id, ...costWithoutId } = cost;
            await costsCollection.doc(id).set(costWithoutId);
            costs.push({ id, ...costWithoutId });
        }
        for (let schedule of body.schedules) {
            const { id, ...scheduleWithoutId } = schedule;
            await schedulesCollection.doc(id).set(scheduleWithoutId);
            schedules.push({ id, ...scheduleWithoutId });
        }
        return { ...student, id: studentId, costs, schedules };
    }

    public async updateStudent(
        body: UpdateStudentRequestBody,
    ): Promise<Student> {
        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }

        const studentCollection = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students')
            .doc(body.id);
        const costsCollection = studentCollection.collection('costs');
        const schedulesCollection = studentCollection.collection('schedules');

        const student = {
            name: body.name,
            name_caregiver: body.name_caregiver,
            phone: body.phone,
            date_of_birth: body.date_of_birth,
            address: body.address,
            map_location: body.map_location,
            observation: body.observation,
            color: body.color,
            is_deleted: body.is_deleted,
        } as Student;

        if (!body.avatar.cancelled && body.avatar?.type !== 'firebase') {
            student.avatar = await this.uploadImage(body.avatar.uri);
            const snap = await studentCollection.get();
            if (snap.data()?.avatar) {
                await this.deleteImage(snap.data()?.avatar);
            }
        }

        const costs = [] as Cost[];
        const schedules = [] as Schedule[];
        await studentCollection.update(student);
        for (let cost of body.costs) {
            const { id, ...costWithoutId } = cost;
            await costsCollection.doc(id).set(costWithoutId, { merge: true });
            costs.push({ id, ...costWithoutId });
        }
        for (let schedule of body.schedules) {
            const { id, ...scheduleWithoutId } = schedule;
            await schedulesCollection
                .doc(id)
                .set(scheduleWithoutId, { merge: true });
            schedules.push({ id, ...scheduleWithoutId });
        }
        return { ...student, id: body.id, costs, schedules };
    }

    public async deleteStudent(studentId: string): Promise<void> {
        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }
        const studentDocPath = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students')
            .doc(studentId);
        await studentDocPath.update({ is_deleted: true });
    }

    public async listStudent(
        studentId: string,
        params?: ListStudentQueryParams,
    ): Promise<Student | undefined> {
        const {
            appointments = false,
            costs = true,
            schedules = true,
        } = params || {};

        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }
        const studentDocPath = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students')
            .doc(studentId);

        const studentDoc = await studentDocPath.get();
        if (!studentDoc.exists) {
            throw { message: 'Aluno não encontrado!' };
        }

        const obj = {
            id: studentDoc.id,
            ...studentDoc.data(),
        } as Student;

        if (appointments) {
            const appointmentService = new AppointmentService();
            const appointmentsArr =
                await appointmentService.listAppointmentsByStudent(studentId);
            obj.appointments = appointmentsArr;
        }
        if (costs) {
            const costsArr = await this.getCollectionData<Cost>(
                studentDoc.ref.collection('costs'),
            );
            obj.costs = costsArr;
        }
        if (schedules) {
            const schedulesArr = await this.getCollectionData<Schedule>(
                studentDoc.ref.collection('schedules'),
            );
            obj.schedules = schedulesArr;
        }

        return obj;
    }

    public async listStudents(
        params?: ListStudentsQueryParams,
    ): Promise<StudentCover[]> {
        const {
            appointments = false,
            costs = false,
            schedules = false,
        } = params || {};

        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }
        const studentColl = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students');

        const students = [] as StudentCover[];
        const studentSnp = await studentColl.orderBy('name').get();
        for (let doc of studentSnp.docs) {
            const obj = {
                id: doc.id,
                ...doc.data(),
            } as StudentCover;
            if (appointments) {
                const appointmentsArr =
                    await this.getCollectionData<Appointment>(
                        doc.ref.collection('appointments'),
                    );

                obj.appointments = appointmentsArr;
            }
            if (costs) {
                const costsArr = await this.getCollectionData<Cost>(
                    doc.ref.collection('costs'),
                );
                obj.costs = costsArr;
            }
            if (schedules) {
                const schedulesArr = await this.getCollectionData<Schedule>(
                    doc.ref.collection('schedules'),
                );
                obj.schedules = schedulesArr;
            }
            students.push(obj);
        }
        return students.filter((student) => !student.is_deleted);
    }

    public async listStudentCosts(studentId: string): Promise<Cost[]> {
        if (!auth.currentUser) {
            throw { message: 'Usuário não autenticado' };
        }
        const studentCostRef = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students')
            .doc(studentId)
            .collection('costs');

        const costs = await this.getCollectionData<Cost>(studentCostRef);
        return costs.filter((cost) => !cost.is_deleted);
    }

    public async listStudentsByRoutineDate(
        date: Date,
    ): Promise<ListStudentByRoutineDateResponse> {
        const students = await this.listStudents({
            schedules: true,
            costs: true,
        });

        const treatedStudents = students
            .map((student) => {
                const { costs, schedules, ...rest } = student;
                const cost = costs?.find(
                    (co) => co.is_default && !co.is_deleted,
                );
                const acceptedSchedules =
                    schedules?.filter(
                        (sc) =>
                            !sc.is_deleted &&
                            sc.is_default &&
                            Number(sc.week_day) === date.getDay(),
                    ) || [];
                return {
                    ...rest,
                    cost: cost as Cost,
                    schedules: acceptedSchedules,
                };
            })
            .filter((student) => student.schedules?.length > 0 && student.cost);
        return treatedStudents;
    }
}

export { StudentService };
