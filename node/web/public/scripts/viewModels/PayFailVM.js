/**
 * Created by willQian on 2015/12/5.
 */
Hilary.scope('heinz').register({
    name: 'PaymentFailVM',
    dependencies: [],
    factory: function () {
        'use strict';

        var PaymentFailVM;

        //When payment fails, it will redirect you to the cart page after 3 seconds
        PaymentFailVM = function () {
            setTimeout("window.location.replace('/cart')", 2000);
        };
        return PaymentFailVM;
    }
});