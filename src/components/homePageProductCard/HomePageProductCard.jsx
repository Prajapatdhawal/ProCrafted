import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";


const HomePageProductCard = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { loading, allProduct } = context;

    const cartItems = useSelector((state) => state.cart);

    // console.log(cartItems);

    const dispatch = useDispatch();

    // add to cart function
    // const addCart = (item) => {
    //     dispatch(addToCart(item));
    //     toast.success("Added to cart", { duration: 1000 })
    // }


    const addCart = (item) => {
        // Agar item cart me nahi hai, to usse quantity 1 ke saath cart me add karein
        const newItem = {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: 1,
            productImageUrl: item.productImageUrl,
            category: item.category
        };
        dispatch(addToCart(newItem));
        toast.success("Add to cart.", { duration: 1000 });

    };


    // delete from cart function
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart", { duration: 1000 })
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="mt-10">
            {/* Heading  */}
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
            </div>

            {/* main 1 */}
            <section className="text-gray-600 body-font">
                {/* main 2 */}
                <div className="container px-5 py-5 mx-auto">

                    <div className="flex justify-center">
                        {loading && <Loader />}
                    </div>
                    {/* main 3  */}
                    <div className="flex flex-wrap -m-4">
                        {allProduct.slice(0, 15).map((item, index) => {
                            const { id, title, price, productImageUrl } = item;
                            return (
                                <div key={index} className="p-4 w-full md:w-1/5 transition duration-200 ease-in transform hover:scale-110 hover:shadow-none">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="lg:h-50  h-40 w-full"
                                            src={productImageUrl}
                                            alt="img"
                                        />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                ProCrafted
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 19)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center ">
                                                {cartItems.some((p) => p.id === item.id)

                                                    ?
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">

                                                        Delete From Cart
                                                    </button>

                                                    :

                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                        Add To cart
                                                    </button>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePageProductCard;