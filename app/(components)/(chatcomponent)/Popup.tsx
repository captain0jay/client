"use client"
import React, {useEffect,useState} from 'react'
import { Drawer } from 'vaul';
import { Sidebar } from '@/components/ui/sidebar'
import { ScrollArea } from "@/components/ui/scroll-area"
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Popup() {
    const [adds, setAdds] = useState([]);
    useEffect(()=>{
        const getdata= async function(){
          const github_id = localStorage.getItem("github_id")
          const headers = new Headers();
              headers.append("github_id", String(github_id));
          const response = await fetch("http://localhost:4000/getadds",{
          method:"GET",
          headers: headers,
          }).then((response)=>{
              console.log(response)
              return response.json();
          }).then((data)=>{
              console.log(data);
              return data;
          })
          setAdds(response)
        }
        getdata();
      },[])

      const AddProduct = async function(product_id:any){
        const current_chat = localStorage.getItem("current_chat");
        const headers = new Headers();
              headers.append("self", String(current_chat));
              headers.append("to", String(current_chat));
              headers.append("product_id", String(product_id));
          const response = await fetch("http://localhost:4000/updatecomm",{
          method:"GET",
          headers: headers,
          }).then((response)=>{
              console.log(response)
              return response.json();
          }).then((data)=>{
              console.log(data);
              return data;
          })
          console.log(response)
      }
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild className='inline-block'>
        <Button>Product+</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="">
              <ScrollArea className="h-60 rounded-md border p-2">
              {adds.map(element => {//!this.state.loading && 
                return(
                <Card>
                <CardHeader className="grid grid-cols-11 items-start gap-4 space-y-0">
                <div className='mt-4 col-span-1'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>...</AvatarFallback>
                </Avatar>
                </div>
                <div className="space-y-1 col-span-9 mt-4">
                    <CardTitle>{element.name}</CardTitle>
                    <CardDescription>
                    {element.description}
                    </CardDescription>
                </div>
                <Button onClick={() => AddProduct(`${element.product_id}`)} className='col-span-1'>Add</Button>
                </CardHeader>
                
                </Card>)
            })}
              </ScrollArea>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}