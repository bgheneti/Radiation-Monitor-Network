var routes=function(app){
    app.get('/', function(req, res){
      res.render('index.html',{title:'Detector Map'});
    });

    app.get('/node/:num', function(req, res){
      var num = req.params.num;
      res.render('node.html', {title:num});
    });
}

module.exports=routes;
