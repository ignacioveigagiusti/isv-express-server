const express = require('express');
const app = express();
const Container = require('./products/container.js');
const productContainer = new Container('./products/products.json');

app.get('/', (req, res) => {
    try {
        res.redirect('/products');   
    } catch (error) {
        console.log(error);
        return res.json({status: 500, response: error.message})
    }
})

app.get('/products', async (req, res) => {
    try {
            const limit = req.query || null ;
            const allProducts = await productContainer.getAll(limit);
            return res.json(allProducts);
    }        
    catch (error) {
        console.log(error);
        return res.json({status: 500, response: error.message})
    }
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params;
    const randomProduct = await productContainer.getById(pid);
    res.json(randomProduct);
});

const port = 8080;
const ready = console.log(`Servidor inicializado en el puerto ${port}`);

const server = app.listen(port,ready);
server.on("error", err => console.log(`Error en el servidor: ${err}`));