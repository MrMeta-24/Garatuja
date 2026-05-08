## api.turma02.ts
```typescript

import todo from "./core.ts"; // Importa as funções do arquivo core.ts

// Cria o servidor usnado BUN
const server = Bun.serve({  

  port: 3000,   // Define a porta do servidor como 3000

  // Define as rotas da api
  routes: { 

    "/": new Response(Bun.file("./public/index.html")), // Rota principal que retorna o html

    // Rota da lista de tarefas
    "/api/todo": { 

      // Método GET retorna todos os itens cadastrados
      GET: async () => { 
        const items = await todo.getItems() 
        return Response.json(items) 
      }, 

      // Método POST add um novo item na lista
      POST: async (req) => { 

        const data = await req.json() as any; 

        const item = data.item || null;  // Pega o item enviado

        if (!item) // Verifica se o item foi enviado
          return Response.json(
            'Por favor, forneça um item para adicionar.', 
            { status: 400 }
          );

        await todo.addItem(item); // Add o item na lista

        return Response.json(data); // Retorna os dados recebidos
      }, 
    }, 

    // Rota com o index
    "/api/todo/:index": { 

      // Método PUT atualiza um item existente
      PUT: async (req) => { 

        const index = parseInt(req.params.index); 

         // Observa se o indice é válido
        if (isNaN(index))
          return Response.json(
            'Índice inválido. um número inteiro é esperado.', 
            { status: 400 }
          ); 

        const data = await req.json() as any;  // Lê os dados enviados

        const newItem = data.newItem || null; // Pega o novo item

        // Observa se o novo item foi informado
        if (!newItem) 
          return Response.json(
            'Por favor, forneça um novo item para atualizar.', 
            { status: 400 }
          ); 

        try { 

          await todo.updateItem(index, newItem); // Atualiza o item da lista

          // Mensagem de sucesso
          return Response.json(
            `Item no índice ${index} atualizado para "${newItem}".`
          ); 

        } catch (error: any) { 

          return Response.json(error.message, { status: 400 });  // Erro caso o índice seja inválido
        } 
      }, 

      // Método DELETEE remove um item da lista
      DELETE: async (req) => { 

        const index = parseInt(req.params.index); 

        // Valida o índice
        if (isNaN(index)) 
          return Response.json('Índice inválido.', { status: 400 }); 

        try { 

          await todo.removeItem(index); // Remove o item

          // Mensagem de sucesso
          return Response.json(
            `Item no índice ${index} removido com sucesso.`
          ); 

        } catch (error: any) { 

          return Response.json(error.message, { status: 400 }); // Mensagem de erro
        } 
      }, 
    }, 

    // EXEMPLO BÁSICO DE ROTAS HTTP

    "/api/exemplo": { 

      // GET basico retorna texto com timestamp atual
      GET: () => { 
        return new Response(`Esse é o exemplo: ${Date.now()}`) 
      }, 

      // POST basico recebe dados e adiciona a data atual
      POST: async (req) => { 

        const data = await req.json() as any; 

        data.recebidoEm = new Date()  // Adiciona data formatada
          .toLocaleDateString("pt-BR"); 

        return Response.json(data);  // Retorna os dados atualizados
      }, 
    }, 

    // Rota com ID
    "/api/exemplo/:id": { 

      // PUT atualiza completamente um recurso
      PUT: async (req, params) => { 

        const { id } = req.params;  // Pega o id da URL

        const data = await req.json() as any;  // Pega os dados enviados

        data.id = id;  // ADD o id recebido

        data.recebidoEm = new Date()  // ADD data
          .toLocaleDateString("pt-BR"); 

        return Response.json(data); 
      }, 

      // PATCH atualiza parcialmente um recurso
      PATCH: async (req, params) => { 

        const { id } = req.params; 
        const data = await req.json() as any; 

        data.chavesAtualizadas = Object.keys(data);// Lista as chaves alteradas

        data.id = id;  // ADD o id

        // ADD data de atualização
        data.atualizadoEm = new Date()
          .toLocaleDateString("pt-BR"); 

        return Response.json(data); 
      }, 

      // DELETE remove o recurso
      DELETE: (req, params) => { 

        const { id } = req.params; 

        return new Response(
          `Recurso com id ${id} deletado`, 
          { status: 200 }
        ); 
      );

    // FIM DO EXEMPLO BÁSICO

  }, 

  // Caso nenhuma rota seja encontrada,Printa um erro 404
  async fetch(req) { 
    return new Response(`Not Found`, { status: 404 }); 
  }, 
}); 

console.log(`Server running at http://localhost:${server.port}`); // Exibe mensagem no terminal informando a porta do servidor


````
---
## core.ts

```typescript

const jsonFilePath = __dirname + '/data.temp.json'; // Caminho do arquivo JSON onde os dados serão armazenados

const list: string[] = await loadFromFile(); // Carrega os dados para iniciar 


// FUNÇÃO: loadFromFile

// Carrega os dados do arquivo JSON
async function loadFromFile() { 

  try { 

    const file = Bun.file(jsonFilePath);   // Abre o arquivo

    const content = await file.text();  // Lê o conteúdo do arquivo como texto

    return JSON.parse(content) as string[]; // Converte o JSON para array de strings

  } catch (error: any) { 

    if (error.code === 'ENOENT') // Caso o arquivo não exista
      return []; 

    throw error; // Lança outros erros
  } 
} 

// Salva a lista atual no arquivo JSON
async function saveToFile() { 

  try { 

    await Bun.write(jsonFilePath, JSON.stringify(list)); // Converte a lista para JSON e salva no arquivo

  } catch (error: any) { 

   // Retorna erro se não consiga salvar
   throw new Error(
    "Erro ao salvar os dados no arquivo: " + error.message
   ); 
  } 
} 


// FUNÇÃO: addItem

// ADD um novo item na lista
async function addItem(item: string) { 

  list.push(item); // ADD item no array

  await saveToFile(); // Salva alterações no arquivo
} 


// FUNÇÃO: getItems

// Retorna todos os itens da lista
async function getItems() { 
  return list; 
} 


// FUNÇÃO: updateItem

// Atualiza um item existente
async function updateItem(index: number, newItem: string) { 

  if (index < 0 || index >= list.length) // Verifica se o índice é válido
    throw new Error("Index fora dos limites"); 

  list[index] = newItem; // Atualiza o item

  await saveToFile(); // Salva alterações
} 

// FUNÇÃO: removeItem

// Remove um item da lista
async function removeItem(index: number) { 

  if (index < 0 || index >= list.length) // Verifica se é válido
    throw new Error("Index fora dos limites"); 

  list.splice(index, 1); // Remove 1 item da posição indicada

  await saveToFile(); // Salva alterações
} 

// Exporta todas as funções

export default { 
  addItem, 
  getItems, 
  updateItem, 
  removeItem 
};
````
