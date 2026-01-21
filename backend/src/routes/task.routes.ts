import { Router } from "express";
import { prisma } from "../utils/prisma";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * CREATE TASK
 */
router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;
  const userId = (req as any).user.id;

  const task = await prisma.task.create({
    data: {
      title,
      userId
    }
  });

  res.json(task);
});

/**
 * GET TASKS (Pagination + Search)
 * /tasks?page=1&limit=5&search=test
 */
router.get("/", authMiddleware, async (req, res) => {
  const userId = (req as any).user.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const search = (req.query.search as string) || "";

  const skip = (page - 1) * limit;

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      title: {
        contains: search
      }
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" }
  });

  const total = await prisma.task.count({
    where: {
      userId,
      title: {
        contains: search
      }
    }
  });

  res.json({
    tasks,
    page,
    totalPages: Math.ceil(total / limit)
  });
});

/**
 * UPDATE TASK (Title / Completed)
 */
router.patch("/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const userId = (req as any).user.id;
  const { title, completed } = req.body;

  await prisma.task.updateMany({
    where: { id, userId },
    data: { title, completed }
  });

  res.json({ message: "Task updated" });
});

/**
 * TOGGLE TASK STATUS
 */
router.patch("/:id/toggle", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const userId = (req as any).user.id;

  const task = await prisma.task.findFirst({
    where: { id, userId }
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updated = await prisma.task.update({
    where: { id },
    data: { completed: !task.completed }
  });

  res.json(updated);
});

/**
 * DELETE TASK
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const userId = (req as any).user.id;

  await prisma.task.deleteMany({
    where: { id, userId }
  });

  res.json({ message: "Task deleted" });
});

export default router;
  