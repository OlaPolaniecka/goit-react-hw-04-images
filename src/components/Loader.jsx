import { Grid } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader">
      <Grid
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
      />
    </div>
  );
};

export default Loader;
