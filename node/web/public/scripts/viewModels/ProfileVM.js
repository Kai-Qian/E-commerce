/**
 * Created by willQian on 2015/12/5.
 */
Hilary.scope('heinz').register({
    name: 'ProfileVM',
    singleton: true,
    dependencies: ['ko', 'Book', 'exceptions'],
    factory: function (ko, Book, exceptions) {
        'use strict';

        var Profile = function (user) {
            var self = {};
            //Define the properties which will be shown
            self.books = ko.observableArray();
            self.totalAmount = ko.observable(user.orderhistory.totalAmountOfHistory.toFixed(2));
            self.name = ko.observable(user.name);
            self.email = ko.observable(user.email);
            // add books into the array
            self.addOrderHistory = function (book) {
                if (!book) {
                    exceptions.throwArgumentException('The argument, book, must be defined to add a book', 'book');
                    return;
                }

                self.books.push(new Book(book));
            };

            // Use addOrderHistory to add books
            self.addOrderHistories = function (books) {
                if (!books) {
                    exceptions.throwArgumentException('The argument, books, must be defined to add books', 'books');
                    return;
                }

                var i;

                for (i = 0; i < books.length; i += 1) {
                    self.addOrderHistory(books[i]);
                }
            };

            if (user.orderhistory.booksOfHistory) {
                self.addOrderHistories(user.orderhistory.booksOfHistory);
            }

            return self;
        };

        return Profile;

    }
});
