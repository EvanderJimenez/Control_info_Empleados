import AdminPage from '@/Layout/AdminPage'
import React from 'react'
import InformationPage from '@/root/components/informationPage/InformationPage'

export default function index() {
  return (
    <AdminPage>
        <InformationPage img="https://unsplash.com/photos/gMsnXqILjp4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fG9maWNlfGVzfDB8fHx8MTY4NTMwMjg4M3ww&force=true" title="Welcome!" paragraph="Check your information for today" />
    </AdminPage>
  )
}
