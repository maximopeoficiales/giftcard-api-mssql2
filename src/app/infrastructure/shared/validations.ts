export const _validation_token = (username: string = '', password: string = '') => {
    if (username.trim().length == 0) throw ({ status: 400, message: 'Username is invalid', errorCode: 'invalidUsername' });
    if (password.trim().length == 0) throw ({ status: 400, message: 'Password is invalid', errorCode: 'invalidPassword' });
}

export const _validation_validate = (cardNumber: string = '', cardExpiry: string = '', cardCVV: string = '', amount: string = '', name: string = '', lastname: string = '', store: string = '', email: string = '', identificationDocument: string = '', phone: string = '') => {
    if (cardNumber.trim().length != 16) throw ({ status: 400, message: 'CardNumber Invalid', errorCode: 'invalidCardNumber' });
    if (cardExpiry.trim().length != 5) throw ({ status: 400, message: 'CardExpiry Invalid', errorCode: 'invalidCardExpiry' });
    if (cardCVV.trim().length != 3) throw ({ status: 400, message: 'CardCVV Invalid', errorCode: 'invalidCVV' });
    if (parseFloat(amount) <= 0) throw ({ status: 400, message: 'Amount Invalid', errorCode: 'invalidAmount' });
    if (name.trim().length < 5 || name.trim().length > 40) throw ({ status: 400, message: 'Name Invalid', errorCode: 'invalidName' });
    if (lastname.trim().length < 5 || lastname.trim().length > 80) throw ({ status: 400, message: 'Lastname Invalid', errorCode: 'invalidLastname' });
    if (email.trim().length < 5 || email.trim().length > 120) throw ({ status: 400, message: 'Email Invalid', errorCode: 'invalidEmail' });
    if (!validateEmail(email)) throw ({ status: 400, message: 'Email Invalid', errorCode: 'invalidEmail' });
    //if(identificationDocument.trim().length < 8 || identificationDocument.trim().length > 15) throw ({ status: 400, message: 'IdentificationDocument Invalid', errorCode: 'invalidIdentification'});
    //if(phone.trim().length <= 7 || phone.trim().length >= 15) throw ({ status: 400, message: 'Phone Invalid', errorCode: 'invalidPhone'});
}

export const _validation_findTransaction = (purchaseOrder: any, authorizationCode: any) => {
    if (!purchaseOrder && !authorizationCode) throw ({ status: 400, message: 'PurchaseOrder Invalid', errorCode: 'invalidPurchaseOrder' });
    //if(purchaseOrder.trim().length <= 7 || purchaseOrder.trim().length >= 15) throw ({ status: 400, message: 'PurchaseOrder Invalid', errorCode: 'invalidPurchaseOrder'});
}

export const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

