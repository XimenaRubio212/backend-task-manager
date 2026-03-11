import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, updateUserStatus, getUserTasks } from "../controllers/user.controller.js";
import { seeTasksByUser, updateStatusUser } from "../models/user.module.js";

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/status', updateStatusUser);
router.get('/:userId/tasks', seeTasksByUser);

export default router;
