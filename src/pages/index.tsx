'use client'

import React from 'react'
import LayoutNoApp from 'src/views/layouts/UserLayout/LayoutNoApp'

export default function Home() {
  return <></>
}

Home.getLayout = (page: React.ReactNode) => <LayoutNoApp>{page}</LayoutNoApp>
