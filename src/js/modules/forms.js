//import checkNumInputs from './checkNumInputs';

const forms = (formSelector, submitSelector, statusSelector) => {
  // get the form elements defined in your form HTML above
  let form = document.querySelector(formSelector)
  let button = document.querySelector(submitSelector)
  let status = document.querySelector(statusSelector)

  // Success and Error functions for after the form is submitted
  const deleteSpinner = () => {
    let statusWrapper = document.querySelector('.consultation__status-wrapper')
    let statusImg = document.querySelector('.consultation__status-img')
    statusWrapper.removeChild(statusImg)
  }

  const success = () => {
    form.reset()
    deleteSpinner()
    status.innerHTML = 'Спасибо, сообщение успешно отправлено!'
    status.classList.add('heartbeat-once')
    status.style = 'display: block '
  }

  const error = () => {
    deleteSpinner()
    status.innerHTML =
      'Что-то пошло не так, Перезагрузите страницу и попробуйте ещё раз'
    status.classList.add('shake-horizontal')
    status.style.display = 'block'
    status.style.backgroundColor = '#2a2b2a'
  }

  // handle the form submission event

  form.addEventListener('submit', function (ev) {
    ev.preventDefault()
    const data = new FormData(form)
    button.style.display = 'none'
    let statusImg = document.createElement('img') // Create a <li> node
    statusImg.src = './assets/img/spinner.svg'
    statusImg.classList.add('consultation__status-img')
    document
      .querySelector('.consultation__status-wrapper')
      .appendChild(statusImg)
    ajax(form.method, form.action, data, success, error)
  })
  // helper function for sending an AJAX request

  const ajax = (method, url, data, success, error) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType)
      } else {
        error(xhr.status, xhr.response, xhr.responseType)
      }
    }
    xhr.send(data)
  }
}

export default forms
