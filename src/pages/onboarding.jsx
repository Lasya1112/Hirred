import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from 'react-spinners'

const Onboarding = () => {
  const {user, isLoaded} = useUser();
  const navigate = useNavigate();

  const handleRoleSelection=async(role)=>{
    await user
    .update({
      unsafeMetadata: {role},
    })
    .then(()=>{
      navigate(role==="Recruiter" ? "/post-job" : "/jobs");
    })
    .catch((err)=>{
      console.error("Error updating role:",err);
    });
  };

  useEffect(()=>{
    if (user?.unsafeMetadata?.role){
      navigate(
        user?.unsafeMetadata?.role==="Recruiter" ? "/post-job" : "/jobs"
      );
    }
  },[user]);

  if(!isLoaded){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>;
  }

  return (
    // <div className="flex flex-col items-center justify-center mt-30">
    //   <h1 className="gradient-title font-extrabold text-6xl sm:text-8xl tracking-tighter">
    //     You are a ..
    //   </h1>
    // </div>

    <div className="flex flex-col items-center justify-center mt-30">
      <h1 className="bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-clip-text text-transparent font-extrabold text-6xl sm:text-7xl tracking-tighter font-serif">
        You are a ..
      </h1>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button variant='blue' className='h-36 text-2xl' onClick={()=>handleRoleSelection("Candidate")}> 
          Candidate
        </Button>
        <Button variant='destructive' className='h-36 text-2xl'onClick={()=>handleRoleSelection("Recruiter")}> 
          Recruiter
        </Button>
      </div>


    </div>

  );
};

export default Onboarding;