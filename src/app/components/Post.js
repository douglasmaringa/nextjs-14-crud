import React from "react";
import {Card, CardBody} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-hot-toast';

export default function Post({onOpen,selected,setSelected,data,reload,setReload}) {
  const edit = () => {
    setSelected(data);
    onOpen();
  }

  const remove = async () => {
    const formData = {
      id: data._id
    }
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Specify that you're sending JSON data
        },
        body: JSON.stringify(formData), // Convert the JavaScript object to JSON
      });

      // Handle response if necessary
      const data = await response.json();
      if(data.status === 200){
      toast.success('User deleted');
      }else{
      toast.error('User not deleted');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('User not deleted');
    }
    setReload(!reload);
  }

  return (
    <Card className="flex flex-row justify-between">
      <CardBody className="w-10/12">
        <h3 className="font-semibold">{data.name}</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.{data.email}</p>
      </CardBody>
      <CardBody className="flex items-center flex-row w-2/12 space-x-4">
         <CiEdit onClick={()=>{edit()}} className="text-3xl hover:text-blue-500 cursor-pointer"/>
         <MdDeleteForever onClick={()=>{remove()}} className="text-3xl hover:text-red-500 cursor-pointer"/>
      </CardBody>
    </Card>
  );
}
