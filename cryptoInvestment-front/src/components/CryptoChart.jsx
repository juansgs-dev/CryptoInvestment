import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
  Avatar,
  Divider,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const ranges = [
  { label: '1H', value: '1h' },
  { label: '6H', value: '6h' },
  { label: '12H', value: '12h' },
  { label: '1D', value: '1d' },
  { label: 'ALL', value: 'all' },
];

const formatCurrency = (value) =>
  `$${parseFloat(value).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;

const CryptoChart = ({ info, loading }) => {
  const [range, setRange] = useState('all');

  const handleRangeChange = (_, newRange) => {
    if (newRange) setRange(newRange);
  };

  const filteredHistory = useMemo(() => {
    if (!info?.history || range === 'all') return info?.history || [];

    const now = new Date();
    const hoursToSubtract = {
      '1h': 1,
      '6h': 6,
      '12h': 12,
      '1d': 24,
    }[range];

    return info.history.filter((entry) => {
      const entryTime = new Date(entry.timestamp);
      return entryTime >= new Date(now.getTime() - hoursToSubtract * 60 * 60 * 1000);
    });
  }, [range, info]);

  const chartData = filteredHistory.map((entry) => ({
    timestamp: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: parseFloat(entry.price_usd),
  }));

  const currentPrice = parseFloat(info?.current_price_usd || 0);
  const firstPrice = parseFloat(filteredHistory?.[0]?.price_usd || currentPrice);
  const priceChange = currentPrice - firstPrice;
  const isPositive = priceChange >= 0;

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: '16px',
        boxShadow: 3,
        backgroundColor: '#0d1117',
        color: '#e6edf3',
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {loading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar src={info.logo_url} alt={info.name} sx={{ width: 40, height: 40, mr: 2 }} />
          )}
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#e6edf3">
              {loading ? <Skeleton width={120} /> : info.name}
            </Typography>

            <Typography
              variant="body2"
              color="#8b949e"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {loading ? <Skeleton width={200} /> : info.description}
            </Typography>
          </Box>
        </Box>

        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold" color={isPositive ? '#00ff95' : '#ff5e57'}>
            {formatCurrency(currentPrice)}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {isPositive ? (
              <TrendingUp sx={{ color: '#00ff95' }} />
            ) : (
              <TrendingDown sx={{ color: '#ff5e57' }} />
            )}
            <Typography sx={{ color: isPositive ? '#00ff95' : '#ff5e57' }}>
              {priceChange >= 0 ? '+' : ''}
              {priceChange.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <ToggleButtonGroup
          value={range}
          exclusive
          onChange={handleRangeChange}
          color="primary"
          size="small"
          sx={{
            mb: 2,
            backgroundColor: '#161b22',
            borderRadius: 2,
            '& .MuiToggleButton-root': {
              color: '#c9d1d9',
              borderColor: '#30363d',
            },
            '& .Mui-selected': {
              backgroundColor: '#238636',
              color: '#fff',
            },
          }}
        >
          {ranges.map((r) => (
            <ToggleButton key={r.value} value={r.value}>
              {r.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Divider sx={{ mb: 2, borderColor: '#30363d' }} />

        <Box height={300}>
          {loading ? (
            <Skeleton variant="rectangular" height={300} />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#21262d" />
                <XAxis dataKey="timestamp" stroke="#8b949e" />
                <YAxis
                  stroke="#8b949e"
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => formatCurrency(value)}
                  tickMargin={10}
                  width={80}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  labelStyle={{ color: '#c9d1d9' }}
                  contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? '#00ff95' : '#ff5e57'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CryptoChart;
