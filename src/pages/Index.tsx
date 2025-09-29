import { useState } from "react";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LoginForm } from "@/components/auth/LoginForm";
import { MockDataProvider } from "@/components/dashboard/MockDataProvider";
import heroImage from "@/assets/fire-safety-hero.jpg";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Demo login - in production, this would validate against your Supabase auth
    if (email === "admin@demo.com" && password === "demo123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Use admin@demo.com / demo123 for demo.");
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <MockDataProvider>
      <Dashboard />
    </MockDataProvider>
  );
};

export default Index;
