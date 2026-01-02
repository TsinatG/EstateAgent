import '../styles/global.css';
import '../styles/HomePage.css';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import { useProperty } from '../context/PropertyContext';
import { SearchX } from 'lucide-react';

const HomePage = () => {
  const { searchResults } = useProperty();

  return (
    <div className="home-container">

      {/* Search Header Section with Gradient Background */}
      <div className="home-hero" style={{ backgroundImage: `url(/src/assets/landscape.jpg)` }}>
        <div className="home-hero-overlay"></div>
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            <span className="home-hero-accent">believe</span> in finding it
          </h1>
          <p className="home-hero-subtitle">with the UK's largest choice of homes</p>
        </div>
      </div>

      <SearchForm />

      <div className="home-layout">
        {/* Results Column */}
        <div className="home-results-col">
          <div className="home-results-header">
            <h2 className="home-results-title">
              Properties for Sale
            </h2>
            <span className="home-results-count">{searchResults.length} results</span>
          </div>

          <div className="home-results-list">
            {searchResults.length > 0 ? (
              searchResults.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="home-no-results">
                <SearchX className="home-svg-icon home-no-results-icon" />
                <h3 className="home-no-results-title">No properties found</h3>
                <p className="home-no-results-text">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
