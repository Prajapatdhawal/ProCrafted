import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB, auth } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList = [
    {
        name: 'Fashion'
    },
    {
        name: 'Wooden'
    },
    {
        name: 'Pottery'
    },
    {
        name: 'MetalCraft'
    },
    {
        name: 'MarbelCraft'
    },
    {
        name: 'Leather'
    },
    {
        name: 'HomeDecor'
    }
]

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    // navigate 
    const navigate = useNavigate();

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        ),
        uid: "" // Initialize admin UID
    });

    // Effect to fetch admin's UID
    useEffect(() => {
        const fetchAdminUid = async () => {
            try {
                const user = auth.currentUser; // Get the current user
                if (user) {
                    setProduct(prevProduct => ({
                        ...prevProduct,
                        uid: user.uid // Set admin UID in product state
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdminUid();
    }, []);

    // Add Product Function
    const addProductFunction = async () => {
        if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
            return toast.error("all fields are required")
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product)
            toast.success("Add product successfully");
            navigate('/admin-dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Add product failed");
        }
    }


    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Add Product
                        </h2>
                    </div>

                    {/* Input One title */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Product Title'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Two price */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                            placeholder='Product Price'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Three image url */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                })
                            }}
                            placeholder='Product Image Url'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Four category */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  ">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five description  */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

                        </textarea>
                    </div>
                    {/* Add a quantity input field */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    quantity: e.target.value
                                })
                            }}
                            placeholder='Quantity'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>
                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;
