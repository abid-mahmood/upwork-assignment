import Map from './components/Map';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useEffect } from 'react';

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

const signOut = () => {
  auth.signOut();
};


function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    // const data = googleSignIn();
  }, [])

  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
