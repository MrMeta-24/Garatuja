const temp: string[] = [];

const server = Bun.serve({
    port: 3000,
    routes: {

        "/pessoa/:id": (req, res) => {
            return new Response(`ID Pessoa: ${req.params.id} `)
        },

        "/pessoa/criar/:ID": (req, res) => {
            if (!temp.includes(req.params.ID)) {
                temp.push(req.params.ID)
                return new Response(`Id pessoa: ${req.params.ID}`, { status: 201 })
            }
            return new Response("Pessoa ja existe");
        }

    },

    fetch: req => new Response("Hello world", { status: 404 }),
});

console.log(`Server running at ${server.url}`);