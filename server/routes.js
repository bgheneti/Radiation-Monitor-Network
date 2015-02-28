var routes=function(app){
    app.get('/', function(req, res){
      res.render('index.html',{title:'wow'});
    });

    app.get('/node/:name', function(req, res){
      var name = req.params.name;
      res.render('node.html', {title:name});
    });
}

module.exports=routes;