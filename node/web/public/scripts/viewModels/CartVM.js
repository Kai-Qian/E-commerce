/**
 * Created by willQian on 2015/12/3.
 */
Hilary.scope('heinz').register({
    name: 'CartVM',
    singleton: true,
    dependencies: ['ko', 'Book', 'exceptions'],
    factory: function (ko, Book, exceptions) {
        'use strict';

        var Cart = function (user) {
            var self = {};
            //Define the properties which will be shown
            self.books = ko.observableArray();
            self.totalAmount = ko.observable(user.cart.totalAmount.toFixed(2));
            // add books into the array
            self.addCart = function (book) {
                if (!book) {
                    exceptions.throwArgumentException('The argument, book, must be defined to add a book', 'book');
                    return;
                }

                self.books.push(new Book(book));
            };

            // Use addCart to add books
            self.addCarts = function (books) {
                if (!books) {
                    exceptions.throwArgumentException('The argument, books, must be defined to add books', 'books');
                    return;
                }

                var i;

                for (i = 0; i < books.length; i += 1) {
                    self.addCart(books[i]);
                }
            };

            if (user.cart.books) {
                self.addCarts(user.cart.books);
                //Use localStorage to store the cart
                localStorage.setItem('cart',JSON.stringify(user.cart));
            }

            return self;
        };

        return Cart;

    }
});
