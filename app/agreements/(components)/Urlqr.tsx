"use client"
import React, {useEffect,useState} from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Urlqr() {
    const [chatproducturi, setChatproducturi] = useState<string>('');
    const [nochatproducturi, setNochatproducturi] = useState<string>('');
    useEffect(()=>{
        const getproducturi = async function(){
            const product_id = localStorage.getItem("product_id")
            const headers = new Headers();
                headers.append("product_id", String(product_id));
                const responset = await fetch("http://localhost:4000/getproductsuri",{
                    method:"GET",
                    headers: headers,
                    }).then((response)=>{
                        console.log(response)
                        return response.json();
                    }).then((data)=>{
                        console.log(data);
                        return data;
                    })
            setChatproducturi(responset[0].chatproducturi)
            setNochatproducturi(responset[0].nochatproducturi)
        }
        getproducturi()
    },[])
  return (
    <>
    <div className='p-2'>
    <Card className='mb-2'>
        <CardHeader>
            <CardTitle>Chat Url</CardTitle>
            <CardDescription>Share with users to have a chat conversation</CardDescription>
        </CardHeader>
        <CardFooter>
            <CardContent className='bg-gray-300 p-3 rounded-md'>
                <CardDescription>{nochatproducturi}</CardDescription>
            </CardContent>
        </CardFooter>
    </Card>
    <Card>
        <CardHeader>
            <CardTitle>Non-Chat Url</CardTitle>
            <CardDescription>Share with users to get direct payment and no chat</CardDescription>
        </CardHeader>
        <CardFooter>
            <CardContent className='bg-gray-300 p-3 rounded-md'>
                <CardDescription>{chatproducturi}</CardDescription>
            </CardContent>
        </CardFooter>
    </Card>
    </div>
    </>
  )
}
