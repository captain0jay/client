import React, { useEffect , useState} from 'react'
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

export default function Agreement() {
    const [adds, setAdds] = useState([]);
  useEffect(()=>{
    const getdata= async function(){
      const github_id = localStorage.getItem("github_id")
      const headers = new Headers();
          headers.append("github_id", String(github_id));
          const responset = await fetch("http://localhost:4000/getadds",{
            method:"GET",
            headers: headers,
            }).then((response)=>{
                console.log(response)
                return response.json();
            }).then((data)=>{
                console.log(data);
                return data;
            })
      setAdds(responset)
    }
    getdata();
  },[])

  const setProductid = (id: string) =>{
    localStorage.setItem("product_id",id)
  }
  const setchat = async function(current_chat:any){
    localStorage.setItem("current_chat",current_chat)
  }
  return (
    <>
    <Tabs defaultValue="Product" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Product">Product/Service</TabsTrigger>
        <TabsTrigger value="Depricated">Depricated</TabsTrigger>
      </TabsList>
      <TabsContent value="Product">

      {adds.map(element => {//!this.state.loading && 
        return(
        <Card className='mt-2'>
        <CardHeader className="grid grid-cols-[1fr_300px] items-start gap-4 space-y-0">
          <div className='mt-4'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          </div>
          <div className="space-y-1">
            <CardTitle onClick={() => setProductid(`${element.product_id}`)}>{element.name}</CardTitle>
            <CardDescription>
              {element.description}
            </CardDescription>
            <p>{element.price}</p>
        </div>
        </CardHeader>
        </Card>)
      })}
      </TabsContent>
      <TabsContent value="Depricated">
      <Card>
        <CardHeader className="grid grid-cols-[1fr_300px] items-start gap-4 space-y-0">
          <div className='mt-4'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          </div>
          <div className="space-y-1">
            <CardTitle>Completed</CardTitle>
            <CardDescription>
              Beautifully designed components built with Radix UI and Tailwind
              CSS.
            </CardDescription>
        </div>
        </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
    </>
  )
}
