# Carnatic 22 Shruti Explorer

An interactive educational tool for learning the 22 shrutis of Carnatic classical music.

## Features

- **12 Swaras Tab**: Play and explore the standard 12 swarasthanas with traditional Sanskrit names
- **22 Shrutis Tab**: Explore all 22 microtonal positions
- **Theory & Formulas Tab**: Learn the mathematical foundations
- **Further Reading Tab**: References and sources

## Quick Start

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or higher).

### Installation

1. Open a terminal and navigate to this folder:
   ```bash
   cd carnatic-music-22-shrutis
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` folder. You can preview it with:

```bash
npm run preview
```

## Usage Tips

- Click any swara button to hear its frequency
- Use the slider to adjust the base Shadjam frequency
- Filter the 22 shrutis by swara family (S, R, G, M, P, D, N)
- Shrutis marked with ✦ correspond to the standard 12-note system

## References

- [22shruti.com](https://22shruti.com) - Dr. Vidyadhar Oke's research
- [Wikipedia: Shruti (music)](https://en.wikipedia.org/wiki/Shruti_(music))
- [IAS Resonance: The Notion of Twenty-Two Shrutis](https://www.ias.ac.in/article/fulltext/reso/020/06/0515-0531)

## License

This is an educational tool. Feel free to use and modify for teaching purposes.
