import React from "react";

interface ClientData {
  name: string;
  email: string;
  phone: string;
}

interface ClientUIProps {
  data: ClientData;
}

const ClientUI: React.FC<ClientUIProps> = ({ data }) => {
  const { name, email, phone } = data;

  return (
    <>
      <div className="w-full my-6  ">
        <p className="text-lg font-bold mb-2">Client Information</p>
        <div className=" grid lg:grid-cols-3   sm:grid-cols-1 bg-[--brand-pastel-color] p-4 shadow-md rounded-lg border border-[--brand-disabled-white-color]" >
          <div className="py-2">
            <h5 className="font-bold text-md">Name</h5>
            <p>{name}</p>
          </div>

          <div className="py-2">
            <h5 className="font-bold text-md">Email</h5>
            <p>{email}</p>
          </div>

          <div className="py-2 lg:ml-12">
            <h5 className="font-bold text-md">Phone</h5>
            <p>{phone}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientUI;
