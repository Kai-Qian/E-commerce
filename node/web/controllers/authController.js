module.exports.name = 'authController';
module.exports.dependencies = ['router', 'usersRepo'];
module.exports.factory = function (router, repo) {
    'use strict';

    var authCookieExpiryDurationMinutes = 43200, // 30 days
        maxAge = authCookieExpiryDurationMinutes * 60 * 1000,
        addCookie,
        cleanCookie;
    //Add cookie
    addCookie = function (user, res) {
        // normally, you wouldn't set a plain old user object as the
        // value of the cookie - it's not secure.
        res.cookie('auth', user, { maxAge: maxAge, httpOnly: true });
    };
    //Claen the cookie
    cleanCookie = function (res) {
        res.clearCookie('auth');
    };

    // Create a new user with cart and orderhistory in database.
    // If created successfully, make the user log in.
    // Else, redirect to '/registerWithError'
    router.post('/register', function (req, res) {
        req.body.cart = {totalAmount:0, books:[]};
        req.body.orderhistory = {totalAmountOfHistory:0, booksOfHistory:[]};
        repo.create(req.body, function (err, result) {
            if (!err && result.insertedId) {
                repo.get(req.body.email, function (err, user) {
                    if (!err) {
                        addCookie(user, res);
                        res.redirect('/home');
                    } else {
                        res.status(400);
                    }
                });
            } else {
                res.redirect('/registerWithError');
                //res.status(400);
            }
        });
    });

    //Check whether the email address is in the database. If yes, add the cookie and redirect to home page.
    //Else, redirect to '/loginWithError'
    router.post('/login', function (req, res) {
       repo.get(req.body.email, function (err, user) {
            if (!err) {
                addCookie(user, res);
                res.redirect('/home');
            } else {
                res.redirect('/loginWithError');
                //res.status(400);
            }
        });
    });

    //Check whether has logged in or not. If yes, return with 200. Else, return with 404
    router.get('/logincheck', function (req, res) {
        if ( req.cookies.auth === undefined) {
            res.send('404');
        } else {
            console.log('No error checking user in db.');
            res.send('200');
        }
    });

    //Log out and clan the cookies
    router.post('/profile', function (req, res) {
        cleanCookie(res);
        res.redirect('/home');
    });

    return router;
};
