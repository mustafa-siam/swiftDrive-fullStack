
import { useForm,} from "react-hook-form";
import TitleOwner from "../../components/owner/TitleOwner";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const Addcar = () => {
  const {axios}=useAppContext()
    const [img,setimg]=useState(null)
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const [isLoading,setIsLoading]=useState(false);
  const onSubmit = async (data) => {
    if (!img) {
      toast.error("Car image is required");
      return; 
    }
    if(isLoading)return null;
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("image", img); 
      formData.append("carData", JSON.stringify(data));
      const res=await axios.post('/api/owner/add-car',formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      })
      if(res.data.success){
       toast.success(res.data.message)
       setimg(null)
       reset()
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
            setIsLoading(false)
    }
  }
  return (
    <div className="p-6 rounded-2xl mt-10 space-y-12">
     <TitleOwner title={"Add New Car"} subtitle={"Fill in details to list a new car for booking, including pricing, availability, and car specifications."}></TitleOwner>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2  gap-7 ml-7">
        <div>
          <label className="block font-medium mb-1">Brand</label>
          <input type="text" {...register("brand", { required: true })} className="input input-bordered w-full" placeholder="e.g. BMW, Mercedes, Audi..." />
          {errors.brand && <span className="text-red-500">Brand is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Model</label>
          <input type="text" {...register("model", { required: true })} className="input input-bordered w-full" placeholder="e.g. X5, E-Class, M4..." />
          {errors.model && <span className="text-red-500">Model is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Year</label>
          <input type="number" {...register("year", { required: true })} className="input input-bordered w-full" placeholder="2026" />
          {errors.year && <span className="text-red-500">year is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Daily Price</label>
          <input type="number" {...register("pricePerDay", { required: true })} className="input input-bordered w-full" placeholder="100" />
          {errors.pricePerDay && <span className="text-red-500">Price is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Seating Capacity</label>
          <input type="number" {...register("seating_capacity", { required: true })} className="input input-bordered w-full" placeholder="5" />
          {errors.seating_capacity && <span className="text-red-500">seating capacity is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Fuel Type</label>
          <select {...register("fuel_type", { required: true })} className="select select-bordered w-full">
            <option value="">Select fuel_type</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="LPG">LPG</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors.fuel_type && <span className="text-red-500">fuel type is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select {...register("category", { required: true })} className="select select-bordered w-full">
            <option value="">Select Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Luxury">Luxury </option>
            <option value="Hatchback">Hatchback</option>
          </select>
          {errors.category && <span className="text-red-500">Category is required</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Transmission</label>
          <input type="text" {...register("transmission", { required: true })} className="input input-bordered w-full" placeholder="Automatic" />
          {errors.transmission && <span className="text-red-500">transmission is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input type="text" {...register("location", { required: true })} className="input input-bordered w-full" placeholder="location" />
          {errors.location && <span className="text-red-500">location is required</span>}
        </div>
        <div>
  <label htmlFor="car-img" className="block font-medium mb-1">Upload Images</label>
  <input
    type="file"
    id="car-img"
    className="file-input file-input-secondary w-full"
    onChange={(e) => setimg(e.target.files[0])}
  />
  <img
    src={img ? URL.createObjectURL(img) : assets.upload_icon}
    alt="Preview"
    className="w-30 h-30 object-cover rounded-lg  m-2"
  />
</div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Details</label>
          <textarea {...register("details", { required: true })} className="textarea textarea-bordered w-full" placeholder="Glass details" />
          {errors.details && <span className="text-red-500">Details are required</span>}
        </div>
          <button type="submit" className="btn bg-primary text-white hover:bg-primary/50">
          {isLoading?"loading..." :"List Your Car"}           
          </button>
        
      </form>
    </div>
  );
};

export default Addcar;
