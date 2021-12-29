import { v4 as uuid } from 'uuid';
import { auth, firestore, firebase, storage } from './firebaseClient';

import { FormValues } from 'app/forms/manageStudent';

import { Student, StudentCover } from 'app/entities/Student';
import { Cost } from 'app/entities/Cost';
import { Schedule } from 'app/entities/Schedule';
import { Appointment } from 'app/entities/Appointment';

type CreateStudentRequestBody = FormValues;
type UpdateStudentRequestBody = FormValues;

class StudentService {
    public async createStudent(body: CreateStudentRequestBody): Promise<void> {
        if (!auth.currentUser) {
            return;
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

        await studentCollection.set(student);
        for (let cost of body.costs) {
            const { id, ...costWithoutId } = cost;
            await costsCollection.doc(id).set(costWithoutId);
        }
        for (let schedule of body.schedules) {
            const { id, ...scheduleWithoutId } = schedule;
            await schedulesCollection.doc(id).set(scheduleWithoutId);
        }
    }

    public async updateStudent(body: UpdateStudentRequestBody): Promise<void> {
        if (!auth.currentUser) {
            return;
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

        await studentCollection.update(student);
        for (let cost of body.costs) {
            const { id, ...costWithoutId } = cost;
            await costsCollection.doc(id).set(costWithoutId, { merge: true });
        }
        for (let schedule of body.schedules) {
            const { id, ...scheduleWithoutId } = schedule;
            await schedulesCollection
                .doc(id)
                .set(scheduleWithoutId, { merge: true });
        }
    }

    public async deleteStudent(studentId: string): Promise<void> {
        if (!auth.currentUser) {
            return;
        }
        const studentDocPath = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students')
            .doc(studentId);
        await studentDocPath.update({ is_deleted: true });
    }

    public async listStudent(studentId: string): Promise<Student | undefined> {
        if (!auth.currentUser) {
            return;
        }
        const studentDocPath = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students')
            .doc(studentId);

        const studentDoc = await studentDocPath.get();
        if (!studentDoc.exists) {
            return;
        }
        let student = {} as Student;

        const costs = await this.getSubCollection<Cost>(
            studentDoc.ref.collection('costs'),
        );
        const schedules = await this.getSubCollection<Schedule>(
            studentDoc.ref.collection('schedules'),
        );
        const appointments = await this.getSubCollection<Appointment>(
            studentDoc.ref.collection('appointments'),
        );

        const obj = {
            id: studentDoc.id,
            costs,
            schedules,
            appointments,
            ...studentDoc.data(),
        } as Student;
        student = obj;

        return student;
    }

    public async listStudents(): Promise<StudentCover[] | undefined> {
        if (!auth.currentUser) {
            return;
        }
        const studentColl = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students');

        const students = [] as StudentCover[];
        const studentSnp = await studentColl.orderBy('name').get();
        for (let doc of studentSnp.docs) {
            const appointments = await this.getSubCollection<Appointment>(
                doc.ref.collection('appointments'),
            );
            const obj = {
                id: doc.id,
                appointments,
                ...doc.data(),
            } as StudentCover;
            students.push(obj);
        }

        return students;
    }

    public async getSubCollection<T>(
        ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    ): Promise<T[]> {
        const snapshot = await ref.get();
        const data = [] as T[];
        for (let cDocs of snapshot.docs) {
            const obj = {
                id: cDocs.id,
                ...cDocs.data(),
            } as unknown as T;
            data.push(obj);
        }
        return data;
    }

    public async deleteImage(uri: string): Promise<void> {
        const ref = storage.refFromURL(uri);
        await ref.delete();
    }

    public async uploadImage(uri: string): Promise<string> {
        const blob = await new Promise<XMLDocument>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        const fileRef = storage.ref(uuid());
        await fileRef.put(blob as any);
        blob.close();

        return (await fileRef.getDownloadURL()) || '';
    }
}

export { StudentService };
