import AdminPage from '@/Layout/AdminPage'
import MainBoss from "../../../root/components/mainBoss/MainBoss"//TODO:You should use relative paths with @
import React from 'react'
//TODO: you should use kebab-case in the name of the routes
export default function index() {
  return (
    <AdminPage>
        <MainBoss/>
    </AdminPage>
  )
}
