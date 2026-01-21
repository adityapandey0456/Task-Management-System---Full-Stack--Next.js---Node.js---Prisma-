import { prisma } from "../utils/prisma";

export const createTask = async (req: any, res: any) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });

  const task = await prisma.task.create({
    data: { title, userId: req.user.id }
  });

  res.json(task);
};

/* =========================
   GET TASKS WITH FEATURES
   ========================= */
export const getTasks = async (req: any, res: any) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const status = req.query.status; // completed | pending
  const search = req.query.search; // title search

  const where: any = {
    userId: req.user.id
  };

  if (status === "completed") where.completed = true;
  if (status === "pending") where.completed = false;

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive"
    };
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "desc" }
    }),
    prisma.task.count({ where })
  ]);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    tasks
  });
};

export const toggleTask = async (req: any, res: any) => {
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== req.user.id)
    return res.status(404).json({ message: "Task not found" });

  const updated = await prisma.task.update({
    where: { id },
    data: { completed: !task.completed }
  });

  res.json(updated);
};

export const deleteTask = async (req: any, res: any) => {
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== req.user.id)
    return res.status(404).json({ message: "Task not found" });

  await prisma.task.delete({ where: { id } });
  res.json({ message: "Task deleted" });
};
