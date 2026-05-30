import { Router } from "express";
import { login, refreshtoken, register } from "../controller/auth.js";

const router = Router()

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshtoken);

export default router;