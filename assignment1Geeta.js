const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    CONTACTINFO :Symbol("phone"),
    CHOOSE: Symbol("choose"),
    SIZE: Symbol("size"),
    TOPPINGS: Symbol("toppings"),
    DRINKS: Symbol("drinks"),
    PAYMENT: Symbol("payment")

});

let itemName = [] , itemSize = [] ,itemTopping =[];

module.exports = class GeetaOrder extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "";
        this.sphoneNumber = "";
    }
    handleInput(sInput) {
        let aReturn = [];
     
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.CONTACTINFO;
                aReturn.push("Welcome to Geet's Fast Food.");
                aReturn.push("Enter your name with mobile number");   
                break;

            case  OrderState.CONTACTINFO:
                this.stateCur = OrderState.CHOOSE;
                aReturn.push("Choose pizza , Burger, Canadian Putin");  
                this.sphoneNumber = sInput; 
            break;

            case OrderState.CHOOSE:
                this.stateCur = OrderState.SIZE;
                this.sChoosen = sInput;
               
                if (sInput.toLowerCase() == "exit") {          
                    aReturn.push("Would you like drinks with that?");
                    this.stateCur = OrderState.DRINKS;
                 
                }else {
                    aReturn.push("What size would you like?");
                    itemName.push(sInput);
                }               
                break;

            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                itemSize.push(sInput);
                aReturn.push("What toppings would you like?");
                break;

            case OrderState.TOPPINGS:
                this.stateCur = OrderState.CHOOSE
                this.sToppings = sInput;
                itemTopping.push(sInput);
                aReturn.push("Choose pizza , Burger, Canadian Putin \n or enter exit for drinks menu");
                break;

        
            case OrderState.DRINKS:
                this.stateCur = OrderState.PAYMENT;
                this.nOrder = 15;
                
                let temp="";
                aReturn.push("Thank-you for your order of");
                for(let i=0 ;i < itemTopping.length; i++){
                temp = itemSize[i] +" " +itemName[i] + " with " +itemTopping[i] +"\n";    
                aReturn.push(temp);
                } 
              
                if (sInput.toLowerCase() != "no") {
                    this.sDrinks = sInput; 
                }
                if (this.sDrinks) {
                    aReturn.push(this.sDrinks);
                }
           
                aReturn.push("Your Contact info is : " + this.sphoneNumber);
                    aReturn.push(`Please pay for your order here`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);

                break;

                case OrderState.PAYMENT:
                    console.log(sInput);
                    this.isDone(true);
                    aReturn.push("Your total amount is $58.0")
                    let d = new Date();
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Your order will be delivered at ${d.toTimeString()}`);
                    break;

        }
        return aReturn;
    }
}