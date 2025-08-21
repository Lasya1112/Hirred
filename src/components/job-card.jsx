import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, MapPinIcon, Trash, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { deleteJobs, saveJob } from "@/api/apiJobs";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobAction=()=>{},
}) => {
    const [saved, setSaved] = useState(savedInit);
    const {user} = useUser(); 

    const {
        fn: fnSavedJobs,
        data: savedJob,
        loading: loadingSavedJobs,
    } = useFetch(saveJob, {
        alreadySaved : saved,
    });

    const handleSaveJobs = async() => {
        await fnSavedJobs({
            user_id:user.id,
            job_id:job.id,
        });
        onJobAction();
    };

    const {
        fn: fnDeleteJob,
        loading: loadingDeleteJob,
    } = useFetch(deleteJobs, {
        job_id: job.id,
    });

    const handleDeleteJobs = async() => {
        await fnDeleteJob();
        onJobAction();
    };

    useEffect(()=>{
        if(savedJob!==undefined) setSaved(savedJob?.length>0);
    },[savedJob]);


  return (
  <Card className="flex flex-col">
    {loadingDeleteJob && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
    )}
    <CardHeader>
        <CardTitle className="flex justify-between font-bold">
            {job.title}

            {isMyJob && (
                <Trash2Icon 
                fill="red" 
                size={18} 
                className="text-red-300 cursor-pointer"
                onClick={handleDeleteJobs}
                />
            )}
        </CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
            {job.company && <img src={job.company.logo_url} className="h-6" />}
            <div className="flex gap-2 items-center" >
                <MapPinIcon size={15} /> {job.location}
            </div>
        </div>
        <hr />
        {job.description.substring(0,job.description.indexOf("."))}
    </CardContent>
    <CardFooter className={"flex gap-2"}>
        <Link to={`/jobs/${job.id}`} className="flex-1">
           <Button variant="secondary" className="w-full cursor-pointer">
             More Details
           </Button>
        </Link>

        {!isMyJob && (
            <Button
              variant="outline"
              className="w-15 cursor-pointer"
              onClick={handleSaveJobs}
              disable={loadingSavedJobs}
            >
                {saved ? (
                    <Heart size={20} stroke="red" fill="red" />
                ) : (
                    <Heart size={20} />
            )}
            </Button>
        )}
    </CardFooter>
  </Card>
  );
};

export default JobCard;