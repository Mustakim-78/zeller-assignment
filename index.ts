type PricingRule = {
    discount_type: 'ITEM' | 'PRICE';
    min_qty_required: number;
    item_discount?: number;
    price_discount?: number;
};

type Cart = {
    sku: string;
    name: string;
    price: number;
    discount_type?: string;
    qty: number;
};

type Item = {
    name: string;
    price: number;
    discount_type?: string
}

type Items = {
    [key:string] : Item;
}

class Checkout {
    private cart : Cart [];
    private items : Items;
    private pricingRules : PricingRule[];

    constructor(c : PricingRule[]){
        this.cart = []
        this.items =  {
            ipd:{
                name: "Super iPad",
                price: 549.99,
                discount_type: "PRICE"
            },
            mbp:{
                name: "Macbook Pro",
                price: 1399.99
            },
            atv:{
                name: "Apple TV",
                price: 109.50,
                discount_type: "ITEM"
            },
            vga:{
                name: "VGA Adapter",
                price: 30
            }
        };
        this.pricingRules = c;
    }

    scan(customer_item: string){
        let scanned:number = 0;
        let item:{name:string, price:number} = this.items[customer_item];
        this.cart.map((item) => {
            if (item.sku === customer_item){
                item.qty++;
                scanned = 1;
            }
        })
        if (!scanned)
            this.cart.push({sku:customer_item, ...item, qty:1});
    }

    total(){
        let total = 0;
        for (let i=0; i< this.cart.length; i++){
            if (this.cart[i].discount_type){
                let current_pricing_rule = this.pricingRules.filter(rule => rule.discount_type === this.cart[i].discount_type)[0]
                if (this.cart[i].qty >= current_pricing_rule.min_qty_required && current_pricing_rule.item_discount){
                    total += (this.cart[i].price * current_pricing_rule.item_discount);
                }
                else if (this.cart[i].qty >= current_pricing_rule.min_qty_required && current_pricing_rule.price_discount){
                    total += (current_pricing_rule.price_discount * this.cart[i].qty);
                }
                else{
                    total += (this.cart[i].price * this.cart[i].qty);
                }
            }
            else{
                total += (this.cart[i].price * this.cart[i].qty);
            }
            
        }
        console.log(`$${total}`);
        
    }
}

const pricingRules: PricingRule[] = [
    { discount_type: 'ITEM', min_qty_required: 3, item_discount: 2 },
    { discount_type: 'PRICE', min_qty_required: 4, price_discount: 499.99 }
];


const co = new Checkout(pricingRules);
co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("vga");
co.total();

const co2 = new Checkout(pricingRules);
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