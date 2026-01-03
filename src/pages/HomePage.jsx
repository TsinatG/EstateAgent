import '../styles/global.css';
import '../styles/HomePage.css';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import FavoritesSidebar from '../components/FavoritesSidebar';
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
                <div className="home-no-results-icon">
                  <svg className="home-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <h3 className="home-no-results-title">No properties found</h3>
                <p className="home-no-results-text">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Favorites Sidebar Column (Sticky) */}
        <div className="home-sidebar-col">
          <div className="home-sidebar-sticky">
            <FavoritesSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
