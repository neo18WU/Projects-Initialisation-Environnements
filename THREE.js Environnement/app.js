'use strict'
/* eslint-env node, es6 */



const PORT = 7554;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//create application parser
//let jsonParser = bodyParser.json();
let urlencoderParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))


//Modification du chemin des pages
const NOM_PAGES = {
  'firstpage': 'page'
  
}

//recuperation et renvoie des pages AUDIT
app.get(/^\/(|audit-vulnerabilite)$/, async (req, res) => {
  const nomPage = NOM_PAGES[req.params[0]] || 'index'
  let uneVariable;
  let requete = false;

  res.render(nomPage, { uneVariable, requete });

});



//demarrer le serveur
app.listen(PORT, () => {
  console.log(`serveur démarré : http://localhost:${PORT}`)
});