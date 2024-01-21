abstract class Payment {
    public makePayment(amount: number): void {
        console.log('Paymnt  successfull : ', amount);
    }
}

class GooglePay extends Payment {}
class CreditCard extends Payment {
    public makePayment(amount: number): void {
        console.log('Need additional info regarding card to make successfulll payment ....');
    }
}
class OnlineBanking extends Payment {
    public makePayment(amount: number): void {
        console.log('Need to connect with the bank sever to provide gateway for online payment; Please wait... ');
    }
}

class PaymentFactory {
    private static availablePaymentModes = {
        gpay: () => new GooglePay(),
        creditCard: () => new CreditCard(),
        onlineBanking: () => new OnlineBanking(),
    };
    public static payementMode(mode: string) {
        return PaymentFactory.availablePaymentModes[mode]?.();
    }
}

class Bootstrap {
    public pay(amount: number) {
        let pay = PaymentFactory.payementMode('gpay');
        pay.makePayment(amount);

        pay = PaymentFactory.payementMode('creditCard');
        pay.makePayment(amount);

        pay = PaymentFactory.payementMode('onlineBanking');
        pay.makePayment(amount);
    }
}

const app = new Bootstrap();
app.pay(5000);
