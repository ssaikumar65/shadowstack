# Shadow Stack

Shadow Stack is a web application that analyzes a website's publicly available signals to estimate the technologies behind it. Enter a domain and it generates a concise overview of the site's framework, hosting platform, rendering strategy, security headers, and other implementation details.

## Features

* Analyze any public website by domain
* Detect frameworks, platforms, and rendering patterns
* Inspect HTTP headers and security configuration
* Identify caching, compression, and performance hints
* Cache scan results with Redis
* Generate an overall architecture score

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* Upstash Redis
* Axios
* Cheerio
* Playwright
* Zod

## Getting Started

Install dependencies:

```bash
npm install
```

Configure the required environment variables:

```bash
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` and scan a domain.

## Scripts

```bash
npm run dev     # Start the development server
npm run build   # Build for production
npm run start   # Run the production build
npm run lint    # Run ESLint
```

## Notes

Shadow Stack relies on publicly observable data and heuristic detection. The reported technologies are best viewed as informed estimates rather than definitive results.
