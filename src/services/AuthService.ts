import { auth } from './firebaseClient';
import { User } from 'app/entities/User';

export type SignInDTO = {
    email: string;
    password: string;
};

class AuthService {
    public async signIn({ email, password }: SignInDTO) {
        const userCredential = await auth.signInWithEmailAndPassword(
            email,
            password,
        );
        const user = {
            id: userCredential.user?.uid,
            name: userCredential.user?.displayName,
            email: userCredential.user?.email,
            phone: userCredential.user?.phoneNumber,
            avatar: userCredential.user?.photoURL,
        } as User;
        return user;
    }

    public async signOut() {
        await auth.signOut();
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
