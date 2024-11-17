import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventData } from "@/utils/schema";
import axios from "axios";

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EventData>({
    resolver: zodResolver(eventSchema),
  });

  // Menangani array email di field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "email",  // Menggunakan field yang sesuai
  });

  const onSubmit = async (data: EventData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description || "");
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    
    // Menambahkan email ke form data
    data.email.forEach((email) => formData.append("email", email));

    // Menambahkan gambar jika ada
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    try {
      const response = await axios.post("/api/admin/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        },
      });
      console.log("Event created successfully:", response.data);
    } catch (error) {
      console.log("Error creating event:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">Create Event</h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-medium">Event Name</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full mt-2 p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">Email Notifications</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-2">
              <input
                type="email"
                {...register(`email.${index}`)}  // Mendaftar field email yang benar
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Email ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append("")}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            Add Email
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
