const router = require("express").Router();
const { police_check } = require("../middlewares/index");
const categoryController = require("../controllers/category");

router.get("/categories", categoryController.index);
router.get("/categories/:id", categoryController.indexById);
router.post(
  "/categories",
  police_check("create", "Category"),
  categoryController.store
);
router.put(
  "/categories/:id",
  police_check("update", "Category"),
  categoryController.update
);
router.delete(
  "/categories/:id",
  police_check("delete", "Category"),
  categoryController.destroy
);

module.exports = router;
