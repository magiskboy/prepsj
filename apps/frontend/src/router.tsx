import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@/components/Layout/Layout.component';

const Home = () => import('@/pages/Home/Home.component');
const About = () => import("@/pages/About/About.component");
const Login = () => import("@/pages/Login/Login.component");
const ExaminationDetail = () => import("@/pages/ExaminationDetail/ExaminationDetail.component");
const TakeExamination = () => import("@/pages/TakeExamination/TakeExamination.component");
const NotMatch = () => import("@/pages/NotMatch/NotMatch.component");

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="" lazy={Home} />
    <Route path="about" lazy={About} />
    <Route path="login" lazy={Login} />
    <Route path="examinations/:id" lazy={ExaminationDetail} />
    <Route path="examinations/:id/take" lazy={TakeExamination} />
    <Route path="/not-found" lazy={NotMatch} />
    <Route path="*" lazy={NotMatch} />
  </Route>
);

const router = createBrowserRouter(routes);

export default function Router() {
  return <RouterProvider router={router} />
}