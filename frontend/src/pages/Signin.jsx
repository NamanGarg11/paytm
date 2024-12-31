import Button from "../components/Button";
import Heading from "../components/Heading";
import Password from "../components/password";
import Textbox from "../components/Textbox";

export default function Signin() {
  const [FirstName,setFirstName]=useState("");
  const [LastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  cosnt [password,setPassword]=useState("");
    return (
      <>
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">          
            <Heading heading={"Sign In to ur Account"}/>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <Textbox onchange={
                e=>{
                  setEmail(e.target.value);
                }
              }name={"Email Address"} type={"email"} />
              <Password onchange={
                e=>{
                  setPassword(e.target.value);
                }
              }/>
              <Button name={"Sign In"}/>
            </form>
  
          
          </div>
        </div>
      </>
    )
  }
  