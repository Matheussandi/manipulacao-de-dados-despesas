const express = require("express")
const uuid = require('uuid')
const app = express()
app.use(express.json())

// middleware

const verificaProduto = (req, res, next) => {
    const { dataCompra, localCompra, valor, responsavel } = req.body
    if (!dataCompra || !localCompra || !valor || !responsavel) {
        return res
                .status(400)
                .json({ Error: 'Um dos campos está faltando'})
    }
    return next()
}

const verificaId = (req, res, next) => {
    const { id } = req.params
    const filtrarID = produtos.find(prod => prod.id === id)
    if (!filtrarID) {
        return res
                .status(400)
                .json({ Error: 'Este id não existe'})
    }
    console.log(filtrarID)
    return next()
}

let produtos = []

// Incluir
app.post('/despesas', verificaProduto, (req, res) => {
    const { dataCompra, localCompra, valor, responsavel } = req.body
    const incluiProduto = {
        id: uuid.v4(),
        dataCompra,
        localCompra,
        valor,
        responsavel
    }
    produtos = [...produtos, incluiProduto]
    return res
            .status(200)
            .json(produtos)
})

// Listar
app.get('/despesas', (req, res) => {
    return res
            .status(200)
            .json(produtos) 
})

// Retornar gasto total de todos
app.get('/despesas/gastoTotal', (req, res) => {
    const total = produtos
                    .reduce((a, b) => a += b.valor, 0)
    return res
            .status(200)
            .json({"gasto total": total})
})

// Listar pelo id
app.get('/despesas/:id', verificaId, (req, res) => {
    const { id } = req.params
    const idFilter = produtos.filter(prod => prod.id === id)
    return res
            .status(200)
            .json(idFilter)
})

app.listen(3333, () => {
    console.log("Rodando !!!")
})
