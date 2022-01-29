import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { motion } from "framer-motion";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchUrl = async () => {
    setLoading(true);
    const response = await fetch(url);
    const tours = await response.json();
    setTours(tours);
    console.log(tours);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchUrl()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="App">
      <h1 className="tours">Tours</h1>
      <div className="underline"></div>
      <article>
        <List tours={tours} removeTour={removeTour} />
      </article>
    </div>
  );
}

const List = ({ tours, removeTour }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <TransitionGroup className="main-item">
      {tours.map((tour) => {
        console.log(tour);
        const { id, name, image, info, price } = tour;
        return (
          <CSSTransition key={id} timeout={700} classNames="alert">
            <motion.div className="single-tour" key={id} layout>
              <img src={image} alt="" />
              <footer>
                <div className="tour-info">
                  <h4>{name}</h4>
                  <h4 className="tour-price">${price}</h4>
                </div>
                <p
                  className={`${readMore && "active"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {readMore ? info : `${info.substring(0, 200)}...`}
                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="read-more"
                  >
                    {readMore ? "show less" : "read more"}
                  </button>
                </p>
                <button
                  className="delete-btn"
                  onClick={() => {
                    removeTour(id);
                  }}
                >
                  Not Interested
                </button>
              </footer>
            </motion.div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default App;
