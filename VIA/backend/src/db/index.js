const knex = require('knex');


let db;


async function initDb(){
    db = knex({
        client: 'pg',
        connection: process.env.DATABASE_URL
    });


    // run simple migrations (idempotent SQL)
    const exists = await db.schema.hasTable('users');
    if(!exists){
        await db.schema.createTable('users', (t)=>{
            t.increments('id').primary();
            t.string('name');
            t.string('email').unique();
            t.string('password');
            t.string('role');
            t.timestamps(true,true);
        });
    }

    const accExists = await db.schema.hasTable('accidents');
    if(!accExists){
        await db.schema.createTable('accidents',(t)=>{
            t.increments('id').primary();
            t.integer('reporter_id').references('id').inTable('users');
            t.jsonb('location');
            t.string('status').defaultTo('reported');
            t.text('description');
            t.jsonb('images');
            t.decimal('estimated_cost');
            t.timestamps(true,true);
        });
    }
    console.log('DB ready');
}


module.exports = { initDb, db };