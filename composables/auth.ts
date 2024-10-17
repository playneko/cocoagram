import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

type Auth = {
  token: globalThis.Ref<string | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuthState: () => void;
  signInWithGoogle: () => Promise<void>;
};

export const useAuth = (): Auth => {
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
      if(user) {
        const idToken = await user.getIdToken();
        token.value = idToken;
      } else {
        token.value = null;
      }
    });
  };

  // Google
  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    token.value = idToken;
  }

  return {
    signIn,
    signOut,
    token,
    checkAuthState,
    signInWithGoogle,
  }
};

export const useToken = (): globalThis.Ref<string | null> => useState<string | null>('token', () => null);