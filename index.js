var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Checkout = /** @class */ (function () {
    function Checkout(c) {
        this.cart = [];
        this.items = {
            ipd: {
                name: "Super iPad",
                price: 549.99,
                discount_type: "PRICE"
            },
            mbp: {
                name: "Macbook Pro",
                price: 1399.99
            },
            atv: {
                name: "Apple TV",
                price: 109.50,
                discount_type: "ITEM"
            },
            vga: {
                name: "VGA Adapter",
                price: 30
            }
        };
        this.pricingRules = c;
    }
    Checkout.prototype.scan = function (customer_item) {
        var scanned = 0;
        var item = this.items[customer_item];
        this.cart.map(function (item) {
            if (item.sku === customer_item) {
                item.qty++;
                scanned = 1;
            }
        });
        if (!scanned)
            this.cart.push(__assign(__assign({ sku: customer_item }, item), { qty: 1 }));
    };
    Checkout.prototype.total = function () {
        var _this = this;
        var total = 0;
        var _loop_1 = function (i) {
            if (this_1.cart[i].discount_type) {
                var current_pricing_rule = this_1.pricingRules.filter(function (rule) { return rule.discount_type === _this.cart[i].discount_type; })[0];
                if (this_1.cart[i].qty >= current_pricing_rule.min_qty_required && current_pricing_rule.item_discount) {
                    total += (this_1.cart[i].price * current_pricing_rule.item_discount);
                }
                else if (this_1.cart[i].qty >= current_pricing_rule.min_qty_required && current_pricing_rule.price_discount) {
                    total += (current_pricing_rule.price_discount * this_1.cart[i].qty);
                }
                else {
                    total += (this_1.cart[i].price * this_1.cart[i].qty);
                }
            }
            else {
                total += (this_1.cart[i].price * this_1.cart[i].qty);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.cart.length; i++) {
            _loop_1(i);
        }
        console.log("$".concat(total));
    };
    return Checkout;
}());
var pricingRules = [
    { discount_type: 'ITEM', min_qty_required: 3, item_discount: 2 },
    { discount_type: 'PRICE', min_qty_required: 4, price_discount: 499.99 }
];
var co = new Checkout(pricingRules);
co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("vga");
co.total();
var co2 = new Checkout(pricingRules);
co2.scan("atv");
co2.scan("ipd");
co2.scan("ipd");
co2.scan("atv");
co2.scan("ipd");
co2.scan("ipd");
co2.scan("ipd");
co2.total();
// const co = new Checkout(pricingRules);
// co.scan(item1);
// co.scan(item2);
// co.total();
