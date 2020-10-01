//import checkNumInputs from './checkNumInputs';

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]'),
          upload = document.querySelectorAll('[name="upload"]');

    //checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const postData = async (url, data) => {
        let res = await  fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
        document.querySelectorAll('textarea').forEach(item => {
            item.value = '';
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots = item.files[0].name.split('.')[0].length > 8? '...': '.';
            const splittedName = item.files[0].name.split('.');
            const name = `${splittedName[0].substring(0, 8)}${dots}${splittedName[1]}`;

            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            const closeForms = () => {
                item.parentNode.closest('[data-modal]').style.display = 'none';
                document.body.style.overflow = '';
                document.querySelector('body').style.marginRight = `0px`;
            };

            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOut');
            setTimeout(() => {
                item.style.display = 'none';
            },100);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeIn');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            textMessage.classList.add('animated', 'fadeIn');
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            let api = item.closest('.popup-design') || item.classList.contains('calc-form') ? path.designer: path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        if(item.style.display === 'none') {
                            if(item.closest('[data-modal]')){
                                closeForms();
                            }
                            statusMessage.remove();
                            item.style.display = 'block';
                            item.classList.remove('fadeOut');
                            item.classList.add('fadeIn');
                        }
                    }, 3000);
                });
        });
    });
};

export default forms;