import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const Requests = lazy(() => import("./components/Requests"));
const Approvals = lazy(() => import("./components/Approvals"));
const Header = lazy(() => import("./components/Header"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Donations = lazy(() => import("./components/Donations"));
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/donations"
            element={
              <>
                <Header />
                <Donations />
              </>
            }
          />
          <Route
            path="/requests"
            element={
              <>
                <Header />
                <Requests />
              </>
            }
          />
          <Route
            path="/approvals"
            element={
              <>
                <Header />
                <Approvals />
              </>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
