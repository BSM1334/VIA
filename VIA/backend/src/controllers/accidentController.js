const axios = require('axios');
const { db } = require('../db');

async function reportAccident(req, res){
    try{
        const { description, location } = req.body;
        const images = (req.files || []).map(f=>`/uploads/${f.filename}`);
        // send to AI service for initial estimate
        const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:5000';
        const aiResp = await axios.post(`${aiUrl}/estimate`, { images, location }).catch(()=>({ data: { estimate: 0 } }));
        const [id] = await db('accidents').insert({ description, location: JSON.stringify(location), images: JSON.stringify(images), estimated_cost: aiResp.data.estimate }).returning('id');
        // TODO: notify nearest hospital / via teams
        res.json({ success: true, caseId: id, estimate: aiResp.data.estimate });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'server error' });
    }
}

async function getAccidents(req,res){
    const rows = await db('accidents').select('*').orderBy('created_at','desc');
    res.json(rows);
}


module.exports = { reportAccident, getAccidents };