import e, { request, response } from "express";

app.post("/sumar", (request, response) => {
    /*     console.log(request.body);
    response.send({ ok: true }); */
    const { numero_1, numero_2 } = request.body;
    if (typeof numero_1 !== "number" || !numero_1) {
        response.send({
            error: "Numero_1 debe ser un numero",
        });
        return;
    } else if (typeof numero_2 !== "number" || !numero_2) {
        response.send({
            error: "Numero_2 debe ser un numero",
        });
        return;
    }
    response.send({
        result: Number(numero_1) + Number(numero_2),
    });
});

/* 
Crear un endpoint en /products
Cuando se envie un post se debera capturar el title, price, stock del producto y debera crearse un objeto que se agregue a lista de products, muy importante validar que title sea un string de almenos 4 caracteres, price sea un numero positivo y tambien el stock. 
Recuerden crear un id para el producto.
Crear un endpoint en /products
Cuando se envie un get debera respnder con {products: [...lista de productos]}
*/

const products = [];

app.post("/products", (request, response) => {
    const { title, price, stock } = request.body;
    if (!title || typeof title !== "string" || title.length < 4) {
        return response.send({
            error: "title debe ser un string de al menos 4 caracteres",
        });
    } else if (!price || typeof price !== "number" || price < 0) {
        return response.send({ error: "price debe ser un numero positivo" });
    } else if (!stock || typeof stock !== "number" || stock < 0) {
        return response.send({ error: "stock debe ser un numero positivo" });
    } else {
        const new_product = {
            title,
            price,
            stock: parseInt(stock),
            id: products.length + 1,
        };
        products.push(new_product);
        return response.send({
            products: products,
        });
    }
});
