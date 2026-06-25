import React, { useEffect, useState } from 'react'
import {MdMenu} from 'react-icons/md'

const ProductList = () => {

  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
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
        in_stock: false
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
        id: 10005,
        name: "Build a Blockchain from Scratch in Go",
        price: 19,
        rating: 3,
        poster: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true
      },
      {
        id: 10006,
        name: "Frontend Fastlane Plan With Projects",
        price: 99,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: false
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
        in_stock: false
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
        in_stock: false
      },
    ];
    setProducts(sampleProducts)
  }, [])
  return (
    <div>ProductList</div>
  )
}

export default ProductList