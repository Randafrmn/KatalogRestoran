class LoaderElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--bgColor);
          z-index: 100;
          transition: opacity 0.65s, visibility 0.75s;
        }
  
        .loader-hidden {
          opacity: 0;
          visibility: hidden;
        }
  
        .loader::after {
          content: "";
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 6px solid var(--bgDark);
          border-top: 6px solid var(--rating);
          animation: spin 1s ease infinite;
        }
  
        @keyframes spin {
          from {
            transform: rotate(0turn);
          }
          to {
            transform: rotate(1turn);
          }
        }
      `;

    // Loader container
    const loader = document.createElement('div');
    loader.classList.add('loader');

    // Attach the created elements to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(loader);
  }

  // Method to hide the loader
  hide() {
    this.shadowRoot.querySelector('.loader').classList.add('loader-hidden');
  }
}

// Define the new element
customElements.define('loader-element', LoaderElement);

export default LoaderElement;
