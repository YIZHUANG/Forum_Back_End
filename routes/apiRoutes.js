module.exports = app => {
  app.get('/listOfPosts', function(request, response) {     // all the posts are saved to this route
   Threads.find({}).then(eachOne => {
      response.json(eachOne);
    });
  });

}