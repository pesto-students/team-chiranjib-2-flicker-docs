import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
// import { UserRoute } from '@routes/users.route';
import { DocumentRoute } from '@routes/document.route';
import { ValidateEnv } from '@utils/validateEnv';
import { PaymentRoute } from './routes/payment.route';

ValidateEnv();

const app = new App([new AuthRoute(), new DocumentRoute(), new PaymentRoute()]);

app.listen();
