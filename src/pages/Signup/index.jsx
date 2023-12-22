import Input from "../../components/Input";

const SignUp = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Input label="Email" required />
          </div>
          <div className="col-span-2">
            <Input label="Password" type="password" required />
          </div>
          <div className="">
            <Input label="Name" required />
          </div>
          <div className="">
            <Input label="Last Name" required />
          </div>
          <div className="">
            <Input label="Moile Number" required />
          </div>
          <div className="">
            <Input label="Telephone Number" />
          </div>
          <div className="">
            <Input label="Country" required />
          </div>
          <div className="">
            <Input label="State" required />
          </div>
          <div className="">
            <Input label="City" required />
          </div>
          <div className="">
            <Input label="Street" />
          </div>
          <div className="col-span-2">
            <Input label="Full Address" />
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

export default SignUp;
