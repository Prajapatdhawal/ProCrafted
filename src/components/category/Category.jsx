import { useNavigate } from "react-router";

// category 
const category = [
    {
        image: 'https://i.ibb.co/Km2J6MX/OIG1-XW8pi-Rpd-U6-G0m1-S.jpg',
        name: 'Fashion'
    },
    {
        image: 'https://i.ibb.co/BnQCdPk/wooden.png',
        name: 'Wooden'
    },
    {
        image: 'https://i.ibb.co/6XzqX4W/OIG4.png',
        name: 'Pottery'
    },
    {
        image: 'https://i.ibb.co/8KrfRWq/Metal-Craft.png',
        name: 'MetalCraft'
    },
    {
        image: 'https://i.ibb.co/4mWCrNZ/OIG4-Te.png',
        name: 'MarbelCraft'
    },
    {
        image: 'https://i.ibb.co/gPR7NFB/leather.png',
        name: 'Leather'
    },
    {
        image: 'https://i.ibb.co/NSM2tw2/OIG4-8z-A6v-Ny7yv2d-i-QFQM.png',
        name: 'HomeDecor'
    }
]

const Category = () => {
    // naviaget 
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* main 1 */}
                <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex ">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                    {/* Image  */}
                                    <div onClick={() => navigate(`/category/${item.name}`)} className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full  bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1 " >
                                        <div className="flex justify-center mb-12">
                                            {/* Image tag  */}
                                            <img src={item.image} alt="img" />
                                        </div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className=' text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase '>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        </div>
    );
}

export default Category;