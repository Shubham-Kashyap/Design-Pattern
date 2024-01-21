abstract class PaymentInterface {
    public makePayment(amount: number): void {
        console.log('Paymnt  successfull : ', amount);
    }
}
abstract class UpiPayment extends PaymentInterface {}

abstract class CardPayment extends PaymentInterface {
    public abstract enterCardDetails(details);
    public abstract makePayment(amount: number);
}
class GooglePayP extends UpiPayment {}
class CreditCard extends CardPayment {
    private static cardDetails;
    public enterCardDetails(cardDetails) {
        CreditCard.cardDetails = cardDetails;
    }
    public makePayment(amount: number): void {
        console.log('Need additional info regarding card to make successfulll payment ....', {
            amount,
            ...CreditCard.cardDetails,
        });
    }
}
class DebitCard extends CardPayment {
    private static cardDetails;
    public enterCardDetails(cardDetails) {
        DebitCard.cardDetails = cardDetails;
    }
    public makePayment(amount: number): void {
        console.log('Need additional info regarding card to make successfulll payment ....', {
            amount,
            ...DebitCard.cardDetails,
        });
    }
}
class Paypal extends UpiPayment {
    public makePayment(amount: number): void {
        console.log('Need to connect with the bank sever to provide gateway for online payment; Please wait... ');
    }
}

/** Factory  */
class UpiPaymentFactory {
    private static availablePaymentModes = {
        gpay: () => new GooglePay(),
        paypal: () => new Paypal(),
    };
    public static payementMode(mode: string) {
        return this.availablePaymentModes[mode]?.();
    }
}

class CardPaymentFactory {
    private static availablePaymentModes = {
        creditCard: () => new CreditCard(),
        debitCard: () => new DebitCard(),
    };
    public static payementMode(mode: string) {
        return this.availablePaymentModes[mode]?.();
    }
}

class PaymentFactory {
    private static availablePaymentModes = {
        card: () => new CardPaymentFactory(),
        upi: () => new UpiPaymentFactory(),
    };
    public static payementMode(mode: string) {
        return this.availablePaymentModes[mode]?.();
    }
}

// class Bootstrap {
//     public pay(amount: number) {
//         const upiPay = PaymentFactory.payementMode('upi');
//         upiPay.payementMode('gpay');
//         upiPay.pay(500);

//         const cardPay = PaymentFactory.payementMode('card');
//         cardPay.enterCardDetails({
//             name: 'abc',
//             cvv: 123,
//             expiryDate: '02/33',
//             cardNumber: '4588 5588 5555 5555',
//         });
//         cardPay.pay(5000);
//     }
// }

// const app = new Bootstrap();
// app.pay(5000);


function payViaCard(amount, cardDetails) {
    const pay = PaymentFactory.payementMode('card');
    pay.enterCardDetails(cardDetails);
    pay.pay(amount);
}

function payViaUpi(amount) {
    const pay = PaymentFactory.payementMode('upi');
    pay.pay(amount);
}

payViaCard(5000, {
    name: 'abc',
    cvv: 123,
    expiryDate: '02/33',
    cardNumber: '4588 5588 5555 5555',
});

payViaUpi(50);
