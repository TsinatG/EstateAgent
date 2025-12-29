import '../styles/global.css';
import '../styles/HomePage.css';
import SearchForm from '../components/SearchForm';


const HomePage = () => {

  return (
    <div className="home-container">

      {/* Search Header Section with Gradient Background */}
      <div className="home-hero" style={{ backgroundImage: `url(/src/asset/landscape.jpg)` }}>
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
          </div>

          <div className="home-results-list">
            Property Cards
            
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
