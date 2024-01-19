function Alert({message, onClose}) {
    if (message == null) {
        return null;
    }

    return (
        <div className="alert alert-danger alert-dismissable">
            {message}
            <button type="button" className="close" onClick={() => onClose()}>
                <span>&times;</span>
            </button>
        </div>
    )
}

export default Alert;