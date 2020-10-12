//import checkNumInputs from './checkNumInputs';

const forms = (formSelector, submitSelector, statusSelector) => {
  // get the form elements defined in your form HTML above
  let form = document.querySelector(formSelector)
  let button = document.querySelector(submitSelector)
  let status = document.querySelector(statusSelector)

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset()
    button.style = 'display: none '
    status.innerHTML = 'Спасибо, сообщение успешно отправлено!'
    status.style = 'display: block '
  }

  function error() {
    button.style.display = 'none'
    status.innerHTML =
      'Что-то пошло не так, Перезагрузите страницу и попробуйте ещё раз'
    status.style.display = 'block'
    status.style.backgroundColor = '#2a2b2a'
  }

  // handle the form submission event

  form.addEventListener('submit', function (ev) {
    ev.preventDefault()
    const data = new FormData(form)
    ajax(form.method, form.action, data, success, error)
  })
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType)
        status.classList.add('heartbeat-once')
      } else {
        error(xhr.status, xhr.response, xhr.responseType)
        status.classList.add('shake-horizontal')
      }
    }
    xhr.send(data)
  }
}

export default forms
