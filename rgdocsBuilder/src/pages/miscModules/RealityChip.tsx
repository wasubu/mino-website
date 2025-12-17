import PageHeaderText from "../../components/tools/PageHeaderText";

const RealityChip: React.FC = () => {
    return (
        <div>
            <PageHeaderText>Reality Module</PageHeaderText>
            <p>Documentation for the Reality module goes here...</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam repudiandae autem eveniet nulla, facere necessitatibus non reprehenderit quaerat enim? Voluptatibus assumenda illum nam nobis dignissimos cupiditate expedita sint quos ullam!Documentation for the Reality module goes here...</p>
            <div className="mt-2 bg-gray-50 flex justify-center items-center h-50 rounded-2xl shadow-sm">
                <div className="hover:bg-blue-400 cursor-pointer shadow-md bg-blue-300 flex justify-center items-center w-40 h-20 rounded-2xl">
                    <h1 className="text-white text-3xl">Hello</h1>
                </div>
            </div>
        </div>
    );
};

export default RealityChip;
