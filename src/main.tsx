import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.scss'
import { RouterProvider } from 'react-router/dom'
import { router } from './router/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
