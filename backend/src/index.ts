const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mi_clave_secreta";


app.use(cors());
app.use(express.json());

require("dotenv").config();
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

app.get("/", (req: any, res: any) => {
    res.send("Backend is working!");
});

app.get("/tasks", async(req: any, res: any) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Error fetching tasks" });
    }
});

app.post("/login", (req: any, res: any) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        const token = jwt.sign(
            { username: username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.json({ token });
    }

    res.status(401).json({ error: "Credenciales inválidas" });
});

const verifyToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Token inválido" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};

app.get("/private", verifyToken, (req: any, res: any) => {
    res.json({ message: "Acceso permitido" });
});

app.post("/tasks", async (req: any, res: any) => {
    console.log("POST /tasks fue llamado");
    console.log("Cuerpo de la solicitud:", req.body);
    try {
        const newTask = await prisma.task.create({
            data: {
                text: req.body.text,
                completed: false,
            },
        });
        res.json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Error creating task" });
    }
});

app.put("/tasks/:id", async (req: any, res: any) => {
    const taskId = parseInt(req.params.id);
    try {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                text: req.body.text,
                completed: req.body.completed,
            },
        });
        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Error updating task" });
    }
});

app.delete("/tasks/:id", async (req: any, res: any) => {
    const taskId = parseInt(req.params.id);
    try {
        await prisma.task.delete({
            where: { id: taskId },
        });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Error deleting task" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});