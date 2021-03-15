import Collection from "../models/Collection.js";
import Todo from "../models/Todo.js";

export const getCollectionsByUserId = async (req, res) => {
  let collections = [];

  if (req.query.userId) {
    collections = await Collection.find({ userId: req.query.userId }).sort({
      name: "asc",
    });
  }

  //if user id match param id send user else throw error
  if (collections) {
    res.status(200).json(collections);
  } else {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const createCollection = async (req, res) => {
  try {
    let collectionObj = req.body;
    let coll = new Collection(collectionObj);
    await coll.save();
    res.status(200).json(coll);
  } catch (ex) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
    return;
  }
};

export const deleteCollection = async (req, res) => {
  const { _id } = req.body;

  console.log(req.body);

  await Collection.findByIdAndDelete(_id);
  await Todo.updateMany(
    { collectionId: _id },
    { collectionId: "" },
    { new: true },
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated: ", res);
      }
    }
  );

  res.status(200).json({ deletedId: _id });
};
