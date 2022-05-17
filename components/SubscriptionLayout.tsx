import Container from "./container";
import MuiContainer from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function SubscriptionLayout({ children }) {
  return (
    <Container>
      <Box className="system laptop:pt-[18vh] pt-[14vh] section">
        <MuiContainer>{children}</MuiContainer>
      </Box>
    </Container>
  );
}
