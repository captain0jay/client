"use client"
import React , { useEffect, useState } from 'react'
import { Drawer } from 'vaul';
import { Sidebar } from '@/components/ui/sidebar'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"

export default function Popup() {
    const [price, setPrice] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description,setDescription] = useState<string>('');
   
    const sendProduct = async function(){
        const github_id = localStorage.getItem("github_id")
        const as = localStorage.getItem("as")
        const headers = new Headers();
        headers.append("name", String(name));
        headers.append("price", price);
        headers.append("github_id", String(github_id));
        headers.append("description", String(description));
        headers.append("as", String(as));
        await fetch("http://localhost:4000/add",{
        method:"GET",
        headers: headers,
        }).then((response)=>{
            console.log(response)
            return response.json();
        }).then((data)=>{
            console.log(data);
            return data;
        })
    }
    

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild className='inline-block'>
      <Button>Add</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="">
              <ScrollArea className="h-60 rounded-md border">
                <Card>
                <div className='grid grid-cols-16 gap-2 p-2'>
                <CardTitle>Price</CardTitle>
                <Input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product price..."
                    className='col-span-5' id="url" />
                  <CardTitle>Name</CardTitle>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name goes here."
                    className='col-span-5' id="name" />

                <CardTitle>Description</CardTitle>

               <Textarea value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='col-span-5' id="description" placeholder="Type your message here." />
                    <Button onClick={sendProduct} className='col-span-1 mt-4'>Done</Button>
                </div>
                </Card>
              </ScrollArea>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}