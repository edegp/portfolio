export default function Merit2() {
  return (
    <Box className="merit  laptop:pt-[14vh] pt-[5vh] section">
      <Typography className="font-bold text-primary text-2xl text-center laptop:mb-vw-16 mb-0">
        効率的なWebマーケティング
      </Typography>
      <Box>
        <Container className="flex flex-wrap">
          {lists.map((list) => (
            <Box
              key={list.dt}
              className="laptop:w-1/3 laptop:px-vw-10 w-full mb-0 mx-auto"
            >
              <Box className="text-center laptop:w-3/4 w-vw-72 mx-auto laptop:min-h-[30vh]">
                <Image src={list.img} objectFit={"cover"} />
              </Box>
              <Typography className="text-primary text-lg text-center whitespace-nowrap font-bold laptop:my-vw-6 my-1">
                {list.dt}
              </Typography>
              <Typography className="laptop:text-left text-sm tablet:px-0 px-[20px] text-center font-medium">
                {list.dd}
              </Typography>
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
}
