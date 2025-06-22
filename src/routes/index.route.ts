import otpRouter from '@/routes/opt.route';
import userRouter from '@/routes/user.route';

import { Router } from 'express';

const router = Router();
const routes = [
  {
    path: '/user',
    router: userRouter,
  },
  {
    path: '/otp',
    router: otpRouter,
  },
];
routes.map((route) => {
  router.use(route.path, route.router);
});

export default router;
