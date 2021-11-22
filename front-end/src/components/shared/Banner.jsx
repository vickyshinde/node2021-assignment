import PropTypes from 'prop-types';

const Banner = ({ title, slogan }) => {
  return (
    <section className="jumbotron text-center">
      <h3 className="jumbotron-heading">{title}</h3>
    </section>
  );
};

Banner.defaultProps = {
  title: 'Default title',
  slogan: 'Default slogan',
};

Banner.propTypes = {
  title: PropTypes.string,
  slogan: PropTypes.string,
};

export default Banner;
