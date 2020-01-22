const { Router} = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

// Query params : Query Strings -> request.query (Filtros, ordenação, etc)
// Route params : request.params -> Identifica um recurso na Alteração ou remoção. Ex.: .../users/1/ -> 1 é o parâmetro contido na rota
// Body :  request.body -> Criação ou alteração de um registro.
routes.get('/', DevController.index );
routes.get('/devs', DevController.index );
routes.post('/devs', DevController.store );
routes.put('/devs/:id', DevController.update );
routes.delete('/devs/:id', DevController.destroy );

routes.get('/search', SearchController.index );

module.exports = routes;