const ALERT_BOX_TIMEOUT_MS = 5000;

const bodyElement = document.body;

const showAlertBox = (error) => {
  const alertBoxElement = document.createElement('div');
  alertBoxElement.classList.add('data-error');
  const { style } = alertBoxElement;
  style.zIndex = '100';
  style.position = 'static';
  style.left = '0';
  style.top = '0';
  style.right = '0';
  style.padding = '30px 3px';
  style.fontSize = '30px';
  style.textAlign = 'center';
  style.backgroundColor = 'red';
  alertBoxElement.textContent = error.message;
  bodyElement.insertBefore(alertBoxElement, bodyElement.firstElementChild);

  setTimeout(() => {
    alertBoxElement.remove();
  }, ALERT_BOX_TIMEOUT_MS);
};

export { showAlertBox };
