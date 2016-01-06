/**
 * Created by willQian on 2015/12/5.
 */
module.exports.name = 'OrderHistory';
module.exports.dependencies = ['Blueprint', 'ObjectID', 'exceptions'];
module.exports.factory = function (Blueprint, ObjectID, exceptions) {
    'use strict';

    var OrderHistory = {};

    // This is the Order History constructor, which will be returned by this factory
    OrderHistory = function (orderHistory) {
        // often times, we use selfies to provide a common object on which
        // to define properties. It's also common to see `var self = this`.
        var self = {
            addToOrderHistory: undefined
        };
        
        // define the Order History properties from the orderHistory argument
        self.totalAmountOfHistory = orderHistory.totalAmountOfHistory;
        self.booksOfHistory = orderHistory.booksOfHistory;
        //Add the books in cart to order history as well as the total price
        self.addToOrderHistory = function (cart) {
            self.totalAmountOfHistory = self.totalAmountOfHistory + cart.totalAmount;
            var i;
            for (i = 0; i < cart.books.length; i++) {
                self.booksOfHistory.push(cart.books[i]);
            }

            return self;
        };
        return self;
    };

    return OrderHistory;
};
