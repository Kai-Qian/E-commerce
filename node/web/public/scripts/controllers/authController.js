Hilary.scope('heinz').register({
    name: 'authController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine', 'ProfileVM'],
    factory: function ($this, GidgetRoute, locale, viewEngine, ProfileVM) {
        'use strict';
        //Use ajax to send request to controller on server side
        //it will check whether the user is logged in or not
        //When get response, it will be replaced by '/profile' if logged in
        //Otherwise, it will be replaced by '/login' if not
        $this.get['/checkLogin'] = new GidgetRoute({
            routeHandler: function (err,req) {
                $.ajax({
                    url: '/logincheck'
                }).done(function (data) {
                    if (data === '200') {
                        window.location.replace('/profile');
                    } else {
                        window.location.replace('/login');
                    }
                    console.log('client data: ', data);
                });
            }
        });
        //Use ajax to send request to controller on server side
        //When get response, it will be set the view model with the template and data to ask user to login
        $this.get['/login'] = new GidgetRoute({
            routeHandler: function () {
                $.ajax({
                    url: '/api/cart',
                    method: 'GET'
                }).done(function (data) {
                    console.log("asdasddc  sc"+ data.cart.books.length);
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    console.log("came to login");
                    viewEngine.setVM({
                        template: 't-login',
                        data: {}
                    });
                });
            }
        });

        //Use ajax to send request to controller on server side
        //When get response, it will be set the view model with the template and data to show the user's profile
        $this.get['/profile'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/cart',
                    method: 'GET'
                }).done(function (data) {
                    console.log(data);
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    viewEngine.setVM({
                        template: 't-profile',
                        data: new ProfileVM(data)
                    });
                });
            }
        });

        //Use ajax to send request to controller on server side
        //When get response, it will be set the view model with the template and data to show there is an error when logging in
        $this.get['/loginWithError'] = new GidgetRoute({
            routeHandler: function () {
                $.ajax({
                    url: '/api/cart',
                    method: 'GET'
                }).done(function (data) {
                    console.log("asdasddc  sc"+ data.cart.books.length);
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    console.log("came to login");
                    viewEngine.setVM({
                        template: 't-loginWithError',
                        data: {}
                    });
                });


            }
        });

        $this.post['/loginWithError'] = new GidgetRoute({
            routeHandler: function () {
                return true; // ignore
            }
        });

        // POST /login
        // login
        $this.post['/login'] = new GidgetRoute({
            routeHandler: function () {
                console.log('err--->')
                return true; // ignore
            }
        });

        // GET /register
        // Register a new account
        $this.get['/register'] = new GidgetRoute({
            routeHandler: function () {
                $.ajax({
                    url: '/api/cart',
                    method: 'GET'
                }).done(function (data) {
                    //console.log("asdasddc  sc"+ data.cart.books.length);
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    console.log("came to login");
                    viewEngine.setVM({
                        template: 't-register',
                        data: {}
                    });
                });
            }
        });


        //Use ajax to send request to controller on server side
        //When get response, it will be set the view model with the template and data to show there is an error
        $this.get['/registerWithError'] = new GidgetRoute({
            routeHandler: function () {
                $.ajax({
                    url: '/api/cart',
                    method: 'GET'
                }).done(function (data) {
                    console.log("asdasddc  sc"+ data.cart.books.length);
                    $("#cartTotal").text(data.cart.books.length + " item(s)");
                    console.log("came to login");
                    viewEngine.setVM({
                        template: 't-registerWithError',
                        data: {}
                    });
                });


            }
        });

        return $this;
    }
});
