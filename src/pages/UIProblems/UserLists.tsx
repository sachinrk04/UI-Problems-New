import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserLists = () => {
  const [users, setUsers] = useState([]);
  const [storeUsers, setStoreUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setStoreUsers(data);
    } catch (error) {
      console.log("error--->", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = useMemo(() => {
    return users.filter((user: any) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const removeUser = (userId: any) => {
    setUsers((prev) => prev.filter((user: any) => user.id !== userId));
  };

  const restoreUsers = () => {
    setUsers(storeUsers);
  };

  console.log("users--->", users);
  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-[30vw]">
          <Input
            className="rounded-sm h-9 w-full"
            placeholder="Search by name..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-[30vw] border rounded-sm">
          {filterUsers.length > 0 ? (
            filterUsers.map((user: any, index: number) => (
              <div
                key={user.id}
                className={`px-2 py-1 flex justify-between ${
                  users.length - 1 !== index && "border-b"
                }`}
              >
                <span>{user.name}</span>
                <div
                  className="rounded-full border border-red-500 w-5 h-5 flex justify-center items-center text-red-500 cursor-pointer"
                  onClick={() => removeUser(user.id)}
                >
                  <X className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-1 text-gray-500 flex justify-center items-center h-[25vh]">
              No data found
            </div>
          )}
        </div>
        {filterUsers.length !== storeUsers.length && (
          <div className="w-[30vw] flex justify-center">
            <Button onClick={() => restoreUsers()} className="h-9 rounded-sm">
              Re-store User
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLists;
