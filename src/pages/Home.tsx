import { Loading, Product, Rating } from "@components/index";
import useHome from "@hooks/useHome";
//svgs
import True from "@assets/svgs/true.svg?react";
//images
import gym from "@assets/images/gym.png";
import formal from "@assets/images/formal.png";
import casual from "@assets/images/casual.png";
import party from "@assets/images/party.jpg";
import { Link } from "react-router-dom";

const dataComments = [
  {
    name: "sarah m.",
    text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
  },
  {
    name: "alex k.",
    text: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”`,
  },
  {
    name: "sarah m.",
    text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
  },
  {
    name: "james l.",
    text: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”`,
  },
];

const dataCategories = [
  {
    name: "casual",
    image: casual,
  },
  {
    name: "formal",
    image: formal,
  },
  {
    name: "party",
    image: party,
  },
  {
    name: "gym",
    image: gym,
  },
];

const Home = () => {
  const { loading, error, records } = useHome();
  return (
    <div className="home">
      <section className="landing">
        <p className="mainText">FIND CLOTHES THAT MATCHES YOUR STYLE</p>
        <p className="subText">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Link className="shop-btn" to="/products">
          shop now
        </Link>
        <ul className="anlytics">
          <li>
            <span>200+</span> International Brands
          </li>
          <li>
            <span>2,000+</span> High-Quality Products
          </li>
          <li>
            <span>30,000+</span> Happy Customers
          </li>
        </ul>
      </section>
      <section className="top-selling">
        <h2 className="title">top selling</h2>
        <Loading error={error} status={loading} numSkeleton={4} type="product">
          <div className="products">
            {records.map((record) => (
              <div key={record.id} className="product">
                <Product {...record} />
              </div>
            ))}
          </div>
        </Loading>
      </section>
      <section className="categories">
        <h2 className="title">BROWSE BY dress STYLE</h2>
        <div className="main">
          {dataCategories.map(({ name, image }) => (
            <Link to={"products/" + name} key={name} className="category">
              <p className="name">{name}</p>
              <img src={image} alt={name} />
            </Link>
          ))}
        </div>
      </section>
      <section className="comments">
        <h2 className="title">OUR HAPPY CUSTOMERS</h2>
        <div className="main">
          {dataComments.map(({ name, text }, idx) => (
            <div key={idx} className="comment">
              <Rating rating={5} isText={false} />
              <p className="name">
                {name}
                <True />
              </p>
              <p className="text">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
