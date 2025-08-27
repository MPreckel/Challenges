export interface FormData {
    email: string;
    password: string;
};

export interface UseLoginPage {
    formData: FormData;
    errors: Partial<FormData>;
    formError: string | null;
    isLoading: boolean;
    authError: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validateForm: () => boolean;
    handleSubmit: (e: React.FormEvent) => void;
};
