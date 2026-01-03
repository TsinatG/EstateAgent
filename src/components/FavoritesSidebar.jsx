import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { X, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/FavoritesSidebar.css';

const favorites = [
    {
        id: 1,
        title: 'Property 1',
        price: 100000,
        location: '123 Main St',
        picture: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        title: 'Property 2',
        price: 200000,
        location: '456 Elm St',
        picture: 'https://via.placeholder.com/150'
    }
];
const FavoritesSidebar = () => {
 

  return (
    <div 
      className={`favorites-sidebar`}
    >
      <div className="favorites-list-header">
        <h3 className="favorites-header" style={{ marginBottom: 0 }}>
          <Heart className="favorites-header-icon favorites-header-icon-filled" />
          Saved 2
        </h3>
        {true && (
          <button 
            onClick={() => { }}
            className="favorites-clear-btn"
          >
            <Trash2 className="w-3 h-3 mr-1" /> Clear
          </button>
        )}
      </div>

      <div className="favorites-list custom-scrollbar">
        
        {favorites.map(prop => (
          <div 
            key={prop.id} 
            className="favorite-item group"
          >
            <img src={prop.picture} alt="thumbnail" className="favorite-item-img" />
            <div className="favorite-item-content">
              <p className="favorite-item-price">£{prop.price.toLocaleString()}</p>
              <p className="favorite-item-location">{prop.location}</p>
              <Link to={`/property/${prop.id}`} className="favorite-item-link">
                View
              </Link>
            </div>
            <button 
              onClick={() => { }}
              className="favorite-remove-btn group-hover:opacity-100"
              title="Remove"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesSidebar;
