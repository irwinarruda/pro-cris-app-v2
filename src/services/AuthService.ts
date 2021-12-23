import { auth } from './firebaseClient';
import { User } from 'app/entities/User';

export type SignInDto = {
    email: string;
    password: string;
};

class AuthService {
    public async signIn({ email, password }: SignInDto) {
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
}

export { AuthService };
