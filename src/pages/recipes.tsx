import{ useEffect } from 'react'
import { auth } from '../../config/firebaseAuth';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Recipes = () => {

  const router = useRouter();
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user?.uid) {
        router.push('/');
      };
    });
  }, [router]);

  const handleSalir = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    auth.signOut()
  };

  return (
    <>
      <Head>
        <title>Health Way</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <h1>recipes</h1>
      <button onClick={handleSalir}>salir</button>
    </>
  )
}

export default Recipes