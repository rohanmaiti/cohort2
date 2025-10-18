const router = require("express").Router();
const prisma = require("../client.js");

router.get("/all-users", async (req, res) => {
  const users = await prisma.users.findMany();
  console.log(users);
  return res.status(200).json({
    users: users,
  });
});

router.get("/add-user", async (req, res) => {
  const userId = req.query.id;
  const result = await prisma.users.create({
    data: {
      email: "rahul@gmail.com",
      password: "123",
    },
  });
  res.send(result);
});

router.get("/user/:id", async (req, res) => {
  const paramsObject = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(paramsObject.id),
    },
  });
  return res.json({
    user: user,
  });
});

router.post("/add-todos/:id", async (req, res) => {
  const { title, description } = req.body;
  const id = parseInt(req.params.id);
  const result = await prisma.todos.create({
    data: {
      title: title,
      description: description,
      userId: id,
    },
  });
  res.json(result);
});

router.get("/all-todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const allTodos = await prisma.todos.findMany({
    where: {
      userId: id,
    },
    select: {
      userId: false,
    },
  });
  res.json(allTodos);
});

router.get("/health", (req, res) => {
  res.json({
    message: "Health is ok",
    status: 200,
  });
});
module.exports = router;
