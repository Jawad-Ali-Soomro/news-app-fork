
const NotificationCard = () => {
  return (
    <div className="lg:w-[45%] border-b h-16 px-3 flex items-center relative mb-4">
    <div className="flex gap-1 items-center">
      <img
        className="h-[30px] w-[30px] rounded-[16px]"
        src="https://images.unsplash.com/photo-1700317440743-ffe7b2134276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8"
        alt=""
      />
      <div>
        <span className="font-bold text-[15px] ">Bol News</span>
        <p className="text-sm ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
          quam
        </p>
      </div>
    </div>
      <span className="absolute top-1 right-3 text-xs">3day ago</span>
  </div>

  )
}

export default NotificationCard