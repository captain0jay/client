import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Sales from './(components)/Sales'
import Analysis from './(components)/Analysis'

export default function page() {
  return (
    <>
    <div className='p-2'>
        <div className='col-span-2'>
        <Tabs defaultValue="Transactions" className="">
            <TabsList className="grid w-full grid-cols-2 w-[400px]">
                <TabsTrigger value="Transactions">Transactions</TabsTrigger>
                <TabsTrigger value="Graphs">Graphs</TabsTrigger>
            </TabsList>
            <TabsContent value="Transactions">
            <div className='mt-2 ml-2 grid grid-cols-5 gap-4 p-2'>
                <div className='p-3 col-span-2'>
                    <Card className='p-4'>
                        <Sales/>
                    </Card>
                </div>
                <div className='col-span-3'>
                <div className='flex flex-col h-screen'>
                <Card>
                    <div className='flex flex-col h-[calc(95vh-4rem)] justify-center items-center'>
                    <Analysis/>
                    </div>
                </Card>
                </div>
                </div>
            </div>
            </TabsContent>
            <TabsContent value="Graphs">
                <Card>
                <CardHeader>
                    
                </CardHeader>
                <CardContent className="space-y-2">
                </CardContent>
                <CardFooter>
                    <Button>Save password</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            </Tabs>
        </div>
    </div>
    </>
  )
}
