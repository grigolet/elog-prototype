function TitleFieldTemplate(props) {
    const { id, required, title } = props;
    return (
        <header
            className="text-3xl font-bold tracking-tight text-gray-900"
            id={id}
        >
            {title}
            {required && <mark>*</mark>}
        </header>
    );
}

export default TitleFieldTemplate;
