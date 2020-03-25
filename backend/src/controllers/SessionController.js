const connection = require('../database/connection');

module.exports = {
    async store(request, response){
        const { id } = request.body;

        const ong = await connection('ongs').where('id', id).select('name').first();

        if(!ong){
            return response.status(400).json({ error : 'Não foi possível encontrar Ong com esse ID'});
        }
        return response.json(ong);
    }
}