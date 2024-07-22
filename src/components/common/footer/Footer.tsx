import { Link } from "react-router-dom";

//images
import visa from "@assets/images/Visa.jpg";
import mastercard from "@assets/images/Mastercard.jpg";
import paypal from "@assets/images/Paypal.jpg";
import googlePay from "@assets/images/googlePay.jpg";
import applePay from "@assets/images/applePay.jpg";

//svgs
import Twitter from "@assets/svgs/twitter.svg?react";
import Facebook from "@assets/svgs/facebook.svg?react";
import Instagram from "@assets/svgs/instagram.svg?react";
import Github from "@assets/svgs/github.svg?react";
import Mail from "@assets/svgs/mail.svg?react";

const SOCIAL_LINKS = [
  { title: "twitter", icon: <Twitter /> },
  { title: "facebook", icon: <Facebook /> },
  { title: "instagram", icon: <Instagram /> },
  { title: "github", icon: <Github /> },
];

const LINKS = [
  { title: "company", links: ["about", "features", "works", "career"] },
  {
    title: "help",
    links: [
      "customer support",
      "delivery details",
      "terms & conditions",
      "privacy policy",
    ],
  },
  {
    title: "faq",
    links: ["account", "manage deliveries", "orders", "payment"],
  },
  {
    title: "resources",
    links: [
      "free eBooks",
      "deveopmet tutorials",
      "how to - Blog",
      "youtube playlist",
    ],
  },
];

const PAYMENT = [
  { title: "visa", image: visa },
  { title: "mastercard", image: mastercard },
  { title: "paypal", image: paypal },
  { title: "google pay", image: googlePay },
  { title: "apple pay", image: applePay },
];

const Footer = () => {
  const handleSubscribe = () => {};
  return (
    <footer className="footer">
      <div className="container">
        <div className="subscribe">
          <p className="right">stay upto data about our latest products</p>
          <div className="left">
            <div className="input">
              <Mail />
              <input type="text" />
            </div>
            <button onClick={handleSubscribe}>Subscribe to newsletter</button>
          </div>
        </div>
        <main>
          <div className="left">
            <h1 className="logo">logo</h1>
            <p className="text">
              We have clothes that suits your style and which you`re proud to
              wear. From women to man
            </p>
            <ul className="social">
              {SOCIAL_LINKS.map(({ title, icon }) => (
                <li
                  key={title}
                  className={
                    "socialLink" + (title === "facebook" ? " facebook" : "")
                  }
                >
                  <Link to="./">{icon}</Link>
                </li>
              ))}
            </ul>
          </div>
          {LINKS.map(({ title, links }) => (
            <div className="linksGroup">
              <h6 className="title">{title}</h6>
              <ul className="linksList">
                {links.map((link) => (
                  <li className="link">
                    <Link to="./">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
        <hr />
        <div className="last">
          <div className="copyright">© 2024. All rights reserved</div>
          <ul className="payment">
            {PAYMENT.map(({ title, image }) => (
              <li key={title} className="paymentLink">
                <img src={image} alt={title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
