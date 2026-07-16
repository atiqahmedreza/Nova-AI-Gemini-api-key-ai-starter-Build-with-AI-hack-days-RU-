import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { ChatProvider } from './context/ChatContext'
import ToastContainer from './components/common/ToastContainer'
import Spinner from './components/common/Spinner'
import AuthFreeLayout from './layouts/AuthFreeLayout'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'

const ChatPage = lazy(() => import('./pages/ChatPage'))

function RouteLoader() {
  return (
    <div className="flex min-h-[50vh] flex-1 items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ChatProvider>
          <BrowserRouter>
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                <Route element={<AuthFreeLayout />}>
                  <Route index element={<LandingPage />} />
                </Route>

                <Route path="/chat" element={<AppLayout />}>
                  <Route index element={<ChatPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <ToastContainer />
        </ChatProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
