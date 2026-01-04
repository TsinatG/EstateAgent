import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import propertyData from "../data/properties.json";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Bed,
  Maximize,
  Phone,
  Mail,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../styles/PropertyPage.css";
import { useProperty } from "../context/PropertyContext";
import landscapeImage from "../assets/landscape.jpg"; // Backup image
import { resolveAssetUrl } from "../utils/assetResolver";

const PropertyPage = () => {
  const { id } = useParams();

  // Direct retrieval from json
  const property = propertyData.properties.find((p) => p.id === id);

  const { addToFavorites, removeFromFavorites, favorites } = useProperty();

  const [activeTab, setActiveTab] = useState("desc");
  // State for gallery
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!property) {
    return (
      <div className="text-center py-20">
        Property not found.{" "}
        <Link to="/" className="text-accent underline">
          Go Home
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === property.id);

  // Formatting date from the schema structure
  const dateAddedStr = `${property.added.month} ${property.added.day}, ${property.added.year}`;

  // Image list handling: prefer gallery; resolve built URLs for JSON paths
  const images =
    property.gallery && property.gallery.length > 0
      ? property.gallery.map(resolveAssetUrl)
      : property.picture
      ? [resolveAssetUrl(property.picture)]
      : [landscapeImage];

  // Ensure activeImage index is valid
  const currentImage = images[activeImage] || images[0];

  return (
    <div className="property-page-container">
      <Link to="/" className="property-page-back-link">
        <ArrowLeft className="property-page-back-icon" /> Back to search results
      </Link>

      <div className="property-page-content">
        {/* Header */}
        <div className="property-page-header">
          <div>
            <h1 className="property-page-title">{property.location}</h1>
            <p className="property-page-price">
              £{property.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => {
              if (isFavorite) {
                removeFromFavorites(property.id);
              } else {
                addToFavorites(property);
              }
            }}
            className={`property-page-save-btn ${
              isFavorite ? "active" : "inactive"
            }`}
          >
            <Heart
              className={`property-page-save-icon ${
                isFavorite ? "filled fill-current" : ""
              }`}
              fill={isFavorite ? "currentColor" : "none"}
            />
            {isFavorite ? "Saved" : "Save Property"}
          </button>
        </div>

        {/* Gallery */}
        {/* Gallery */}
        <div className="property-page-gallery">
          <div
            className="property-page-main-image-container group cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={images[activeImage]}
              alt="Main"
              className="property-page-main-image"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center pointer-events-none">
              <Maximize className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12 drop-shadow-lg" />
            </div>
          </div>
          <div className="property-page-thumbnails custom-scrollbar">
            {images.slice(0, 6).map((img, idx) => (
              <div
                key={idx}
                className={`property-page-thumbnail group ${
                  activeImage === idx ? "active" : ""
                }`}
                onClick={() => setActiveImage(idx)}
              >
                <img
                  src={img}
                  alt={`View ${idx}`}
                  className="property-page-thumbnail-img"
                />
                <div className="property-page-thumbnail-overlay" />
              </div>
            ))}
          </div>
        </div>

        {/* Modal / Lightbox */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                );
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <img
              src={images[activeImage]}
              alt="Full screen"
              className="max-h-[90vh] max-w-[90vw] object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                );
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
              {activeImage + 1} / {images.length}
            </p>
          </div>
        )}

        {/* Main Content Area */}
        <div className="property-page-main-grid">
          <div className="property-page-details-col">
            {/* Tabs */}
            <div className="property-page-tabs">
              <nav className="property-page-tabs-nav">
                {["desc", "floor", "map"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`property-page-tab-btn ${
                      activeTab === tab ? "active" : "inactive"
                    }`}
                  >
                    {tab === "desc"
                      ? "Description"
                      : tab === "floor"
                      ? "Floor Plan"
                      : "Map"}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="property-page-tab-content">
              {activeTab === "desc" && (
                <div className="property-page-prose">
                  <h3 className="property-page-about-title">
                    About this property
                  </h3>
                  <p className="property-page-description">
                    {property.description}
                  </p>

                  <div className="property-page-features-box">
                    <h4 className="property-page-features-title">
                      Key Features
                    </h4>
                    <ul className="property-page-features-list">
                      <li className="property-page-feature-item">
                        <span className="property-page-feature-dot"></span>
                        {property.bedrooms} Bedrooms
                      </li>
                      <li className="property-page-feature-item capitalize">
                        <span className="property-page-feature-dot"></span>
                        {property.type}
                      </li>
                      <li className="property-page-feature-item">
                        <span className="property-page-feature-dot"></span>
                        {property.tenure}
                      </li>
                      <li className="property-page-feature-item">
                        <span className="property-page-feature-dot"></span>
                        Added: {dateAddedStr}
                      </li>
                      <li className="property-page-feature-item">
                        <span className="property-page-feature-dot"></span>Close
                        to local amenities
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "floor" && (
                <div className="property-page-floorplan-container">
                  <img
                    src={resolveAssetUrl(property.floorPlan) || landscapeImage}
                    alt="Floor Plan"
                    className="property-page-floorplan-img"
                  />
                </div>
              )}

              {activeTab === "map" && (
                <div className="property-page-map-container">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      property.location
                    )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
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
                    <p className="property-page-summary-value">
                      {property.location}
                    </p>
                  </div>
                </div>
                <div className="property-page-summary-item">
                  <Bed className="property-page-summary-icon" />
                  <div>
                    <p className="property-page-summary-label">Bedrooms</p>
                    <p className="property-page-summary-value">
                      {property.bedrooms}
                    </p>
                  </div>
                </div>
                <div className="property-page-summary-item">
                  <Maximize className="property-page-summary-icon" />
                  <div>
                    <p className="property-page-summary-label">Type</p>
                    <p className="property-page-summary-value capitalize">
                      {property.type}
                    </p>
                  </div>
                </div>
                <div className="property-page-summary-item">
                  <Calendar className="property-page-summary-icon" />
                  <div>
                    <p className="property-page-summary-label">Tenure</p>
                    <p className="property-page-summary-value capitalize">
                      {property.tenure}
                    </p>
                  </div>
                </div>
              </div>

              <div className="property-page-agent-section">
                <p className="property-page-marketed-by">Marketed by</p>
                <div className="property-page-agent-info">
                  <div className="property-page-agent-avatar">SE</div>
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
