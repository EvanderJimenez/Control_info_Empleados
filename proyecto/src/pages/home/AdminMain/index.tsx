import AdminPage from '@/Layout/AdminPage'
import React from 'react'
import InformationPage from '@/root/components/informationPage/InformationPage'

export default function index() {
  return (
    <AdminPage>
        <InformationPage img="/Images/AdminDesk.jpg" title="Welcome!" paragraph="Check your information for today" />
    </AdminPage>
  )
}
