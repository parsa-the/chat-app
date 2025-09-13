import React from "react";
import { Usersa } from "../../../lib/users";
import Image from "next/image";
import Link from "next/link";
const Users = () => {
  return (
    <div>
      {Usersa.map((User) => {
        return (
          <Link key={User.id} href={`/chat/${User.id}`}>
          <div className="flex flex-row mt-2 bg-gray-100 rounded-xl m-2 shadow border border-gray-200 space-x-4">
            <Image src={User.profile}
              height={20}
              width={20}
              alt="User Profile"
              className="rounded-full"
            ></Image>
<div className="flex flex-col mt-2">
            <p>{User.name}</p>
            <p>{User.lastMessage}</p>
            </div>
          </div></Link>
        );
      })}
    </div>
  );
};

export default Users;
