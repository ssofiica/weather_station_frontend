import { ReactNode, FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface LoadAnimationProps {
    children: ReactNode;
    loaded: Boolean;
}

const LoadAnimation: FC<LoadAnimationProps> = ({ children, loaded }) => {
    return loaded ? (
        <>{children}</>
    ) : (
        <div className='position-absolute top-50 start-50 translate-middled-flex justify-content-center'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadAnimation;