import PageHeaderText from "../components/pageModules/PageHeaderText"
import HeaderImg from "../assets/RetroGadgets.webp"
// import RGModuleGrid from "../components/pageModules/RGModuleGrid"

//Welcome.tsx - the main page when you open the docs:w
const RetroGadgetTutorials: React.FC = () => {

    return (
        <div className="flex flex-col">
            <PageHeaderText>Welcome to the demo version of RGDocs community!</PageHeaderText>
            <div className="py-2 w-full">
                <img src={HeaderImg} alt="Retro gadgets"
                    className="rounded-lg h-45 object-cover w-full"
                />
            </div>
            <h1>
                The site is still far from complete, but in the meantime,
                this should give you a general idea of what the final
                product will look like. What are you waiting for? Hop into the other pages!
            </h1>
            {/* <RGModuleGrid></RGModuleGrid> */}
        </div>
    )
}

export default RetroGadgetTutorials;
