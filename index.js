import express from 'express';
import StatusCodes from 'http-status-codes';

//Conta criada para exercicio heroku.com

const app = express();
const port = process.env.PORT || 3000; //para enviarmos ao Heroku

let users = [{ id: 1, name: 'Ceci', age: 40 },
{ id: 2, name: 'Welinton', age: 40 }];


app.use(express.json()); //request em formato json

//Escutar na porta
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

//Criar uma rota
app.get('/', (request, response) => {
    return response.send('<h1> Trabalhando com servidor Express</h1>');
})

app.get('/users', (request, response) => {
    return response.send(users);
})

app.get('/users/:userid', (request, response) => {
    const userID = request.params.userid;
    const user = users.find(user => {
        return (user.id === Number(userID))
    })
    return response.send(user);
});

//Inserindo um novo registro
app.post('/users', (request, response) => {
    const newUser = request.body;


    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);

});

app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    const updateUser = request.body;

    users = users.map(user => {
        
        if (Number(userId) === user.id) {
          return updateUser;  
        }
        return user;
    });

    return response.send(updateUser);
});


app.delete('/users/:userId' , (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();

})