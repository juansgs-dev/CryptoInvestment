import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";

/**
 * @param {{ name: string, price: number, change: number }} props
 */
const CryptoHistoryCard = ({ name, price, change, logoUrl }) => {
  return (
    <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={logoUrl} alt={name} />
          <Stack>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">Precio actual: ${parseFloat(price).toFixed(2)}</Typography>
            <Typography
              variant="body2"
              color={parseFloat(change) >= 0 ? "lightgreen" : "red"}
            >
              Cambio: {parseFloat(change).toFixed(2)}%
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CryptoHistoryCard;
