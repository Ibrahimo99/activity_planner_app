
/**exports.listUser = function(req, res) {
	req.db.users.find({}, function(err, user) {
		if(err) res.json(err);
		else res.json(user);
	})
}
**/



exports.listUser = function(req, res, next){
  req.db.users.find({}).toArray(function(error, users){
    if (error) return next(error);
    res.render('user', {
      title: 'Users',
      user: users || []
    });
  });
};



exports.renderLogin = function(req, res) {
	//if (error) return next(error);
    res.render('login', {
      title: 'Login'
    });
}




exports.login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var msg = '';
	var welcome = '';
	req.session.username = username;
	req.db.users.find({username:username, password:password}).toArray(function(error, users){
		//console.info(users);
		//console.info(users.length);
        if (users.length === 0) {
        	res.render('login', {
      		title: 'Login',
      		msg: 'Login Failed. Check username and password'
    });
    	
    }
    else {
    	//console.info('Found in DB');
    	res.render('index', {
      	title: 'Activity List',
      	welcome: 'Welcome '+ username
    	});

    	console.info(req.session.username);
    	  
    	}
  });
};



exports.list = function(req, res, next){
  req.db.tasks.find({completed: false}).toArray(function(error, tasks){
    if (error) return next(error);
    res.render('tasks', {
      title: 'Activity List',
      tasks: tasks || []
    });
  });
};


exports.renderRegister = function(req, res) {
	res.render('register', {
		title: 'Register'
	});
}

/**exports.register = function(req, res) {
	var user = new Users(req.body);
	user.save(function(err, user) {
		if (err) 
			res.redirect('/register');
		else 
			res.redirect('/login');
	});
}
*/

exports.register = function(req, res, next){
    if (!req.body || !req.body.username) return next(new Error('No data provided.'));
    req.db.users.save({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email

  }, function(error, user){
    if (error) return next(error);
    if (!user) return next(new Error('Failed to save.'));
    //console.info('Added %s with id=%s', task.name, task._id);
    res.redirect('/register');

  })
};





exports.renderUser = function(req, res) {
	User.find({}, function(err, user) {
		if (err)
			res.json(err);
		else
			res.render('user', {
				title: 'User',
				users: user
			})
	});
};
