import './Button.css';

const Button = ({ text, onClick, style, disabled = false, className = "" }) => {
    return (
        <button
            className={`button ${className}`}
            onClick={onClick}
            style={style}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;