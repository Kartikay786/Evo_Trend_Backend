import express from 'express'
import { cRegister ,cLogin,adminRegister,adminLogin} from '../controllers/user.controller.js'

const router = express.Router();

router.post('/cRegister',cRegister);
router.post('/cLogin',cLogin);
router.post('/admin/register',adminRegister);
router.post('/admin/login',adminLogin)


export default router