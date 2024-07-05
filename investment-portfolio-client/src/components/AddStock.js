import React, { useState } from 'react';
import axios from 'axios';

function AddStock() {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStock = { symbol, shares: parseInt(shares), price: parseFloat(price) };
    axios.post('http://localhost:3030/portfolio', newStock)
      .then(response => {
        console.log(response.data);
        setSymbol('');
        setShares('');
        setPrice('');
      })
      .catch(error => console.error('There was an error adding the stock!', error));
  };

  return (
    <div className="container">
      <h2>Add Stock</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Shares"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
}

export default AddStock;
