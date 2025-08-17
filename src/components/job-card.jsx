import { useUser } from "@clerk/clerk-react";
import { CardTitle } from "./ui/card";

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved=()=>{},
}) => {

    const {user} = useUser()
  return <Card>
    <CardTitle>{job.title}</CardTitle>
    
  </Card>
};

export default JobCard;