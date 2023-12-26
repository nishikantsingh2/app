import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';

import registerReducer from '../features/register/registerSlice';
import createarticleReducer  from "@/features/createarticle/createarticleSlice";
import  articleReducer  from "@/features/articles/articlesSlice";

// import payeeReducer from "@/features/payee/payeeSlice";
// import paymenttableReducer from "@/features/paymenttable/paymenttableSlice";
// import successfullReducer from "@/features/paymentsuccess/paymentsuccessSlice";
// import totalamountReducer from "@/features/totalamount/totalamountSlice";import pdfcontentReducer from "@/features/pdfcontent/pdfcontentSlice";






export const store = configureStore({
    reducer: {
        register: registerReducer,auth: authReducer, createartilce: createarticleReducer, allarticle: articleReducer ,
        //  customer: customerReducer, profile: profileReducer, register: registerReducer, payee: payeeReducer, paymenttable: paymenttableReducer, successpayment: successfullReducer,
        // totalamount: totalamountReducer,
    }, 
});