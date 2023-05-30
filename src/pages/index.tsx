import ButtonsForm from '@/components/ButtonsForm/ButtonsForm';
import Form  from '@/components/Form/Form';
import NavBar from '@/components/NavBar/NavBar';
import Head from 'next/head';
import React from 'react';


export default function Home() {

  
  return (
    <>
      <Head>
        <title>Health Way</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      
      <ButtonsForm />
      <Form />
      <NavBar />
    </>
  )
}
