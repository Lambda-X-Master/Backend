module.exports = {
    // App name
    appName: 'Market Organizer',
 
    // Public domain of Rocket Rides
    publicDomain: 'http://localhost:3000',
 
    // Server port
    port: 3000,
 
    // Secret for cookie sessions
    secret: 'todayisanimportday',
 
    // Configuration for Stripe
    // API Keys: https://dashboard.stripe.com/account/apikeys
    // Connect Settings: https://dashboard.stripe.com/account/applications/settings
    stripe: {
      secretKey: 'sk_test_n1DUwGjicM4HBVIEu59BvGZF00hles8uFE',
      publishableKey: 'pk_test_R4kvaWNKnku78DL2dwXpLiTq00R1MdFKhb',
      clientId: 'ca_FAGcUfqBruqWUBKChwn4jI8mGUydEH0Q',
      authorizeUri: 'https://connect.stripe.com/express/oauth/authorize',
      tokenUri: 'https://connect.stripe.com/oauth/token'
    },
 }