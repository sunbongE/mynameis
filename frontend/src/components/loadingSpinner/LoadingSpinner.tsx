import { ClipLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div>
      <ClipLoader size='100px' color='#E1A3B3' speedMultiplier={0.7} />
    </div>
  );
}

export default LoadingSpinner;
