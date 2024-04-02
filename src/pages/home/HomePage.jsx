import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <Layout>
            <HeroSection/>
            <Category/>
            <HomePageProductCard/>
            <div className="flex justify-center my-3.5">
                <Link to={'/allproduct'}>
                    <button className=' bg-gray-500 px-5 py-2 rounded-xl'>See more</button>
                </Link>
            </div>
            <Track/>
            <Testimonial/>
        </Layout>
    );
}

export default HomePage;
