import express from 'express';
//graphql
import graphqlHTTP from 'express-graphql';
import schema from './schema';
 

const app = express();

app.get('/', (req, res) => {
    res.send('Todo listo');
});

class Cliente {
    constructor(id, {nombre, apellido, empresa, email}) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.empresa = empresa;
        this.email = email;
    }
}

const clientesDB = {};

//resolver
const root = {
    cliente: () => {
      return {
        "id": 123456789,
        "nombre": "Martin",
        "apellido": "Serantes",
        "empresa": "Free",
        "email": "correo@correo.com"}
    },
    crearCliente: ({input}) => {
        const id = require('crypto').randomBytes(10).toString('hex');
        clientesDB[id] = input;
        return new Cliente(id, input);
    }
};

app.use('/graphql', graphqlHTTP({
    //que schema va a utilizar
    schema,
    //el resolver se pasa como rootValue
    rootValue: root,
    //utilizar graphiql
    graphiql: true
}));

app.listen(8000, () => console.log('El servidor está funcionando'));