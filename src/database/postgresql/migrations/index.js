const pgConnection = require('../index');
const createUsers = require("../migrations/createUser");

const connect = pgConnection();

async function migrationsRun(){
    const schema = [
        createUsers
    ].join('');


    try {
        const db = await connect;
        await db.query(schema);
        console.log('Migrations executados com sucesso');
    } catch (error) {
        
    }
};

module.exports = migrationsRun;
