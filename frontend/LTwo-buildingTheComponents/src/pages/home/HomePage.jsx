import { useEffect, useState } from "react"
import { ProductCard } from "../../components"

const HomePage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        // sample data loaded here
        // later lessons will add Api integration to fetch real data
        const sampleProduct = [
      {
        id: 10001,
        name: "Basics To Advanced In React",
        price: 29,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true
      },
      {
        id: 10002,
        name: "Django Framework for Beginners",
        price: 19,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false
      },
      {
        id: 10003,
        name: "The Future of Design Systems",
        price: 29,
        rating: 3,
        poster: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true
      },
      {
        id: 10004,
        name: "The Complete Guide to Backend Development",
        price: 99,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false
      },
      {
        id: 10005,
        name: "Build a Blockchain from Scratch in Go",
        price: 19,
        rating: 3,
        poster: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false
      },
      {
        id: 10006,
        name: "Frontend Fastlane Plan With Projects",
        price: 99,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true
      },
      {
        id: 10007,
        name: "Master the Code Review",
        price: 19,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
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
      {
        id: 10009,
        name: "Python Deep Dive With Projects",
        price: 29,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true
      },
      {
        id: 10010,
        name: "Mastering Software Technique",
        price: 19,
        rating: 4,
        poster: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true
      },
      {
        id: 10011,
        name: "Web Development Foundation",
        price: 29,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true
      },
      {
        id: 10012,
        name: "Mastering Git and GitHub",
        price: 9,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true
      },
    ];
        setProducts(sampleProduct.slice(0,3))
    },[])
    return (
        <main className=" mx-auto max-w-7xl px-4 md:px-6  py-8">
            <section className=" flex flex-col lg:flex-row dark:text-slate-100 items-center gap-6 px-50px">
                <div className=" my-5">
                    <h1 className=" text-4xl dark:text-white mb-4">The Ultimate eBook Store</h1>
                    <p className=" text-lg text-gray-600 dark:text-gray-300 mb-8">
                        A market place for computer science ebooks and programming courses
                    </p>

                    <button 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Explore eBooks
                    </button>
                </div>
                <div className="my-5 lg:max-w-xl">
                    <img 
                    src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=60" 
                    alt="CodeBook hero section" 
                    className=" rounded-lg max-h-full"
                    />
                </div>
            </section>

            <section className=" mb-12">
                <h2 className=" text-2xl font-bold dark:text-white mb-6">
                    Featured eBooks
                </h2>
                <div className=" grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard 
                        key={product.id}
                        product={product}
                        />
                    ))}
                </div>
            </section>
        </main>
  )
}

export default HomePage