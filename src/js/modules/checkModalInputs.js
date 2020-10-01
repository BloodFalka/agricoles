const checkModalInputs = (triggerSelector, state, ...inputs) => {
    const trigger = document.querySelector(triggerSelector);
    let counter = 0;
    console.log(inputs.length);

    inputs.forEach(item => {
        if(state[item]){
            counter++;
        }
    });

    if (counter >= inputs.length) {
        trigger.dataset.isActive = true;
        console.log('activated button');
    } else{
        trigger.dataset.isActive = false;
        console.log('disactivated button');
    }

};

export default checkModalInputs;