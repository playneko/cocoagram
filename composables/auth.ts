import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useAccount } from '~/composables/account';

type Auth = {
  token: globalThis.Ref<string | null>;
  userInfo: globalThis.Ref<object | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuthState: () => void;
  signInWithGoogle: () => Promise<void>;
};

export const useAuth = (): Auth => {
  const { setAccount } = useAccount();
  const userInfo = useUserInfo();
  const token = useToken();

  const signIn = async (email: string, password: string): Promise<void> => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    token.value = idToken;
  };

  const signOut = async (): Promise<void> => {
    const auth = getAuth();
    await firebaseSignOut(auth);
    token.value = null;
  };

  const checkAuthState = (): void => {
    // serverからは利用できなくします
    if (process.server) return;
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      setAccount(user);
    });
  };

  // Google
  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    const userInfoData = {
      token: await userCredential.user.getIdToken(),
      uid: await userCredential.user.uid,
      email: await userCredential.user.email,
      photoURL: await userCredential.user.photoURL,
      phoneNumber: await userCredential.user.phoneNumber,
      displayName: await userCredential.user.displayName,
      emailVerified: await userCredential.user.emailVerified
    }
    token.value = idToken;
    userInfo.value = userInfoData;
  }

  return {
    signIn,
    signOut,
    token,
    userInfo,
    checkAuthState,
    signInWithGoogle,
  }
};

export const useToken = (): globalThis.Ref<string | null> => useState<string | null>('token', () => null);
export const useUserInfo = (): globalThis.Ref<object | null> => useState<object | null>('userInfo', () => null);