import express from "express";
import { quickSaveCreate, getAllEmbedLinks } from "../controllers/quickSave.mjs";

const router = express.Router();

router.post("/quicksave", quickSaveCreate);
router.get("/quicksave", getAllEmbedLinks);

export default router;
