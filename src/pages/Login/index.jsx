import Input from "../../components/Input";

const Login = () => {
  console.log("Login");
  return (
    <div className="flex flex-col md:flex-row ">
      {/* Left Section */}
      <div className="md:w-1/2 p-[6.25rem]">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Input label="Email" required />
          </div>
          <div className="col-span-2">
            <Input label="Password" type="password" required />
          </div>

        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 md:ml-auto bg-gray-200 p-4">
        {/* Add content for the right section */}
        
        <h1 className="text-8xl font-bold pt-20"><i>HIRE 365</i></h1>
      </div>
    </div>
  );
};
export default Login;
