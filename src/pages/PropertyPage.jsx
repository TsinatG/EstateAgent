import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyData from '../data/properties.json';
import { ArrowLeft, Heart, MapPin, Bed, Maximize, Phone, Mail, Calendar } from 'lucide-react';
import '../styles/PropertyPage.css';
import landscapeImage from '../assets/landscape.jpg';

const PropertyPage = () => {
  const { id } = useParams();
  
  // Direct retrieval from json
  const property = propertyData.properties.find(p => p.id === id);

  const addToFavorites = (prop) => console.log('addToFavorites:', prop);
  const favorites = []; 

  const [activeTab, setActiveTab] = useState('desc');

  // We'll just have one static image for now to use the landscape from asset as placeholder
  const images = [landscapeImage, landscapeImage, landscapeImage, landscapeImage];
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return <div className="text-center py-20">Property not found. <Link to="/" className="text-accent underline">Go Home</Link></div>;
  }

  const isFavorite = favorites.some(fav => fav.id === property.id);

  // Formatting date from the schema structure
  const dateAddedStr = `${property.added.month} ${property.added.day}, ${property.added.year}`;

  return (
    <div className="property-page-container">
      <Link to="/" className="property-page-back-link">
        <ArrowLeft className="property-page-back-icon" /> Back to search results
      </Link>

      <div className="property-page-content">
        
        {/* Header */}
        <div className="property-page-header">
          <div>
            <h1 className="property-page-title">
              {property.location}
            </h1>
            <p className="property-page-price">£{property.price.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => addToFavorites(property)}
            disabled={isFavorite}
            className={`property-page-save-btn ${
              isFavorite 
                ? 'active' 
                : 'inactive'
            }`}
          >
            <Heart className={`property-page-save-icon ${isFavorite ? 'filled' : ''}`} />
            {isFavorite ? 'Saved' : 'Save Property'}
          </button>
        </div>

        {/* Gallery */}
        <div className="property-page-picture">
          <div className="property-page-main-image-container">
            <img src={images[activeImage]} alt="Main" className="property-page-main-image" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="property-page-main-grid">
          <div className="property-page-details-col">
            
            {/* Tabs */}
            <div className="property-page-tabs">
              <nav className="property-page-tabs-nav">
                {['desc', 'floor', 'map'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`property-page-tab-btn ${
                      activeTab === tab
                        ? 'active'
                        : 'inactive'
                    }`}
                  >
                    {tab === 'desc' ? 'Description' : tab === 'floor' ? 'Floor Plan' : 'Map'}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="property-page-tab-content">
              {activeTab === 'desc' && (
                <div className="property-page-prose">
                  <h3 className="property-page-about-title">About this property</h3>
                  <p className="property-page-description">{property.description}</p>
                  
                  <div className="property-page-features-box">
                    <h4 className="property-page-features-title">Key Features</h4>
                    <ul className="property-page-features-list">
                      <li className="property-page-feature-item"><span className="property-page-feature-dot"></span>{property.bedrooms} Bedrooms</li>
                      <li className="property-page-feature-item capitalize"><span className="property-page-feature-dot"></span>{property.type}</li>
                      <li className="property-page-feature-item"><span className="property-page-feature-dot"></span>{property.tenure}</li>
                      <li className="property-page-feature-item"><span className="property-page-feature-dot"></span>Added: {dateAddedStr}</li>
                      <li className="property-page-feature-item"><span className="property-page-feature-dot"></span>Close to local amenities</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'floor' && (
                <div className="property-page-floorplan-container">
                   {/* Using landscape as placeholder for floorplan for now*/}
                  <img src={landscapeImage} alt="Floor Plan" className="property-page-floorplan-img" />
                </div>
              )}

              {activeTab === 'map' && (
                <div className="property-page-map-container">
                   <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    title="Google Map"
                   ></iframe>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="property-page-sidebar-col">
             <div className="property-page-summary-box">
                <h3 className="property-page-summary-title">Property Summary</h3>
                <div className="property-page-summary-list">
                  <div className="property-page-summary-item">
                    <MapPin className="property-page-summary-icon" />
                    <div>
                      <p className="property-page-summary-label">Location</p>
                      <p className="property-page-summary-value">{property.location}</p>
                    </div>
                  </div>
                  <div className="property-page-summary-item">
                    <Bed className="property-page-summary-icon" />
                    <div>
                      <p className="property-page-summary-label">Bedrooms</p>
                      <p className="property-page-summary-value">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="property-page-summary-item">
                    <Maximize className="property-page-summary-icon" />
                    <div>
                       <p className="property-page-summary-label">Type</p>
                       <p className="property-page-summary-value capitalize">{property.type}</p>
                    </div>
                  </div>
                  <div className="property-page-summary-item">
                    <Calendar className="property-page-summary-icon" />
                    <div>
                       <p className="property-page-summary-label">Tenure</p>
                       <p className="property-page-summary-value capitalize">{property.tenure}</p>
                    </div>
                  </div>
                </div>
                
                <div className="property-page-agent-section">
                  <p className="property-page-marketed-by">Marketed by</p>
                  <div className="property-page-agent-info">
                    <div className="property-page-agent-avatar">
                      SE
                    </div>
                    <div>
                      <p className="property-page-agent-name">Student Estate</p>
                      <p className="property-page-agent-sub">Agents Ltd</p>
                    </div>
                  </div>
                  
                  <div className="property-page-action-buttons">
                    <button className="property-page-btn-primary">
                      <Phone className="property-page-btn-icon" /> Call Agent
                    </button>
                    <button className="property-page-btn-secondary">
                      <Mail className="property-page-btn-icon" /> Request Details
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;

