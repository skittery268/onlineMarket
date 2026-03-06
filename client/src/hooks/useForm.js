import { useCallback, useState } from "react";

export const useForm = (initialValues) => {
    const [formData, setFormData] = useState(initialValues || {});

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    }, [])

    const handleSubmit = useCallback((e, cb) => {
        e.preventDefault();

        cb(formData);
    }, [formData])

    const resetForm = useCallback(() => {
        setFormData(initialValues);
    }, [initialValues])

    return [formData, handleChange, handleSubmit, resetForm];
}
