import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { X, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/FavoritesSidebar.css';

const FavoritesSidebar = () => {
  const { favorites, removeFromFavorites, clearFavorites, isDragging, addToFavorites } = useProperty();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      try {
        const property = JSON.parse(data);
        // Only add if it's a property object (check for id)
        if (property.id) {
            addToFavorites(property);
        }
      } catch (e) {
        // here we're ignoring invalid JSON or other drag types
      }
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('favorite_id', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  if (favorites.length === 0 && !isDragging) {
    return (
      <div 
        className="favorites-sidebar-empty"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h3 className="favorites-header">
          <Heart className="favorites-header-icon" />
          Saved Properties
        </h3>
        <div className="favorites-empty-state">
          <p className="favorites-empty-title">Drag properties here</p>
          <p className="favorites-empty-subtitle">to save them for later</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`favorites-sidebar ${isDragging ? 'favorites-sidebar--dragging' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="favorites-list-header">
        <h3 className="favorites-header" style={{ marginBottom: 0 }}>
          <Heart className="favorites-header-icon favorites-header-icon-filled" />
          Saved ({favorites.length})
        </h3>
        {favorites.length > 0 && (
          <button 
            onClick={clearFavorites}
            className="favorites-clear-btn"
          >
            <Trash2 className="w-3 h-3 mr-1" /> Clear
          </button>
        )}
      </div>

      <div className="favorites-list custom-scrollbar">
        {favorites.length === 0 && isDragging && (
           <div className="favorites-drop-zone">Drop property here!</div>
        )}
        
        {favorites.map(prop => (
          <div 
            key={prop.id} 
            draggable
            onDragStart={(e) => handleDragStart(e, prop.id)}
            className="favorite-item group"
            title="Drag out to remove"
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
              onClick={() => removeFromFavorites(prop.id)}
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
