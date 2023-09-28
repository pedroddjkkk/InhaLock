"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

const Form = ({
  children,
  action,
  onError,
}: {
  children: React.ReactNode;
  action: string;
  onError?: (error: any) => void;
}) => {
  const router = useRouter();
  return (
    <form
      action={action}
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const response = await axios({
          url: action,
          method: "POST",
          data: formData,
          validateStatus: () => true,
        });

        if (response.status === 400) {
          const res = await response.data;
          if (onError) {
            onError(res);
          }
        }

        if (response.status === 0) {
          return router.refresh();
        }
      }}
    >
      {children}
    </form>
  );
};

export default Form;
