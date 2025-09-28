import express from 'express';
import routes from './routes.js';
import db from './src/db.js';
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


app.get('/', (req, res) =>{

  res.render("index")
})
// Rota para receber e processar os dados do formulário
app.post('/clientesAdd', (req, res) => {
  

  const user = {

   nome : req.body.nome,

   email : req.body.email,

  }

  res.render("mostrar", {user})

  
});


db.sync( () => 
    console.log(`Banco de dados conectado: ${db}`)

).catch( (e) => {

  console.log(`Algo deu errado ${e}`)
  
});

app.listen(3000, () => 
    console.log('Servidor iniciado na porta 3000')
);

