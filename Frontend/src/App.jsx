import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/Auth.context'
import { InterviewProvider } from './features/interview/interview.context'

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
    
  )
}

export default App
