import * as todo from "./todo.js";

const command = process.argv[2]
const value = process.argv[3]

if(command === "read"){
    const items = todo.loadItems()

    process.exit(0)
}

if(command === "create"){
    
}