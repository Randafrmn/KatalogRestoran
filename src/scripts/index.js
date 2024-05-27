/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import gsap from 'gsap';
import App from './views/app';
import swRegister from './utils/sw-register';
import WebSocketInitiator from './utils/websocket-initiator';
import FooterToolsInitiator from './utils/footer-tools-initiator';
import './utils/loader-element';
import CONFIG from './globals/config';

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  const loader = document.querySelector('loader-element');

  loader.hide();

  loader.addEventListener('transitionend', () => {
    if (loader.shadowRoot.querySelector('.loader').classList.contains('loader-hidden')) {
      document.body.removeChild(loader);
    } else {
      // eslint-disable-next-line no-alert
      alert('Gagal memuat halaman. Silakan coba lagi nanti.');
    }
  });

  app.renderPage();
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);

  FooterToolsInitiator.init({
    subscribeButton: document.querySelector('#subscribePushNotification'),
    unsubscribeButton: document.querySelector('#unsubscribePushNotification'),
  });
});

gsap.from('.hero-title', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power4.out',
  delay: 0.5,
});

gsap.from('.hero-subtitle', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power4.out',
  delay: 0.7,
});
