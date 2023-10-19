"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import React, {useState,useEffect} from 'react'

export default function Chatnew() {
  const [status,setStatus]  = useState<string>('');
  const [agreement,setAgreement]  = useState<string>('');
  useEffect(()=>{
    const ast: string | null = localStorage.getItem("as")
    const agsent: string | null = localStorage.getItem("agsent")
    console.log(ast)
    if(agsent!==null){
      setAgreement(agsent)
    }
    if(ast !== null){
      setStatus(ast);
    }
  })
  const sendAgreement = async function(){
    const current_chat = localStorage.getItem("current_chat");
    const github_id = localStorage.getItem("github_id");
    const headers = new Headers();
          headers.append("current_chat", String(current_chat));
          headers.append("github_id", String(github_id));
    const response = await fetch("http://localhost:4000/updateclient",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.json();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      console.log(response);
  }
  return (
    <>
    <div className='static'>
      {agreement==="yes"?
      <div>Agreement has been sent to your email</div>:<div></div>
      }
      {status==="client"?
    <div className='absolute m-8 bottom-0'>
      <Button onClick={sendAgreement}>Send Agreement</Button>
    </div>:
    <div className='absolute m-8 bottom-0'>
      <Input/>
      <Button>Send</Button>
    </div>
    }
    </div>
    </>
  )
}
