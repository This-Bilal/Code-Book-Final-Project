import Hero from './components/Hero'
import { Testimonials } from './components/Testimonials'
import { Faq } from './components/Faq'
import { FeaturedProducts } from './components/FeaturedProduct'
import  useTitle  from '../../Hooks/useTitle'

const HomePage = () => {
  useTitle("Access Latest Computer Science eBooks")
  return (
    <main>
      <Hero/>
      <FeaturedProducts/>
      <Testimonials/>
      <Faq/>
    </main>
  )
}

export default HomePage