import PropTypes from 'prop-types';

const Card = ({ title, content, children }) => (
  <div className='shadow p-5'>
    {title && <p>{title}</p>}
    {content && <p className='font-bold'>{content}</p>}
    {children}
  </div>
);

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  children: PropTypes.shape({
    props: PropTypes.shape({
      children: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.object, PropTypes.array])
      ),
    }),
  }),
};

Card.defaultProps = {
  title: null,
  content: null,
  children: null,
};

export default Card;
