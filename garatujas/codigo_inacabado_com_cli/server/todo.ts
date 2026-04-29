const filePath = "items.json"

export async function saveItem(item: string) {
    const file = Bun.file(filePath)
    const content = await file.json()
    content.push(item)
    const newContent = JSON.stringify(content)
    await Bun.write(filePath, newContent)
}

export async function deleteItem(item: string) {
    const file = Bun.file(filePath)
    const content = await file.json()
    content.push(item)
    const newContent = content.filter((i:string) => i !== item)
    await Bun.write(filePath, JSON.stringify(newContent))
}

export async function loadItems() {
    const file = Bun.file(filePath)
    return await file.json
}

export function uploadItem(olditem: string,newItem: string) {
    deleteItem(olditem)
    saveItem(newItem)
}
