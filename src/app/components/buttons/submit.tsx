import { useFormStatus } from "react-dom";
import { Button } from "./buttons";

export const BtnSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      theme="primary"
      size="sm"
      className="w-fit place-self-center"
      disabled={pending}
    >
      {pending ? "Validation en cours..." : "Valider"}
    </Button>
  );
};
