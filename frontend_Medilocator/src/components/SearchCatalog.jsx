import React, { useState } from "react";
import "./SearchCatalog.css";
import { useNavigate } from "react-router-dom";

const dummyMedicines = [
  { id: 1, name: "Paracetamol", brand: "Cipla", price: 25, stock: 120 },
  { id: 2, name: "Amoxicillin", brand: "Sun Pharma", price: 80, stock: 60 },
  { id: 3, name: "Cetirizine", brand: "Zydus", price: 30, stock: 200 },
  { id: 4, name: "Azithromycin", brand: "Alkem", price: 95, stock: 40 },
  { id: 5, name: "Metformin", brand: "Torrent", price: 55, stock: 90 },
  { id: 6, name: "Ibuprofen", brand: "Dr. Reddy", price: 50, stock: 150 },
  { id: 7, name: "Vitamin C", brand: "Himalaya", price: 40, stock: 300 },
  { id: 8, name: "Omeprazole", brand: "Cipla", price: 75, stock: 70 },
  { id: 9, name: "Dolo 650", brand: "Micro Labs", price: 30, stock: 110 },
  { id: 10, name: "Pantoprazole", brand: "Sun Pharma", price: 65, stock: 80 },
];

const SearchCatalog = () => {
  const [search, setSearch] = useState("");
  const [storeInventory, setStoreInventory] = useState([]);

  const filteredMedicines = dummyMedicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToInventory = (medicine) => {
    if (storeInventory.find((item) => item.id === medicine.id)) {
      alert("Medicine already in store inventory!");
      return;
    }
    setStoreInventory([...storeInventory, medicine]);
    alert(`${medicine.name} added to store inventory!`);
  };

  const navigate = useNavigate();
  return (
    <div className="search-catalog">
      <div className="search-header">
        <h2>🔍 Search from Product Catalog</h2>
        <input
          type="text"
          placeholder="Search medicine by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="medicine-list">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((med) => (
            <div key={med.id} className="medicine-card">
              <div>
                <h3>{med.name}</h3>
                <p><b>Brand:</b> {med.brand}</p>
                <p><b>Price:</b> ₹{med.price}</p>
                <p><b>Stock:</b> {med.stock} units</p>
              </div>
              <button
                className="add-btn"
                onClick={() => handleAddToInventory(med)}
              >
                Add to Inventory
              </button>
            </div>
          ))
        ) : (
          <div className="no-medicine"> 
            <h1>No Medicine found </h1>
             <button className="add-new" onClick={()=>navigate("/search/add")}>➕ Add New Medicine</button></div>
       
        ) }
      </div>
    </div>
  );
};

export default SearchCatalog;
