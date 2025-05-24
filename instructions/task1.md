# Task 1: Creating a Stock Card with shadcn/ui

## Task Overview
You will create a simple StockCard component using shadcn/ui that displays:

- Stock Name: Company name (e.g., "Apple Inc.")
- Price: Current stock price
- Percentage Change: With color coding (green for positive, red for negative)
- Simple Graph: A mini trend indicator using emojis or simple bars
- Volume: Trading volume in a readable format


First, let's set up shadcn/ui in the project:
```
# Install shadcn/ui components we'll need
npx shadcn@latest add card
npx shadcn@latest add badge
```

We will be working with the following files:
```
src/
├── components/
│   └── StockCard.tsx
├── types/
│   └── stock.ts
├── data/
│   └── mockData.ts
```

