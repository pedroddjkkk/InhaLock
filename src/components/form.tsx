"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

const Form = ({
  children,
  action,
  onError,
  onSuccess,
  className,
}: {
  children: React.ReactNode;
  action: string;
  onError?: (error: any) => void;
  onSuccess?: () => void;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <form
      action={action}
      method="post"
      className={className}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const response = await axios({
          url: action,
          method: "POST",
          data: formData,
          validateStatus: () => true,
        });

        switch (response.status) {
          case 400:
            const res = await response.data;
            if (onError) {
              onError(res);
            }
            break;
          case 0:
            return router.refresh();
          default:
            if (onSuccess) {
              onSuccess();
            }
        }
      }}
    >
      {children}
    </form>
  );
};

export default Form;
