import github from "../github.svg";
import instagram from "../instagram.svg";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    footer {
      background-color: #333;
      color: white;
      padding: 24px 0;
      text-align: center;
    }
    footer .container {
      width: 80%;
      margin: 0 auto;
    }
    footer .container span {
      font-weight: 300;
    }
    footer .container .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .social-media {
      display: flex;
      margin: 20px 0;
      align-items: center;
    }
    .social-media a {
      width: 24px;
      height: 24px;
      color: white;
    }
    .social-media a.github {
      margin-right: 20px;
    }
  </style>
  <footer class="bg-dark py-3 text-white text-center">
    <div class="container">
      <div class="footer-content">
        <div class="social-media">
          <a href="https://github.com/riadysteve" target="_blank" class="github"><img src=${github} /></a>
          <a href="https://www.instagram.com/steven_riady/" target="_blank" ><img src=${instagram} /></a>
        </div>
        <span>Design & Built by Steven Riady</span>
      </div>
    </div>
  </footer>
`;

class footerContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("footer-content", footerContent);
