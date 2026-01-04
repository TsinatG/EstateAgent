import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Heart } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import '../styles/PropertyCard.css';

const PropertyCard = ({ property }) => {

  const { setIsDragging, addToFavorites, favorites, removeFromFavorites } = useProperty();

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify(property));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="property-card group"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: 'grab'}}
    >
      <div className="property-card-content-wrapper">
        {/* Image Section */}
        <div className="property-card-image-container">
          <img 
            src={property.picture} 
            alt={property.location} 
            className="property-card-img"
          />
          
          <div className="property-card-overlay" />
        </div>
        
        {/* Content Section */}
        <div className="property-card-details">
          <div>
            <div className="property-card-header">
              <h3 className="property-card-price">
                £{property.price.toLocaleString()}
              </h3>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (favorites.some(fav => fav.id === property.id)) {
                    removeFromFavorites(property.id);
                  } else {
                    addToFavorites(property);
                  }
                }}
                className="property-card-fav-btn"
                title={favorites.some(fav => fav.id === property.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  className={`property-card-fav-icon ${favorites.some(fav => fav.id === property.id) ? "filled" : ""}`} 
                  fill={favorites.some(fav => fav.id === property.id) ? "currentColor" : "none"}
                />
              </button>
            </div>
            
            <p className="property-card-type-location">
              {property.type} | <span className="property-card-location">{property.location}</span>
            </p>
            
            <div className="property-card-features">
              <Bed className="property-card-bed-icon" />
              <span className="property-card-bed-count">{property.bedrooms}</span>
              <span className="property-card-bed-label">bedrooms</span>
            </div>
            
            <p className="property-card-description">
              {property.description}
            </p>
          </div>
          
          <div className="property-card-footer">
            <span className="property-card-date">Added on {new Date(property.dateAdded).toLocaleDateString()}</span>
            <Link 
              to={`/property/${property.id}`}
              className="property-card-link"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
