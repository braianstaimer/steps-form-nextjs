import PropTypes from 'prop-types';


const Label = ({
    text = '',
    ...props
}) => {
    return (
        <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
            {text}
        </label>
    );
};


Label.propTypes = {
    text: PropTypes.string.isRequired,
};



export default Label;