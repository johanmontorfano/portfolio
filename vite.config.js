import { defineConfig } from "vite";
import { run } from 'vite-plugin-run'
import ViteRestart from "vite-plugin-restart";

export default defineConfig({
    build: {
        target: "ESNext"
    },
    plugins: [
        run([{
            name: "moviemaker transpile",
            run: [
                "py", 
                "./moviemaker/index.py", 
                "./src/index.an", 
                "./src/index.js", 
                "./moviemaker/glue.js"
            ]
        }]),
        ViteRestart({
            restart: ["./src/index.an"]
        })
    ]
});
