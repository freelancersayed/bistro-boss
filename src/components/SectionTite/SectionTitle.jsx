

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-3/12 mx-auto py-5 text-center">
            <p className="text-yellow-500 mb-2">---{subHeading}---</p>
            <h1 className="text-3xl uppercase border-y-2">{heading}</h1>
        </div>
    );
};

export default SectionTitle;