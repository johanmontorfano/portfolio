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
                "./src/movie_source", 
                "./src/movie.js", 
                "./moviemaker/glue.js"
            ]
        }]),
        ViteRestart({
            restart: ["./src/movie_source"]
        })
    ]
});
