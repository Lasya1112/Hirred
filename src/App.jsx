import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import Onboarding from './pages/onboarding';
import JobListing from './pages/job-listing';
import JobPage from './pages/jobs';
import MyJobs from './pages/my-jobs';
import SavedJobs from './pages/saved-jobs';
import PostJobs from './pages/post-jobs';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path: '/',
        element: <LandingPage/>,
      },
      {
        path: '/onboarding',
        element: (
          <Onboarding/>
        ),
      },
      {
        path: '/jobs',
        element: (
        <ProtectedRoute>
          <JobListing/>
        </ProtectedRoute>
        ),
      },
      {
        path: '/jobs/:id',
        element: (
        <ProtectedRoute>
          <MyJobs/>
        </ProtectedRoute>
        ),
      },
      {
        path: '/post-jobs',
        element: (
        <ProtectedRoute>
          <PostJobs/>
        </ProtectedRoute>
        ),
      },
      {
        path: '/saved-jobs',
        element: (
        <ProtectedRoute>
          <SavedJobs/>
        </ProtectedRoute>
        ),
      },
      {
        path: '/my-jobs',
        element: (
        <ProtectedRoute>
          <JobPage/>
        </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
    
  );
}

export default App;
