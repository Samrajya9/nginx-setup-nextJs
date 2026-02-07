import type { findAllUsers } from "@/services/users.services";

type UserResponse = Awaited<ReturnType<typeof findAllUsers>>;

export function createUserResource() {
  let status: "pending" | "success" | "error" = "pending";
  let result: UserResponse | Error;

  let suspender = fetch("/api/users")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json() as Promise<UserResponse>;
    })
    .then(
      (data) => {
        status = "success";
        result = data;
      },
      (err) => {
        status = "error";
        result = err;
      },
    );

  return {
    read(): UserResponse {
      if (status === "pending") throw suspender;
      if (status === "error") throw result as Error;
      return result as UserResponse;
    },
  };
}
