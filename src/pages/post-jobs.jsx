import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { State } from "country-state-city";
import { getCompanies } from "@/api/apiCompanies";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";

const schema = z.object({
  title:z.string().min(1, { message: "Title is required"}),
  description: z.string().min(1, { message: "Description is required"}),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJobs = () => {

  const {isLoaded, user} = useUser();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const{ fn: fnCompanies, data: companies, loading: loadingCompanies} = useFetch(getCompanies);

  useEffect(()=>{
    if(isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(()=>{
    if(isLoaded) fnCompanies();
  }, [isLoaded]);

  const{
    fn: fnCreateJob,
    data: dataCreateJob,
    error: errorCreateJob,
    loading: loadingCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(()=>{
    if(dataCreateJob?.length > 0) navigate("/jobs");
  },[loadingCreateJob]);

  if(!isLoaded || loadingCompanies){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>;
  }

  if(user?.unsafeMetadata?.role !== "Recruiter") {
    return <Navigate to="/jobs"/>;
  }

  return (
    <div flex flex-col>
      <h1 className="bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 text-transparent bg-clip-text text-5xl font-bold sm:text-6xl tracking-tighter font-serif text-center  pb-8">
        Post a Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
        <Input placeholder="Job Title" {...register("title")}/>
        {errors.title && <p className="text-red-600">{error.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}

        <div className="flex gap-4 justify-between">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select 
              value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({name}) =>{
                      return (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select 
               value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger >
                  <SelectValue placeholder="Filter by Company">
                    {field.value?companies?.find((com) => com.id === Number(field.value))
                    ?.name
                    :"Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {(companies || []).map(({ name, id }) => (
                      <SelectItem key={id} value={id.toString()}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

            )}
          />
          
            {/* Add Company Drawer */}
            <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-600">{errors.location.message}</p>
        )}
        {errors.location && (
          <p className="text-red-600">{errors.company_id.message}</p>
        )}

        <div>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                data-color-mode="dark"
                height={250}
              />
            )}
          />
        </div>


        {errors.requirements && (
          <p className="text-red-600">{errors.requirements.message}</p>
        )}

        {errorCreateJob?.message && (
          <p className="text-red-600">{errorCreateJob?.message}</p>
        )}
        {loadingCreateJob && <BarLoader width={"100%"} color="#36d7b7"/>}

        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Submit
        </Button>

      </form>
    </div>
  );
};

export default PostJobs;