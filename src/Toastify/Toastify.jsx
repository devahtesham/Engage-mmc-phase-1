import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);
const promiseNotify = (url,object) => toast.promise(url,object);

export {
    successNotify,
    errorNotify,
    promiseNotify,
    ToastContainer
}


    


