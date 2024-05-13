import React from 'react';
import {} from './styles/globalStyles'
import Dashboard from './components/Dashboard/DashboardEngineer';
import Routes from './AppRoutes';

const App: React.FC = () => {
  return (
    <div>
      {/* <h1 className='bg-indigo-100'>hello</h1> */}
      <Routes />
    </div>
  );
}

export default App;
