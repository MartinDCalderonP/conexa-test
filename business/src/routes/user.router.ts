import { Router } from "express";
import {
  getAllRegisterdUsers,
  getPagedUsers,
  getSearchedUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/all", getAllRegisterdUsers);

router.get("/page=:page([0-9]+)&limit=:limit([0-9]+)", getPagedUsers);

router.get("/email=:email", getSearchedUser);

export default router;
