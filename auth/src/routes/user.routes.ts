import { Router } from "express";
import {
  getAllUsers,
  getPagedUsers,
  getUserByEmail,
} from "../controllers/user.controller";

const router = Router();

router.get("/all", getAllUsers);
router.get("/page=:page&limit=:limit", getPagedUsers);
router.get("/email=:email", getUserByEmail);

export default router;
