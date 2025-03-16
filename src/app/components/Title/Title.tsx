export const Title = (props: { text: string }) => {
  const { text } = props;
  return (
    <>
      <div className="xl:text-[24px] lg:text-[22px] md:text-[18px] sm:text-[16px] font-[700] leading-[29px] text-[#EFEEE0]">
        {text}
      </div>
    </>
  )
}