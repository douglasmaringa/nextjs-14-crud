'use client'
import {useEffect,useState} from "react";
import CreateForm from "./components/CreateForm"
import Header from "./components/Header"
import {useDisclosure,Button,Input} from "@nextui-org/react";
import Post from "./components/Post";
import EditForm from "./components/EditForm";

function page() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2} = useDisclosure();
  const [selected,setSelected]=useState(null);
  const [data,setData]=useState([]);
  const [reload,setReload]=useState(false);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    getData()
  }, [reload]);

  async function getData() {
    setLoading(true)
    const res = await fetch('api/users')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    const users = await res.json()
    setData(users?.data)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.log('Failed to fetch data')
    }
    setLoading(false)
  }

  //console.log(selected)

  return (
    <div>
      <Header/>
      <div className="flex items-center justify-center mt-20">
         <Button className="bg-blue-500 text-white text-lg font-semibold" onPress={onOpen}>Create User</Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 px-10 mt-10 mb-10">
         <h1 className="ml-1 text-xl font-bold">Posts</h1>
         {
          data?.length === 0 && loading === false && <h1 className="text-center">No posts</h1>
         }
         {
            loading && <h1 className="text-center">Loading...</h1>
         }
         {
            data?.map((user,index)=>{
              return(
                <Post data={user} key={index} onOpen={onOpen2} selected={selected} setSelected={setSelected} reload={reload} setReload={setReload}/>
              )
            })
         }
      </div>
      <CreateForm isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} reload={reload} setReload={setReload}/>
      <EditForm isOpen={isOpen2} onOpen={onOpen2} onOpenChange={onOpenChange2} selected={selected} setSelected={setSelected} reload={reload} setReload={setReload}/>
    </div>
  )
}

export default page