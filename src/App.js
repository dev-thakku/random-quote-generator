import { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [quote, setQuote] = useState({});
  const [bg, setBg] = useState(getBg());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then((quotes) => {
        if (typeof quotes === "string") {
          quotes = JSON.parse(quotes);
        }
        console.log(quotes);
        setQuotesData(quotes.quotes);
        setQuote(
          quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const getNextQuote = () => {
    setQuote("...Loading");
    setQuote(quotesData[Math.floor(Math.random() * quotesData.length)]);
    setBg(getBg(bg));
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(quote.quote + "\n- " + quote.author);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="app" style={{ background: bg }}>
      <main id="quote-box" style={{ color: bg }}>
        <div className="quote-text">
          <p id="text">
            <i className="fad fa-quote-left"></i>
            {quote?.quote || "loading..."}
          </p>
        </div>
        <div className="quote-author">
          <p id="author"> - {quote?.author}</p>
        </div>
        <div className="buttons">
          <div className="share-buttons">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&text=%22${quote?.quote}%22%20%20${quote?.author}`}
              className="btn tweet"
              style={{ background: bg }}
            >
              <i className="fab fa-twitter"></i>
            </a>
            <button
              onClick={handleCopy}
              className="btn copy"
              style={{ background: bg }}
            >
              {copied ? (
                <i className="fad fa-check"></i>
              ) : (
                <i className="fad fa-clipboard"></i>
              )}
            </button>
          </div>
          <button
            id="new-quote"
            onClick={getNextQuote}
            style={{ background: bg }}
            className="btn"
          >
            Next
          </button>
        </div>
      </main>
      <footer>
        <p>
          &copy; <a href="https://jemshith.tk/">Jemshith T K</a>
        </p>
      </footer>
    </div>
  );
};

export default App;

const getBg = (currentColor) => {
  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857"
  ];
  if (!currentColor) return colors[Math.floor(Math.random() * colors.length)];

  const nextIndex = colors.indexOf(currentColor) + 1;
  return colors[nextIndex === colors.length ? 0 : nextIndex];
};
