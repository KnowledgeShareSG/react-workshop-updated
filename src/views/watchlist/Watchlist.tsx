import {Button} from "@/components/ui/button.tsx";
import {SquarePen} from "lucide-react";
import {StockSearch} from "@/views/stock-search/StockSearch.tsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const Watchlist = () => {
    return (
        <div className="w-full px-5 mt-15">
            <div className="flex flex-wrap justify-between items-center gap-y-4">
                <h1 className="w-full text-center sm:w-auto sm:text-left text-2xl font-bold text-gray-800">
                    Watchlist
                </h1>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <div className="w-full sm:w-[280px]">
                        <StockSearch />
                    </div>
                    <Button
                        icon={<SquarePen className="size-4" />}
                        className="sm:w-auto whitespace-nowrap"
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className="mt-5 bg-white px-0 py-6 overflow-x-auto">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left md:table-cell">Invoice</TableHead>
                            <TableHead className="text-left hidden md:table-cell">Status</TableHead>
                            <TableHead className="text-left md:table-cell">Method</TableHead>
                            <TableHead className="text-left md:table-cell">Date</TableHead>
                            <TableHead className="text-left hidden md:table-cell">Amount</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell className="text-left md:table-cell">INV001</TableCell>
                            <TableCell className="text-left hidden md:table-cell">Paid</TableCell>
                            <TableCell className="text-left md:table-cell">Credit Card</TableCell>
                            <TableCell className="text-left md:table-cell">May 21, 2025</TableCell>
                            <TableCell className="text-left hidden md:table-cell">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}