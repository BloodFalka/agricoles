import checkNumInputs from './checkNumInputs';
import checkModalInputs from './checkModalInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    

    const bindActionToInput = (elem, propName, event = 'input') =>{
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' :
                        state[propName] = i+1;
                        break;
                    case 'INPUT' :
                    case 'SELECT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0? state[propName] = 'cold': state[propName] = 'warm';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else{
                            state[propName] = item.value;
                        }
                        break;
                }
                checkModalInputs('.popup_calc_button', state, 'form', 'width', 'height');
                checkModalInputs('.popup_calc_profile_button', state, 'type', 'profile');
                console.log(state);
            });
        });

    }

    bindActionToInput(windowForm, 'form', 'click');
    bindActionToInput(windowWidth, 'width');
    bindActionToInput(windowHeight, 'height');
    bindActionToInput(windowType, 'type', 'change');
    bindActionToInput(windowProfile, 'profile', 'change');

};

export default changeModalState;