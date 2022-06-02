import MuiContainer from "@mui/material/Container";
import Box from "@mui/material/Box";
import Container from "../container";

export default function SubscriptionLayout({ children, ...other }) {
  return (
    <Container>
      <Box className="system laptop:pt-[18vh] pt-[14vh] section">
        <MuiContainer {...other}>{children}</MuiContainer>
      </Box>
    </Container>
  );
}
