import { FaStar } from "react-icons/fa6"

const Rating = ({rating = 0, count = 0}) => {

    const stars = []

    for (let i=0; i<5; i++) {
        stars.push(
            <FaStar
            key={i}
            size={16}
            className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}
            />
        )
    }
  return (
    <div className=" flex items-center gap-2">
        <div className=" flex gap-1">
            {stars}
        </div>
        {count > 0 && (
            <span className=" text-sm text-gray-600 dark:text-gray-400">
                {count}
            </span>
        )}
    </div>
  )
}

export default Rating