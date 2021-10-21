import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController';
import { ProfileUserController } from './controllers/ProfileUserController';
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';

const router = Router();
const authenticateController = new AuthenticateUserController();
const messagesController = new CreateMessageController();
const getMessageController = new GetLastThreeMessagesController();
const getUserProfile = new ProfileUserController();

router.post('/authenticate', authenticateController.handle)
router.post('/messages', ensureAuthenticate, messagesController.handle)
router.get('/messages/last3', getMessageController.handle)
router.get('/profile', ensureAuthenticate, getUserProfile.handle)

export { router };