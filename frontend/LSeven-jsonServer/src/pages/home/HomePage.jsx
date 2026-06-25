import ProductCard from "../../Components/Elements/ProductCard";
import { useEffect } from "react";
import { useTitle } from "../../Hooks/useTitle";
import { useFilter } from "../../context";
import { getProductsBestseller } from "../../Services/productServices";

const HomePage = () => {
  useTitle("Home - Access Latest Computer Science eBooks");
  
  const { setProductList } = useFilter();

  useEffect(() => {
    // Fetch featured/bestseller products from json-server
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProductsBestseller();
        setProductList(products.slice(0, 3)); // Take first 3 as featured
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
        // Fallback to sample data if API fails
        const sampleProducts = [
          {
            id: 10001,
            name: "Basics To Advanced In React",
            price: 29,
            rating: 5,
            poster: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
            in_stock: true
          },
          {
            id: 10004,
            name: "The Complete Guide to Backend Development",
            price: 99,
            rating: 5,
            poster: "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
            in_stock: true
          },
          {
            id: 10008,
            name: "JavaScript Basics To Advance",
            price: 29,
            rating: 5,
            poster: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
            in_stock: true
          },
        ];
        setProductList(sampleProducts);
      }
    };
    
    fetchFeaturedProducts();
  }, [setProductList]);

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold dark:text-white mb-4">
          Welcome to CodeBook
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          A marketplace for computer science eBooks and programming courses.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold dark:text-white mb-6">
          Featured eBooks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {setProductList && (
            <ProductCard key={10001} product={{
              id: 10001,
              name: "Basics To Advanced In React",
              price: 29,
              rating: 5,
              poster: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
              in_stock: true
            }} />
          )}
          {setProductList && (
            <ProductCard key={10004} product={{
              id: 10004,
              name: "The Complete Guide to Backend Development",
              price: 99,
              rating: 5,
              poster: "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
              in_stock: true
            }} />
          )}
          {setProductList && (
            <ProductCard key={10008} product={{
              id: 10008,
              name: "JavaScript Basics To Advance",
              price: 29,
              rating: 5,
              poster: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
              in_stock: true
            }} />
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage