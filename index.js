import 'dotenv/config'
import readline from 'readline/promises'
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain"
import { sendEmail } from './mail.service.js';
import * as z from 'zod';
import { appendFile, createFile, deleteFile, readFile, updateFile } from './file.service.js';


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to sen an email",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email")
        })
    }
)
const fileNameSchema = z.string()
    .min(1)
    .max(100)
    .refine(name => !name.includes("..") && !name.includes("/"), {
        message: "Invalid file name (path traversal detected)"
    });

const contentSchema = z.string().min(1);
export const createFileTool = tool(
    createFile,
    {
        name: "createFileTool",
        description: "Create a new file inside the generated folder with given content",
        schema: z.object({
            fileName: fileNameSchema.describe("Name of the file (e.g. hello.txt, app.js)"),
            content: contentSchema.describe("Content to write inside the file")
        })
    }
);
export const readFileTool = tool(
    readFile,
    {
        name: "readFileTool",
        description: "Read the content of a file from the generated folder",
        schema: z.object({
            fileName: fileNameSchema.describe("Name of the file to read")
        })
    }
);
export const updateFileTool = tool(
    updateFile,
    {
        name: "updateFileTool",
        description: "Overwrite an existing file with new content",
        schema: z.object({
            fileName: fileNameSchema,
            content: contentSchema
        })
    }
);
export const appendFileTool = tool(
    appendFile,
    {
        name: "appendFileTool",
        description: "Append content to an existing file",
        schema: z.object({
            fileName: fileNameSchema,
            content: contentSchema
        })
    }
);
export const deleteFileTool = tool(
    deleteFile,
    {
        name: "deleteFileTool",
        description: "Delete a file from the generated folder",
        schema: z.object({
            fileName: fileNameSchema
        })
    }
);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const model = new ChatMistralAI({
    model: "mistral-small-latest",
})



const agent = createAgent({
    model,
    tools: [
        emailTool,
        createFileTool,
        readFileTool,
        updateFileTool,
        appendFileTool,
        deleteFileTool
    ]

})

const messages = []

while (true) {

    const userInput = await rl.question("\x1b[33mYou: \x1b[0m ")
    if (userInput.toLowerCase() === "bye") {
        messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({
        messages
    })

    messages.push(response.messages[response.messages.length - 1])


    console.log(`\x1b[32mAI: \x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
        break
        rl.close()
    }

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({
        messages
    })

    messages.push(response.messages[response.messages.length - 1])


    console.log(`\x1b[32mAI: \x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
}
rl.close()
