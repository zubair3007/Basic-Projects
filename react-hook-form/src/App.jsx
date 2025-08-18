import React from 'react'
import {useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').nonempty('Name is Required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  message:z
      .string()
      .min(10, 'Message must be at least 10 character')
      .max(400,'Message cannot exceed 400 characters' )
      .nonempty('Message is Required'),
});

const App = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  }  = useForm({
    resolver:zodResolver(formSchema),
    defaultValues:{
      name:'Enter your name',
      email: 'Enter your Email ',
      message:'This is the React Hook Form'
    },
   });

   const onSubmit = async(data)=>{
    await new Promise((resolve)=>setTimeout(resolve,1000));
    console.log('From Data', data);
    reset();

   };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Contact Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name Field */}

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
          <input
            {...register("name")} // Register input with Zod schema
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled={isSubmitting} // Disable during submission
          />
          {errors.name && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Message
          </label>
          <textarea
            {...register("message")}
            placeholder="Enter your message"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              height: "100px",
            }}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p style={{ color: "red", marginTop: "5px" }}>
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: isSubmitting ? "#ccc" : "#4CAF50",
            color: "white",
            padding: "10px",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App