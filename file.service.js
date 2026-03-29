import fs from "fs/promises";
import path from "path";

// Base directory → ALWAYS "generated"
const BASE_DIR = path.resolve("generated");

// Ensure generated folder exists
async function ensureBaseDir() {
    try {
        await fs.mkdir(BASE_DIR, { recursive: true });
    } catch (err) {
        console.error("Error creating base directory", err);
        throw err;
    }
}

// 🚨 Security check
function validateFileName(fileName) {
    const allowedExtensions = [".txt", ".js", ".json", ".py"];

    if (!allowedExtensions.includes(path.extname(fileName))) {
        throw new Error("File type not allowed");
    }
    if (!fileName || typeof fileName !== "string") {
        throw new Error("Invalid file name");
    }

    if (fileName.includes("..") || fileName.includes("/")) {
        throw new Error("Path traversal detected");
    }
}

// CREATE FILE
export async function createFile({ fileName, content }) {
    try {
        validateFileName(fileName);

        if (content === undefined) {
            throw new Error("Content is required");
        }

        await ensureBaseDir();

        const filePath = path.join(BASE_DIR, fileName);

        await fs.writeFile(filePath, content, "utf-8");

        return {
            success: true,
            message: "File created successfully",
            fileName,
            path: filePath
        };
    } catch (error) {
        console.error("Error creating file", error);
        return {
            success: false,
            message: error.message
        };
    }
}

// READ FILE
export async function readFile({ fileName }) {
    try {
        validateFileName(fileName);

        const filePath = path.join(BASE_DIR, fileName);

        const data = await fs.readFile(filePath, "utf-8");

        return {
            success: true,
            data,
            fileName
        };
    } catch (error) {
        console.error("Error reading file", error);
        return {
            success: false,
            message: error.message
        };
    }
}

// UPDATE FILE (overwrite)
export async function updateFile({ fileName, content }) {
    try {
        validateFileName(fileName);

        if (content === undefined) {
            throw new Error("Content is required");
        }

        const filePath = path.join(BASE_DIR, fileName);

        await fs.writeFile(filePath, content, "utf-8");

        return {
            success: true,
            message: "File updated successfully",
            fileName
        };
    } catch (error) {
        console.error("Error updating file", error);
        return {
            success: false,
            message: error.message
        };
    }
}

// APPEND FILE
export async function appendFile({ fileName, content }) {
    try {
        validateFileName(fileName);

        if (content === undefined) {
            throw new Error("Content is required");
        }

        const filePath = path.join(BASE_DIR, fileName);

        await fs.appendFile(filePath, content, "utf-8");

        return {
            success: true,
            message: "Content appended",
            fileName
        };
    } catch (error) {
        console.error("Error appending file", error);
        return {
            success: false,
            message: error.message
        };
    }
}

// DELETE FILE
export async function deleteFile({ fileName }) {
    try {
        validateFileName(fileName);

        const filePath = path.join(BASE_DIR, fileName);

        await fs.unlink(filePath);

        return {
            success: true,
            message: "File deleted",
            fileName
        };
    } catch (error) {
        console.error("Error deleting file", error);
        return {
            success: false,
            message: error.message
        };
    }
}