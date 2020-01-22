const Dev = require("../models/Dev")
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request,response){
        // Buscar todos os Devs em um raio de 10km.
        //Filtrar por tecnologia.

        const { latitude, longitude, techs} = request.query;
        console.log(techs)
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
           location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: 10000,
            },
           },
        });
        return response.json( devs )
    }
}