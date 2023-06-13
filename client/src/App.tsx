import { BrowserRouter as Router } from 'react-router-dom';

import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

const App = () => {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
};

export default App;
