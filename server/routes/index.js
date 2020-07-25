module.exports = function(app, dbs) {
 
    app.get('/production', (req, res) => {
      dbs.core.collection('test').find({}).toArray((err, docs) => {
        if (err) {
          console.log(err)
          res.error(err)
        } else {
          res.json(docs)
        }
      })
    })
   
    app.get('/marketing', (req, res) => {
      dbs.login.collection('test').find({}).toArray((err, docs) => {
        if (err) {
          console.log(err)
          res.error(err)
        } else {
          res.json(docs)
        }
      })
    })
   
    return app
  };