export type ValidationErrors = {
  [key: string]: {
    _errors: string[];
  };
};

export type Result = {
  data: {
    success: boolean;
    status: "warn" | "error" | "success" | "info";
    message: string;
  };
  serverError?: string;
  fetchError?: string;
  validationErrors?: ValidationErrors;
};

export type ColumnsProps = {
  handleShowFormForUpdate: (id: string) => void;
};
