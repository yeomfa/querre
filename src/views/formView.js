import yeomIcon from '/public/yeom-icon.png';

class FormView {
  #parentElement = document.querySelector('.root');

  render() {
    const markup = `
      <section class="container-input section-form">
        <div class="title">
          <img src=${yeomIcon} alt="yeom icon">
          <span>Querre</span>
        </div>

        <form class="app form-url">
          <input class="input-url" type="text" name="url" value="" placeholder="Enter an url"> 
          <button class="btn-submit" type="submit">QR code</button>
        </form>
      </section>
    `;

    this.#parentElement.innerHTML = markup;
  }

  addHandlerSubmit(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();

      const inputUrl = document.querySelector('.input-url');
      const url = inputUrl.value;

      if (url.length <= 1) return;

      handler(url);
      inputUrl.value = '';
    });
  }
}

export default new FormView();
