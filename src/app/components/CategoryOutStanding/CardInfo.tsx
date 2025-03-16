/* eslint-disable @next/next/no-img-element */
export const CardInfo = (props: { image: string, title: string, description: string }) => {
  const { image, title, description } = props;
  return (
    <>
      <div className="flex gap-[20px] mb-[30px]">
        <div className="w-[180px] h-[180px] rounded-[15px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="font-[700] text-[35px] leading-[42px]  text-primary mb-[10px] ">
            {title}
          </div>
          <div className="font-[400] text-[14px] leading-[17px] text-[#EFEEE0]">
            {description}
          </div>
        </div>
      </div>
    </>
  )
}