import yeomIcon from '/public/yeom-icon.png';
import downloadIcon from '../icons/download.svg';
import shareIcon from '../icons/share.svg';

class QRView {
  #parentElement = document.querySelector('.root');

  render(uri) {
    const markup = `
      <section class="container-qr section-qr">
        <header class="header-container">
          <div class="querre-icon">
            <img src=${yeomIcon} alt="yeom icon">
            <span>Querre</span>
          </div>
        </header>

        <div class="qr">
          <div class="shape">
            <img id="qrcode" src=${uri}>
          </div>
        </div>

        <div class="options">
          <button class="btn btn-download">
            Download
            <img class="btn-icon" src=${downloadIcon} alt="download icon">
          </button> 
          <button class="btn btn-share">
            Share
            <img class="btn-icon" src=${shareIcon} alt="download icon">
          </button> 
        </div>
      </section>
    `;

    this.#parentElement.innerHTML = markup;
  }

  addHandlerIcon(handler) {
    this.#parentElement.addEventListener('click', e => {
      const icon = e.target.closest('.querre-icon');

      if (!icon) return;

      handler();
    });
  }

  getQRElement() {
    const qrEl = document.getElementById('qrcode');
    return qrEl;
  }
}

export default new QRView();
