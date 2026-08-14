import { useState } from 'react';
import Shell from './components/Shell.jsx';
import LoginForm from './components/LoginForm.jsx';
import SoilDashboard from './components/SoilDashboard.jsx';

export default function App() {
  const [farmer, setFarmer] = useState(null);

  return (
    <Shell>
      {farmer ? (
        <SoilDashboard farmer={farmer} onSignOut={() => setFarmer(null)} />
      ) : (
        <LoginForm onSignedIn={setFarmer} />
      )}
    </Shell>
  );
}
