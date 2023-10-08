/****************\
* Challenge #1   *
* Querre         *
* By: @yeomfa    *
\****************/
import formView from "./views/formView.js";
import qrView from "./views/qrView.js";
import QrCode from "./thirdparties/qrcode.js";

const generateQR = function(url) {
  // Generate QR
  const matrix = QrCode.generate(url);
  const uri = QrCode.render('svg-uri', matrix);

  qrView.render(uri);
}

const goToHome = function() {
  formView.render();
}

const init = function() {
  formView.addHandlerSubmit(generateQR);
  qrView.addHandlerIcon(goToHome);
}
window.addEventListener('load', () => formView.render())
init();
