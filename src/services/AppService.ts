import { v4 as uuid } from 'uuid';
import { firebase, storage } from './firebaseClient';

class AppService {
    public async getCollectionData<T>(
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

export { AppService };
