import {
  createCollection,
  deleteCollection,
  getCollectionsByUserId,
} from "../controllers/collectionController.js";
import express from "express";

// express router method to create route for getting users by id
const router = express.Router();

router.route("/").get(getCollectionsByUserId);
router.route("/").delete(deleteCollection);
router.route("/").post(createCollection);

//router.get('/:id').get(getCollectionById);

export default router;
