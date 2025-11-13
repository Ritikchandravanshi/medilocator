import React, { useState, useEffect } from 'react';
import axios from 'axios';


// API Service
// const catalogAPI = {
//   // Get all products with filters
//   getAllProducts: async (params = {}) => {
//     try {
//       const response = await axios.get('api/v1/products/display', {
//         params: {
//           page: params.page || 1,
//           limit: params.limit || 20,
//           category: params.category,
//           search: params.search
//         }
//       });
//       return response.data.data;
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       throw error;
//     }
//   },

//   // Get single product details
//   getProductById: async (productId) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
//       return response.data.data;
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       throw error;
//     }
//   },

//   // Search products
//   searchProducts: async (query, category = '') => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/search/products`, {
//         params: { query, category }
//       });
//       return response.data.data;
//     } catch (error) {
//       console.error('Error searching products:', error);
//       throw error;
//     }
//   }
// };

// Product Card Component
const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.productName}>{product.name}</h3>
        <span style={styles.badge}>{product.category}</span>
      </div>
      
      <div style={styles.cardBody}>
        <p style={styles.brand}><strong>Brand:</strong> {product.brand}</p>
        {product.genericName && (
          <p style={styles.generic}><strong>Generic:</strong> {product.genericName}</p>
        )}
        {product.dosageForm && (
          <p style={styles.dosage}><strong>Form:</strong> {product.dosageForm}</p>
        )}
        {product.packSize && (
          <p style={styles.pack}><strong>Pack Size:</strong> {product.packSize}</p>
        )}
        {product.manufacturer && (
          <p style={styles.manufacturer}><strong>Manufacturer:</strong> {product.manufacturer}</p>
        )}
        {product.description && (
          <p style={styles.description}>{product.description}</p>
        )}
        {product.requiresPrescription && (
          <span style={styles.prescriptionBadge}>⚕️ Prescription Required</span>
        )}
      </div>
      
      <button 
        style={styles.button} 
        onClick={() => onViewDetails(product._id)}
      >
        View Details
      </button>
    </div>
  );
};

// Main Catalog Component
const CatalogDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['medicine', 'equipment', 'supplement', 'other'];

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogAPI.getAllProducts({
        page: currentPage,
        limit: 20,
        category: category,
        search: searchTerm
      });
      
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, category]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  // Handle view details
  const handleViewDetails = async (productId) => {
    try {
      const product = await catalogAPI.getProductById(productId);
      alert(`Product Details:\n${JSON.stringify(product, null, 2)}`);
      // In real app, navigate to product details page or open modal
    } catch (err) {
      alert('Failed to load product details');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Medicine Catalog</h1>
      
      {/* Search and Filter Section */}
      <div style={styles.filterSection}>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
        
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          style={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && <div style={styles.loading}>Loading products...</div>}

      {/* Error State */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div style={styles.noProducts}>No products found</div>
          ) : (
            <div style={styles.grid}>
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={styles.paginationButton}
              >
                Previous
              </button>
              <span style={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                style={styles.paginationButton}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  },
  filterSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  searchForm: {
    display: 'flex',
    flex: 1,
    gap: '10px'
  },
  searchInput: {
    flex: 1,
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  searchButton: {
    padding: '10px 25px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  select: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '15px'
  },
  productName: {
    margin: 0,
    fontSize: '18px',
    color: '#333',
    flex: 1
  },
  badge: {
    padding: '4px 8px',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: '4px',
    fontSize: '12px',
    textTransform: 'capitalize'
  },
  cardBody: {
    marginBottom: '15px'
  },
  brand: {
    margin: '8px 0',
    fontSize: '14px',
    color: '#555'
  },
  generic: {
    margin: '8px 0',
    fontSize: '14px',
    color: '#666'
  },
  dosage: {
    margin: '8px 0',
    fontSize: '14px',
    color: '#666'
  },
  pack: {
    margin: '8px 0',
    fontSize: '14px',
    color: '#666'
  },
  manufacturer: {
    margin: '8px 0',
    fontSize: '14px',
    color: '#666'
  },
  description: {
    margin: '12px 0',
    fontSize: '13px',
    color: '#777',
    lineHeight: '1.4'
  },
  prescriptionBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#fff3cd',
    color: '#856404',
    borderRadius: '4px',
    fontSize: '12px',
    marginTop: '8px'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '30px'
  },
  paginationButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  pageInfo: {
    fontSize: '14px',
    color: '#666'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666'
  },
  error: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  noProducts: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#999'
  }
};

export default CatalogDisplay;