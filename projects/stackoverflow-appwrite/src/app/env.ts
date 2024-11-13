// Environment configuration for Appwrite integration
const env = {
    appwrite: {
        // The Appwrite server endpoint (URL) from the environment variable
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        
        // The unique Appwrite project ID from the environment variable
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        
        // The API key for accessing Appwrite's services (also from the environment)
        apikey: String(process.env.APPWRITE_API_KEY)
    }
}

// Export the configuration object for use in other parts of the application
export default env
