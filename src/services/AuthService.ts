import { auth, firestore } from './firebaseClient';
import { User } from 'app/entities/User';

export type SignInDTO = {
    email: string;
    password: string;
};

type SignUpDTO = {
    name: string;
    email: string;
    password: string;
};

class AuthService {
    public async signIn({ email, password }: SignInDTO): Promise<User> {
        const userCredentials = await auth.signInWithEmailAndPassword(
            email,
            password,
        );

        const user = {
            id: userCredentials.user?.uid,
            name: userCredentials.user?.displayName,
            email: userCredentials.user?.email,
            phone: userCredentials.user?.phoneNumber,
            avatar: userCredentials.user?.photoURL,
        } as User;
        return user;
    }

    public async signOut() {
        await auth.signOut();
    }

    public async signUp({ email, name, password }: SignUpDTO): Promise<User> {
        const userCredentials = await auth.createUserWithEmailAndPassword(
            email,
            password,
        );

        if (userCredentials.user) {
            await userCredentials.user.updateProfile({ displayName: name });
            await firestore
                .collection('users')
                .doc(userCredentials.user.uid)
                .set({});
        }

        const user = {
            id: userCredentials.user?.uid,
            name: name,
            email: userCredentials.user?.email,
            phone: userCredentials.user?.phoneNumber,
            avatar: userCredentials.user?.photoURL,
        } as User;
        return user;
    }

    public getCurretUser(): User | null {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return null;
        }
        return {
            id: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email as string,
            phone: currentUser.phoneNumber,
            avatar: currentUser.photoURL,
        };
    }
}

export { AuthService };
