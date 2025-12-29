import '../styles/global.css';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


const HomePage = () => {

  return (
      <div>    
           <Link to="/property/1">
            <ArrowRight /> Go to Property Page
          </Link>
          Home Page Preview
    </div>
  );
};

export default HomePage;
