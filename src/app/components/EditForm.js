'use client'
import React,{useEffect,useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from "@nextui-org/react";
import { toast } from 'react-hot-toast';

export default function EditForm({isOpen, onOpen, onOpenChange,selected,setSelected,reload,setReload}) {
  console.log(selected)

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        password: ""
      });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      // Update formData when selected data changes
      setFormData({
        id: selected?._id || "",
        name: selected?.name || "",
        email: selected?.email || "",
        password: selected?.password || ""
      });
    }, [selected]);

      const validateForm = () => {
        const errors = {};
    
        // Validate name
        if (!formData.name || formData.name.length < 3 || formData.name.length > 255) {
          errors.name = "Name must be between 3 and 255 characters.";
        }
    
        // Validate email
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
          errors.email = "Invalid email address.";
        }
    
        // Validate password
        if (!formData.password || formData.password.length < 3) {
          errors.password = "Password must be at least 3 characters.";
        }
    
        return errors;
      };
    
      const submit = async (e,onClose) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
      
        // Validate the form
        const errors = validateForm();
      
        if (Object.keys(errors).length === 0) {
          // If no errors, submit the form or perform other actions
          //console.log("Form is valid. Submitting:", formData);
      
          try {
            const response = await fetch('/api/users', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json', // Specify that you're sending JSON data
              },
              body: JSON.stringify(formData), // Convert the JavaScript object to JSON
            });
      
            // Handle response if necessary
            const data = await response.json();
            if(data.status === 200){
            toast.success('User updated');
            }else{
            toast.error('User not created');
            }
          } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('User not created');
          }
        } else {
          // If there are errors, display them
          console.error("Form validation errors:", errors);
          setErrors(errors);
        }
        setLoading(false);
        onClose()
      };
          
    
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
              <ModalBody>
              <form onSubmit={(e) => submit(e, onClose)}>
                <Input
                  label="Name"
                  className="mb-3"
                  name="name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                />
                <Input
                  label="Email"
                  className="mb-3"
                  name="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                />
                <Input
                  label="Password"
                  className="mb-3"
                  name="password"
                  value={formData.password}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                />
                <Button disabled={loading} color="primary" type="submit">
                    {
                        loading ? "loading...":"update"
                    }
                </Button>
                {Object.keys(errors).length > 0 && (
                    <div className="mt-3 text-red-500">
                    {Object.values(errors).map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
                </form>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
