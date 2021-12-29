import { v4 as uuid } from 'uuid';
import { auth, firestore, storage } from './firebaseClient';

import { FormValues } from 'app/forms/manageStudent';

import { Student } from 'app/entities/Student';
import { Cost } from 'app/entities/Cost';
import { Schedule } from 'app/entities/Schedule';

type CreateStudentRequestBody = FormValues;
type UpdateStudentRequestBody = FormValues;

class StudentService {
    public async createStudent(body: CreateStudentRequestBody): Promise<void> {
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

        if (!auth.currentUser) {
            return;
        }

        if (!body.avatar.cancelled) {
            student.avatar = await this.uploadImage(body.avatar.uri);
        }

        const studentCollection = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students');

        const studentId = uuid();
        const costsCollection = studentCollection
            .doc(studentId)
            .collection('costs');
        const schedulesCollection = studentCollection
            .doc(studentId)
            .collection('schedules');

        await studentCollection.doc(studentId).set(student);
        for (let cost of body.costs) {
            const { id, ...costWithoutId } = cost;
            await costsCollection.doc(id).set(costWithoutId);
        }
        for (let schedule of body.schedules) {
            const { id, ...scheduleWithoutId } = schedule;
            await schedulesCollection.doc(id).set(scheduleWithoutId);
        }
    }

    public async updateStudent(body: UpdateStudentRequestBody) {
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

        if (!auth.currentUser) {
            return;
        }

        if (!body.avatar.cancelled && body.avatar?.type === 'firebase') {
            student.avatar = await this.uploadImage(body.avatar.uri);
        }

        const studentCollection = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students');
        const costsCollection = studentCollection
            .doc(body.id)
            .collection('costs');
        const schedulesCollection = studentCollection
            .doc(body.id)
            .collection('schedules');

        await studentCollection.doc(body.id).update(student);
        for (let cost of body.costs) {
            const { id, ...costWithoutId } = cost;
            await costsCollection.doc(id).set(costWithoutId);
        }
        for (let schedule of body.schedules) {
            const { id, ...scheduleWithoutId } = schedule;
            await schedulesCollection.doc(id).set(scheduleWithoutId);
        }
    }

    public async listStudents() {
        if (!auth.currentUser) {
            return;
        }
        const studentCollection = firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('students');
        const querySnapshot = await studentCollection.get();
        querySnapshot.docs;
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
