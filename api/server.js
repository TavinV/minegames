import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors'

const app = express();
app.use(cors({
    origin: `*`,
    methods: ["GET"]
}))

async function readJson() {
    const filePath = path.join(process.cwd(), 'api', 'database', 'db.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}


app.get('/personagens', async (req, res) => {
    try {
        const data = await readJson();
        res.json(data.personagens);
    } catch (error) {
        res.status(500).json({ error: "Erro ao ler o banco de dados"});
    }
});


app.get('/personagens/:nome/:type', async (req, res) => {
    const nome = req.params.nome;
    const type = req.params.type // Standing ou Icon

    try {
        const data = await readJson();
        const personagem = data.personagens.find(p => p.nome.toLowerCase() === nome.toLowerCase());

        if (!personagem) {
            return res.status(404).json({ error: "Personagem não encontrado" });
        }

        if (!personagem[type]) {
            return res.status(404).json({ error: "Ícone não definido para este personagem" });
        }

        const caminhoIcone = path.join(
            process.cwd(), 
            'api', 
            'database', 
            'images', 
            personagem[type]
        );

        try {
            await fs.access(caminhoIcone); // Lança erro se o arquivo não existir
            res.sendFile(caminhoIcone);
        } catch (err) {
            return res.status(404).json({ error: "Ícone não encontrado no servidor" });
        }

    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

app.get('/', (req,res) =>{
    res.sendFile('../index.html')
})


// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});