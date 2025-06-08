import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grid,
  Container,
} from '@mui/material';
import {
  Check,
  Star,
  AutoAwesome,
  School,
  WorkspacePremium,
} from '@mui/icons-material';

const features = {
  basic: [
    'Access to basic courses',
    'Community support',
    'Basic course generation',
    '1 course per month',
  ],
  pro: [
    'All Basic features',
    'Priority support',
    'Advanced course generation',
    '5 courses per month',
    'Custom course templates',
    'Analytics dashboard',
  ],
  enterprise: [
    'All Pro features',
    '24/7 dedicated support',
    'Unlimited course generation',
    'Custom integrations',
    'Team collaboration',
    'White-label options',
    'API access',
  ],
};

const PackageCard = ({ title, price, features, recommended, buttonText, icon }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-8px)',
      },
    }}
  >
    {recommended && (
      <Chip
        icon={<Star />}
        label="Recommended"
        color="primary"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      />
    )}
    <CardContent sx={{ flexGrow: 1, p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {icon}
        <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" component="div" sx={{ mb: 1 }}>
        ${price}
        <Typography
          component="span"
          variant="subtitle1"
          color="text.secondary"
          sx={{ ml: 1 }}
        >
          /month
        </Typography>
      </Typography>
      <List sx={{ my: 3 }}>
        {features.map((feature, index) => (
          <ListItem key={index} sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Check color="success" />
            </ListItemIcon>
            <ListItemText primary={feature} />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        variant={recommended ? 'contained' : 'outlined'}
        size="large"
        sx={{ mt: 2 }}
      >
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

const PaymentPackages = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <AutoAwesome sx={{ mr: 2, color: 'primary.main' }} />
          Choose Your Plan
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Select the perfect plan for your learning journey. All plans include access to our AI-powered course generator.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <PackageCard
            title="Basic"
            price="29"
            features={features.basic}
            buttonText="Get Started"
            icon={<School sx={{ color: 'primary.main', fontSize: 32 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PackageCard
            title="Pro"
            price="79"
            features={features.pro}
            recommended
            buttonText="Start Free Trial"
            icon={<WorkspacePremium sx={{ color: 'primary.main', fontSize: 32 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PackageCard
            title="Enterprise"
            price="199"
            features={features.enterprise}
            buttonText="Contact Sales"
            icon={<AutoAwesome sx={{ color: 'primary.main', fontSize: 32 }} />}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Need a custom plan? Contact our sales team for a tailored solution.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          sx={{ mt: 2 }}
        >
          Contact Sales
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentPackages; 