import PropTypes from 'prop-types';


const TextField = ({
    type = 'text',
    name = '',
    id = '',
    ...props
}) => {
    return (
        <div className="mt-2">
            <input
                type={type}
                name={name}
                id={id || name}
                className="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
            />
        </div>
    );
};


TextField.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
};



export default TextField;