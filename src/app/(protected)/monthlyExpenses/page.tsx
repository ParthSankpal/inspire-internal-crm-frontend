"use client";

import { useMemo, useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";


type Category =
    | "Rent"
    | "Salary"
    | "Bills"
    | "Marketing";


interface Expense {
    name: string;
    category: Category;
    amount: number;
}


const initialData: Expense[] = [

    // Rent
    { name: "Nagvekar", category: "Rent", amount: 60000 },
    { name: "Patil", category: "Rent", amount: 12000 },
    { name: "Modshinge", category: "Rent", amount: 10000 },
    { name: "Musle", category: "Rent", amount: 60000 },


    // Salary
    { name: "Prashant", category: "Salary", amount: 140000 },
    { name: "Heble", category: "Salary", amount: 50000 },
    { name: "Jay", category: "Salary", amount: 80000 },
    { name: "Parth", category: "Salary", amount: 50000 },

    { name: "Nadaf Sir", category: "Salary", amount: 15000 },
    { name: "Nadaf Ma'am", category: "Salary", amount: 15000 },
    { name: "Poddar", category: "Salary", amount: 15000 },
    { name: "Rohan", category: "Salary", amount: 15000 },
    { name: "Trupti", category: "Salary", amount: 15000 },
    { name: "Bhosle", category: "Salary", amount: 10000 },
    { name: "Pramod", category: "Salary", amount: 25000 },
    { name: "Snehal", category: "Salary", amount: 15000 },
    { name: "Georgina", category: "Salary", amount: 15000 },
    { name: "Varsha", category: "Salary", amount: 40000 },
    { name: "Hariom", category: "Salary", amount: 10000 },


    // Bills
    { name: "Light", category: "Bills", amount: 15000 },
    { name: "Water", category: "Bills", amount: 4000 },
    { name: "Maintenance", category: "Bills", amount: 5000 },
    { name: "Xerox", category: "Bills", amount: 5000 },


    // Marketing
    { name: "Marketing", category: "Marketing", amount: 50000 },
    { name: "Sales", category: "Marketing", amount: 0 },

];


export default function ExpensePage() {

    const [expenses, setExpenses] =
        useState(initialData);



    const categories: Category[] = [
        "Rent",
        "Salary",
        "Bills",
        "Marketing",
    ];



    const grandTotal =
        useMemo(() => {

            return expenses.reduce(
                (sum, e) => sum + e.amount,
                0
            );

        }, [expenses]);




    function updateAmount(
        index: number,
        amount: number
    ) {

        setExpenses(prev => {

            const copy = [...prev];

            copy[index] = {
                ...copy[index],
                amount
            };

            return copy;

        });

    }



    return (

        <div className="p-6 space-y-6">


            {/* TOP SUMMARY */}

            <Card>

                <CardContent className="
p-6 flex justify-between
items-center
">

                    <div>

                        <p className="text-muted-foreground">
                            Monthly Expense
                        </p>

                        <h1 className="text-3xl font-bold">

                            ₹ {grandTotal.toLocaleString()}

                        </h1>

                    </div>


                </CardContent>

            </Card>





            {/* 4 COLUMN GRID */}


            <div className="
grid gap-4
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
">


                {
                    categories.map(category => {


                        const items =
                            expenses
                                .map((item, index) => ({
                                    ...item,
                                    index
                                }))
                                .filter(
                                    e => e.category === category
                                );



                        const total =
                            items.reduce(
                                (a, b) => a + b.amount,
                                0
                            );



                        return (

                            <Card key={category}
                                className="h-fit"
                            >


                                <CardHeader>

                                    <CardTitle
                                        className="
flex justify-between
items-center
"
                                    >

                                        <span>
                                            {category}
                                        </span>


                                        <span className="text-sm">

                                            ₹ {total.toLocaleString()}

                                        </span>


                                    </CardTitle>

                                </CardHeader>



                                <CardContent>


                                    <Table>


                                        <TableBody>


                                            {
                                                items.map(item => (


                                                    <TableRow key={item.name}>


                                                        <TableCell
                                                            className="font-medium"
                                                        >

                                                            {item.name}

                                                        </TableCell>



                                                        <TableCell>


                                                            <Input

                                                                type="number"

                                                                className="
h-8
text-right
"

                                                                value={item.amount}

                                                                onChange={(e) =>
                                                                    updateAmount(
                                                                        item.index,
                                                                        Number(
                                                                            e.target.value
                                                                        )
                                                                    )
                                                                }

                                                            />


                                                        </TableCell>



                                                    </TableRow>


                                                ))

                                            }



                                        </TableBody>



                                        <TableFooter>


                                            <TableRow>


                                                <TableCell>

                                                    Total

                                                </TableCell>



                                                <TableCell
                                                    className="text-right"
                                                >

                                                    ₹ {total.toLocaleString()}

                                                </TableCell>


                                            </TableRow>


                                        </TableFooter>



                                    </Table>


                                </CardContent>


                            </Card>


                        )

                    })

                }


            </div>


        </div>

    )

}