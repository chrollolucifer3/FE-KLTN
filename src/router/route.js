
import { createBrowserRouter } from 'react-router-dom';
import { clientRoutes } from './clientRoutes';
import { adminRoutes } from './adminRoutes';

const router = createBrowserRouter([
  ...clientRoutes,
  ...adminRoutes
]);

export default router;
