import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PropertyPage = () => {
    const { id } = useParams();

    return (
        <div >
            <Link to="/" >
                <ArrowLeft /> Back to search results
            </Link>
            <div>
                Property Page Preview
            </div>

        </div>
    );
};

export default PropertyPage;
