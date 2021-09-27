const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    CONTACTINFO :Symbol("phone"),
    CHOOSE: Symbol("choose"),
    SIZE: Symbol("size"),
    TOPPINGS: Symbol("toppings"),
    DRINKS: Symbol("drinks")
});

let itemName = [] , itemSize = [] ,itemTopping =[];

module.exports = class GeetaOrder extends Order {
    constructor() {
        super();
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
                this.isDone(true);
                let temp="";
                aReturn.push("Thank-you for your order of");
                for(let i=0 ;i < itemTopping.length; i++){
                temp = itemSize[i] +" " +itemName[i] + " with " +itemTopping[i] +"\n";    
                aReturn.push(temp);
                } 
              
                if (sInput.toLowerCase() != "no") {
                    this.sDrinks = sInput;  1234
                }
                if (this.sDrinks) {
                    aReturn.push(this.sDrinks);
                }
                aReturn.push("Your total amount is $58.0")
                aReturn.push("Your Contact info is : " + this.sphoneNumber);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}