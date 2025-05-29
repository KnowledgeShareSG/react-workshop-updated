

## WatchlistTable component

```tsx
  return (
    <Table>
      <TableCaption>A list of your recent watchlist.</TableCaption>
      <TableHeader>
        {/* Tablet header */}
        <TableRow className="lg:hidden hidden md:table-row">
          {editMode && (
          <TableHead className="text-center w-[40px] p-0">
              <input
                checked={allSelected}
                type="checkbox"
                className="form-checkbox"
                onChange={() => toggleAll()}
              />
            </TableHead>
          )}
          <TableHead colSpan={3} className="text-center text-gray-500">Name / Exchange / Type</TableHead>
          <TableHead colSpan={2} className="text-center text-gray-500">Price / Change(%)</TableHead>
          <TableHead className="text-center text-gray-500">Performance</TableHead>
        </TableRow>

        {/* Desktop: original header */}
        <TableRow className="h-24 xl:h-12 cursor-pointer hidden lg:table-row">
          <TableHead className={clsx('w-[40px] p-0', !editMode && 'hidden')}>
            {editMode && (
              <div className="flex items-center justify-center h-full">
                <input
                  checked={allSelected}
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => {
                    toggleAll();
                  }}
                />
              </div>
            )}
          </TableHead>
          <TableHead className="text-left xl:table-cell text-gray-500">Name</TableHead>
          <TableHead className="text-left xl:table-cell text-gray-500">Exchange</TableHead>
          <TableHead className="text-left xl:table-cell text-gray-500">Type</TableHead>
          <TableHead className="text-left xl:table-cell text-gray-500">Price</TableHead>
          <TableHead className="text-left xl:table-cell text-gray-500">Change(%)</TableHead>
          <TableHead className="text-left hidden lg:table-cell text-gray-500">
            Performance
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data &&
          data.map((data) => (
            <>
              {/* Mobile row with 3 columns */}
              <TableRow className="md:hidden" key={data.symbol + "-mobile"}>
                {editMode && (
                  <TableCell className="w-[40px] p-0">
                    <input
                      checked={listOfSymbolToggles[data.symbol]}
                      type="checkbox"
                      className="form-checkbox"
                      onChange={() => {
                        toggleOne(
                          data.symbol,
                          !listOfSymbolToggles[data.symbol],
                        );
                      }}
                    />
                  </TableCell>
                )}
                <TableCell 
                  className="text-left truncate w-24 max-w-[40vw] cursor-pointer p-4 md:p-2"
                  onClick={() =>
                    navigate({
                      to: '/details/$symbol',
                      params: { symbol: data.symbol },
                    })
                  }
                >
                  {data.shortname}
                </TableCell>
                <TableCell className="p-4 md:p-2">
                  <div className="whitespace-nowrap">${data.currentPrice?.toFixed(2)}</div>
                  <div className={clsx(
                    'whitespace-nowrap',
                    data.changeInPercent >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {`${data.changeInPercent >= 0 ? '+' : ''}${data.changeInPercent}%`}
                  </div>
                </TableCell>
                <TableCell className="w-24 p-4 md:p-2 align-middle">
                  <div className="w-20 h-8 flex items-center justify-center">
                    <MarketChartSmall
                      symbol={data.symbol}
                      color={data.changeInPercent >= 0 ? 'green' : 'red'}
                    />
                  </div>
                </TableCell>
              </TableRow>

              {/* Tablet row */}
              <TableRow className="lg:hidden hidden md:table-row" key={data.symbol + "-tablet"}>
                {editMode && (
                  <TableCell className="w-[40px] p-0">
                    <input
                      checked={listOfSymbolToggles[data.symbol]}
                      type="checkbox"
                      className="form-checkbox"
                      onChange={() => {
                        toggleOne(
                          data.symbol,
                          !listOfSymbolToggles[data.symbol],
                        );
                      }}
                    />
                  </TableCell>
                )}
                <TableCell 
                  className="min-w-0 flex-1 truncate cursor-pointer p-4"
                  onClick={() =>
                    navigate({
                      to: '/details/$symbol',
                      params: { symbol: data.symbol },
                    })
                  }
                >
                  {data.shortname}
                </TableCell>
                <TableCell className="min-w-0 flex-1 truncate p-4">{data.exchange}</TableCell>
                <TableCell className="min-w-0 p-4">{data.quoteType}</TableCell>
                <TableCell className="whitespace-nowrap p-4">${data.currentPrice?.toFixed(2)}</TableCell>
                <TableCell className={clsx(
                  'whitespace-nowrap p-4',
                  data.changeInPercent >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {`${data.changeInPercent >= 0 ? '+' : ''}${data.changeInPercent}%`}
                </TableCell>
                <TableCell className="w-12 p-4 align-middle">
                  <div className="scale-75 origin-center">
                    <MarketChartSmall
                      symbol={data.symbol}
                      color={data.changeInPercent >= 0 ? 'green' : 'red'}
                    />
                  </div>
                </TableCell>
              </TableRow>

              {/* Desktop row (original) */}
              <TableRow className="h-24 xl:h-12 hidden lg:table-row" key={data.symbol}>
                <TableCell
                  className={clsx('w-[40px] p-0', !editMode && 'hidden')}
                >
                  {editMode && (
                    <div className="flex items-center justify-center h-full">
                      <input
                        checked={listOfSymbolToggles[data.symbol]}
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() => {
                          toggleOne(
                            data.symbol,
                            !listOfSymbolToggles[data.symbol],
                          );
                        }}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell
                  className="text-left lg:table-cell cursor-pointer"
                  onClick={() =>
                    navigate({
                      to: '/details/$symbol',
                      params: { symbol: data.symbol },
                    })
                  }
                >
                  {data.shortname}
                </TableCell>
                <TableCell className="text-left lg:table-cell">
                  {data.exchange}
                </TableCell>
                <TableCell className="text-left hidden lg:table-cell">
                  {data.quoteType}
                </TableCell>
                <TableCell className="text-left lg:table-cell">
                  ${data.currentPrice?.toFixed(2)}
                </TableCell>
                <TableCell
                  className={clsx(
                    'text-left lg:table-cell ',
                    data.changeInPercent >= 0 ? 'text-green-600' : 'text-red-600',
                  )}
                >
                  {`${data.changeInPercent >= 0 ? '+' : ''}${data.changeInPercent}%`}
                </TableCell>
                <TableCell className="text-left hidden lg:table-cell max-w-4">
                  <MarketChartSmall
                    symbol={data.symbol}
                    color={
                      data.changeInPercent >= 0
                        ? 'green'
                        : 'red'
                    }
                  />
                </TableCell>
              </TableRow>
            </>
          ))}
      </TableBody>
    </Table>
  );

```
