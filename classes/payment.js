const user=new user("tamar","t@gmail.com",1234);

class Payment{
    static #idPayment=1;
    #date;
    #sum;
    #description;
    #status;
    #typePayment
    #user;


    constructor(sum, description,typePayment="cash", status,user){
        this.#idPayment++;
        this.#date = new Date();
        this.#sum = sum;
        this.#description = description;
        this.#status = status;
        this.#typePayment = typePayment
        this.#user=user;
    }

    set date(date){this.#date=date;}
    get date(){return this.#date;}

    set sum(sum){this.#sum=sum;}
    get sum(){return this.#sum;}

    set description(description){this.#description=description;}
    get description(){return this.#description;}

    set status(status){this.#status=status;}
    get status(){return this.#status;}

    set typePayment(typePayment){this.#typePayment=typePayment;}
    get typePayment(){return this.#typePayment;}

    set user(user){this.#user=user;}
    get user(){return this.#user;}

    update=
    (payment,date=undefined,sum=undefined, description=undefined,status=undefined,typePayment=undefined,user=undefined)=>{
               if(date!=undefined)
                   payment.#date=date;
               if(sum!=undefined)
                   payment.#sum=sum; 
               if(description!=undefined)
                  payment.#description=description;
               if(typePayment!=undefined)
                  payment.#status=status;
               if(typePayment!=undefined)
                  payment.#typePayment=typePayment;
               if(user!=undefined)
                  payment.#user=user;    
    }
}


class CreditCard extends Payment{
    #number;
    #LastFourDigits;
    #code;
    #password;
    #payments;

    constructor(date, sum, description,status,user,
                number,lastFourDigits, code, password,payments)
    {
        super(date, sum, description,status, "credit card",user )
        this.#number = number;
        this.#LastFourDigits = lastFourDigits;
        this.#code = code;
        this.#password = password;
        this.#payments = payments;
    }

    set number(number){this.#number=number;}
    get number(){return this.#number;}

    set LastFourDigits(LastFourDigits){this.#LastFourDigits=LastFourDigits;}
    get LastFourDigits(){return this.#LastFourDigits;}

    set code(code){this.#code=code;}
    get code(){return this.#code;}

    set password(password){this.#password=password;}
    get password(){return this.#password;}

    set payments(payments){this.#payments=payments;}
    get payments(){return this.#payments;}

    update
    (payment,date=undefined,sum=undefined, description=undefined,status=undefined,typePayment=undefined,user=undefined,
    number=undefined,LastFourDigits=undefined,code=undefined,password=undefined,payments=undefined)
    {
        super.update(payment,date,sum,description,status,typePayment,user);
               if(number!=undefined)
                   payment.#number=number;
               if(LastFourDigits!=undefined)
                   payment.#LastFourDigits=LastFourDigits; 
               if(code!=undefined)
                  payment.#code=code;
               if(password!=undefined)
                  payment.#password=password;
               if(payments!=undefined)
                  payment.#payments=payments;
    }
}




class ClearingCompany extends Payment{
    #id;

    constructor(date, sum, description,status,user,
                id)
    {
        super(date, sum, description,status, "ClearingCompany",user )
        this.#id=id;
    }

    set id(id){this.#id=id;}
    get id(){return this.#id;}

    //אין לו update כי אין מה לשנות ישלח אוטומטית לאבא
}


class User{
    #name;
    #email;
    #password;
    constructor(name, email, password) {
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#payments = [];
    }

    set name(name){this.#name=name;}
    get name(){return this.#name;}

    set email(email){this.#email=email;}
    get email(){return this.#email;}

    set password(password){this.#password=password;}
    get password(){return this.#password;}

    set payments(payments){this.#payments=payments;}
    get payments(){return this.#payments;}
}


function openOptionOfPayment() {
    if (document.getElementById("cache").checked) {
       document.getElementById("cache-payment").style.display = "block";
    }
    else {
       document.getElementById("cache-payment").style.display = "none";
    }
    if (document.getElementById("creditCard").checked) {
       document.getElementById("credit-payment").style.display = "block";
    }
    else {
       document.getElementById("credit-payment").style.display = "none";
    }
    if (document.getElementById("clearing").checked) {
       document.getElementById("clearing-payment").style.display = "block";
    }
    else {
       document.getElementById("clearing-payment").style.display = "none";
    }
 
 }
 

function pay(){
    const type=document.getElementById('type-pay').value;
    let payment;
    switch (type) {
        case "cash":
            const sum=document.getElementById('sum-input').value;
            const desc=document.getElementById('desc-input').value;
            const status=document.getElementById('status-input').value;
            payment=new Payment(sum, desc, status,user);
            break;
        case "credit-card":
            const sum=document.getElementById('sum-input').value;
            const desc=document.getElementById('desc-input').value;
            const status=document.getElementById('status-input').value;
            const LastFourDigits=document.getElementById('LastFourDigits-input').value;
            const code=document.getElementById('code-input').value;
            const password=document.getElementById('password-input').value;
            const  payment=document.getElementById('payments-input').value;
            payment=new CreditCard(sum, desc, status,user,LastFourDigits,code,password, payment);
            break;
        case "credit-card":
            const sum=document.getElementById('sum-input').value;
            const desc=document.getElementById('desc-input').value;
            const status=document.getElementById('status-input').value;
            const LastFourDigits=document.getElementById('LastFourDigits-input').value;
            const code=document.getElementById('code-input').value;
            const password=document.getElementById('password-input').value;
            const  payment=document.getElementById('payments-input').value;
            payment=new CreditCard(sum, desc, status,user,LastFourDigits,code,password, payment);
            break;     
    } 
    payments.push(payment);
}

function refund(){
    const id=document.getElementById('id-input').value;
    payments=payments.filter( payment=> payment.id!=id? payment:null);
    alert("refund successfully");
}
//בסוג תשלום אם משנים אז צריך להמיר לאבא ולהקצות לבן חדש ולהוסיף נתונים
//ביוסר לבדוק אם לפחות אחד מהמשתנים השתנו
function update(){
    let id,date,sum,description,status,typePayment,user;
    id=document.getElementById('id-input').value;
    const payment=payments.filter( payment=> payment.id!=id? payment:null);
    if(payment.date!=document.getElementById('date-edit').value)
        date= document.getElementById('date-edit').value;
    if(payment.sum!=document.getElementById('sum-edit').value)
        sum= document.getElementById('sum-edit').value;
    if(payment.description!=document.getElementById('desc-edit').value)
        description= document.getElementById('desc-edit').value;
    if(payment.status!=document.getElementById('status-edit').value)
        status= document.getElementById('status-edit').value;
    if(payment.typePayment!=document.getElementById('typePayment-edit').value)
        typePayment= document.getElementById('typePayment-edit').value;
    if(payment.user!=document.getElementById('user-edit').value)
        user= document.getElementById('user-edit').value;
   payment.update(payment,date,sum,description,status,typePayment,user)
}
//המערך יהיה בחנות עם רשות למנהל או למוכרים להוסיף למערך
const payments=[new Payment(500,"aaa",true,user),new CreditCard(500,"aaa",true,user,4444,5555,1478,2)]
