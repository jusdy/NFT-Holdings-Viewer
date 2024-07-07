# NFT Holdings Viewer

This is a simple web application that allows users to enter an Ethereum wallet address and view a list of Pudgy Penguins NFTs held by that address, including their metadata and attributes.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/nft-holdings-viewer.git
cd nft-holdings-viewer
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
OPENSEA_API_KEY=your-opensea-api-key
```

4. Run the development server:

```bash
npm run dev
```

### Usage

1. Open your browser and go to http://localhost:3000.
2. Enter an Ethereum wallet address and click "View NFTs".

### Technologies

- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Axios**: A promise-based HTTP client for making API requests.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **OpenSea API**: Used to fetch NFT data.
- **node-cache**: A simple caching module for reducing the number of API calls to third-party services.

### API Integration

The application uses the OpenSea API to fetch NFTs owned by the provided Ethereum wallet address. The API key is stored in an environment variable for security.

### Caching

To reduce the number of API calls made to the OpenSea API, `node-cache` is used. The cache stores the NFT data for a short duration (e.g., 5 minutes) to minimize repeated requests for the same data.

### Challenges

- **API Rate Limits**: Handling API rate limits from OpenSea was challenging. This was mitigated by implementing caching using `node-cache` to reduce the number of requests.
- **Error Handling**: Ensuring proper error handling and providing user feedback for failed API calls was crucial for a good user experience.
- **Metadata Fetching**: Fetching additional metadata for each NFT added complexity. This was managed by making asynchronous requests and aggregating the results.

### Assumptions

- The user provides a valid Ethereum wallet address.
- The OpenSea API key has sufficient permissions and is within rate limits.
- The metadata URL provided by the OpenSea API is accessible and returns valid metadata.

### Architecture Diagram

Here's an architecture diagram that includes a caching layer to reduce the number of API calls:

```plaintext
+-------------+        +----------------------+        +------------------+
|  User       |        | Next.js Server       |        | OpenSea API      |
|  Interface  | <----> | (API Route Handler)  | <----> |                  |
+-------------+        +----------------------+        +------------------+
     ^                           |                           ^
     |                           v                           |
Input Wallet              Fetch NFT Data                Fetch Metadata
  Address                  from OpenSea                  for each NFT
     |                           |                           |
     v                           v                           v
Check Cache <--------------------+---------------------------+
     |                           |
     v                           |
Display NFT                Cache NFT Data
Data to User                 for Future
                              Requests
```
