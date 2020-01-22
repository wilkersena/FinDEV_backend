const axios = require('axios');
const Dev = require("../models/Dev")
const parseStringAsArray = require('../utils/parseStringAsArray')

// index, show, store, update, destroy
module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response){
        const { github_username, techs, latitude , longitude } = request.body;

        let dev = await Dev.findOne({github_username})
        console.log(dev)
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        
        }                
        
        //console.log(name, avatar_url, bio, github_username, techs);
        return response.send(dev)
    },

    async update(request,response){
        const {id} = request.params;
        const data = request.body;

        console.log(request.params)
        console.log(request.body)

        if(data.techs){
            data.techs = parseStringAsArray(data.techs)
        }

        const dev = await Dev.findByIdAndUpdate(id, data);
        const dev_new = await Dev.findById(id);

        return response.json(dev_new)
    },

    async destroy(request,response){
        const {id} = request.params

        const dev = await Dev.findByIdAndDelete(id);

        return response.json({message: "User was removed!"})
    },
};