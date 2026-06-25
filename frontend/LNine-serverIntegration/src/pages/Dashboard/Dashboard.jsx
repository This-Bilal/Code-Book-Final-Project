import { useEffect, useState } from "react"
import { useTitle } from "../../hooks/useTitle"
import { toast } from "react-toastify"
import { toastOptions } from "../../config/utils"
import DashboardEmpty from "./components/DashboardEmpty"
import DashboardCard from "./components/DashboardCard"
import { getUserOrder } from "../../services"

const Dashboard = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useTitle("Dashboard")

useEffect(() => {
    const fecthOrders = async () => {
        try {
            setLoading(true)
            const orderData = await getUserOrder()
            setOrders(orderData)
        } catch (error) {
            toast.error(error.message || "Unable to load orders", toastOptions)
            setOrders(false)
        } finally {
            setLoading(false)
        }
    }

    fecthOrders()
}, [])

  return (
    <main>
        <section>
            <p className=" text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
                My DashBoard
            </p>
        </section>

        <section>
            {
                loading ? 
                (
                    <div className=" flex justify-center items-center my-10">
                        <div className=" animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"/>
                    </div>
                ) :
                orders.length ? 
                (
                    <div>
                        {orders.map((order) => (
                            <DashboardCard key={order.id} order={order}/>
                        ))}
                    </div>
                ) :
                (
                    <DashboardEmpty/>
                )
            }
        </section>
    </main>
  )
}

export default Dashboard