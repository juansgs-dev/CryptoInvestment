import { useEffect, useState } from "react";
import { Box, Stack, Typography, Card, CardContent } from "@mui/material";
import "../index.css";
import CryptoHistoryCard from "./CryptoHistoryCard";
import CryptoChart from "./CryptoChart";
import CryptoSelector from "./CryptoSelector";
import useCryptoInfo from "../hooks/useCryptoPrices.js";
import useCryptoList from "../hooks/useCryptoList.js";

const CryptoHistoryView = () => {
  const [selected, setSelected] = useState("");
  const { cryptos } = useCryptoList();
  const [info, setInfo] = useState(null);
  const { loading } = useCryptoInfo(selected, setInfo);

  useEffect(() => {
    if (cryptos.length && !selected) {
      const defaultCrypto = cryptos.find(c => c.symbol === "BTC");
      setSelected(defaultCrypto?.symbol || cryptos[0].symbol);
    }
  }, [cryptos, selected]);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #7b1fa2, #512da8)",
        minHeight: "100vh",
        p: 4,
        color: "#fff",
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          CryptoInvestment
        </Typography>

        <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}>
          <CardContent>
            <Typography variant="body1">
              Explora y analiza el comportamiento de diferentes criptomonedas a lo largo del tiempo.
            </Typography>
          </CardContent>
        </Card>

        <CryptoSelector
          selected={cryptos.find(c => c.symbol === selected) || null}
          onChange={(newValue) => setSelected(newValue?.symbol || '')}
          options={cryptos}
        />

        {loading ? (
          <Typography variant="h6">Cargando...</Typography>
        ) : info ? (
          <>
            <CryptoHistoryCard
              name={info.name}
              price={info.current_price_usd}
              change={
                info.history.length > 1
                  ? ((info.current_price_usd - info.history[info.history.length - 1].price_usd) /
                    info.history[info.history.length - 1].price_usd) *
                  100
                  : 0
              }
              logoUrl={info.logo_url}
            />
            <CryptoChart info={info} loading={loading} />
          </>
        ) : (
          <Typography variant="h6">No se encontró información.</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default CryptoHistoryView;
