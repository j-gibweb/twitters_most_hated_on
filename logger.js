module.exports = function(req, res, next) {
  // console.log('this is middware \n call next() or else it stops here..');
  var start = +new Date();
  var stream = process.stdout;
  var url = req.url;
  var method = req.method;

  res.on('finish', function() {
    var duration = +new Date() - start;
    var message = method + "  " + url + "  " + "took " + duration + " ms\n\n";
    stream.write(message); 
  });
  // console.log(url + "  " + method);
  
  next();
}