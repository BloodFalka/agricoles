const modals = () => {
  let btnPressed = false,
    btnDestroyed = false;

  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    destroyTrigger = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");
    scroll = calcScroll();

    trigger.forEach((item, i) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroyTrigger) {
          item.remove();
          btnDestroyed = true;
        }
        // if (item.dataset.isActive == 'true') {
        windows.forEach((item) => {
          item.style.display = "none";
          item.classList.add("animated", "fadeIn");
          document.body.style.overflow = "";
          document.querySelector("body").style.marginRight = `0px`;
          if (!btnDestroyed) {
            document.querySelector(".fixed-gift").style.marginRight = `0px`;
          }
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.querySelector("body").style.marginRight = `${scroll}px`;
        if (!btnDestroyed) {
          document.querySelector(
            ".fixed-gift"
          ).style.marginRight = `${scroll}px`;
        }

        // } else {
        //     console.log('NoActiveButton');

        //     let statusMessage = document.createElement('div');
        //     statusMessage.classList.add('is-complete_status');
        //     statusMessage.textContent = 'Заполните все поля';

        //     if(!item.parentNode.lastChild.isEqualNode(statusMessage)){
        //         console.log(item.parentNode.lastChild, statusMessage)
        //         item.parentNode.appendChild(statusMessage);
        //     }

        //     setTimeout(() => {
        //         statusMessage.remove();
        //     },4000);
        // }
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
        // if ((document.querySelector('[data-modal-images]').style.display === 'none')){
        document.body.style.overflow = "";
        document.querySelector("body").style.marginRight = `0px`;
        if (!btnDestroyed) {
          document.querySelector(".fixed-gift").style.marginRight = `0px`;
        }

        try {
          if (modal.hasChildNodes(".status")) {
            document
              .querySelectorAll(".status")
              .forEach((item) => item.remove());

            modal.querySelector("form").style.display = "block";
            modal.querySelector("form").classList.remove("fadeOut");
            modal.querySelector("form").classList.add("fadeIn");
          }
        } catch {}
        // // }else{
        //     document.body.style.overflow = 'hidden';
        //     document.querySelector('body').style.marginRight = `${scroll}px`;
        // // }
      });
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        windows.forEach((item) => {
          item.style.display = "none";
          // if((document.querySelector('[data-modal-images]').style.display === 'none')){
          document.body.style.overflow = "";
          document.querySelector("body").style.marginRight = `0px`;
          if (!btnDestroyed) {
            document.querySelector(".fixed-gift").style.marginRight = `0px`;
          }

          try {
            if (modal.hasChildNodes(".status")) {
              document
                .querySelectorAll(".status")
                .forEach((item) => item.remove());

              modal.querySelector("form").style.display = "block";
              modal.querySelector("form").classList.remove("fadeOut");
              modal.querySelector("form").classList.add("fadeIn");
            }
          } catch {}
          // } else{
          // document.body.style.overflow = 'hidden';
          // document.querySelector('body').style.marginRight = `${scroll}px`;
          // }
        });
      }
    });
  }

  function showModalByTime(modalSelector, time) {
    const modal = document.querySelector(modalSelector);

    setTimeout(() => {
      const modals = Array.from(document.querySelectorAll("[data-modal]"));
      let isModalOpen = modals.every((item) => item.style.display !== "none");
      // console.log(`${isModalOpen}`);

      if (isModalOpen) {
        modal.style.display = "block";
        modal.classList.add("animated", "fadeIn");
        document.body.style.overflow = "hidden";
        document.querySelector("body").style.marginRight = `${scroll}px`;
        if (!btnDestroyed) {
          document.querySelector(
            ".fixed-gift"
          ).style.marginRight = `${scroll}px`;
        }
      }
    }, time);
  }

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  function openByScroll(selector) {
    window.addEventListener("scroll", () => {
      let scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      if (
        !btnPressed &&
        window.pageYOffset + document.documentElement.clientHeight >=
          scrollHeight
      ) {
        document.querySelector(selector).click();
      }
    });
  }

  // bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  // bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  // bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');

  // showModalByTime('.popup-consultation',  6000);

  // openByScroll('.fixed-gift');
};

export default modals;
