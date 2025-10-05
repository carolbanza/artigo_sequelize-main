import express from 'express';
import routes from './routes.js';


import session  from 'express-session';
import jwt from 'jsonwebtoken';
import dataBase from './src/db.js';
import User from './src/models/clientsModel.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from "body-parser";
import clients from "./src/controllers/clients.js"
import exphbs from "express-handlebars"


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
//app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('views', path.resolve(__dirname, 'src', 'views')); 
app.set('view engine', 'handlebars');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.json());
app.use(routes);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.urlencoded({extended: true}))

////////////////////////////////////// TOKENS JWT /////////////////////////////////////////////////

 const payload = { nome: 'Renato Alves Soares', userId: '123', email: 'renatotaguatinga36@gmail.com' };
 const secretKey = '456alves'; // Keep this secure!
 const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    console.log(token);

// Configure sessions
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

    
const PORT = 3000

app.get('/clientesDel/:id', async (req, res) =>{

    const id = req.params.id;
    console.log(id);
    
    const IdDelete = await User.destroy({
     where: {id: id,},

   }).then( (result) => res.status(200).json(result));

});


app.get('/clientes/:id', async (req, res) => {

 const id = req.params.id;
 
 console.log(id);

 if (id) {
  console.log('Registro encontrado:', id);
} else {
  console.log('Registro não encontrado.');
}

 const IdEncontrado = await User.findByPk(id).then( (result) => res.status(200).json(result)).catch((e) => {
    console.error(e.message); // "oh, no!"
  });


});

app.get('/', (req , res) =>{

  res.render("index")
})

////////////////////// Rota para receber e processar os dados do formulário

app.post('/clientesAdd', async (req, res) => {
  
   const nome = req.body.nome

   const email = req.body.email

   const senha = req.body.senha
  
   await User.create({nome, email, senha})
  
   res.status(200).redirect("/clientesAll")


 // Rota para retorno dos dados  
app.get('/clientesAll', (req, res) => {

  User.findAll().then( (result) => res.status(200).json(result));

  res.render("index")

})

app.get('clientesUpdate/:id', () => {

const id = req.params.id;

  User.update({  where: {id: id, raw:true}, 

  
  });

});

});


dataBase.authenticate();




app.listen(PORT, () => 
    console.log(`Servidor iniciado na porta ${PORT}`)
);

