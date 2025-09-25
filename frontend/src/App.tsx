import React, { useState, useEffect } from 'react';
import AddressForm from './components/AddressForm';
import { getAddresses } from './api';
import './App.css';

function App() {
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    getAddresses().then(setAddresses);
  }, []);

  return (
    <div className="container">
      <h2>Dynamic Address Form</h2>
      <AddressForm onSaved={() => getAddresses().then(setAddresses)} />
      <h3>Saved Addresses</h3>
      <pre>{JSON.stringify(addresses, null, 2)}</pre>
    </div>
  );
}

export default App;