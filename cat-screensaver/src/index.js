import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import catGif from './cat.gif';

const Cat = ({ width, height, x, y }) => {
  const [position, setPosition] = useState({ x, y });
  const xDirection = useRef(Math.random() < 0.5 ? -1 : 1);
  const yDirection = useRef(Math.random() < 0.5 ? -1 : 1);

  useEffect(() => {
    const handle = setInterval(() => {
      let newX = position.x + 5 * xDirection.current;
      let newY = position.y + 5 * yDirection.current;
      if (newX + width >= window.innerWidth || newX <= 0) {
        xDirection.current *= -1;
        newX = (newX + width >= window.innerWidth) ? window.innerWidth - width - 1 : 1;
      }
      if (newY + height >= window.innerHeight || newY <= 0) {
        yDirection.current *= -1;
        newY = (newY + height >= window.innerHeight) ? window.innerHeight - height - 1 : 1;
      }
      setPosition({ x: newX, y: newY });
    }, 50);

    return () => clearInterval(handle);
  }, [position.x, position.y, width, height, xDirection, yDirection]);

  return (
    <img
      src={catGif}
      alt="고양이"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: width,
        height: height,
      }}
    />
  );
};

const App = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const newCats = [];
    for (let i = 0; i < 10; i++) {
      newCats.push({
        width: 100,
        height: 100,
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight),
      });
    }
    setCats(newCats);
  }, []);

  return (
    <div>
      {cats.map((cat, index) => (
        <Cat
          key={index}
          width={cat.width}
          height={cat.height}
          x={cat.x}
          y={cat.y}
        />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));