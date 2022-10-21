import throttle from 'lodash.throttle';

import { save, load, remove } from './storage';
const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = "feedback-form-state";




initPage();


const onFormInput = event => {
    const { name, value } = event.target;

    let saveData = load(LOCAL_STORAGE_KEY);
    saveData = saveData ? saveData : {};
        
    saveData[name] = value;
    save(LOCAL_STORAGE_KEY, saveData);
    
      
}

const throttleOnFormInput = throttle(onFormInput, 300);

formRef.addEventListener('input', onFormInput);

function initPage() {
    const saveData = load(LOCAL_STORAGE_KEY);
    if (!saveData) {
        return;
    }

    Object.entries(saveData).forEach(([name, value]) => {
        formRef.elements[name].value = value;
    });
}


const handleSubmit = event => {
    event.preventDefault();
    const {
        elements: { email, message },
    } = event.currentTarget;
    if (email.value && message.value) {
         console.log({ email: email.value, message: message.value });
        event.currentTarget.reset();
        remove(LOCAL_STORAGE_KEY);
    } else {
        alert('Please fill in both form fields');
    }
   
}
    
formRef.addEventListener('submit', handleSubmit);
