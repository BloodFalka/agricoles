const checkTextInputs = (selector) => {
    const textInputs = document.querySelectorAll(selector);

    textInputs.forEach(item => {
        item.addEventListener('keypress', (e) => {
            if (e.key.match(/[^а-яёїіє 0-9]/ig)){
                e.preventDefault();
                item.style.color = 'red';
                item.value = 'Вводите только кириллицу';
                setTimeout(()=>{
                    item.style.color = '';
                    item.value = '';
                },800)
            }
        });
        item.addEventListener('input', () => {
            if (item.value.match(/[^а-яёїіє 0-9]/ig)){
                item.style.color = 'red';
                item.value = 'Вводите только кириллицу';
                setTimeout(()=>{
                    item.style.color = '';
                    item.value = '';
                },1200)
            }
        });
    });
}

export default checkTextInputs;