import { useState } from "react";
import RegisterLoginPage from "./assets/registerLogin/page.jsx";
import DashboardPage from "./assets/dashboard/page.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return isAuthenticated ? (
    <DashboardPage onLogout={handleLogout} />
  ) : (
    <RegisterLoginPage onAuthSuccess={handleAuthSuccess} />
  );
}

export default App;
