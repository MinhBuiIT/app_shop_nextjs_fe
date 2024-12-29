'use client'
import Button from '@mui/material/Button'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Button variant='contained'>Hello world</Button>
    </>
  )
}
