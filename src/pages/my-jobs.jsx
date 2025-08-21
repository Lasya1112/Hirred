import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {

  const { user, isLoaded } = useUser();

  if(!isLoaded){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>;
  }

  return (
    <div>
      <h1 className="bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 bg-clip-text text-transparent font-extrabold text-6xl sm:text-7xl tracking-tighter font-serif text-center pb-8">

        {user?.unsafeMetadata?.role === "Candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>

      {user?.unsafeMetadata?.role === "Candidate"? (
        <CreatedApplications/>
      ) : (
        <CreatedJobs/>
      )}
    </div>
  );
};

export default MyJobs;