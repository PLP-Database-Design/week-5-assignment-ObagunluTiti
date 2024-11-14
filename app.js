//importing the libraries
const express = require('express')
const {db} = require('./database')
const app =  express()
const port = 3000
//listening to the server

const patient = 'select patient_id, first_name, last_name, date_of_birth from patients'
//routing for home//
app.get('/', (req,res)=>{
    res.send('THIS IS HOMEPAGE')
})
 //routing for patients//   
app.get('/patient',(req, res)=>{
    db.query(patient,(err,result)=>{
        if(err){
            console.log(err);
         }else{
        res.json(result)
    }
})
})

 //routing for providers//  
 const providers = 'select first_name, last_name, provider_specialty' 
app.get('/providers',(req, res)=>{
    db.query(providers,(err,result)=>{
        if(err){
            console.log(err);
         }else{
        res.json(result)
    }
})
})

//filter patients by First Name//
app.get('/patients', (req, res) => {
    const { first_name } = req.query;
    const query = 'SELECT * FROM patients WHERE first_name = ?';
    
    db.query(query, [first_name], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    });
  });
  // retrieve providers by specialty
app.get('/providers/specialty', (req, res) => {
    const { provider_specialty } = req.query;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    
    db.query(query, [provider_specialty], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    });
  });


app.listen(port, () => {
    console.log(`server is runnig on http://localhost:${port}`)
  })