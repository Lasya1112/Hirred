import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {  

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const {isLoaded} = useUser();

  const{fn: fnJobs,data: jobs,loading: loadingJobs,} = useFetch(getJobs,{location, company_id, searchQuery});

  useEffect(()=>{
    if(isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if(!isLoaded){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>;
  }

  return (
  <div>
    <h1 className="bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-clip-text text-transparent font-extrabold text-6xl sm:text-7xl tracking-tighter font-serif text-center pb-8">
      Latest Jobs
    </h1>

    {/* Add filters here */}

    {loadingJobs && (
      <BarLoader className="mt-4" width={"100%"} color= "#36d7b7"/>
    )}
    
    {loadingJobs === false && (
      <div>
        {jobs?.length ?(
          jobs.map((job)=>{
            return <JobCard key={job.id} job={job}/>;
          })
        ): (
          <div>No Jobs Found </div>
        )}
      </div>
    )}
  </div>
  );
};

export default JobListing;