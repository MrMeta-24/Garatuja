/*import { resolve } from "bun";*/
import index from "./index.html";

function getCurrentTimeBR(){
    const now = new Date();
    return now.toLocaleTimeString("pt-BR")
}

console.log(getCurrentTimeBR());

const server = Bun.serve({
    routes:{
        "/": index,
        "/time": () => new Response(getCurrentTimeBR())
    }
})

console.log(`Server Running: ${server.port}`)

/*http://localhost:3000/time*/